"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Download, MapPin } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import {
  SiReact, SiNextdotjs, SiJavascript, SiTailwindcss, SiNodedotjs, SiExpress,
  SiPhp, SiLaravel, SiMysql, SiPostgresql, SiRedis, SiDocker, SiStripe, SiPython,
} from "react-icons/si";
import { portfolioData } from "@/data/portfolio";
import { getYearsOfExperience } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1];

const marquee = [
  { name: "React.js", icon: <SiReact className="text-[#61DAFB]" /> },
  { name: "Next.js", icon: <SiNextdotjs /> },
  { name: "JavaScript", icon: <SiJavascript className="text-[#F7DF1E]" /> },
  { name: "Tailwind CSS", icon: <SiTailwindcss className="text-[#06B6D4]" /> },
  { name: "Node.js", icon: <SiNodedotjs className="text-[#5FA04E]" /> },
  { name: "Express", icon: <SiExpress /> },
  { name: "PHP", icon: <SiPhp className="text-[#777BB4]" /> },
  { name: "Laravel", icon: <SiLaravel className="text-[#FF2D20]" /> },
  { name: "MySQL", icon: <SiMysql className="text-[#4479A1]" /> },
  { name: "PostgreSQL", icon: <SiPostgresql className="text-[#4169E1]" /> },
  { name: "Redis", icon: <SiRedis className="text-[#DC382D]" /> },
  { name: "Docker", icon: <SiDocker className="text-[#2496ED]" /> },
  { name: "Stripe", icon: <SiStripe className="text-[#635BFF]" /> },
  { name: "Python Flask", icon: <SiPython className="text-[#3776AB]" /> },
];

export default function HeroSection() {
  const { profile, stats, projects } = portfolioData;
  const years = getYearsOfExperience();

  const f = (delay) => ({
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease },
  });

  const heroStats = [
    { value: years, label: "Years of experience" },
    { value: `${projects.length}+`, label: "Projects delivered" },
    ...stats,
  ];

  return (
    <section id="home" className="relative overflow-hidden pt-28 sm:pt-36">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="grid-bg absolute inset-0 opacity-70" />
        <div className="absolute -top-40 left-1/2 h-[620px] w-[900px] -translate-x-1/2 rounded-full bg-primary/10 blur-[160px]" />
        <div className="absolute right-[-10%] top-1/3 h-[420px] w-[420px] rounded-full bg-accent/10 blur-[150px]" />
      </div>

      <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
        {/* Copy */}
        <div className="order-2 lg:order-1">
          <motion.div {...f(0.05)}>
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Available for new projects &amp; full-time roles
            </span>
          </motion.div>

          <motion.p {...f(0.1)} className="mt-6 text-base font-medium text-muted-foreground sm:text-lg">
            Hi, I&apos;m <span className="font-semibold text-foreground">{profile.name}</span> — {profile.role}
          </motion.p>

          <motion.h1
            {...f(0.15)}
            className="mt-3 text-[clamp(2.3rem,5.4vw,4.4rem)] font-bold leading-[1.04] tracking-[-0.035em] text-foreground"
          >
            I build fast, scalable web apps that{" "}
            <span className="text-gradient font-serif-accent pr-1">grow businesses.</span>
          </motion.h1>

          <motion.p {...f(0.25)} className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            From pixel-perfect <strong className="font-semibold text-foreground">React.js &amp; Next.js</strong> frontends
            to secure <strong className="font-semibold text-foreground">Node.js &amp; Laravel</strong> APIs —
            I take products from idea to production, and keep them running smoothly.
          </motion.p>

          <motion.div {...f(0.35)} className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-[0_8px_30px_-8px_var(--primary)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_40px_-10px_var(--primary)]"
            >
              Start a project
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </a>
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-6 py-3.5 text-sm font-semibold text-foreground shadow-[var(--shadow-xs)] transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40"
            >
              View my work
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <a
              href="/resume.pdf"
              download="Faizan-Ullah-Resume.pdf"
              className="inline-flex items-center gap-2 rounded-xl px-3 py-3.5 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
            >
              <Download className="h-4 w-4" />
              Resume
            </a>
          </motion.div>

          <motion.dl {...f(0.45)} className="mt-12 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-border pt-8 sm:grid-cols-4">
            {heroStats.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd className="text-3xl font-bold tracking-tight text-foreground">{s.value}</dd>
                <dd className="mt-1 text-xs font-medium leading-snug text-muted-foreground">{s.label}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* Portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.15, ease }}
          className="order-1 mx-auto w-full max-w-[240px] sm:max-w-[340px] lg:order-2 lg:max-w-[390px]"
        >
          {/* The cut-out portrait "rises" out of a gradient circle: the circle sits in the
              bottom square of a 1:1.2 box, and the photo is clipped only along the circle's lower half. */}
          <div className="relative aspect-[1/1.2]">
            <div className="absolute inset-x-[-6%] bottom-[-4%] aspect-square rounded-full bg-primary/10 blur-3xl" aria-hidden="true" />
            <div className="absolute inset-x-[-5%] bottom-[-5%] aspect-square rounded-full border border-border" aria-hidden="true" />
            <div className="absolute inset-x-0 bottom-0 aspect-square rounded-full border border-border bg-gradient-to-b from-elevated to-muted shadow-[var(--shadow-md)]" aria-hidden="true" />
            <div className="absolute inset-0 overflow-hidden [border-radius:0_0_50%_50%/0_0_41.667%_41.667%]">
              <div className="absolute bottom-0 left-1/2 aspect-square w-[112%] -translate-x-[57%]">
                <Image
                  src={profile.photo}
                  alt={`${profile.name} — ${profile.role}`}
                  fill
                  preload
                  sizes="(max-width: 640px) 270px, (max-width: 1024px) 380px, 440px"
                  className="object-contain object-bottom drop-shadow-[0_20px_30px_rgba(0,0,0,0.25)]"
                />
              </div>
            </div>

            {/* Floating: location */}
            <div className="animate-float glass absolute -left-8 top-[30%] z-10 hidden items-center gap-2 rounded-2xl border border-border px-3.5 py-2.5 shadow-[var(--shadow-md)] sm:flex">
              <MapPin className="h-4 w-4 text-primary" />
              <div className="leading-tight">
                <div className="text-xs font-semibold text-foreground">Karachi, PK</div>
                <div className="text-[11px] text-muted-foreground">Remote worldwide</div>
              </div>
            </div>

            {/* Floating: stack */}
            <div className="animate-float-delayed glass absolute -bottom-4 -right-8 z-10 hidden items-center gap-3 rounded-2xl border border-border px-4 py-3 shadow-[var(--shadow-md)] sm:flex">
              <div className="flex -space-x-1.5 text-lg">
                {[<SiReact key="r" className="text-[#61DAFB]" />, <SiNodedotjs key="n" className="text-[#5FA04E]" />, <SiLaravel key="l" className="text-[#FF2D20]" />].map((icon, i) => (
                  <span key={i} className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-card">{icon}</span>
                ))}
              </div>
              <div className="leading-tight">
                <div className="text-xs font-semibold text-foreground">Full Stack</div>
                <div className="text-[11px] text-muted-foreground">Frontend → API → DB</div>
              </div>
            </div>
          </div>

          <div className="mt-10 hidden items-center justify-center gap-2 sm:flex">
            {[
              { label: "GitHub", href: profile.contact.github, icon: <FaGithub className="h-4 w-4" /> },
              { label: "LinkedIn", href: profile.contact.linkedin, icon: <FaLinkedin className="h-4 w-4" /> },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-3.5 py-2 text-xs font-semibold text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:text-foreground"
              >
                {s.icon}{s.label}
              </a>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Tech marquee */}
      <motion.div {...f(0.6)} className="marquee mask-fade-x mt-20 overflow-hidden border-y border-border bg-card/40 py-5">
        <div className="animate-marquee flex w-max items-center">
          {[...marquee, ...marquee].map((t, i) => (
            <span
              key={`${t.name}-${i}`}
              aria-hidden={i >= marquee.length}
              className="mx-6 inline-flex items-center gap-2.5 text-sm font-semibold text-muted-foreground"
            >
              <span className="text-xl">{t.icon}</span>
              {t.name}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
