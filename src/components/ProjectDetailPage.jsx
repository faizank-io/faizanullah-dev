"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft, ArrowUpRight, ExternalLink, AlertTriangle,
  CheckCircle2, ChevronRight, Code2, Layers, Workflow, Zap, Copy, Check,
} from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { cn } from "@/lib/utils";
import Reveal from "@/components/ui/Reveal";

export default function ProjectDetailPage({ project, projectId }) {
  const reduce = useReducedMotion();
  const [featureIdx, setFeatureIdx] = useState(0);
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText(project.codeSnippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="min-h-screen pb-24 pt-24">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        {/* Back */}
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2 text-sm font-medium text-muted-foreground transition-all hover:border-primary/40 hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />Back to projects
        </Link>

        {/* Hero */}
        <Reveal className="mt-8">
          <span className="neon-border inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />{project.badge}
          </span>
          <h1 className="mt-4 text-3xl font-bold leading-tight tracking-[-0.03em] text-foreground sm:text-4xl md:text-5xl">
            {project.title}
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">{project.subtitle}</p>

          <div className="mt-5 flex flex-wrap gap-3">
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)]">
                <ExternalLink className="h-4 w-4" />Live Demo
              </a>
            )}
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground transition-all hover:border-primary/40">
                <FaGithub className="h-4 w-4" />Repository
              </a>
            )}
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {project.techStack.map((t) => (
              <span key={t} className="rounded-lg border border-border bg-muted px-3 py-1 text-xs font-semibold text-foreground">{t}</span>
            ))}
          </div>
        </Reveal>

        {/* Metrics */}
        <Reveal delay={0.08} className="mt-8">
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-4">
            {project.metrics.map((m) => (
              <div key={m.label} className="flex flex-col gap-1 bg-card px-5 py-5">
                <span className="text-xs font-medium text-muted-foreground">{m.label}</span>
                <div className="flex items-baseline gap-1">
                  <span className="font-mono text-2xl font-bold text-primary">{m.value}</span>
                  <span className="text-xs text-muted-foreground">{m.unit}</span>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.12} className="mt-8">
          <p className="text-base leading-relaxed text-muted-foreground">{project.overview}</p>
        </Reveal>
      </div>

      {/* Architecture */}
      <section className="mx-auto mt-16 max-w-5xl px-5 sm:px-8">
        <Reveal>
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-400"><Layers className="h-5 w-5" /></span>
            <h2 className="text-2xl font-bold text-foreground">Architecture & System Design</h2>
          </div>
        </Reveal>

        <Reveal delay={0.06} className="mt-5">
          <p className="text-base leading-relaxed text-muted-foreground">{project.architecture.description}</p>
        </Reveal>

        <Reveal delay={0.1} className="mt-5">
          <div className="neon-border rounded-2xl bg-card/50 p-5">
            <span className="mb-3 block text-xs font-bold uppercase tracking-widest text-primary">Request Flow</span>
            <div className="flex flex-wrap items-center gap-2">
              {project.architecture.flow.map((step, i) => (
                <div key={step} className="flex items-center gap-2">
                  <span className="rounded-lg border border-primary/20 bg-primary/5 px-3 py-1.5 font-mono text-xs font-semibold text-primary">{step}</span>
                  {i < project.architecture.flow.length - 1 && <ChevronRight className="h-4 w-4 text-muted-foreground/40" />}
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.14} className="mt-5">
          <ul className="space-y-2.5">
            {project.architecture.highlights.map((h, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />{h}
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      {/* Challenges */}
      <section className="mx-auto mt-16 max-w-5xl px-5 sm:px-8">
        <Reveal>
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-400/10 text-amber-400"><Zap className="h-5 w-5" /></span>
            <h2 className="text-2xl font-bold text-foreground">Engineering Challenges</h2>
          </div>
        </Reveal>

        <div className="mt-5 space-y-5">
          {project.challenges.map((c, i) => (
            <Reveal key={i} delay={i * 0.06}>
              <div className="neon-border rounded-2xl bg-card p-6">
                <h3 className="mb-4 text-lg font-bold text-foreground">{c.title}</h3>
                <div className="space-y-3">
                  <div className="rounded-xl border border-red-500/15 bg-red-500/5 p-4">
                    <div className="mb-1 flex items-center gap-2 text-xs font-bold text-red-400"><AlertTriangle className="h-3.5 w-3.5" />Problem</div>
                    <p className="text-sm leading-relaxed text-muted-foreground">{c.problem}</p>
                  </div>
                  <div className="rounded-xl border border-emerald-500/15 bg-emerald-500/5 p-4">
                    <div className="mb-1 flex items-center gap-2 text-xs font-bold text-emerald-400"><Workflow className="h-3.5 w-3.5" />Solution</div>
                    <p className="text-sm leading-relaxed text-muted-foreground">{c.solution}</p>
                  </div>
                  <div className="rounded-xl border border-primary/15 bg-primary/5 p-4">
                    <div className="mb-1 flex items-center gap-2 text-xs font-bold text-primary"><CheckCircle2 className="h-3.5 w-3.5" />Result</div>
                    <p className="text-sm leading-relaxed text-muted-foreground">{c.result}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto mt-16 max-w-5xl px-5 sm:px-8">
        <Reveal>
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-400/10 text-violet-400"><Workflow className="h-5 w-5" /></span>
            <h2 className="text-2xl font-bold text-foreground">Core Features</h2>
          </div>
        </Reveal>

        <Reveal delay={0.06} className="mt-5">
          <div className="flex flex-wrap gap-2 border-b border-border pb-4">
            {project.features.map((f, i) => (
              <button
                key={i}
                onClick={() => setFeatureIdx(i)}
                className={cn(
                  "rounded-xl border px-4 py-2 text-sm font-semibold transition-all",
                  featureIdx === i ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-muted-foreground hover:border-primary/40"
                )}
              >
                {f.title}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={featureIdx}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="mt-5 rounded-2xl border border-border bg-card p-6"
            >
              <h3 className="text-lg font-bold text-foreground">{project.features[featureIdx].title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{project.features[featureIdx].description}</p>
            </motion.div>
          </AnimatePresence>
        </Reveal>
      </section>

      {/* Code */}
      {project.codeSnippet && (
        <section className="mx-auto mt-16 max-w-5xl px-5 sm:px-8">
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-400"><Code2 className="h-5 w-5" /></span>
              <h2 className="text-2xl font-bold text-foreground">Clean Code</h2>
            </div>
          </Reveal>

          <Reveal delay={0.06} className="mt-5">
            <div className="neon-border overflow-hidden rounded-2xl bg-[#0a0a0a]">
              <div className="flex items-center justify-between border-b border-white/[0.06] bg-[#111111] px-4 py-2.5">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                    <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
                    <span className="h-3 w-3 rounded-full bg-[#28c840]" />
                  </div>
                  <span className="text-xs text-white/30">{project.codeSnippet.title}</span>
                </div>
                <button onClick={copyCode} className="flex items-center gap-1.5 rounded-lg border border-white/[0.06] bg-white/[0.03] px-2.5 py-1 text-[11px] text-white/40 transition-colors hover:text-white/70">
                  {copied ? <><Check className="h-3 w-3 text-emerald-400" />Copied</> : <><Copy className="h-3 w-3" />Copy</>}
                </button>
              </div>
              <div className="overflow-x-auto p-5">
                <pre className="font-mono text-[13px] leading-relaxed">
                  <code className="text-white/85">
                    {project.codeSnippet.code.split("\n").map((line, i) => (
                      <div key={i} className="flex">
                        <span className="mr-4 inline-block w-6 select-none text-right text-white/20">{i + 1}</span>
                        <span dangerouslySetInnerHTML={{ __html: highlightCode(line, project.codeSnippet.language) }} />
                      </div>
                    ))}
                  </code>
                </pre>
              </div>
            </div>
          </Reveal>
        </section>
      )}
    </main>
  );
}

function highlightCode(line, lang) {
  let s = line.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  if (lang === "javascript") {
    s = s
      .replace(/\b(const|let|var|function|return|if|else|new|async|await|class|extends|export|import|from|try|catch|throw)\b/g, '<span style="color:#c792ea">$1</span>')
      .replace(/\b(Router|Schema|Model|mongoose|express|app|req|res|next)\b/g, '<span style="color:#ffcb6b">$1</span>')
      .replace(/('(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*`)/g, '<span style="color:#c3e88d">$1</span>')
      .replace(/(\/\/.*$)/gm, '<span style="color:#546e7a">$1</span>');
  } else {
    s = s
      .replace(/\b(namespace|use|class|implements|public|protected|private|function|return|if|else|new|fn|void|string|array|int|bool|static|abstract|interface|extends|throw|try|catch|match|enum|readonly)\b/g, '<span style="color:#c792ea">$1</span>')
      .replace(/\b(Builder|Model|Scope|Collection|User|Http|Carbon|TimeSlot|Request|Response|Exception|Controller|Middleware|Event|Job|Mail|Notification)\b/g, '<span style="color:#ffcb6b">$1</span>')
      .replace(/(\$[a-zA-Z_]\w*)/g, '<span style="color:#82aaff">$1</span>')
      .replace(/('(?:[^'\\]|\\.)*')/g, '<span style="color:#c3e88d">$1</span>')
      .replace(/(\/\/.*$)/gm, '<span style="color:#546e7a">$1</span>')
      .replace(/(&lt;\?php)/g, '<span style="color:#89ddff">$1</span>')
      .replace(/(->)(\w+)(\()/g, '$1<span style="color:#82aaff">$2</span>$3');
  }

  return s;
}
