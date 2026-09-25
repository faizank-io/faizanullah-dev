"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Terminal, ChevronRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";

const commands = {
  help: {
    lines: [
      "Available commands:",
      "",
      "  system.health()         — System diagnostics",
      "  deploy --production     — Deployment pipeline",
      "  db.optimize()           — Database optimization",
      "  api.metrics()           — API performance",
      "  architect.stack()       — Current stack",
      "  whoami                  — About me",
      "  clear                   — Clear terminal",
    ],
    color: "text-muted-foreground",
  },
  "system.health()": {
    lines: [
      "Running diagnostics...",
      "",
      "  [✓] Laravel Backend       — v11.x (PHP 8.2)",
      "  [✓] WebSocket Server     — Pusher (< 50ms)",
      "  [✓] MySQL Primary        — 99.98% uptime",
      "  [✓] Redis Cache          — 2.1ms avg",
      "  [✓] CI/CD Pipeline       — GitHub Actions",
      "  [✓] Tenant Isolation     — 5 tenants active",
      "",
      "  All systems operational.",
    ],
    color: "text-emerald-400",
  },
  "deploy --production": {
    lines: [
      "Deploying to production...",
      "",
      "  [1/6] Pre-deploy checks...        OK",
      "  [2/6] Asset build...              OK",
      "  [3/6] PHPUnit (312 tests)...      OK",
      "  [4/6] Cache clearing...           OK",
      "  [5/6] Database migrations...      OK",
      "  [6/6] Broadcast deploy event...   OK",
      "",
      "  Deployed in 42s. Zero downtime.",
    ],
    color: "text-cyan-400",
  },
  "db.optimize()": {
    lines: [
      "Optimization Report:",
      "",
      "  Slow queries:      3 → 0",
      "  Index coverage:    94.2%",
      "  Avg query time:    12ms → 2.4ms (-80%)",
      "  N+1 eliminated:   47 instances",
      "  Cache hit ratio:   96.8%",
      "",
      "  Performance improved 5x.",
    ],
    color: "text-amber-400",
  },
  "api.metrics()": {
    lines: [
      "API Dashboard:",
      "",
      "  Endpoints:        89",
      "  Avg response:     45ms",
      "  P99 latency:      120ms",
      "  Daily requests:   ~50,000",
      "  Error rate:       0.02%",
      "  Auth:             Sanctum + JWT",
      "",
      "  All within SLA.",
    ],
    color: "text-violet-400",
  },
  "architect.stack()": {
    lines: [
      "Stack:",
      "",
      "  Backend:    Laravel 11, Node.js, Flask",
      "  Database:   MySQL 8, PostgreSQL, Redis",
      "  Real-time:  Pusher, Laravel Echo",
      "  Auth:       Sanctum, JWT, OAuth2",
      "  DevOps:     GitHub Actions, Docker",
      "  Payments:   Stripe Connect, M-Pesa",
    ],
    color: "text-primary",
  },
  whoami: {
    lines: [
      "",
      "  Faizan Ullah",
      "  Senior Backend Engineer & API Architect",
      "  Laravel · PHP 8.1+ · WebSockets · MySQL",
      "  3.5+ years · 26 projects · Karachi, PK",
      "",
      "  // Systems that never break.",
    ],
    color: "text-foreground",
  },
};

const autoSeq = [
  { cmd: "system.health()", wait: 900 },
  { cmd: "api.metrics()", wait: 4200 },
  { cmd: "deploy --production", wait: 8000 },
];

export default function InteractiveTerminal() {
  const reduce = useReducedMotion();
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [auto, setAuto] = useState(true);
  const bodyRef = useRef(null);
  const inputRef = useRef(null);

  const scroll = useCallback(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight, behavior: "smooth" });
  }, []);

  const typeCmd = useCallback((cmd, resp) => {
    return new Promise((resolve) => {
      setTyping(true);
      let buf = "";
      let i = 0;
      const iv = setInterval(() => {
        buf += cmd[i];
        setInput(buf);
        i++;
        if (i >= cmd.length) {
          clearInterval(iv);
          setTimeout(() => {
            setInput("");
            setHistory((h) => [...h, { t: "cmd", text: cmd }, { t: "out", lines: resp.lines, color: resp.color }]);
            setTyping(false);
            resolve();
          }, 250);
        }
      }, 35);
    });
  }, []);

  useEffect(() => {
    if (!auto) return;
    let stop = false;
    (async () => {
      for (const s of autoSeq) {
        if (stop) return;
        await new Promise((r) => setTimeout(r, s.wait));
        if (stop) return;
        const resp = commands[s.cmd];
        if (resp) await typeCmd(s.cmd, resp);
      }
      if (!stop) setAuto(false);
    })();
    return () => { stop = true; };
  }, [auto, typeCmd]);

  useEffect(scroll, [history, scroll]);

  const submit = (e) => {
    e.preventDefault();
    if (!input.trim() || typing) return;
    const cmd = input.trim();
    setInput("");
    if (cmd === "clear") { setHistory([]); return; }
    const resp = commands[cmd] || {
      lines: [`Command not found: ${cmd}`, 'Type "help" for commands.'],
      color: "text-error",
    };
    setHistory((h) => [...h, { t: "cmd", text: cmd }, { t: "out", lines: resp.lines, color: resp.color }]);
  };

  const quickRun = (cmd) => {
    if (typing) return;
    setAuto(false);
    if (cmd === "clear") { setHistory([]); return; }
    const resp = commands[cmd];
    if (resp) setHistory((h) => [...h, { t: "cmd", text: cmd }, { t: "out", lines: resp.lines, color: resp.color }]);
  };

  return (
    <section id="terminal" className="relative scroll-mt-20 px-5 py-24 sm:px-8 md:py-32">
      <div className="pointer-events-none absolute left-0 top-1/4 -z-10 h-96 w-96 rounded-full bg-primary/5 blur-[150px]" />

      <div className="mx-auto max-w-4xl">
        <Reveal>
          <div className="flex items-center gap-3 text-primary">
            <span className="h-px w-8 bg-primary/50" />
            <span className="font-mono text-xs font-semibold uppercase tracking-[0.2em]">Dev Mode</span>
          </div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Step inside my <span className="text-gradient font-serif-accent">workspace.</span>
          </h2>
          <p className="mt-3 text-base text-muted-foreground">
            Explore system diagnostics, deployment pipelines, and API metrics.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-10">
          <div className="neon-border overflow-hidden rounded-2xl bg-[#0a0a0a]">
            {/* Title bar */}
            <div className="flex items-center justify-between border-b border-white/[0.06] bg-[#111111] px-4 py-2.5">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                  <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
                  <span className="h-3 w-3 rounded-full bg-[#28c840]" />
                </div>
                <span className="flex items-center gap-1.5 text-xs text-white/30">
                  <Terminal className="h-3.5 w-3.5" />
                  faizan@dev ~/production
                </span>
              </div>
            </div>

            {/* Body */}
            <div
              ref={bodyRef}
              className="h-[360px] overflow-y-auto p-4 font-mono text-[13px] leading-relaxed sm:p-5"
              onClick={() => inputRef.current?.focus()}
            >
              <div className="mb-3 text-white/20">
                <div>Engineering Terminal v2.0</div>
                <div>Type &quot;help&quot; for commands.</div>
                <div className="mt-1">{"─".repeat(36)}</div>
              </div>

              {history.map((entry, i) => (
                <div key={i} className="mb-1">
                  {entry.t === "cmd" ? (
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-400">$</span>
                      <span className="text-white/90">{entry.text}</span>
                    </div>
                  ) : (
                    <div className={`whitespace-pre-wrap ${entry.color}`}>
                      {entry.lines.map((line, j) => <div key={j}>{line}</div>)}
                    </div>
                  )}
                </div>
              ))}

              <form onSubmit={submit} className="flex items-center gap-2">
                <span className="text-emerald-400">$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => { setInput(e.target.value); if (auto) setAuto(false); }}
                  disabled={typing}
                  className="flex-1 bg-transparent text-white/90 caret-primary outline-none placeholder:text-white/15"
                  placeholder={typing ? "" : "Type a command..."}
                  autoComplete="off"
                  spellCheck={false}
                />
                {!typing && <span className="terminal-cursor text-primary">|</span>}
              </form>
            </div>
          </div>
        </Reveal>

        {/* Quick commands */}
        <Reveal delay={0.15} className="mt-4">
          <div className="flex flex-wrap justify-center gap-2">
            {Object.keys(commands).filter((c) => c !== "help").map((cmd) => (
              <button
                key={cmd}
                onClick={() => quickRun(cmd)}
                className="group inline-flex items-center gap-1 rounded-lg border border-border/60 bg-card px-3 py-1.5 font-mono text-[11px] text-muted-foreground transition-all hover:border-primary/40 hover:text-primary"
              >
                <ChevronRight className="h-3 w-3 text-primary opacity-0 transition-opacity group-hover:opacity-100" />
                {cmd}
              </button>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
