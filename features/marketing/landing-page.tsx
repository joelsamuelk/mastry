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
  CheckCircle2,
} from "lucide-react";
import { buttonStyles } from "@/components/ui/button";

/* ─── scroll-reveal observer ─── */
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

/* ─── data ─── */
const features = [
  {
    icon: Fingerprint,
    title: "Career Passport",
    description:
      "A structured, AI-powered representation of your entire career. Not just a CV — a living document that grows with you.",
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
      "Cover letters, CV optimisation, and recruiter outreach — generated from your evidence, not hallucinations.",
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
  { title: "Fewer, better applications", desc: "Quality over quantity, every time." },
  { title: "Evidence, not hallucination", desc: "Every claim grounded in your real experience." },
  { title: "You stay in control", desc: "Mastry prepares. You decide." },
  { title: "Radical honesty", desc: "We'll tell you when not to apply." },
];

/* ─── component ─── */
export function LandingPage() {
  const root = useReveal();

  return (
    <div ref={root}>
      {/* ── Credibility banner ── */}
      <div className="reveal mx-auto flex max-w-5xl items-center justify-center px-6 pt-28">
        <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-medium text-[var(--ink-muted)] shadow-[0_4px_20px_rgba(45,51,56,0.06)]">
          <span className="flex h-2 w-2 rounded-full bg-emerald-400" />
          Now in early access — building the future of career mastery
        </div>
      </div>

      {/* ── Hero ── */}
      <section className="mx-auto max-w-4xl px-6 pt-12 pb-10 text-center">
        <h1 className="reveal font-display text-5xl font-extrabold tracking-tight text-[var(--ink)] sm:text-6xl lg:text-[4.25rem] lg:leading-[1.08] text-balance">
          Upload your CV once.
          <br />
          <span className="text-[var(--accent)]">We handle the rest.</span>
        </h1>
        <p className="reveal mx-auto mt-6 max-w-xl text-lg leading-relaxed text-[var(--ink-muted)] text-balance">
          Mastry turns your career history into a structured passport, finds
          roles worth your time, scores every match, and prepares world-class
          applications — so you never start from scratch again.
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
          No credit card. Upload your CV and see results in 2 minutes.
        </p>
      </section>

      {/* ── Product preview ── */}
      <section className="reveal mx-auto max-w-4xl px-6 pb-20">
        <div className="relative overflow-hidden rounded-[2rem] bg-white p-1 shadow-[0_24px_60px_rgba(45,51,56,0.08)]">
          <div className="rounded-[1.75rem] bg-gradient-to-br from-[rgba(78,69,228,0.04)] to-[rgba(78,69,228,0.01)] p-8 sm:p-12">
            <div className="grid gap-6 sm:grid-cols-3">
              {[
                { label: "Career Passport", value: "92%", sub: "completeness" },
                { label: "Opportunities Found", value: "14", sub: "this week" },
                { label: "Average Match", value: "87%", sub: "across all roles" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-xs font-medium uppercase tracking-wider text-[var(--accent)]">
                    {stat.label}
                  </p>
                  <p className="mt-2 font-display text-4xl font-extrabold text-[var(--ink)]">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs text-[var(--muted)]">{stat.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section id="how" className="mx-auto max-w-5xl px-6 py-20">
        <p className="reveal eyebrow mb-3 text-center">How it works</p>
        <h2 className="reveal font-display text-3xl font-bold tracking-tight text-[var(--ink)] text-center sm:text-4xl text-balance">
          Three steps. Then Mastry works for you.
        </h2>

        <div className="reveal mx-auto mt-12 grid max-w-3xl gap-px overflow-hidden rounded-[2rem] bg-[var(--surface-high)] sm:grid-cols-3">
          {[
            { step: "01", title: "Upload your CV", desc: "We extract and structure your entire career into a Career Passport." },
            { step: "02", title: "Set your goals", desc: "Role level, location, remote preference, industries, salary — your call." },
            { step: "03", title: "Let Mastry work", desc: "Curated opportunities, match scores, cover letters, and interview prep — every day." },
          ].map((item) => (
            <div key={item.step} className="bg-white p-8 text-center">
              <span className="font-display text-sm font-bold text-[var(--accent)]">
                {item.step}
              </span>
              <h3 className="mt-3 font-display text-base font-bold text-[var(--ink)]">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-[var(--ink-muted)]">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ── */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <p className="reveal eyebrow mb-3 text-center">Features</p>
        <h2 className="reveal font-display text-3xl font-bold tracking-tight text-[var(--ink)] text-center sm:text-4xl text-balance">
          Everything you need to master your career
        </h2>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              className="reveal group rounded-[2rem] bg-white p-8 shadow-[0_12px_40px_rgba(45,51,56,0.04)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(78,69,228,0.1)]"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-[rgba(78,69,228,0.08)] transition duration-300 group-hover:bg-[rgba(78,69,228,0.14)]">
                <feature.icon className="h-5 w-5 text-[var(--accent)]" />
              </div>
              <h3 className="font-display text-base font-bold text-[var(--ink)]">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--ink-muted)]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Principles ── */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <p className="reveal eyebrow mb-3 text-center">Our principles</p>
        <h2 className="reveal font-display text-3xl font-bold tracking-tight text-[var(--ink)] text-center sm:text-4xl text-balance">
          Built on trust, not tricks
        </h2>

        <div className="reveal mx-auto mt-12 grid max-w-2xl gap-4 sm:grid-cols-2">
          {principles.map((p) => (
            <div
              key={p.title}
              className="flex items-start gap-3 rounded-2xl bg-white p-5 shadow-[0_12px_40px_rgba(45,51,56,0.04)]"
            >
              <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-[var(--success)]" />
              <div>
                <p className="text-sm font-semibold text-[var(--ink)]">{p.title}</p>
                <p className="mt-0.5 text-xs text-[var(--ink-muted)]">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="reveal mx-auto max-w-5xl px-6 py-20">
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#4e45e4] to-[#3a2fd0] px-8 py-16 text-center sm:px-16">
          {/* decorative glow */}
          <div className="pointer-events-none absolute -top-20 -right-20 h-60 w-60 rounded-full bg-white/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-white/5 blur-3xl" />

          <h2 className="relative font-display text-3xl font-bold text-white sm:text-4xl text-balance">
            Ready to stop applying blindly?
          </h2>
          <p className="relative mt-4 text-base text-white/70 text-balance">
            Upload your CV. See your Career Passport in 2 minutes.
            <br className="hidden sm:block" />
            Then let Mastry find what you&apos;ve been missing.
          </p>
          <Link
            href="/signup"
            className="relative mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-[var(--accent)] shadow-[0_18px_34px_rgba(0,0,0,0.2)] transition duration-200 hover:-translate-y-0.5"
          >
            Get started for free
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
