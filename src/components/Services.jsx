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
} from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

const services = [
  {
    icon: <AppWindow className="h-5 w-5" />,
    title: "Full Stack Web Applications",
    desc: "Complete web apps built end to end — React or Next.js on the front, Node.js or Laravel on the back, deployed and production-ready.",
    tags: ["React.js", "Next.js", "Node.js", "Laravel"],
  },
  {
    icon: <Building2 className="h-5 w-5" />,
    title: "SaaS & Multi-Tenant Platforms",
    desc: "Subscription products with plans and billing, role-based access, tenant data isolation and admin dashboards.",
    tags: ["Subscriptions", "RBAC", "Multi-tenancy"],
  },
  {
    icon: <Smartphone className="h-5 w-5" />,
    title: "REST APIs & Mobile Backends",
    desc: "Secure, documented APIs for web and iOS/Android apps — authentication, push notifications and real-time updates.",
    tags: ["REST", "Sanctum / JWT", "WebSockets", "FCM"],
  },
  {
    icon: <CreditCard className="h-5 w-5" />,
    title: "E-commerce & Payments",
    desc: "Online stores, marketplaces and booking flows with Stripe, Stripe Connect, M-Pesa and QuickBooks wired in properly.",
    tags: ["Stripe", "M-Pesa", "Checkout", "Payouts"],
  },
  {
    icon: <LayoutTemplate className="h-5 w-5" />,
    title: "Modern Frontend Development",
    desc: "Responsive, accessible and SEO-friendly interfaces that load fast and feel smooth on every device.",
    tags: ["React.js", "Next.js", "Tailwind CSS"],
  },
  {
    icon: <Gauge className="h-5 w-5" />,
    title: "Performance & Database Tuning",
    desc: "Find and fix slow pages and queries — indexing, caching, N+1 cleanup and Redis queues for heavy workloads.",
    tags: ["MySQL", "PostgreSQL", "Redis", "Caching"],
  },
];

export default function Services() {
  return (
    <section id="services" className="relative scroll-mt-20 px-5 py-24 sm:px-8 md:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-full bg-gradient-to-b from-transparent via-primary/[0.03] to-transparent" aria-hidden="true" />

      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHeading
            eyebrow="Services"
            align="center"
            title={<>What I can build <span className="text-gradient font-serif-accent">for you.</span></>}
            description="Whether you're launching a new product or scaling an existing one, I can own the work from first sketch to production."
          />
        </Reveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={0.04 + i * 0.05}>
              <article className="surface surface-hover group relative flex h-full flex-col overflow-hidden rounded-2xl p-7">
                <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-primary/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" aria-hidden="true" />
                <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                  {s.icon}
                </span>
                <h3 className="mt-6 text-lg font-semibold tracking-tight text-foreground">{s.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                <div className="mt-auto flex flex-wrap gap-1.5 pt-6">
                  {s.tags.map((t) => (
                    <span key={t} className="rounded-md bg-muted px-2 py-1 text-[11px] font-medium text-muted-foreground">{t}</span>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1} className="mt-10">
          <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-r from-primary/10 via-card to-accent/10 p-8 sm:p-10">
            <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
              <div>
                <h3 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">Have a project in mind?</h3>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                  Tell me what you&apos;re building — I&apos;ll reply with honest feedback, a suggested approach and a realistic timeline.
                </p>
              </div>
              <Link
                href="/#contact"
                className="group inline-flex shrink-0 items-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-[0_8px_30px_-8px_var(--primary)] transition-all duration-300 hover:-translate-y-0.5"
              >
                Discuss your project
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
