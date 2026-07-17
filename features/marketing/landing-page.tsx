import Link from "next/link";
import {
  Fingerprint,
  Search,
  BarChart3,
  FileText,
  Shield,
  Sparkles,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { buttonStyles } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";

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
      "Continuously searches thousands of companies and surfaces only the opportunities that genuinely match your career.",
  },
  {
    icon: BarChart3,
    title: "Smart Matching",
    description:
      "Every opportunity scored on leadership fit, domain, technical depth, compensation, visa, and career growth potential.",
  },
  {
    icon: FileText,
    title: "Application Workspace",
    description:
      "Cover letters, CV optimisation, application answers, and recruiter outreach — all generated from your evidence, not hallucinations.",
  },
  {
    icon: Shield,
    title: "Visa Intelligence",
    description:
      "Understands sponsorship requirements, company licences, and historical data. Never claims sponsorship unless evidence exists.",
  },
  {
    icon: Sparkles,
    title: "Interview Coach",
    description:
      "Prepares likely questions, STAR examples from your career, company research, and questions to ask — tailored to every role.",
  },
];

const principles = [
  "Quality over quantity — fewer, better applications",
  "Evidence over hallucination — never invents achievements",
  "You stay in control — Mastry prepares, you decide",
  "Honest recommendations — tells you when not to apply",
];

export function LandingPage() {
  return (
    <>
      {/* Hero */}
      <section className="mx-auto max-w-5xl px-6 pt-32 pb-20 text-center">
        <p className="eyebrow mb-6">AI Career Mastery Platform</p>
        <h1 className="font-display text-5xl font-extrabold tracking-tight text-[var(--ink)] sm:text-6xl lg:text-7xl text-balance">
          Master Your Career.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-[var(--ink-muted)] text-balance">
          Mastry continuously searches thousands of companies, finds the
          opportunities that genuinely match your career, and prepares
          world-class applications before anyone else.
        </p>
        <div className="mt-10 flex items-center justify-center gap-4">
          <Link
            href="/signup"
            className={buttonStyles({ variant: "primary", size: "lg" })}
          >
            Build My Career Passport
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <SectionHeading
          eyebrow="How it works"
          title="Upload once. Never start from scratch again."
          description="Mastry continuously works for you — discovering, ranking, and preparing everything you need."
          align="center"
        />

        <div className="mx-auto mt-4 grid max-w-3xl gap-6 sm:grid-cols-3">
          {[
            { step: "1", title: "Upload your CV", desc: "We extract and structure your entire career into a Career Passport." },
            { step: "2", title: "Set your goals", desc: "Tell us what you want — role level, location, remote, industries, salary." },
            { step: "3", title: "Mastry works for you", desc: "Every morning, curated opportunities with everything you need to apply." },
          ].map((item) => (
            <div key={item.step} className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[rgba(78,69,228,0.08)]">
                <span className="font-display text-lg font-bold text-[var(--accent)]">
                  {item.step}
                </span>
              </div>
              <h3 className="font-display text-base font-bold text-[var(--ink)]">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-[var(--ink-muted)]">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <SectionHeading
          eyebrow="Features"
          title="Everything you need to master your career"
          align="center"
        />

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-[2rem] bg-white p-8 shadow-[0_12px_40px_rgba(45,51,56,0.04)] transition duration-200 hover:-translate-y-0.5"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[rgba(78,69,228,0.08)]">
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

      {/* Principles */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <SectionHeading
          eyebrow="Our principles"
          title="Built on trust, not tricks"
          align="center"
        />

        <div className="mx-auto max-w-xl space-y-4">
          {principles.map((principle) => (
            <div
              key={principle}
              className="flex items-start gap-3 rounded-2xl bg-white p-5 shadow-[0_12px_40px_rgba(45,51,56,0.04)]"
            >
              <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-[var(--success)]" />
              <p className="text-sm font-medium text-[var(--ink)]">{principle}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <div className="surface-panel mx-auto max-w-2xl p-12 text-center">
          <h2 className="font-display text-3xl font-bold text-[var(--ink)]">
            Ready to master your career?
          </h2>
          <p className="mt-3 text-[var(--ink-muted)]">
            Upload your CV and let Mastry start working for you today.
          </p>
          <Link
            href="/signup"
            className={buttonStyles({
              variant: "primary",
              size: "lg",
              className: "mt-8",
            })}
          >
            Get started for free
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
