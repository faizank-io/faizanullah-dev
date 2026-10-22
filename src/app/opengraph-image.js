import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const runtime = "nodejs";

export const alt = "Faizan Ullah — Full Stack Engineer";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  const photo = await readFile(join(process.cwd(), "public/faizan-ullah-portrait.png"), "base64");
  const photoSrc = `data:image/png;base64,${photo}`;

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#06080f",
          padding: "72px 80px",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Ambient glows */}
        <div
          style={{
            position: "absolute",
            top: "-200px",
            left: "-120px",
            width: "640px",
            height: "640px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(91, 140, 255, 0.22) 0%, rgba(0,0,0,0) 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-220px",
            right: "-120px",
            width: "620px",
            height: "620px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(45, 212, 191, 0.16) 0%, rgba(0,0,0,0) 70%)",
          }}
        />

        {/* Copy */}
        <div style={{ display: "flex", flexDirection: "column", maxWidth: "680px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: "12px", height: "12px", borderRadius: "50%", backgroundColor: "#34d399" }} />
            <span style={{ fontSize: "22px", fontWeight: 600, color: "#34d399", letterSpacing: "1px" }}>
              Available for new projects
            </span>
          </div>

          <h1 style={{ fontSize: "76px", fontWeight: 800, color: "#ffffff", margin: "28px 0 0", lineHeight: 1.05, letterSpacing: "-2px" }}>
            Faizan Ullah
          </h1>
          <div style={{ fontSize: "38px", fontWeight: 700, color: "#5b8cff", marginTop: "10px" }}>
            Full Stack Engineer
          </div>
          <p style={{ fontSize: "26px", color: "#94a0b8", margin: "22px 0 0", lineHeight: 1.4 }}>
            Fast, scalable web apps with React.js, Next.js, Node.js, PHP and Laravel.
          </p>

          <div style={{ display: "flex", gap: "10px", marginTop: "36px" }}>
            {["React.js", "Next.js", "Node.js", "Laravel", "PHP"].map((tech) => (
              <span
                key={tech}
                style={{
                  backgroundColor: "#111726",
                  color: "#dbe2f0",
                  fontSize: "20px",
                  fontWeight: 600,
                  padding: "8px 16px",
                  borderRadius: "10px",
                  border: "1px solid #1b2336",
                }}
              >
                {tech}
              </span>
            ))}
          </div>

          <span style={{ fontSize: "22px", fontWeight: 700, color: "#2dd4bf", marginTop: "36px" }}>
            faizanullahdevs.com
          </span>
        </div>

        {/* Portrait */}
        <div
          style={{
            display: "flex",
            padding: "10px",
            borderRadius: "40px",
            background: "linear-gradient(135deg, #5b8cff, #2dd4bf)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
          <img src={photoSrc} width={340} height={340} style={{ borderRadius: "32px", objectFit: "cover" }} />
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
