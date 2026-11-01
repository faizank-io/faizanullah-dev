"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { Calendar, CheckCircle2 } from "lucide-react";
import { cn, getYearsOfExperience, getDetailedExperience } from "@/lib/utils";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

const roleDetails = {
  "Devop360 Technology": {
    badge: "Full Stack",
    type: "Full-Time",
    highlights: [
      "Build responsive React.js and Next.js frontends connected to Laravel and Node.js APIs.",
      "Designed RESTful backend APIs supporting 9 mobile applications (iOS & Android).",
      "Integrated Stripe Connect, M-Pesa, QuickBooks API and CRM systems.",
      "Optimized database indexing and caching for high-concurrency API performance.",
    ],
    tech: ["React.js", "Next.js", "Node.js", "Laravel", "PHP", "MySQL", "REST APIs"],
  },
  "Tafsol Technologies": {
    badge: "Mid-Senior",
    type: "Full-Time",
    highlights: [
      "Engineered clean Laravel backend architectures and database schemas.",
      "Refactored legacy queries, optimized MySQL indexing for faster execution.",
      "Defined API contracts with frontend React/Vue developers.",
    ],
    tech: ["Laravel", "PHP", "MySQL", "REST APIs", "Git"],
  },
  "Backtik Solutions": {
    badge: "Mid Level",
    type: "Full-Time",
    highlights: [
      "Developed custom client-facing web modules and third-party integrations.",
      "Resolved backend production issues, improved system stability.",
      "Implemented RBAC and security patches.",
    ],
    tech: ["Laravel", "PHP", "MySQL", "jQuery", "Bootstrap"],
  },
  "Bitlife Technologies (Nairobi County, Kenya Remote)": {
    badge: "Intern → Lead",
    type: "International Remote",
    highlights: [
      "Promoted from Intern to Contract Backend Lead over 2.5 years.",
      "Built backend modules with CodeIgniter and Laravel.",
      "Managed deliverables across multiple timezone sprints.",
    ],
    tech: ["Laravel", "CodeIgniter", "PHP", "MySQL"],
  },
};

export default function ExperienceTimeline() {
  const { experience } = portfolioData;
  const [active, setActive] = useState(0);
  const exp = experience[active];
  const det = roleDetails[exp.company] || { badge: "Engineer", type: "Full-Time", highlights: [exp.description], tech: [] };
  const companyName = (c) => c.split(" (")[0];

  return (
    <section id="experience" className="relative scroll-mt-20 px-5 py-24 sm:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <SectionHeading
              eyebrow="Experience"
              title={<>A career built on <span className="text-gradient font-serif-accent">shipped work.</span></>}
            />
          </Reveal>

          <Reveal delay={0.08}>
            <div className="flex items-baseline gap-3">
              <span className="text-gradient text-5xl font-bold tracking-tight">{getYearsOfExperience()}</span>
              <span className="text-sm leading-tight text-muted-foreground">years in production<br />{getDetailedExperience()} since Jan 2023</span>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="mt-12">
          <div className="grid gap-6 lg:grid-cols-[340px_1fr]">
            {/* Company rail */}
            <div role="tablist" aria-label="Companies" className="relative flex gap-2 overflow-x-auto pb-1 scrollbar-none lg:flex-col lg:overflow-visible lg:pb-0">
              {experience.map((e, i) => {
                const on = active === i;
                return (
                  <button
                    key={`${e.company}-${i}`}
                    role="tab"
                    aria-selected={on}
                    onClick={() => setActive(i)}
                    className={cn(
                      "relative w-[250px] shrink-0 rounded-2xl p-5 text-left transition-colors duration-300 lg:w-full",
                      on ? "text-white" : "border border-border bg-card hover:border-primary/30"
                    )}
                  >
                    {on && (
                      <motion.span
                        layoutId="experience-active"
                        className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary to-accent shadow-[var(--shadow-md)]"
                        transition={{ type: "spring", stiffness: 380, damping: 34 }}
                      />
                    )}
                    <span className="relative block">
                      <span className="flex items-center justify-between gap-3">
                        <span className={cn("truncate text-sm font-bold", !on && "text-foreground")}>{companyName(e.company)}</span>
                        {i === 0 && (
                          <span className={cn("relative flex h-2 w-2 shrink-0", on ? "text-white" : "text-emerald-500")} title="Current role">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-current opacity-60" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-current" />
                          </span>
                        )}
                      </span>
                      <span className={cn("mt-1 block truncate text-xs", on ? "text-white/85" : "text-muted-foreground")}>{e.role}</span>
                      <span className={cn("mt-2 block text-[11px] font-medium", on ? "text-white/75" : "text-muted-foreground/80")}>{e.period}</span>
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Role detail */}
            <div className="surface relative min-h-[420px] overflow-hidden rounded-3xl p-6 shadow-[var(--shadow-sm)] sm:p-9">
              <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl" aria-hidden="true" />
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={active}
                  role="tabpanel"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  className="relative"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">{det.badge}</span>
                    <span className="rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground">{det.type}</span>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground">
                      <Calendar className="h-3 w-3" />{exp.period}
                    </span>
                  </div>

                  <h3 className="mt-5 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">{exp.role}</h3>
                  <p className="mt-1 text-base font-semibold text-primary">{exp.company}</p>
                  <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-muted-foreground">{exp.description}</p>

                  <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                    {det.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-3 rounded-2xl bg-muted/60 p-4 text-sm leading-relaxed text-foreground/85">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />{h}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex flex-wrap gap-1.5">
                    {det.tech.map((t) => (
                      <span key={t} className="rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-foreground">{t}</span>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
