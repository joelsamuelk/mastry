"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Fingerprint,
  Search,
  BarChart3,
  FileText,
  Shield,
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  Check,
} from "lucide-react";
import { buttonStyles } from "@/components/ui/button";

/* --- scroll-reveal observer --- */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const targets = el.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );

    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, []);

  return ref;
}

/* --- data --- */
const features = [
  {
    icon: Fingerprint,
    title: "Career Passport",
    description:
      "A structured, AI-powered representation of your entire career. Not just a CV. A living document that grows with you.",
  },
  {
    icon: Search,
    title: "Opportunity Scout",
    description:
      "Surfaces only the opportunities that genuinely match your career, goals, and ambitions.",
  },
  {
    icon: BarChart3,
    title: "Smart Matching",
    description:
      "Every opportunity scored on leadership fit, domain, technical depth, compensation, visa, and growth potential.",
  },
  {
    icon: FileText,
    title: "Application Workspace",
    description:
      "Cover letters, CV optimisation, and recruiter outreach. Generated from your evidence, not hallucinations.",
  },
  {
    icon: Shield,
    title: "Visa Intelligence",
    description:
      "Understands sponsorship requirements and company licences. Never claims sponsorship unless evidence exists.",
  },
  {
    icon: Sparkles,
    title: "Interview Coach",
    description:
      "Likely questions, STAR examples from your career, company research, and questions to ask. Tailored to every role.",
  },
];

const principles = [
  "Fewer, better applications. Quality over quantity.",
  "Evidence, not hallucination. Every claim grounded in your real experience.",
  "You stay in control. Mastry prepares. You decide.",
  "Radical honesty. We tell you when not to apply.",
];

/* --- component --- */
export function LandingPage() {
  const root = useReveal();

  return (
    <div ref={root}>
      {/* SECTION 1: Hero (light) */}
      <section className="bg-white">
        <div className="mx-auto max-w-4xl px-6 pt-32 pb-20 text-center">
          <div className="reveal mb-8 inline-flex items-center gap-2 rounded-full border border-[var(--surface-high)] px-4 py-2 text-xs font-medium text-[var(--ink-muted)]">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400" />
            Now in early access
          </div>

          <h1 className="reveal font-display text-5xl font-extrabold tracking-tight text-[var(--ink)] sm:text-6xl lg:text-[4.25rem] lg:leading-[1.08] text-balance">
            Upload your CV once.
            <br />
            We handle the rest.
          </h1>
          <p className="reveal mx-auto mt-6 max-w-xl text-lg leading-relaxed text-[var(--ink-muted)] text-balance">
            Mastry turns your career history into a structured passport, finds
            roles worth your time, scores every match, and prepares world-class
            applications. You never start from scratch again.
          </p>
          <div className="reveal mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/signup"
              className={buttonStyles({ variant: "primary", size: "lg" })}
            >
              Start for free
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="#how"
              className={buttonStyles({ variant: "ghost", size: "lg" })}
            >
              See how it works
            </Link>
          </div>
          <p className="reveal mt-5 text-xs text-[var(--muted)]">
            No credit card. See results in 2 minutes.
          </p>
        </div>
      </section>

      {/* SECTION 2: How it works (dark) */}
      <section id="how" className="bg-[#0a0a0a] text-white">
        <div className="mx-auto max-w-5xl px-6 py-24">
          <p className="reveal mb-3 text-center text-[0.72rem] font-bold uppercase tracking-[0.24em] text-white/40">
            How it works
          </p>
          <h2 className="reveal font-display text-3xl font-bold tracking-tight text-white text-center sm:text-4xl text-balance">
            Three steps. Then Mastry works for you.
          </h2>

          <div className="reveal mx-auto mt-16 grid max-w-3xl gap-12 sm:grid-cols-3 sm:gap-8">
            {[
              { step: "01", title: "Upload your CV", desc: "We extract and structure your entire career into a Career Passport." },
              { step: "02", title: "Set your goals", desc: "Role level, location, remote preference, industries, salary. Your call." },
              { step: "03", title: "Let Mastry work", desc: "Curated opportunities, match scores, cover letters, and interview prep. Every day." },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <span className="font-display text-4xl font-extrabold text-white/10">
                  {item.step}
                </span>
                <h3 className="mt-4 font-display text-lg font-bold text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/50">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="reveal mt-16 text-center">
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-[#0a0a0a] transition duration-200 hover:-translate-y-0.5"
            >
              Get started
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 3: Product stats (light) */}
      <section className="bg-white">
        <div className="mx-auto max-w-4xl px-6 py-24">
          <div className="reveal grid gap-8 sm:grid-cols-3">
            {[
              { value: "92%", label: "Career Passport", sub: "completeness" },
              { value: "14", label: "Opportunities Found", sub: "this week" },
              { value: "87%", label: "Average Match", sub: "across all roles" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-display text-5xl font-extrabold text-[var(--ink)]">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm font-semibold text-[var(--ink)]">
                  {stat.label}
                </p>
                <p className="mt-0.5 text-xs text-[var(--muted)]">{stat.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: Features (dark) */}
      <section className="bg-[#0a0a0a] text-white">
        <div className="mx-auto max-w-5xl px-6 py-24">
          <p className="reveal mb-3 text-center text-[0.72rem] font-bold uppercase tracking-[0.24em] text-white/40">
            Features
          </p>
          <h2 className="reveal font-display text-3xl font-bold tracking-tight text-white text-center sm:text-4xl text-balance">
            Everything you need to master your career
          </h2>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, i) => (
              <div
                key={feature.title}
                className="reveal group rounded-[2rem] border border-white/[0.06] bg-white/[0.03] p-8 transition duration-300 hover:-translate-y-1 hover:bg-white/[0.06]"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-white/[0.06]">
                  <feature.icon className="h-5 w-5 text-white/70" />
                </div>
                <h3 className="font-display text-base font-bold text-white">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/50">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: Principles (light) */}
      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-6 py-24">
          <p className="reveal mb-3 text-center text-[0.72rem] font-bold uppercase tracking-[0.24em] text-[var(--muted)]">
            Our principles
          </p>
          <h2 className="reveal font-display text-3xl font-bold tracking-tight text-[var(--ink)] text-center sm:text-4xl text-balance">
            Built on trust, not tricks
          </h2>

          <div className="reveal mx-auto mt-12 max-w-xl space-y-4">
            {principles.map((p) => (
              <div
                key={p}
                className="flex items-start gap-3 rounded-2xl border border-[var(--surface-high)] p-5"
              >
                <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-500" />
                <p className="text-sm text-[var(--ink)]">{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: Final CTA (dark) */}
      <section className="bg-[#0a0a0a]">
        <div className="mx-auto max-w-4xl px-6 py-24 text-center">
          <h2 className="reveal font-display text-3xl font-bold text-white sm:text-4xl text-balance">
            Ready to stop applying blindly?
          </h2>
          <p className="reveal mt-4 text-base text-white/50 text-balance">
            Upload your CV. See your Career Passport in 2 minutes.
            <br className="hidden sm:block" />
            Then let Mastry find what you&apos;ve been missing.
          </p>
          <div className="reveal mt-10">
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-semibold text-[#0a0a0a] transition duration-200 hover:-translate-y-0.5"
            >
              Get started for free
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
          <p className="reveal mt-6 text-xs text-white/30">
            No credit card required
          </p>
        </div>
      </section>
    </div>
  );
}
