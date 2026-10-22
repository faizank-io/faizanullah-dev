"use client";

import {
  ShieldCheck,
  MessagesSquare,
  Globe2,
  Layers,
  MapPin,
  GraduationCap,
  Briefcase,
} from "lucide-react";
import { getYearsOfExperience } from "@/lib/utils";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

const reasons = [
  {
    icon: <Layers className="h-5 w-5" />,
    title: "One engineer, the whole stack",
    desc: "Frontend, API, database and deployment handled end to end — no hand-off gaps between teams.",
  },
  {
    icon: <ShieldCheck className="h-5 w-5" />,
    title: "Production-first quality",
    desc: "Clean API contracts, tested code, secure auth and optimized queries that hold up under real traffic.",
  },
  {
    icon: <MessagesSquare className="h-5 w-5" />,
    title: "Clear, honest communication",
    desc: "Regular progress updates, realistic estimates, and straight answers when trade-offs come up.",
  },
  {
    icon: <Globe2 className="h-5 w-5" />,
    title: "Remote-ready, global experience",
    desc: "Shipped products for clients and teams in Pakistan, Kenya, the UK, the US and Nigeria.",
  },
];

export default function AboutSection() {
  const years = getYearsOfExperience();

  return (
    <section id="about" className="relative scroll-mt-20 px-5 py-24 sm:px-8 md:py-32">
      <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
        <div>
          <Reveal>
            <SectionHeading
              eyebrow="About me"
              title={<>The engineer behind <span className="text-gradient font-serif-accent">the code.</span></>}
            />
          </Reveal>

          <Reveal delay={0.08}>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground">
              <p>
                I&apos;m Faizan Ullah, a full stack engineer from Karachi with{" "}
                <strong className="font-semibold text-foreground">{years} years</strong> of
                building products people rely on every day — e-commerce stores, booking
                engines, enterprise CRMs, multi-tenant SaaS platforms and the APIs behind
                9 mobile apps.
              </p>
              <p>
                I work across the stack: modern <strong className="font-semibold text-foreground">React.js and Next.js</strong> interfaces
                on the front, <strong className="font-semibold text-foreground">Node.js, PHP and Laravel</strong> on the back, and
                well-designed MySQL and PostgreSQL databases underneath. My focus is simple —
                ship software that&apos;s fast, secure and easy to grow.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.14}>
            <div className="mt-8 flex flex-wrap gap-2">
              {[
                { icon: <MapPin className="h-3.5 w-3.5" />, label: "Karachi, Pakistan" },
                { icon: <Globe2 className="h-3.5 w-3.5" />, label: "Remote worldwide" },
                { icon: <Briefcase className="h-3.5 w-3.5" />, label: "Freelance & full-time" },
                { icon: <GraduationCap className="h-3.5 w-3.5" />, label: "BS Computer Science (in progress)" },
              ].map((f) => (
                <span key={f.label} className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground">
                  <span className="text-primary">{f.icon}</span>
                  {f.label}
                </span>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {reasons.map((r, i) => (
            <Reveal key={r.title} delay={0.06 + i * 0.06}>
              <div className="surface surface-hover flex h-full flex-col gap-4 rounded-2xl p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  {r.icon}
                </span>
                <div>
                  <h3 className="text-base font-semibold text-foreground">{r.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{r.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
