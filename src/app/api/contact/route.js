import nodemailer from "nodemailer";

// Sends contact-form messages to the site owner over SMTP.
// Required env vars: SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS
// Optional: CONTACT_TO (defaults to SMTP_USER), CONTACT_FROM (defaults to SMTP_USER)

const RATE_LIMIT = 5; // messages
const RATE_WINDOW_MS = 60 * 60 * 1000; // per hour, per IP
const hits = new Map();

function rateLimited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > RATE_LIMIT;
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const clean = (v, max) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: real visitors never see or fill this field.
  if (body.company) {
    return Response.json({ ok: true });
  }

  const name = clean(body.name, 100);
  const email = clean(body.email, 200);
  const type = clean(body.type, 100);
  const budget = clean(body.budget, 100);
  const message = clean(body.message, 5000);

  if (!name || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: "Please fill in your name, a valid email and a message." }, { status: 400 });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
  if (rateLimited(ip)) {
    return Response.json({ error: "Too many messages. Please try again later." }, { status: 429 });
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO, CONTACT_FROM } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    console.error("Contact form: SMTP environment variables are not set.");
    return Response.json({ error: "Email is not configured yet." }, { status: 500 });
  }

  const port = Number(SMTP_PORT) || 465;
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  const rows = [
    ["Name", name],
    ["Email", email],
    ["Project type", type],
    ["Budget", budget],
  ];

  try {
    await transporter.sendMail({
      from: `"Portfolio Contact" <${CONTACT_FROM || SMTP_USER}>`,
      to: CONTACT_TO || SMTP_USER,
      replyTo: `"${name.replace(/"/g, "")}" <${email}>`,
      subject: `New project inquiry — ${type || "General"} — ${name}`,
      text: `${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}\n\n${message}`,
      html: `
        <h2 style="font-family:sans-serif">New project inquiry</h2>
        <table style="font-family:sans-serif;font-size:14px">
          ${rows.map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0;color:#666">${k}</td><td><strong>${escapeHtml(v)}</strong></td></tr>`).join("")}
        </table>
        <p style="font-family:sans-serif;font-size:14px;white-space:pre-wrap;margin-top:16px">${escapeHtml(message)}</p>
      `,
    });
  } catch (err) {
    console.error("Contact form: failed to send email", err);
    return Response.json({ error: "Couldn't send your message right now. Please try WhatsApp or email directly." }, { status: 502 });
  }

  return Response.json({ ok: true });
}
