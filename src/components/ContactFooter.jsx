"use client";

import { portfolioData } from "@/data/portfolio";
import { Mail, Phone, ArrowUpRight, ArrowRight, ArrowUp, Terminal } from "lucide-react";
import Reveal from "@/components/ui/Reveal";

const contactItems = [
  { icon: <Mail className="h-5 w-5" />, label: "Email", value: "faizanullah.dev5@gmail.com", href: "mailto:faizanullah.dev5@gmail.com" },
  { icon: <Phone className="h-5 w-5" />, label: "Phone", value: "+92 313 005 6857", href: "tel:+923130056857" },
];

export default function ContactFooter() {
  const { profile } = portfolioData;

  const footerLinks = [
    { name: "About", href: "/#about" },
    { name: "Skills", href: "/#skills" },
    { name: "Projects", href: "/#projects" },
    { name: "Architecture", href: "/#architecture" },
    { name: "Experience", href: "/#experience" },
  ];

  const socials = [
    { label: "GitHub", href: profile.contact.github },
    { label: "LinkedIn", href: profile.contact.linkedin },
    { label: "Email", href: `mailto:${profile.contact.email}` },
  ];

  return (
    <>
      {/* Contact CTA */}
      <section id="contact" className="relative scroll-mt-20 overflow-hidden px-5 py-24 sm:px-8 md:py-32">
        <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
          <div className="absolute bottom-0 left-1/2 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-primary/8 blur-[180px]" />
        </div>

        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <div className="flex items-center justify-center gap-3 text-primary">
              <span className="h-px w-8 bg-primary/50" />
              <span className="font-mono text-xs font-semibold uppercase tracking-[0.2em]">Contact</span>
              <span className="h-px w-8 bg-primary/50" />
            </div>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Have an idea <span className="text-gradient font-serif-accent">worth building?</span>
            </h2>
            <p className="mt-3 text-base text-muted-foreground">
              Open to freelance projects, full-time roles, and interesting backend challenges.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="mt-8">
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <a
                href={`mailto:${profile.contact.email}`}
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-sm)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)]"
              >
                Send me an email <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href={profile.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-7 py-3 text-sm font-semibold text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40"
              >
                Connect on LinkedIn <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.15} className="mt-10 grid gap-4 sm:grid-cols-2">
            {contactItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="neon-border group flex items-center gap-4 rounded-2xl bg-card p-5 text-left transition-all duration-300 hover:-translate-y-1"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-muted text-muted-foreground transition-colors group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
                  {item.icon}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-medium text-muted-foreground">{item.label}</div>
                  <div className="truncate text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{item.value}</div>
                </div>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
              </a>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border px-5 py-10 sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-8">
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
            <a href="/#home" className="group flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Terminal className="h-4 w-4" />
              </span>
              <div>
                <span className="text-sm font-bold text-foreground">faizan<span className="text-primary">.</span>dev</span>
                <p className="text-[11px] text-muted-foreground">Backend Engineer & API Architect</p>
              </div>
            </a>

            <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2" aria-label="Footer">
              {footerLinks.map((l) => (
                <a key={l.name} href={l.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">{l.name}</a>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              {socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline">{s.label}</a>
              ))}
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                aria-label="Back to top"
                className="ml-2 flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground transition-all hover:border-primary/40 hover:text-foreground"
              >
                <ArrowUp className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="flex flex-col items-center justify-between gap-2 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row">
            <p>&copy; {new Date().getFullYear()} Faizan Ullah. Crafted with care.</p>
            <p>
              Built with{" "}
              <a href="https://nextjs.org" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-foreground">Next.js</a>
              {" & "}
              <a href="https://tailwindcss.com" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-foreground">Tailwind CSS</a>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
