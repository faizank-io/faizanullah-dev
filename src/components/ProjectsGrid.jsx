"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ArrowRight, ChevronDown, Lock, Play } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import { getProjectDetail } from "@/data/projectDetails";
import { cn } from "@/lib/utils";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

const INITIAL_COUNT = 6;
const ease = [0.22, 1, 0.36, 1];

const tabLabels = {
  All: "All work",
  "Live Websites & Apps": "Websites & Apps",
  "SaaS & Enterprise": "SaaS & Enterprise",
  "Mobile App APIs": "Mobile App APIs",
  "AI & Automation": "AI & Automation",
};

function hostname(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

export default function ProjectsGrid() {
  const { projects, projectOrder, projectCategories } = portfolioData;
  const [cat, setCat] = useState("All");
  const [showAll, setShowAll] = useState(false);

  const byId = Object.fromEntries(projects.map((p) => [p.id, p]));
  const ordered = [
    ...projectOrder.map((id) => byId[id]).filter(Boolean),
    ...projects.filter((p) => !projectOrder.includes(p.id)),
  ];
  const filtered = ordered.filter((p) => cat === "All" || p.category === cat);
  const visible = showAll ? filtered : filtered.slice(0, INITIAL_COUNT);

  const selectCategory = (c) => {
    setCat(c);
    setShowAll(false);
  };

  return (
    <section id="projects" className="relative scroll-mt-20 px-5 py-24 sm:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHeading
            eyebrow="Selected work"
            title={<>Products I&apos;ve built <span className="text-gradient font-serif-accent">and shipped.</span></>}
            description="Live platforms used by real businesses and their customers — each one designed, built and launched end to end."
          />
        </Reveal>

        <Reveal delay={0.08} className="mt-10">
          <div
            role="group"
            aria-label="Filter projects by category"
            className="inline-flex max-w-full gap-1 overflow-x-auto rounded-2xl border border-border bg-card p-1.5 shadow-[var(--shadow-xs)] scrollbar-none"
          >
            {projectCategories.map((c) => {
              const count = c === "All" ? projects.length : projects.filter((p) => p.category === c).length;
              const on = cat === c;
              return (
                <button
                  key={c}
                  aria-pressed={on}
                  onClick={() => selectCategory(c)}
                  className={cn(
                    "relative inline-flex shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors duration-300",
                    on ? "text-background" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {on && (
                    <motion.span
                      layoutId="project-tab"
                      className="absolute inset-0 rounded-xl bg-foreground"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    />
                  )}
                  <span className="relative">{tabLabels[c] || c}</span>
                  <span className={cn("relative text-xs font-bold", on ? "opacity-70" : "opacity-50")}>{count}</span>
                </button>
              );
            })}
          </div>
        </Reveal>

        <motion.div layout className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((p, i) => (
              <ProjectCard key={`${cat}-${p.id}`} project={p} index={i} large={i === 0} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length > INITIAL_COUNT && (
          <div className="mt-10 flex justify-center">
            <button
              onClick={() => setShowAll((v) => !v)}
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground shadow-[var(--shadow-xs)] transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40"
            >
              {showAll ? "Show less" : `View all ${filtered.length} projects`}
              <ChevronDown className={cn("h-4 w-4 transition-transform duration-300", showAll && "rotate-180")} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

function ProjectCard({ project, index, large }) {
  const detail = getProjectDetail(project.id);
  const metrics = large ? detail?.metrics?.slice(0, 3) ?? [] : [];
  const host = hostname(project.link);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.5, delay: Math.min((index % INITIAL_COUNT) * 0.06, 0.3), ease }}
      className={cn(
        "surface surface-hover group relative flex flex-col overflow-hidden rounded-3xl",
        large && "md:col-span-2 lg:row-span-2"
      )}
    >
      {/* Whole card opens the case study; the live-site button sits above this layer. */}
      <Link href={`/projects/${project.id}`} className="absolute inset-0 z-10" aria-label={`${project.title} — case study`} />

      {/* Browser-framed screenshot */}
      <div className={cn("p-2.5 pb-0", large && "flex flex-1 flex-col")}>
        <div className={cn("overflow-hidden rounded-2xl border border-border bg-muted", large && "flex flex-1 flex-col")}>
          <div className="flex items-center gap-2 border-b border-border bg-elevated px-3 py-2">
            <div className="flex gap-1" aria-hidden="true">
              <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
              <span className="h-2 w-2 rounded-full bg-[#ffbd2e]" />
              <span className="h-2 w-2 rounded-full bg-[#28c840]" />
            </div>
            <span className="ml-1 flex min-w-0 items-center gap-1 truncate font-mono text-[10px] text-muted-foreground">
              <Lock className="h-2.5 w-2.5 shrink-0" />
              {host || (project.video ? "Desktop app · demo video" : "iOS & Android · REST API")}
            </span>
          </div>
          <div className={cn("relative aspect-[16/10] overflow-hidden", large && "lg:aspect-auto lg:flex-1 lg:min-h-[300px]")}>
            <Image
              src={project.image}
              alt={`${project.title} — screenshot`}
              fill
              sizes={large ? "(max-width:768px) 100vw, 760px" : "(max-width:768px) 100vw, (max-width:1024px) 50vw, 380px"}
              className="object-cover object-top transition-transform duration-[1.2s] ease-out group-hover:scale-[1.05]"
            />
            {project.video && (
              <span className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-black shadow-lg transition-transform duration-500 group-hover:scale-110">
                  <Play className="ml-0.5 h-6 w-6 fill-current" />
                </span>
              </span>
            )}
            {project.video && (
              <span className="absolute right-2.5 top-2.5 rounded-full bg-black/55 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white/90 backdrop-blur-sm">
                Watch demo
              </span>
            )}
            {project.concept && (
              <span className="absolute right-2.5 top-2.5 rounded-full bg-black/55 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white/90 backdrop-blur-sm">
                UI concept
              </span>
            )}
            <div className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-black/55 via-black/0 to-transparent p-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              <span className="inline-flex translate-y-2 items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-semibold text-black shadow-lg transition-transform duration-500 group-hover:translate-y-0">
                View case study <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Details */}
      <div className={cn("flex flex-col p-5", large && "sm:p-7")}>
        <div className="flex items-center justify-between gap-3">
          <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">{project.badge}</span>
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit ${project.title} live`}
              className="relative z-20 inline-flex items-center gap-1 rounded-full border border-border px-2.5 py-1 text-[11px] font-semibold text-muted-foreground transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
            >
              Live <ArrowUpRight className="h-3 w-3" />
            </a>
          )}
        </div>

        <h3 className={cn(
          "mt-2.5 font-bold leading-snug tracking-tight text-foreground transition-colors group-hover:text-primary",
          large ? "text-xl sm:text-2xl" : "text-[17px]"
        )}>
          {project.title}
        </h3>

        {large && (
          <p className="mt-2.5 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-[15px]">{project.description}</p>
        )}

        {metrics.length > 0 && (
          <dl className="mt-5 flex flex-wrap gap-x-8 gap-y-3">
            {metrics.map((m) => (
              <div key={m.label} className="flex flex-col-reverse">
                <dt className="text-xs text-muted-foreground">{m.label}</dt>
                <dd className="text-xl font-bold tracking-tight text-foreground">
                  {m.value}{m.unit === "%" && "%"}
                </dd>
              </div>
            ))}
          </dl>
        )}

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tags.slice(0, large ? 5 : 3).map((t) => (
            <span key={t} className="rounded-md bg-muted px-2 py-1 text-[11px] font-medium text-muted-foreground">{t}</span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}
