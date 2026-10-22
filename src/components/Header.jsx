"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { useTheme } from "next-themes";
import { Menu, X, Sun, Moon, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { label: "About", id: "about" },
  { label: "Services", id: "services" },
  { label: "Work", id: "projects" },
  { label: "Experience", id: "experience" },
  { label: "Contact", id: "contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const { resolvedTheme, setTheme } = useTheme();
  const reduce = useReducedMotion();
  const pathname = usePathname();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

  // Highlight the nav link for the section currently in view.
  useEffect(() => {
    if (pathname !== "/") return;
    // "home" is observed too, so no link stays highlighted once you scroll back to the top.
    const sections = ["home", ...links.map((l) => l.id)]
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const toggleTheme = () => setTheme(resolvedTheme === "dark" ? "light" : "dark");

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled ? "py-2.5" : "py-4"
        )}
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-8">
          <nav
            aria-label="Main"
            className={cn(
              "flex items-center justify-between rounded-2xl border px-3 py-2.5 transition-all duration-500 sm:px-4",
              scrolled
                ? "glass border-border/70 shadow-[var(--shadow-md)]"
                : "border-transparent bg-transparent"
            )}
          >
            <Link href="/" className="group flex items-center gap-2.5" aria-label="Faizan Ullah — home">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent text-sm font-bold tracking-tight text-white shadow-[var(--shadow-sm)] transition-transform duration-300 group-hover:scale-105">
                FU
              </span>
              <span className="flex flex-col leading-none">
                <span className="text-sm font-bold tracking-tight text-foreground">Faizan Ullah</span>
                <span className="mt-1 text-[11px] font-medium text-muted-foreground">Full Stack Engineer</span>
              </span>
            </Link>

            <div className="hidden items-center md:flex">
              {links.map((link) => (
                <Link
                  key={link.id}
                  href={`/#${link.id}`}
                  data-active={active === link.id}
                  className={cn(
                    "nav-link rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    active === link.id ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={toggleTheme}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                aria-label="Toggle color theme"
              >
                <Sun className="hidden h-4 w-4 dark:block" />
                <Moon className="h-4 w-4 dark:hidden" />
              </button>

              <Link
                href="/#contact"
                className="hidden items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-sm)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)] sm:inline-flex"
              >
                Let&apos;s talk
                <ArrowUpRight className="h-4 w-4" />
              </Link>

              <button
                onClick={() => setOpen(!open)}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground md:hidden"
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
              >
                {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </button>
            </div>
          </nav>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.2 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl md:hidden"
          >
            <nav aria-label="Mobile" className="flex h-full flex-col items-center justify-center gap-1 px-6">
              {links.map((link, i) => (
                <motion.div
                  key={link.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: reduce ? 0 : i * 0.05, duration: 0.3 }}
                >
                  <Link
                    href={`/#${link.id}`}
                    onClick={() => setOpen(false)}
                    className="block px-6 py-3 text-2xl font-semibold tracking-tight text-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: reduce ? 0 : links.length * 0.05, duration: 0.3 }}
                className="mt-6"
              >
                <Link
                  href="/#contact"
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-base font-semibold text-primary-foreground"
                >
                  Let&apos;s talk <ArrowUpRight className="h-4 w-4" />
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
