"use client";

import { LayoutTemplate, Server, Database, Wrench } from "lucide-react";
import {
  SiReact, SiNextdotjs, SiJavascript, SiTailwindcss, SiHtml5, SiBootstrap, SiJquery,
  SiNodedotjs, SiExpress, SiPhp, SiLaravel, SiLivewire, SiCodeigniter, SiFlask,
  SiMysql, SiPostgresql, SiRedis, SiPusher,
  SiDocker, SiGithubactions, SiGit, SiPostman, SiFigma, SiStripe,
} from "react-icons/si";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

const groups = [
  {
    title: "Frontend",
    icon: <LayoutTemplate className="h-4 w-4" />,
    items: [
      { name: "React.js", icon: <SiReact className="text-[#61DAFB]" /> },
      { name: "Next.js", icon: <SiNextdotjs className="text-foreground" /> },
      { name: "JavaScript (ES6+)", icon: <SiJavascript className="text-[#F7DF1E]" /> },
      { name: "Tailwind CSS", icon: <SiTailwindcss className="text-[#06B6D4]" /> },
      { name: "HTML5 & CSS3", icon: <SiHtml5 className="text-[#E34F26]" /> },
      { name: "Bootstrap", icon: <SiBootstrap className="text-[#7952B3]" /> },
      { name: "jQuery", icon: <SiJquery className="text-[#0769AD]" /> },
    ],
  },
  {
    title: "Backend",
    icon: <Server className="h-4 w-4" />,
    items: [
      { name: "Node.js", icon: <SiNodedotjs className="text-[#5FA04E]" /> },
      { name: "Express.js", icon: <SiExpress className="text-foreground" /> },
      { name: "PHP 8+", icon: <SiPhp className="text-[#777BB4]" /> },
      { name: "Laravel", icon: <SiLaravel className="text-[#FF2D20]" /> },
      { name: "Livewire", icon: <SiLivewire className="text-[#FB70A9]" /> },
      { name: "CodeIgniter", icon: <SiCodeigniter className="text-[#EF4223]" /> },
      { name: "Python Flask", icon: <SiFlask className="text-foreground" /> },
    ],
  },
  {
    title: "Data & Real-time",
    icon: <Database className="h-4 w-4" />,
    items: [
      { name: "MySQL", icon: <SiMysql className="text-[#4479A1]" /> },
      { name: "PostgreSQL", icon: <SiPostgresql className="text-[#4169E1]" /> },
      { name: "Redis & Queues", icon: <SiRedis className="text-[#DC382D]" /> },
      { name: "Pusher & WebSockets", icon: <SiPusher className="text-[#300D4F] dark:text-[#a78bfa]" /> },
    ],
  },
  {
    title: "DevOps & Tools",
    icon: <Wrench className="h-4 w-4" />,
    items: [
      { name: "Docker", icon: <SiDocker className="text-[#2496ED]" /> },
      { name: "GitHub Actions", icon: <SiGithubactions className="text-[#2088FF]" /> },
      { name: "Git", icon: <SiGit className="text-[#F05032]" /> },
      { name: "Postman", icon: <SiPostman className="text-[#FF6C37]" /> },
      { name: "Stripe API", icon: <SiStripe className="text-[#635BFF]" /> },
      { name: "Figma", icon: <SiFigma className="text-[#F24E1E]" /> },
    ],
  },
];

export default function TechStack() {
  return (
    <section id="skills" className="relative scroll-mt-20 px-5 py-24 sm:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <SectionHeading
              eyebrow="Tech stack"
              title={<>Tools I use to <span className="text-gradient font-serif-accent">ship.</span></>}
              description="A production-proven toolkit across the frontend, backend, data and delivery layers."
            />
          </Reveal>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {groups.map((g, gi) => (
            <Reveal key={g.title} delay={0.05 + gi * 0.06}>
              <div className="surface h-full rounded-2xl p-6 sm:p-7">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">{g.icon}</span>
                  <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-foreground">{g.title}</h3>
                </div>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {g.items.map((s) => (
                    <li
                      key={s.name}
                      className="inline-flex items-center gap-2 rounded-xl border border-border bg-background/60 px-3.5 py-2 text-sm font-medium text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-[var(--shadow-sm)]"
                    >
                      <span className="text-base">{s.icon}</span>
                      {s.name}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
