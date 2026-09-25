"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { Calendar, ChevronDown, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { getYearsOfExperience, getDetailedExperience } from "@/lib/utils";
import Reveal from "@/components/ui/Reveal";

const roleDetails = {
  "Devop360 Technology": {
    badge: "Senior",
    type: "Full-Time",
    highlights: [
      "Designed RESTful backend APIs supporting 11+ mobile applications (iOS & Android).",
      "Integrated Stripe Connect, M-Pesa, QuickBooks API and CRM systems.",
      "Optimized database indexing and caching for high-concurrency API performance.",
    ],
    tech: ["Laravel", "PHP", "Node.js", "MySQL", "REST APIs", "Sanctum"],
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
  const reduce = useReducedMotion();
  const [expanded, setExpanded] = useState(0);

  return (
    <section id="experience" className="relative scroll-mt-20 px-5 py-24 sm:px-8 md:py-32">
      <div className="pointer-events-none absolute left-0 top-1/3 -z-10 h-96 w-96 rounded-full bg-primary/5 blur-[150px]" />

      <div className="mx-auto max-w-4xl">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <div className="flex items-center gap-3 text-primary">
              <span className="h-px w-8 bg-primary/50" />
              <span className="font-mono text-xs font-semibold uppercase tracking-[0.2em]">04 / Experience</span>
            </div>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Career built on shipped work.
            </h2>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="rounded-2xl border border-border bg-card px-4 py-3">
              <div className="text-sm font-bold text-foreground">{getYearsOfExperience()} career experience</div>
              <div className="text-xs text-muted-foreground">{getDetailedExperience()} · Jan 2023 – present</div>
            </div>
          </Reveal>
        </div>

        <div className="relative mt-12">
          {/* Timeline line */}
          <div className="absolute bottom-4 left-[15px] top-2 w-px bg-gradient-to-b from-primary via-primary/30 to-border" aria-hidden="true" />

          <div className="flex flex-col gap-5">
            {experience.map((exp, idx) => {
              const det = roleDetails[exp.company] || { badge: "Engineer", type: "Full-Time", highlights: [exp.description], tech: ["PHP", "Laravel"] };
              const on = expanded === idx;

              return (
                <Reveal key={`${exp.company}-${idx}`} delay={idx * 0.05}>
                  <div className="relative pl-12">
                    {/* Node */}
                    <div className={cn(
                      "absolute left-0 top-6 flex h-[30px] w-[30px] items-center justify-center rounded-full border text-[11px] font-bold transition-all duration-300",
                      on ? "border-primary bg-primary text-primary-foreground ring-4 ring-primary/15" : "border-border bg-card text-muted-foreground"
                    )}>
                      {String(idx + 1).padStart(2, "0")}
                    </div>

                    <button
                      onClick={() => setExpanded(on ? null : idx)}
                      aria-expanded={on}
                      className={cn(
                        "group w-full rounded-2xl border bg-card p-5 text-left transition-all duration-300 sm:p-6",
                        on ? "neon-border border-primary/40 shadow-[var(--shadow-md)]" : "border border-border hover:border-primary/30 hover:shadow-[var(--shadow-sm)]"
                      )}
                    >
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <div className="mb-2 flex flex-wrap gap-2">
                            <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-bold text-primary">{det.badge}</span>
                            <span className="rounded-full border border-border bg-muted px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground">{det.type}</span>
                          </div>
                          <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">{exp.role}</h3>
                          <p className="mt-0.5 text-sm font-semibold text-primary">{exp.company}</p>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg border border-border bg-muted/50 px-3 py-1.5 text-xs font-semibold text-muted-foreground">
                            <Calendar className="h-3.5 w-3.5" />{exp.period}
                          </span>
                          <ChevronDown className={cn("h-4 w-4 text-muted-foreground transition-transform duration-300", on && "rotate-180 text-primary")} />
                        </div>
                      </div>

                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{exp.description}</p>

                      <AnimatePresence initial={false}>
                        {on && (
                          <motion.div
                            initial={reduce ? { opacity: 0 } : { opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={reduce ? { opacity: 0 } : { opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                            className="overflow-hidden"
                          >
                            <div className="mt-4 space-y-4 border-t border-border/50 pt-4">
                              <span className="text-[11px] font-bold uppercase tracking-widest text-foreground">Key achievements</span>
                              <ul className="space-y-2">
                                {det.highlights.map((h, i) => (
                                  <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />{h}
                                  </li>
                                ))}
                              </ul>
                              <div className="flex flex-wrap gap-1.5">
                                {det.tech.map((t) => <span key={t} className="rounded-lg border border-border bg-muted px-2.5 py-1 text-xs font-medium text-foreground">{t}</span>)}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </button>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
