"use client";

import { portfolioData } from "@/data/portfolio";
import { GraduationCap, Award, BookOpen, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

const meta = [
  {
    status: "In Progress",
    statusCls: "bg-primary/10 text-primary border-primary/25",
    icon: <GraduationCap className="h-4 w-4 text-primary" />,
    accent: "from-primary/60",
    focus: ["Software Architecture", "Algorithms", "Database Systems"],
  },
  {
    status: "Completed",
    statusCls: "bg-emerald-500/10 text-success border-emerald-500/25",
    icon: <Award className="h-4 w-4 text-success" />,
    accent: "from-emerald-500/60",
    focus: ["Computer Info Tech", "OOP", "SQL Databases"],
  },
  {
    status: "Completed",
    statusCls: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/25",
    icon: <BookOpen className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />,
    accent: "from-indigo-500/60",
    focus: ["CS & Physics", "Mathematics"],
  },
  {
    status: "Completed",
    statusCls: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/25",
    icon: <BookOpen className="h-4 w-4 text-amber-600 dark:text-amber-400" />,
    accent: "from-amber-500/60",
    focus: ["Science Foundations"],
  },
];

export default function EducationList() {
  const { education } = portfolioData;

  return (
    <section id="education" className="relative scroll-mt-20 px-5 pb-24 pt-4 sm:px-8 md:pb-32">
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <SectionHeading
            eyebrow="Education"
            title={<>Grounded in <span className="text-gradient font-serif-accent">computer science.</span></>}
          />
        </Reveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {education.map((edu, idx) => {
            const m = meta[idx] || meta[0];
            return (
              <Reveal key={idx} delay={idx * 0.06}>
                <div className="group relative h-full overflow-hidden rounded-2xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[var(--shadow-md)]">
                  {/* Left accent */}
                  <div className={cn("absolute inset-y-0 left-0 w-[3px] bg-gradient-to-b to-transparent", m.accent)} />

                  <div className="flex items-start justify-between gap-3">
                    <span className={cn("inline-flex rounded-full border px-2.5 py-0.5 text-[11px] font-bold", m.statusCls)}>{m.status}</span>
                    <span className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-muted/50 px-2.5 py-1 text-[11px] font-semibold text-muted-foreground">
                      <Calendar className="h-3 w-3" />{edu.year}
                    </span>
                  </div>

                  <h3 className="mt-3 text-base font-bold text-foreground">{edu.degree}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{edu.institution}</p>

                  <div className="mt-4 flex flex-wrap gap-1.5 border-t border-border/50 pt-3">
                    {m.focus.map((f) => (
                      <span key={f} className="rounded-md border border-border/60 bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">{f}</span>
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
