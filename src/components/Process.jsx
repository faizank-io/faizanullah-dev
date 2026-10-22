"use client";

import { PhoneCall, ClipboardList, Code2, Rocket } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

const steps = [
  {
    icon: <PhoneCall className="h-5 w-5" />,
    title: "Discovery call",
    desc: "We talk through your goals, users and constraints so I understand what success looks like for you.",
  },
  {
    icon: <ClipboardList className="h-5 w-5" />,
    title: "Plan & estimate",
    desc: "You get a clear scope, the right tech choices, milestones and a realistic timeline — before any code is written.",
  },
  {
    icon: <Code2 className="h-5 w-5" />,
    title: "Build in sprints",
    desc: "I ship in small, reviewable increments with regular demos, so you always see real progress.",
  },
  {
    icon: <Rocket className="h-5 w-5" />,
    title: "Launch & support",
    desc: "Deployment, monitoring and handover — plus ongoing improvements once real users arrive.",
  },
];

export default function Process() {
  return (
    <section id="process" className="relative scroll-mt-20 px-5 py-24 sm:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHeading
            eyebrow="How I work"
            align="center"
            title={<>A simple process, <span className="text-gradient font-serif-accent">no surprises.</span></>}
            description="Four clear steps from first conversation to a product your users love."
          />
        </Reveal>

        <div className="relative mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          <div className="pointer-events-none absolute left-0 right-0 top-[44px] hidden h-px bg-gradient-to-r from-transparent via-border to-transparent lg:block" aria-hidden="true" />
          {steps.map((s, i) => (
            <Reveal key={s.title} delay={0.05 + i * 0.08}>
              <div className="surface surface-hover relative flex h-full flex-col rounded-2xl p-6">
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent text-white shadow-[var(--shadow-sm)]">
                    {s.icon}
                  </span>
                  <span className="font-mono text-3xl font-bold text-border">0{i + 1}</span>
                </div>
                <h3 className="mt-6 text-lg font-semibold tracking-tight text-foreground">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
