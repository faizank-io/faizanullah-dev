"use client";

import Link from "next/link";
import {
  AppWindow,
  Building2,
  Smartphone,
  CreditCard,
  LayoutTemplate,
  Gauge,
  ArrowRight,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

const services = [
  {
    icon: <AppWindow className="h-5 w-5" />,
    title: "Full Stack Web Applications",
    desc: "Complete web apps built end to end — React or Next.js on the front, Node.js or Laravel on the back, deployed and production-ready.",
    flow: ["React / Next.js", "Node.js / Laravel", "MySQL / PostgreSQL"],
    wide: true,
  },
  {
    icon: <Building2 className="h-5 w-5" />,
    title: "SaaS & Multi-Tenant Platforms",
    desc: "Subscriptions and billing, role-based access, tenant data isolation and admin dashboards.",
    tags: ["Subscriptions", "RBAC", "Multi-tenancy"],
  },
  {
    icon: <Smartphone className="h-5 w-5" />,
    title: "REST APIs & Mobile Backends",
    desc: "Secure APIs for web and iOS/Android apps — auth, push notifications and real-time updates.",
    tags: ["REST", "JWT / Sanctum", "WebSockets"],
  },
  {
    icon: <CreditCard className="h-5 w-5" />,
    title: "E-commerce & Payments",
    desc: "Stores, marketplaces and booking flows with Stripe, M-Pesa and QuickBooks wired in properly.",
    tags: ["Stripe", "M-Pesa", "Payouts"],
  },
  {
    icon: <LayoutTemplate className="h-5 w-5" />,
    title: "Modern Frontend Development",
    desc: "Responsive, accessible, SEO-friendly interfaces that load fast and feel smooth on every device.",
    tags: ["React.js", "Next.js", "Tailwind CSS"],
  },
  {
    icon: <Gauge className="h-5 w-5" />,
    title: "Performance & Database Tuning",
    desc: "Find and fix slow pages and queries with better indexes, caching, N+1 cleanup and background queues.",
    flow: ["Slow query", "Indexed", "Cached"],
    wide: true,
  },
];

// Feeds the cursor position to the .spotlight glow on whichever card is hovered.
function trackSpotlight(e) {
  const card = e.target.closest?.(".spotlight");
  if (!card) return;
  const r = card.getBoundingClientRect();
  card.style.setProperty("--x", `${e.clientX - r.left}px`);
  card.style.setProperty("--y", `${e.clientY - r.top}px`);
}

export default function Services() {
  return (
    <section id="services" className="relative scroll-mt-20 px-5 py-24 sm:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <Reveal>
            <SectionHeading
              eyebrow="Services"
              title={<>What I can build <span className="text-gradient font-serif-accent">for you.</span></>}
            />
          </Reveal>
          <Reveal delay={0.06}>
            <p className="max-w-md text-base leading-relaxed text-muted-foreground lg:ml-auto">
              Launching a new product or scaling an existing one, I can own the work from first sketch to production.
            </p>
          </Reveal>
        </div>

        <div onMouseMove={trackSpotlight} className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={0.04 + i * 0.05} className={cn(s.wide && "md:col-span-2")}>
              <article className="surface surface-hover spotlight group flex h-full flex-col overflow-hidden rounded-3xl p-7">
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-all duration-500 group-hover:rotate-[-6deg] group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground">
                    {s.icon}
                  </span>
                  <span className="font-mono text-xs font-semibold text-muted-foreground/60">0{i + 1}</span>
                </div>

                <h3 className={cn("mt-6 font-bold tracking-tight text-foreground", s.wide ? "text-xl sm:text-2xl" : "text-lg")}>{s.title}</h3>
                <p className="mt-2.5 max-w-xl text-sm leading-relaxed text-muted-foreground">{s.desc}</p>

                {s.flow ? (
                  <div className="mt-auto flex flex-wrap items-center gap-1.5 pt-6">
                    {s.flow.map((step, j) => (
                      <span key={step} className="inline-flex items-center gap-1.5">
                        <span className="rounded-xl border border-border bg-background px-3 py-2 text-xs font-semibold text-foreground">{step}</span>
                        {j < s.flow.length - 1 && <ChevronRight className="h-4 w-4 text-primary" />}
                      </span>
                    ))}
                  </div>
                ) : (
                  <div className="mt-auto flex flex-wrap gap-1.5 pt-6">
                    {s.tags.map((t) => (
                      <span key={t} className="rounded-full bg-muted px-2.5 py-1 text-[11px] font-medium text-muted-foreground">{t}</span>
                    ))}
                  </div>
                )}
              </article>
            </Reveal>
          ))}

          {/* Closing card */}
          <Reveal delay={0.32} className="md:col-span-2 lg:col-span-1">
            <Link
              href="/#contact"
              className="group relative flex h-full min-h-[240px] flex-col justify-between overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-accent p-7 text-white shadow-[var(--shadow-md)] transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-white/15 blur-2xl" aria-hidden="true" />
              <h3 className="relative text-2xl font-bold leading-tight tracking-tight">Have a project in mind?</h3>
              <span className="relative mt-8">
                <span className="block text-sm leading-relaxed text-white/85">
                  Tell me what you&apos;re building. I&apos;ll share honest feedback and a realistic plan.
                </span>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold">
                  Discuss your project
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </span>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
