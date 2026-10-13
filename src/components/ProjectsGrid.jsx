"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { portfolioData } from "@/data/portfolio";
import { getAllProjectIds } from "@/data/projectDetails";
import { Search, ArrowUpRight, X, Layers, Lock, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import Reveal from "@/components/ui/Reveal";

export default function ProjectsGrid() {
  const { projects, projectCategories } = portfolioData;
  const reduce = useReducedMotion();
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");
  const detailIds = getAllProjectIds();

  const filtered = projects.filter((p) => {
    const matchCat = cat === "All" || p.category === cat;
    const matchQ = !q || [p.title, p.description, ...p.tags].some((s) => s.toLowerCase().includes(q.toLowerCase()));
    return matchCat && matchQ;
  });

  const featured = filtered.find((p) => p.highlight);
  const rest = filtered.filter((p) => p !== featured);

  return (
    <section id="projects" className="relative scroll-mt-20 px-5 py-24 sm:px-8 md:py-32">
      <div className="pointer-events-none absolute right-0 top-1/4 -z-10 h-96 w-96 rounded-full bg-primary/5 blur-[150px]" />

      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <div className="flex items-center gap-3 text-primary">
              <span className="h-px w-8 bg-primary/50" />
              <span className="font-mono text-xs font-semibold uppercase tracking-[0.2em]">03 / Projects</span>
            </div>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Shipped, production systems.
            </h2>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 rounded-2xl border border-border bg-card px-4 py-3">
                <span className="font-mono text-xl font-bold text-primary">19</span>
                <span className="text-xs text-muted-foreground leading-tight">Live<br />platforms</span>
              </div>
              <div className="flex items-center gap-2 rounded-2xl border border-border bg-card px-4 py-3">
                <span className="font-mono text-xl font-bold text-primary">9</span>
                <span className="text-xs text-muted-foreground leading-tight">Mobile<br />backends</span>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Toolbar */}
        <Reveal delay={0.1} className="mt-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1">
              {projectCategories.map((c) => {
                const count = c === "All" ? projects.length : projects.filter((p) => p.category === c).length;
                return (
                  <button
                    key={c}
                    onClick={() => setCat(c)}
                    className={cn(
                      "inline-flex shrink-0 items-center gap-1.5 rounded-xl border px-4 py-2 text-sm font-semibold transition-all duration-300",
                      cat === c
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground"
                    )}
                  >
                    {c}
                    <span className={cn("rounded-full px-1.5 py-0.5 text-[11px] font-bold", cat === c ? "bg-primary-foreground/20" : "bg-muted")}>{count}</span>
                  </button>
                );
              })}
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search..."
                className="w-full rounded-xl border border-border bg-card py-2.5 pl-10 pr-9 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none"
              />
              {q && (
                <button onClick={() => setQ("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </Reveal>

        {/* Empty */}
        {filtered.length === 0 && (
          <div className="mt-10 flex flex-col items-center gap-3 rounded-3xl border border-border bg-card py-20 text-center">
            <p className="text-lg font-semibold text-foreground">No projects found</p>
            <button onClick={() => { setQ(""); setCat("All"); }} className="mt-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">Reset filters</button>
          </div>
        )}

        {filtered.length > 0 && (
          <div className="mt-8">
            {/* Featured */}
            {featured && <FeaturedCard project={featured} reduce={reduce} hasDetail={detailIds.includes(featured.id)} />}

            {/* Grid */}
            <motion.div layout className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence mode="popLayout">
                {rest.map((p, i) => (
                  <Card key={p.id} project={p} idx={i} reduce={reduce} hasDetail={detailIds.includes(p.id)} />
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}

function FeaturedCard({ project, reduce, hasDetail }) {
  return (
    <motion.article
      layout
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="neon-border group grid overflow-hidden rounded-3xl bg-card lg:grid-cols-[1.15fr_1fr]"
    >
      <div className="relative aspect-[16/10] overflow-hidden lg:aspect-auto lg:h-full">
        <Image src={project.image} alt={project.title} fill unoptimized sizes="(max-width:1024px) 100vw, 55vw" className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]" />
        <div className="absolute inset-0 bg-gradient-to-tr from-card via-card/20 to-transparent lg:bg-gradient-to-r" />
        <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-border/50 bg-background/80 px-3 py-1 text-xs font-bold uppercase tracking-wider text-foreground backdrop-blur-md">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />Featured
        </span>
      </div>

      <div className="flex flex-col justify-center gap-4 p-7 sm:p-9">
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-muted text-primary">{project.icon || <Layers className="h-4 w-4" />}</span>
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{project.category}</span>
        </div>
        <h3 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">{project.title}</h3>
        <p className="text-sm leading-relaxed text-muted-foreground">{project.description}</p>
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((t) => <span key={t} className="rounded-md border border-border bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">{t}</span>)}
        </div>
        <div className="mt-2 flex flex-wrap gap-3">
          {project.link && (
            <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)]">
              Visit live <ArrowUpRight className="h-4 w-4" />
            </a>
          )}
          {hasDetail && (
            <Link href={`/projects/${project.id}`} className="inline-flex items-center gap-2 rounded-xl border border-primary/20 bg-primary/5 px-4 py-2.5 text-sm font-semibold text-primary transition-all hover:border-primary hover:bg-primary hover:text-primary-foreground">
              Case study <ArrowUpRight className="h-4 w-4" />
            </Link>
          )}
        </div>
      </div>
    </motion.article>
  );
}

function Card({ project, idx, reduce, hasDetail }) {
  return (
    <motion.article
      layout
      initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.97, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.35, delay: Math.min(idx * 0.04, 0.25), ease: [0.22, 1, 0.36, 1] }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[var(--shadow-md)]"
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-muted">
        <Image src={project.image} alt={project.title} fill unoptimized sizes="(max-width:768px) 100vw, 33vw" className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.05]" />
        <div className="absolute inset-0 bg-gradient-to-t from-card/70 via-transparent to-transparent opacity-50" />
        {project.badge && (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-border/50 bg-background/80 px-2.5 py-1 text-[11px] font-semibold backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />{project.badge}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-start gap-2.5">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border bg-muted text-primary">{project.icon || <Layers className="h-4 w-4" />}</span>
          <div className="min-w-0">
            <h3 className="text-[15px] font-semibold leading-snug text-foreground group-hover:text-primary transition-colors">{project.title}</h3>
            {project.credentials && <div className="mt-0.5 flex items-center gap-1 font-mono text-[11px] text-muted-foreground"><Lock className="h-3 w-3" />{project.credentials}</div>}
          </div>
        </div>
        <p className="text-sm leading-relaxed text-muted-foreground line-clamp-3">{project.description}</p>
        <div className="mt-auto flex flex-wrap gap-1.5 border-t border-border/50 pt-3">
          {project.tags.slice(0, 4).map((t) => <span key={t} className="rounded-md border border-border/60 bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">{t}</span>)}
        </div>
        <div className="flex flex-col gap-2">
          {project.link ? (
            <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-flex w-full items-center justify-between rounded-xl border border-border bg-muted/30 px-4 py-2 text-xs font-semibold text-foreground transition-all hover:border-primary hover:bg-primary hover:text-primary-foreground">
              Visit live <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          ) : (
            <div className="inline-flex w-full items-center justify-between rounded-xl border border-border/40 bg-muted/20 px-4 py-2 text-xs text-muted-foreground">
              API backend <CheckCircle2 className="h-3.5 w-3.5 text-success" />
            </div>
          )}
          {hasDetail && (
            <Link href={`/projects/${project.id}`} className="inline-flex w-full items-center justify-between rounded-xl border border-primary/20 bg-primary/5 px-4 py-2 text-xs font-semibold text-primary transition-all hover:border-primary hover:bg-primary hover:text-primary-foreground">
              View case study <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          )}
        </div>
      </div>
    </motion.article>
  );
}
