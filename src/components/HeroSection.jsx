"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Download, ChevronDown, Activity, Cpu, Database, Wifi } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { portfolioData } from "@/data/portfolio";
import { getYearsOfExperience } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1];

function Counter({ end, suffix = "", duration = 2200 }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const ran = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !ran.current) {
          ran.current = true;
          const t0 = performance.now();
          const tick = (now) => {
            const p = Math.min((now - t0) / duration, 1);
            setVal(Math.round((1 - Math.pow(1 - p, 3)) * end));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [end, duration]);

  return <span ref={ref}>{val}{suffix}</span>;
}

const dashboardCards = [
  { icon: <Activity className="h-4 w-4" />, label: "Uptime", value: 99.9, suffix: "%", color: "text-emerald-400" },
  { icon: <Cpu className="h-4 w-4" />, label: "Projects", value: 28, suffix: "+", color: "text-violet-400" },
  { icon: <Database className="h-4 w-4" />, label: "API Response", value: 45, suffix: "ms", color: "text-cyan-400" },
  { icon: <Wifi className="h-4 w-4" />, label: "Tenants", value: 5, suffix: "+", color: "text-amber-400" },
];

export default function HeroSection() {
  const { profile } = portfolioData;
  const reduce = useReducedMotion();
  const years = getYearsOfExperience();

  const f = (delay) => ({
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.75, delay, ease },
  });

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden px-5 pt-28 pb-16 sm:px-8"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="dot-grid absolute inset-0 opacity-40 dark:opacity-20" />
        <div className="absolute left-1/2 top-1/3 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-primary/6 blur-[200px]" />
        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-accent/5 blur-[160px]" />
      </div>

      <div className="mx-auto w-full max-w-6xl">
        {/* Status */}
        <motion.div {...f(0.05)}>
          <span className="neon-border inline-flex items-center gap-2 rounded-full bg-card/80 px-4 py-1.5 text-sm text-muted-foreground backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Available for hire
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          {...f(0.15)}
          className="mt-8 max-w-3xl text-[clamp(2.4rem,6vw,5rem)] font-bold leading-[1.02] tracking-[-0.04em] text-foreground"
        >
          Backend systems that{" "}
          <span className="text-gradient font-serif-accent">scale.</span>
        </motion.h1>

        <motion.p
          {...f(0.25)}
          className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground"
        >
          {years}+ years engineering multi-tenant SaaS, real-time WebSocket
          dashboards, and production APIs — with Laravel, PHP&nbsp;8.1+, and MySQL.
        </motion.p>

        {/* CTAs */}
        <motion.div {...f(0.35)} className="mt-8 flex flex-wrap items-center gap-3">
          <a
            href="#projects"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-sm)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)]"
          >
            View projects
            <ArrowUpRight className="h-4 w-4" />
          </a>
          <a
            href="/resume.pdf"
            download="Faizan-Ullah-Resume.pdf"
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40"
          >
            <Download className="h-4 w-4" />
            Resume
          </a>
          <a
            href={profile.contact.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary"
          >
            <FaGithub className="h-4.5 w-4.5" />
          </a>
          <a
            href={profile.contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary"
          >
            <FaLinkedin className="h-4.5 w-4.5" />
          </a>
        </motion.div>

        {/* Dashboard bento */}
        <motion.div
          {...f(0.5)}
          className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-4"
        >
          {dashboardCards.map((card, i) => (
            <div
              key={card.label}
              className="neon-border group rounded-2xl bg-card/80 p-5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center gap-2 text-muted-foreground">
                <span className={card.color}>{card.icon}</span>
                <span className="text-xs font-medium">{card.label}</span>
              </div>
              <div className={`mt-2 font-mono text-2xl font-bold tracking-tight ${card.color}`}>
                <Counter end={card.value} suffix={card.suffix} />
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 text-muted-foreground md:flex"
        aria-label="Scroll down"
      >
        <span className="text-[10px] font-medium uppercase tracking-[0.3em]">Scroll</span>
        <motion.span animate={reduce ? {} : { y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}>
          <ChevronDown className="h-4 w-4" />
        </motion.span>
      </motion.a>
    </section>
  );
}
