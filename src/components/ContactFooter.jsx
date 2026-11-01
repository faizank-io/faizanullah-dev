"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Phone, ArrowUpRight, ArrowUp, Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { FaWhatsapp, FaLinkedin, FaGithub, FaUpwork } from "react-icons/fa6";
import { portfolioData } from "@/data/portfolio";
import Reveal from "@/components/ui/Reveal";

const projectTypes = [
  "Full stack web app",
  "SaaS platform",
  "API / mobile app backend",
  "E-commerce / payments",
  "Frontend (React / Next.js)",
  "Full-time role",
  "Something else",
];

const budgets = ["Not sure yet", "Under $1,000", "$1,000 – $5,000", "$5,000 – $15,000", "$15,000+"];

const inputCls =
  "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 transition-colors focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10";

export default function ContactFooter() {
  const { profile } = portfolioData;
  const { contact } = profile;
  const [status, setStatus] = useState({ state: "idle" });
  const sending = status.state === "sending";

  const channels = [
    {
      icon: <FaWhatsapp className="h-5 w-5" />,
      label: "WhatsApp",
      value: "Chat with me directly",
      href: `${contact.whatsapp}?text=${encodeURIComponent("Hi Faizan, I found your portfolio and would like to discuss a project.")}`,
      tint: "text-[#25D366] bg-[#25D366]/15",
      external: true,
    },
    {
      icon: <Mail className="h-5 w-5" />,
      label: "Email",
      value: "Write to me",
      href: `mailto:${contact.email}`,
      tint: "text-[#7aa2ff] bg-[#7aa2ff]/15",
    },
    {
      icon: <Phone className="h-5 w-5" />,
      label: "Call",
      value: contact.phoneDisplay,
      href: `tel:${contact.phone}`,
      tint: "text-[#2dd4bf] bg-[#2dd4bf]/15",
    },
    {
      icon: <FaLinkedin className="h-5 w-5" />,
      label: "LinkedIn",
      value: "Let's connect",
      href: contact.linkedin,
      tint: "text-[#5aa9f0] bg-[#5aa9f0]/15",
      external: true,
    },
    {
      icon: <FaUpwork className="h-5 w-5" />,
      label: "Upwork",
      value: "Hire me on Upwork",
      href: contact.upwork,
      tint: "text-[#6fda44] bg-[#6fda44]/15",
      external: true,
    },
  ];

  const onSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    const via = e.nativeEvent.submitter?.value || "email";

    if (via === "whatsapp") {
      const text = [
        `Hi Faizan, my name is ${data.name}.`,
        "",
        `Project type: ${data.type}`,
        `Budget: ${data.budget}`,
        `Email: ${data.email}`,
        "",
        data.message,
      ].join("\n");
      window.open(`${contact.whatsapp}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
      setStatus({ state: "whatsapp" });
      return;
    }

    setStatus({ state: "sending" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || "Something went wrong.");
      form.reset();
      setStatus({ state: "sent" });
    } catch (err) {
      setStatus({ state: "error", message: err.message });
    }
  };

  const footerLinks = [
    { name: "About", href: "/#about" },
    { name: "Services", href: "/#services" },
    { name: "Work", href: "/#projects" },
    { name: "Process", href: "/#process" },
    { name: "Experience", href: "/#experience" },
    { name: "Contact", href: "/#contact" },
  ];

  const socials = [
    { label: "GitHub", href: contact.github, icon: <FaGithub className="h-4 w-4" /> },
    { label: "LinkedIn", href: contact.linkedin, icon: <FaLinkedin className="h-4 w-4" /> },
    { label: "Upwork", href: contact.upwork, icon: <FaUpwork className="h-4 w-4" /> },
    { label: "WhatsApp", href: contact.whatsapp, icon: <FaWhatsapp className="h-4 w-4" /> },
    { label: "Email", href: `mailto:${contact.email}`, icon: <Mail className="h-4 w-4" /> },
  ];

  return (
    <>
      <section id="contact" className="relative scroll-mt-20 px-4 py-20 sm:px-8 md:py-28">
        <Reveal className="mx-auto max-w-6xl">
          {/* Stays dark in both themes so it reads as the page's closing moment */}
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0a0f1e] p-5 shadow-[var(--shadow-lg)] sm:p-8 lg:p-10">
            <div className="pointer-events-none absolute inset-0" aria-hidden="true">
              <div className="animate-aurora absolute -left-24 -top-24 h-96 w-96 rounded-full bg-[#2f6bff]/35 blur-[110px]" />
              <div className="animate-aurora-slow absolute -bottom-32 left-1/4 h-96 w-96 rounded-full bg-[#2dd4bf]/20 blur-[110px]" />
            </div>

            <div className="relative grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-10">
              {/* Pitch and direct channels */}
              <div className="flex flex-col p-1 text-white sm:p-2">
                <span className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1.5 text-xs font-semibold text-emerald-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Available for new work
                </span>
                <h2 className="mt-5 text-4xl font-bold leading-[1.08] tracking-[-0.03em] sm:text-5xl">
                  Let&apos;s build something{" "}
                  <span className="font-serif-accent bg-gradient-to-r from-[#7aa2ff] to-[#2dd4bf] bg-clip-text text-transparent">great together.</span>
                </h2>
                <p className="mt-4 max-w-md text-base leading-relaxed text-white/65">
                  Have a project, a product idea or a role to fill? Send me a message and I&apos;ll get back to you soon.
                </p>

                <div className="mt-8 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  {channels.map((c, i) => (
                    <a
                      key={c.label}
                      href={c.href}
                      {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className={`group flex min-w-0 items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.05] p-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/[0.09] ${i === 0 ? "sm:col-span-2" : ""}`}
                    >
                      <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${c.tint}`}>{c.icon}</span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-semibold">{c.label}</span>
                        <span className="block truncate text-xs text-white/55">{c.value}</span>
                      </span>
                      <ArrowUpRight className="h-4 w-4 shrink-0 text-white/40 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
                    </a>
                  ))}
                </div>

                <p className="mt-auto pt-6 text-xs leading-relaxed text-white/45">
                  Based in Karachi (PKT, UTC+5). Happy to work across time zones.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={onSubmit} className="surface rounded-3xl p-6 shadow-[var(--shadow-lg)] sm:p-8">
                <h3 className="text-lg font-semibold tracking-tight text-foreground">Tell me about your project</h3>
                <p className="mt-1 text-sm text-muted-foreground">A few details help me reply with something useful.</p>

                {/* Honeypot for bots — hidden from people and screen readers */}
                <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-1.5 block text-xs font-semibold text-foreground">Your name</span>
                    <input name="name" required autoComplete="name" placeholder="Jane Smith" className={inputCls} />
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block text-xs font-semibold text-foreground">Email</span>
                    <input name="email" type="email" required autoComplete="email" placeholder="jane@company.com" className={inputCls} />
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block text-xs font-semibold text-foreground">What do you need?</span>
                    <select name="type" defaultValue={projectTypes[0]} className={inputCls}>
                      {projectTypes.map((t) => <option key={t}>{t}</option>)}
                    </select>
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block text-xs font-semibold text-foreground">Budget</span>
                    <select name="budget" defaultValue={budgets[0]} className={inputCls}>
                      {budgets.map((b) => <option key={b}>{b}</option>)}
                    </select>
                  </label>
                  <label className="block sm:col-span-2">
                    <span className="mb-1.5 block text-xs font-semibold text-foreground">Project details</span>
                    <textarea
                      name="message"
                      required
                      rows={8}
                      placeholder="What are you building, who is it for, and when do you need it?"
                      className={`${inputCls} resize-y`}
                    />
                  </label>
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <button
                    type="submit"
                    value="whatsapp"
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 py-3.5 text-sm font-semibold text-[#06290f] transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)]"
                  >
                    <FaWhatsapp className="h-4 w-4" /> Send on WhatsApp
                  </button>
                  <button
                    type="submit"
                    value="email"
                    disabled={sending}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)] disabled:pointer-events-none disabled:opacity-70"
                  >
                    {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                    {sending ? "Sending…" : "Send by email"}
                  </button>
                </div>

                <div aria-live="polite">
                  {status.state === "sent" && (
                    <p className="mt-4 flex items-center gap-2 text-sm font-medium text-success">
                      <CheckCircle2 className="h-4 w-4 shrink-0" /> Message sent! I&apos;ll get back to you soon.
                    </p>
                  )}
                  {status.state === "whatsapp" && (
                    <p className="mt-4 flex items-center gap-2 text-sm text-success">
                      <CheckCircle2 className="h-4 w-4 shrink-0" /> WhatsApp opened with your message — just press send.
                    </p>
                  )}
                  {status.state === "error" && (
                    <p className="mt-4 flex items-start gap-2 text-sm text-error">
                      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                      <span>
                        {status.message}{" "}
                        <a href={`mailto:${contact.email}`} className="font-semibold underline underline-offset-2">Email me directly</a>.
                      </span>
                    </p>
                  )}
                </div>
              </form>
            </div>
          </div>
        </Reveal>
      </section>

      <footer className="border-t border-border px-5 pb-10 pt-14 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
            <div>
              <Link href="/" className="inline-flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent text-sm font-bold text-white">FU</span>
                <span className="text-base font-bold tracking-tight text-foreground">Faizan Ullah</span>
              </Link>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
                Full Stack Engineer building fast, scalable web applications with React.js, Next.js, Node.js, PHP and Laravel.
              </p>
              <div className="mt-5 flex gap-2">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:text-foreground"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            <nav aria-label="Footer">
              <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-foreground">Navigate</h3>
              <ul className="mt-4 grid grid-cols-2 gap-2.5">
                {footerLinks.map((l) => (
                  <li key={l.name}>
                    <Link href={l.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">{l.name}</Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-foreground">Get in touch</h3>
              <ul className="mt-4 space-y-2.5 text-sm">
                <li><a href={`mailto:${contact.email}`} className="text-muted-foreground transition-colors hover:text-foreground">{contact.email}</a></li>
                <li><a href={`tel:${contact.phone}`} className="text-muted-foreground transition-colors hover:text-foreground">{contact.phoneDisplay}</a></li>
                <li className="text-muted-foreground">{profile.location}</li>
              </ul>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row">
            <p>&copy; {new Date().getFullYear()} Faizan Ullah. All rights reserved.</p>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1 font-medium transition-colors hover:text-foreground"
            >
              Back to top <ArrowUp className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </footer>
    </>
  );
}
