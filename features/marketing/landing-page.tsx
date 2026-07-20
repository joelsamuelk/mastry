"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
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
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" },
    );

    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, []);

  return ref;
}

/* --- data --- */
const features = [
  {
    num: "01",
    title: "Career Passport",
    desc: "AI-built career identity from your CV. Structured, verified, always evolving.",
  },
  {
    num: "02",
    title: "Job Discovery",
    desc: "Searches LinkedIn, Indeed, Glassdoor, Google Jobs, AngelList and RemoteOK in one pass.",
  },
  {
    num: "03",
    title: "Opportunity Scout",
    desc: "Your pipeline scored across seven dimensions. Drag between stages as you progress.",
  },
  {
    num: "04",
    title: "Application Workspace",
    desc: "Tailored cover letters, recruiter outreach and follow-ups from your real experience.",
  },
  {
    num: "05",
    title: "Interview Scheduler",
    desc: "Every round, interviewer and join link in one place.",
  },
  {
    num: "06",
    title: "Interview Coach",
    desc: "Prep packs with STAR examples drawn from your actual career history.",
  },
  {
    num: "07",
    title: "Mock Interview",
    desc: "Real-time AI interviews with per-question scored feedback.",
  },
  {
    num: "08",
    title: "Visa Intelligence",
    desc: "Work-permit eligibility analysis for any target country and role.",
  },
  {
    num: "09",
    title: "Smart Matching",
    desc: "Leadership, domain, technical, compensation and visa fit scored 0\u2013100.",
  },
];

const matchDims = [
  { label: "Leadership fit", score: 95 },
  { label: "Domain fit", score: 98 },
  { label: "Technical fit", score: 88 },
  { label: "Seniority fit", score: 90 },
  { label: "Compensation fit", score: 86 },
];

const testimonials = [
  {
    name: "Priya Anand",
    role: "Senior PM, now at Adyen",
    image: "/images/testimonial-1.jpg",
    quote:
      "Mastry wrote a cover letter that sounded like me on my best day. Two weeks later I had the offer I actually wanted.",
  },
  {
    name: "Marco Rossi",
    role: "Staff Engineer, now at Wise",
    image: "/images/testimonial-2.jpg",
    quote:
      "The mock interviews were brutal in the best way. By the real thing, nothing surprised me \u2014 and the feedback was specific enough to act on.",
  },
  {
    name: "Lena Fischer",
    role: "Design Lead, now at N26",
    image: "/images/testimonial-3.jpg",
    quote:
      "It found roles I would never have searched for, and told me exactly why each one fit. It felt less like a job board and more like a coach.",
  },
];

const platforms = [
  "LinkedIn",
  "Indeed",
  "Glassdoor",
  "Google\u00a0Jobs",
  "AngelList",
  "RemoteOK",
];

/* --- component --- */
export function LandingPage() {
  const root = useReveal();

  return (
    <div ref={root}>
      {/* ━━ HERO ━━ */}
      <section className="relative min-h-screen overflow-hidden bg-[var(--dark)]">
        {/* G-Research inspired background */}
        <div className="absolute inset-0">
          {/* Dark base */}
          <div className="absolute inset-0 bg-[var(--dark)]" />
          {/* Diagonal blue gradient slice on the right */}
          <div
            className="absolute inset-0"
            style={{
              clipPath: "polygon(52% 0, 100% 0, 100% 100%, 32% 100%)",
              background: "linear-gradient(155deg, #0d1f3c 0%, #142d54 20%, #1a3a6b 45%, #1e4578 60%, #183560 80%, #0f2340 100%)",
            }}
          />
          {/* Layered radial glows for depth */}
          <div
            className="absolute inset-0"
            style={{
              clipPath: "polygon(52% 0, 100% 0, 100% 100%, 32% 100%)",
              background: "radial-gradient(ellipse at 75% 20%, rgba(100,150,220,0.25) 0%, transparent 50%), radial-gradient(ellipse at 60% 70%, rgba(74,111,165,0.2) 0%, transparent 45%), radial-gradient(ellipse at 90% 50%, rgba(130,170,230,0.15) 0%, transparent 40%)",
            }}
          />
          {/* Fine geometric grid within the slice */}
          <svg className="absolute inset-0 h-full w-full" style={{ clipPath: "polygon(52% 0, 100% 0, 100% 100%, 32% 100%)" }} xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="hero-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hero-grid)" />
          </svg>
          {/* Diagonal accent lines */}
          <div
            className="absolute inset-0"
            style={{
              background: `
                linear-gradient(135deg, transparent 44.5%, rgba(100,150,220,0.12) 44.7%, rgba(100,150,220,0.12) 44.85%, transparent 45.05%),
                linear-gradient(135deg, transparent 47%, rgba(255,255,255,0.04) 47.1%, rgba(255,255,255,0.04) 47.2%, transparent 47.3%),
                linear-gradient(135deg, transparent 42%, rgba(255,255,255,0.03) 42.1%, rgba(255,255,255,0.03) 42.2%, transparent 42.3%)
              `,
            }}
          />
          {/* Animated network / constellation illustration */}
          <svg
            className="absolute inset-0 h-full w-full"
            style={{ clipPath: "polygon(52% 0, 100% 0, 100% 100%, 32% 100%)" }}
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Connection lines - thick and bright */}
            <g strokeWidth="1.5" strokeLinecap="round">
              <line x1="60%" y1="12%" x2="75%" y2="28%" stroke="rgba(150,195,255,0.35)">
                <animate attributeName="opacity" values="0.2;0.5;0.2" dur="4s" repeatCount="indefinite" />
              </line>
              <line x1="75%" y1="28%" x2="68%" y2="50%" stroke="rgba(150,195,255,0.3)">
                <animate attributeName="opacity" values="0.3;0.6;0.3" dur="5s" repeatCount="indefinite" />
              </line>
              <line x1="75%" y1="28%" x2="90%" y2="38%" stroke="rgba(150,195,255,0.3)">
                <animate attributeName="opacity" values="0.2;0.5;0.2" dur="6s" repeatCount="indefinite" />
              </line>
              <line x1="68%" y1="50%" x2="82%" y2="65%" stroke="rgba(150,195,255,0.25)">
                <animate attributeName="opacity" values="0.25;0.5;0.25" dur="3.5s" repeatCount="indefinite" />
              </line>
              <line x1="90%" y1="38%" x2="82%" y2="65%" stroke="rgba(150,195,255,0.2)">
                <animate attributeName="opacity" values="0.15;0.4;0.15" dur="5.5s" repeatCount="indefinite" />
              </line>
              <line x1="68%" y1="50%" x2="50%" y2="68%" stroke="rgba(150,195,255,0.2)">
                <animate attributeName="opacity" values="0.15;0.35;0.15" dur="4.5s" repeatCount="indefinite" />
              </line>
              <line x1="82%" y1="65%" x2="72%" y2="82%" stroke="rgba(150,195,255,0.2)">
                <animate attributeName="opacity" values="0.2;0.45;0.2" dur="5s" repeatCount="indefinite" />
              </line>
              <line x1="90%" y1="38%" x2="95%" y2="18%" stroke="rgba(150,195,255,0.15)">
                <animate attributeName="opacity" values="0.1;0.3;0.1" dur="7s" repeatCount="indefinite" />
              </line>
              <line x1="60%" y1="12%" x2="50%" y2="30%" stroke="rgba(150,195,255,0.15)">
                <animate attributeName="opacity" values="0.1;0.3;0.1" dur="6s" repeatCount="indefinite" />
              </line>
              <line x1="50%" y1="30%" x2="68%" y2="50%" stroke="rgba(150,195,255,0.15)">
                <animate attributeName="opacity" values="0.15;0.35;0.15" dur="4s" repeatCount="indefinite" />
              </line>
            </g>

            {/* Travelling light pulses along lines */}
            <circle r="2" fill="rgba(200,225,255,0.8)">
              <animateMotion dur="3s" repeatCount="indefinite" path="M 0,0" />
              <animate attributeName="opacity" values="0;0.8;0" dur="3s" repeatCount="indefinite" />
            </circle>

            {/* Primary nodes - large and bright */}
            <g filter="url(#glow)">
              {/* Main hub node */}
              <circle cx="75%" cy="28%" r="6" fill="rgba(180,210,255,0.9)">
                <animate attributeName="r" values="5;7;5" dur="4s" repeatCount="indefinite" />
              </circle>
              {/* Secondary hub */}
              <circle cx="68%" cy="50%" r="5" fill="rgba(160,200,255,0.8)">
                <animate attributeName="r" values="4;6;4" dur="5s" repeatCount="indefinite" />
              </circle>
              {/* Tertiary nodes */}
              <circle cx="82%" cy="65%" r="4.5" fill="rgba(160,200,255,0.7)">
                <animate attributeName="r" values="3.5;5.5;3.5" dur="4.5s" repeatCount="indefinite" />
              </circle>
              <circle cx="90%" cy="38%" r="4" fill="rgba(150,195,255,0.7)">
                <animate attributeName="r" values="3;5;3" dur="3.5s" repeatCount="indefinite" />
              </circle>
            </g>

            {/* Smaller outer nodes */}
            <circle cx="60%" cy="12%" r="3.5" fill="rgba(140,185,245,0.6)">
              <animate attributeName="r" values="3;4.5;3" dur="3s" repeatCount="indefinite" />
            </circle>
            <circle cx="50%" cy="68%" r="3" fill="rgba(140,185,245,0.5)">
              <animate attributeName="r" values="2.5;4;2.5" dur="6s" repeatCount="indefinite" />
            </circle>
            <circle cx="72%" cy="82%" r="3" fill="rgba(140,185,245,0.5)">
              <animate attributeName="r" values="2.5;4;2.5" dur="4s" repeatCount="indefinite" />
            </circle>
            <circle cx="95%" cy="18%" r="2.5" fill="rgba(140,185,245,0.4)">
              <animate attributeName="r" values="2;3.5;2" dur="5s" repeatCount="indefinite" />
            </circle>
            <circle cx="50%" cy="30%" r="3" fill="rgba(140,185,245,0.45)">
              <animate attributeName="r" values="2.5;4;2.5" dur="5.5s" repeatCount="indefinite" />
            </circle>

            {/* Expanding pulse rings on hub nodes */}
            <circle cx="75%" cy="28%" r="10" fill="none" stroke="rgba(160,200,255,0.25)" strokeWidth="1.5">
              <animate attributeName="r" values="8;20;8" dur="4s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.25;0;0.25" dur="4s" repeatCount="indefinite" />
            </circle>
            <circle cx="68%" cy="50%" r="10" fill="none" stroke="rgba(160,200,255,0.2)" strokeWidth="1.5">
              <animate attributeName="r" values="7;18;7" dur="5s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.2;0;0.2" dur="5s" repeatCount="indefinite" />
            </circle>
            <circle cx="82%" cy="65%" r="8" fill="none" stroke="rgba(160,200,255,0.15)" strokeWidth="1">
              <animate attributeName="r" values="6;15;6" dur="4.5s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.15;0;0.15" dur="4.5s" repeatCount="indefinite" />
            </circle>
          </svg>
        </div>

        <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1240px] items-center px-11 py-32">
          <div>
            <h1 className="reveal font-display max-w-[880px] text-[clamp(48px,6.5vw,86px)] font-medium leading-[1.02] tracking-[-0.025em] text-white text-balance">
              Sharper search.{" "}
              <em className="italic text-white/60">Truer</em> matches.
              <br className="hidden lg:block" /> Better offers.
            </h1>
            <p className="reveal mt-8 max-w-[540px] text-[20px] leading-[1.6] text-white/50 text-pretty">
              Mastry is your AI career coach. It learns your real
              experience, discovers roles worth your time, and walks you into
              every interview genuinely prepared.
            </p>
            <div className="reveal mt-12 flex flex-wrap items-center gap-5">
              <Link
                href="/signup"
                className={buttonStyles({ variant: "cta", size: "lg" })}
                style={{ color: "#111114" }}
              >
                Get started
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        <div className="divider-glow absolute bottom-0 left-0 right-0" />
      </section>

      {/* ━━ PLATFORM STRIP ━━ */}
      <section className="border-b border-[var(--border)] bg-white">
        <div className="mx-auto max-w-[1240px] px-11 py-5">
          <div className="reveal flex flex-wrap items-center gap-8 text-[14px] text-[var(--muted)]">
            <span className="font-medium text-[var(--ink-muted)]">
              Searches every major platform
            </span>
            <span className="text-[var(--border)]">|</span>
            {platforms.map((p) => (
              <span key={p}>{p}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ━━ APP PREVIEW BAND ━━ */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1240px] px-11 pt-16 pb-0">
          <div className="reveal relative w-full overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--dark)] p-1">
            {/* Fake browser chrome */}
            <div className="flex items-center gap-2 rounded-t-lg bg-[#1a1a1e] px-4 py-3">
              <div className="flex gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full bg-white/10" />
                <div className="h-2.5 w-2.5 rounded-full bg-white/10" />
                <div className="h-2.5 w-2.5 rounded-full bg-white/10" />
              </div>
              <div className="mx-auto flex h-6 w-[280px] items-center justify-center rounded-md bg-white/[0.06] text-[11px] text-white/30">
                app.mastry.co
              </div>
            </div>
            {/* App mockup content */}
            <div className="flex min-h-[420px] rounded-b-lg bg-[var(--surface)]">
              {/* Sidebar mock */}
              <div className="hidden w-[200px] flex-shrink-0 border-r border-[var(--border)] bg-[var(--dark)] p-4 md:block">
                <div className="mb-6 flex items-center gap-2">
                  <div className="h-5 w-5 rounded bg-white/10" />
                  <div className="h-3 w-16 rounded bg-white/15" />
                </div>
                {["Career Passport", "Job Discovery", "Opportunities", "Applications", "Interviews", "Mock Interview", "Visa Intel", "Smart Match"].map((item, i) => (
                  <div
                    key={item}
                    className={`mb-1 flex items-center gap-2.5 rounded-lg px-3 py-2 text-[12px] ${i === 1 ? "bg-white/[0.08] text-white" : "text-white/40"}`}
                  >
                    <span className="font-mono text-[10px] text-white/20">{String(i + 1).padStart(2, "0")}</span>
                    {item}
                  </div>
                ))}
              </div>
              {/* Main content mock */}
              <div className="flex-1 p-6">
                <div className="mb-1 text-[11px] font-medium uppercase tracking-wider text-[var(--muted)]">Job Discovery</div>
                <div className="mb-5 text-[20px] font-semibold text-[var(--ink)]">12 new roles matched</div>
                {/* Job cards mock */}
                <div className="space-y-3">
                  {[
                    { title: "Senior Product Manager", company: "Stripe", match: 94, tags: ["Fintech", "B2B SaaS"] },
                    { title: "Staff Engineer", company: "Wise", match: 91, tags: ["Payments", "Remote"] },
                    { title: "Design Lead", company: "Linear", match: 88, tags: ["Product Design", "B2B"] },
                  ].map((job) => (
                    <div key={job.title} className="flex items-center justify-between rounded-xl border border-[var(--border-light)] bg-white p-4 shadow-sm">
                      <div>
                        <div className="text-[14px] font-semibold text-[var(--ink)]">{job.title}</div>
                        <div className="mt-0.5 text-[13px] text-[var(--muted)]">{job.company}</div>
                        <div className="mt-2 flex gap-1.5">
                          {job.tags.map((tag) => (
                            <span key={tag} className="rounded-full bg-[var(--surface-low)] px-2.5 py-0.5 text-[11px] text-[var(--ink-muted)]">{tag}</span>
                          ))}
                        </div>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="text-[22px] font-bold text-[var(--blue)]">{job.match}</div>
                        <div className="text-[10px] uppercase tracking-wider text-[var(--muted)]">Match</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ━━ PLATFORM GRID ━━ */}
      <section id="platform" className="bg-white">
        <div className="mx-auto max-w-[1240px] px-11 pt-[100px] pb-10">
          <div className="reveal grid grid-cols-1 items-end gap-[60px] sm:grid-cols-2">
            <h2 className="font-display max-w-[480px] text-[clamp(36px,4vw,52px)] font-medium leading-[1.06] tracking-[-0.02em]">
              One platform for your entire career search.
            </h2>
            <p className="mb-2 max-w-[460px] text-[17px] leading-[1.65] text-[var(--ink-muted)]">
              Nine connected modules, each with a distinct job, all
              drawing on the same source of truth: your real career history.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 border-t border-[var(--border)] sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <Link
                key={f.num}
                href="/signup"
                className="reveal group flex min-h-[184px] flex-col border-b border-r border-[var(--border)] p-[32px_30px_34px] text-left transition-colors duration-200 hover:bg-[var(--surface)]"
                style={{ transitionDelay: `${i * 40}ms` }}
              >
                <span className="font-display text-[17px] italic text-[var(--muted-light)]">
                  {f.num}
                </span>
                <span className="mt-auto text-[19px] font-semibold tracking-[-0.01em] text-[var(--ink)] transition-colors group-hover:text-[var(--blue)]">
                  {f.title}
                </span>
                <span className="mt-2 text-[14.5px] leading-[1.5] text-[var(--muted)]">
                  {f.desc}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ━━ GET TO KNOW US ━━ */}
      <section id="about" className="bg-white">
        <div className="mx-auto max-w-[1240px] px-11 py-[120px]">
          <div className="reveal grid grid-cols-1 items-center gap-16 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <div className="eyebrow">Get to know Mastry</div>
              <p className="font-display mt-6 text-[30px] font-normal leading-[1.4] tracking-[-0.01em] text-[var(--ink-secondary)]">
                Most tools treat you as a keyword. Mastry starts with the truth
                of your work: the projects you shipped, the teams you
                led, the numbers you moved. And reasons from there.
                Nothing it writes for you is ever invented. Every letter, every
                match, every answer is grounded in what you have actually done.
              </p>
              <div className="mt-10 flex gap-10">
                {[
                  { value: "100%", label: "from your real data" },
                  { value: "9", label: "connected modules" },
                  { value: "12s", label: "to parse your CV" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="font-display text-[38px] font-medium tracking-[-0.01em] text-[var(--ink)]">
                      {stat.value}
                    </div>
                    <div className="mt-0.5 text-[13.5px] text-[var(--muted)]">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative h-[460px] w-full overflow-hidden rounded-xl">
              <Image
                src="/images/narrative.jpg"
                alt="Professional working in a modern office environment"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ━━ TESTIMONIALS ━━ */}
      <section id="testimonials" className="bg-[var(--surface)]">
        <div className="mx-auto max-w-[1240px] px-11 py-[120px]">
          <h2 className="reveal font-display mb-[52px] text-[clamp(36px,4vw,52px)] font-medium leading-[1.06] tracking-[-0.02em]">
            What our members say.
          </h2>
          <div className="grid grid-cols-1 gap-[34px] sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t, i) => (
              <div
                key={t.name}
                className="reveal flex flex-col"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="relative h-[320px] w-full overflow-hidden rounded-lg">
                  <Image
                    src={t.image}
                    alt={t.name}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-[1.03]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="mt-[22px] text-[14px]">
                  <span className="font-semibold text-[var(--ink)]">
                    {t.name}
                  </span>{" "}
                  <span className="text-[var(--muted)]">
                    / {t.role}
                  </span>
                </div>
                <p className="font-display mt-[14px] text-[20px] font-normal leading-[1.5] tracking-[-0.005em] text-[var(--ink-secondary)] text-pretty">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-[18px] text-[14px] font-semibold text-[var(--ink-muted)] transition-colors hover:text-[var(--ink)]">
                  Read their story&nbsp;&rarr;
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━ SMART MATCHING ━━ */}
      <section id="matching" className="bg-white">
        <div className="mx-auto max-w-[1240px] px-11 py-[120px]">
          <div className="reveal grid grid-cols-1 items-center gap-[70px] lg:grid-cols-2">
            <div>
              <div className="eyebrow">Smart Matching</div>
              <h2 className="font-display mt-5 text-[clamp(36px,3.5vw,48px)] font-medium leading-[1.08] tracking-[-0.015em]">
                Every role, weighed against the life you have led.
              </h2>
              <p className="mt-5 max-w-[460px] text-[17px] leading-[1.65] text-[var(--ink-muted)]">
                Leadership, domain, technical, seniority, compensation, visa and
                growth fit, each scored 0&ndash;100 against your real
                passport, so you spend your energy only where it counts.
              </p>
            </div>
            <div className="rounded-[20px] bg-[var(--dark)] p-[34px] text-white shadow-[var(--card-shadow-dark)]">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[18px] font-semibold">
                    Staff Product Manager
                  </div>
                  <div className="text-[14px] text-white/50">
                    N26 &middot; Berlin &middot; &euro;150&ndash;175k
                  </div>
                </div>
                <div
                  className="flex h-[66px] w-[66px] items-center justify-center rounded-full"
                  style={{
                    background:
                      "conic-gradient(var(--blue-light) 92%, rgba(255,255,255,0.08) 0)",
                  }}
                >
                  <div className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-[var(--dark)]">
                    <span className="font-display text-[22px] font-semibold text-[var(--blue-light)]">
                      92
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex flex-col gap-3">
                {matchDims.map((d) => (
                  <div key={d.label}>
                    <div className="mb-[5px] flex justify-between text-[13px]">
                      <span className="text-white/50">{d.label}</span>
                      <span className="font-semibold text-white">
                        {d.score}
                      </span>
                    </div>
                    <div className="h-[5px] overflow-hidden rounded-full bg-white/[0.08]">
                      <div
                        className="h-full rounded-full bg-white transition-all duration-700"
                        style={{ width: `${d.score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ━━ CTA ━━ */}
      <section className="relative overflow-hidden bg-[var(--dark)] text-white">
        <Image
          src="/images/cta-dark.jpg"
          alt=""
          fill
          className="object-cover opacity-30"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--dark)]/95 via-[var(--dark)]/70 to-[var(--dark)]/30" />

        <div className="relative z-10 mx-auto max-w-[1240px]">
          <div className="flex min-h-[520px] flex-col justify-center px-11 py-24 lg:px-[68px]">
            <h2 className="reveal font-display max-w-[640px] text-[clamp(40px,5vw,64px)] font-medium leading-[1.04] tracking-[-0.025em]">
              Take the next step in your career.
            </h2>
            <p className="reveal mt-6 max-w-[480px] text-[17px] leading-[1.6] text-white/50">
              Upload your CV, see your Career Passport in two minutes, then let
              Mastry find what you&apos;ve been missing.
            </p>
            <div className="reveal mt-10">
              <Link
                href="/signup"
                className={buttonStyles({ variant: "cta", size: "lg" })}
                style={{ color: "#111114" }}
              >
                Get started free
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
