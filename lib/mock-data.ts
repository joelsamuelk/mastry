import type {
  CuratorInsight,
  FaqItem,
  FocusArea,
  GrowthPlan,
  Mentor,
  Resource,
} from "@/types/domain";

const focusAreas: Record<string, FocusArea> = {
  distributedSystems: {
    id: "focus-distributed-systems",
    slug: "distributed-systems",
    label: "Distributed Systems",
    category: "discipline",
  },
  leadership: {
    id: "focus-leadership",
    slug: "leadership",
    label: "Leadership",
    category: "discipline",
  },
  productDesign: {
    id: "focus-product-design",
    slug: "product-design",
    label: "Product Design",
    category: "discipline",
  },
  fintech: {
    id: "focus-fintech",
    slug: "fintech",
    label: "FinTech",
    category: "industry",
  },
  scale: {
    id: "focus-scale",
    slug: "scale",
    label: "Scaling",
    category: "goal",
  },
  aiProduct: {
    id: "focus-ai-product",
    slug: "ai-product",
    label: "AI Product",
    category: "industry",
  },
};

function buildAvailabilityDay(
  isoDate: string,
  times: Array<[time: string, available?: boolean]>,
) {
  return {
    id: `availability-${isoDate}`,
    isoDate,
    slots: times.map(([time, available = true]) => ({
      id: `slot-${isoDate}-${time}`,
      startsAt: `${isoDate}T${time}:00`,
      available,
    })),
  };
}

export const featuredMentors: Mentor[] = [
  {
    id: "mentor-elena-rodriguez",
    slug: "elena-rodriguez",
    name: "Elena Rodriguez",
    headline: "Product Director",
    company: "Stripe",
    location: "New York",
    bio: "Advises ambitious product leads on strategic clarity, stakeholder alignment, and the operating rhythms needed to scale without losing narrative coherence.",
    status: "approved",
    experienceLabel: "Scaled multiple zero-to-one products",
    rating: 4.8,
    reviewCount: 74,
    hourlyRateUsd: 240,
    avatarGradient: "linear-gradient(145deg, #1f2430 0%, #8e6df4 100%)",
    initials: "ER",
    focusAreas: [focusAreas.fintech, focusAreas.productDesign, focusAreas.scale],
    sessionTypes: [
      {
        id: "session-er-strategy",
        title: "Product Strategy Audit",
        description: "A focused review of your roadmap, core bets, and executive story.",
        durationMinutes: 45,
        priceUsd: 240,
        deliveryMode: "video",
        featured: true,
      },
      {
        id: "session-er-roadmap",
        title: "Roadmap Review",
        description: "Pressure-test sequencing, priorities, and how your next quarter reads to leadership.",
        durationMinutes: 60,
        priceUsd: 310,
        deliveryMode: "video",
      },
    ],
    featuredQuote:
      "Elena helped me tighten the story around our roadmap and made the leadership room easier to navigate.",
    badges: [{ id: "badge-elena-elite", label: "Elite", tone: "accent" }],
    profileStats: [
      { id: "stat-elena-rating", value: "4.8", label: "Rating" },
      { id: "stat-elena-sessions", value: "85+", label: "Sessions" },
      { id: "stat-elena-response", value: "24h", label: "Response" },
    ],
    expertise: [
      {
        id: "expertise-elena-positioning",
        title: "Strategic Positioning",
        description:
          "Clarify where your product should win, what to deprioritize, and how to defend that direction with senior stakeholders.",
        eyebrow: "Operator Lens",
        icon: "target",
      },
      {
        id: "expertise-elena-rituals",
        title: "Operating Rhythm",
        description:
          "Design decision rituals, review loops, and concise artifacts that compound alignment instead of creating noise.",
        eyebrow: "Execution",
        icon: "sparkles",
      },
    ],
    careerHistory: [
      {
        id: "career-elena-stripe",
        company: "Stripe",
        role: "Product Director",
        period: "2021 to Present",
        summary:
          "Led payments platform strategy across risk, onboarding, and multi-product adoption for enterprise customers.",
      },
      {
        id: "career-elena-amex",
        company: "American Express",
        role: "Senior Product Lead",
        period: "2017 to 2021",
        summary:
          "Scaled internal growth systems and launched customer-facing financial experiences across international markets.",
      },
    ],
    availability: [
      buildAvailabilityDay("2024-10-07", [
        ["09:00"],
        ["11:00"],
        ["14:00"],
        ["16:30"],
      ]),
      buildAvailabilityDay("2024-10-09", [
        ["10:00"],
        ["13:00"],
        ["15:30"],
      ]),
      buildAvailabilityDay("2024-10-10", [
        ["09:30"],
        ["12:30"],
        ["16:00"],
      ]),
    ],
  },
  {
    id: "mentor-marcus-thorne",
    slug: "marcus-thorne",
    name: "Marcus Thorne",
    headline: "Principal",
    company: "Forge Ventures",
    location: "London",
    bio: "Helps senior operators turn strong execution into visible strategic leverage through tighter growth narratives, systems thinking, and decision quality.",
    status: "approved",
    experienceLabel: "14 years mentoring product teams",
    rating: 4.9,
    reviewCount: 128,
    hourlyRateUsd: 180,
    avatarGradient: "linear-gradient(145deg, #ed3a32 0%, #ff6f61 100%)",
    initials: "MT",
    focusAreas: [focusAreas.scale, focusAreas.leadership, focusAreas.aiProduct],
    sessionTypes: [
      {
        id: "session-mt-strategy",
        title: "1:1 Strategic Audit",
        description: "45 minutes to align your next move, narrative, and growth leverage points.",
        durationMinutes: 45,
        priceUsd: 250,
        deliveryMode: "video",
        featured: true,
      },
      {
        id: "session-mt-review",
        title: "Asynchronous Deck Review",
        description: "Written feedback with a recorded walkthrough so you can tighten the story before your next high-stakes meeting.",
        durationMinutes: 40,
        priceUsd: 180,
        deliveryMode: "async",
      },
    ],
    featuredQuote:
      "Marcus helped me translate strong craft into executive-level influence within two quarters.",
    badges: [
      { id: "badge-marcus-strategy", label: "Strategy Mentor", tone: "accent" },
      { id: "badge-marcus-expert", label: "Expert", tone: "neutral" },
    ],
    profileStats: [
      { id: "stat-marcus-rating", value: "4.9", label: "Rating" },
      { id: "stat-marcus-sessions", value: "120+", label: "Sessions" },
      { id: "stat-marcus-repeat", value: "92%", label: "Repeat" },
    ],
    expertise: [
      {
        id: "expertise-marcus-growth",
        title: "Scaling & Growth",
        description:
          "Helps founders and operators move from seed to series readiness with sharper growth systems and clearer operating priorities.",
        eyebrow: "Operating Focus",
        icon: "rocket",
      },
      {
        id: "expertise-marcus-ai",
        title: "AI Implementation",
        description:
          "Practical integration of AI into core product workflows for measurable operating leverage rather than competitive theatre.",
        eyebrow: "Product Systems",
        icon: "briefcase",
      },
    ],
    careerHistory: [
      {
        id: "career-marcus-forge",
        company: "Forge Ventures",
        role: "Principal Partner",
        period: "2020 to Present",
        summary:
          "Leads go-to-market and talent investments across North America with a focus on repeatable growth systems.",
      },
      {
        id: "career-marcus-hypergrid",
        company: "HyperGrid Labs",
        role: "VP of Growth",
        period: "2017 to 2020",
        summary:
          "Scaled annual recurring revenue from $10M to $50M through disciplined acquisition experiments and sharper market positioning.",
      },
    ],
    availability: [
      buildAvailabilityDay("2024-10-09", [
        ["09:00"],
        ["10:30"],
        ["13:00"],
        ["14:30"],
        ["16:00"],
        ["17:30", false],
      ]),
      buildAvailabilityDay("2024-10-10", [
        ["09:00"],
        ["11:30"],
        ["15:00"],
      ]),
      buildAvailabilityDay("2024-10-16", [
        ["08:30"],
        ["13:30"],
        ["16:30"],
      ]),
      buildAvailabilityDay("2024-10-17", [
        ["09:30"],
        ["12:00"],
        ["14:00"],
      ]),
    ],
  },
  {
    id: "mentor-sarah-jenkins",
    slug: "sarah-jenkins",
    name: "Sarah Jenkins",
    headline: "Principal Engineer",
    company: "Linear",
    location: "San Francisco",
    bio: "Works with high-agency engineers on architecture, systems design, and the communication patterns required to operate at staff-plus scope.",
    status: "approved",
    experienceLabel: "Former engineering director",
    rating: 5,
    reviewCount: 92,
    hourlyRateUsd: 450,
    avatarGradient: "linear-gradient(145deg, #18202d 0%, #6172f3 100%)",
    initials: "SJ",
    focusAreas: [focusAreas.distributedSystems, focusAreas.leadership, focusAreas.aiProduct],
    sessionTypes: [
      {
        id: "session-sj-architecture",
        title: "Architecture Foundations",
        description: "Refine system design choices, trade-off framing, and technical leadership habits.",
        durationMinutes: 60,
        priceUsd: 450,
        deliveryMode: "video",
        featured: true,
      },
      {
        id: "session-sj-influence",
        title: "Staff Influence Review",
        description: "A focused working session on design docs, cross-functional persuasion, and decision quality.",
        durationMinutes: 45,
        priceUsd: 380,
        deliveryMode: "video",
      },
    ],
    featuredQuote:
      "The sessions are structured, direct, and immediately useful. Every call turns into momentum.",
    badges: [{ id: "badge-sarah-systems", label: "Systems Mentor", tone: "accent" }],
    profileStats: [
      { id: "stat-sarah-rating", value: "5.0", label: "Rating" },
      { id: "stat-sarah-sessions", value: "92+", label: "Sessions" },
      { id: "stat-sarah-response", value: "48h", label: "Response" },
    ],
    expertise: [
      {
        id: "expertise-sarah-architecture",
        title: "Architecture Review",
        description:
          "High-signal feedback on system boundaries, trade-offs, and how to defend decisions under ambiguity.",
        eyebrow: "Technical Depth",
        icon: "target",
      },
      {
        id: "expertise-sarah-communication",
        title: "Staff Communication",
        description:
          "Turn architecture choices into concise narratives that align senior engineers, PMs, and leadership faster.",
        eyebrow: "Influence",
        icon: "sparkles",
      },
    ],
    careerHistory: [
      {
        id: "career-sarah-linear",
        company: "Linear",
        role: "Principal Engineer",
        period: "2022 to Present",
        summary:
          "Shapes product architecture, developer velocity, and systems reliability across the core product surface.",
      },
      {
        id: "career-sarah-ramp",
        company: "Ramp",
        role: "Engineering Director",
        period: "2018 to 2022",
        summary:
          "Built platform teams and led the migration path from fast-moving startup systems to resilient internal infrastructure.",
      },
    ],
    availability: [
      buildAvailabilityDay("2024-10-08", [
        ["09:00"],
        ["11:00"],
        ["14:30"],
      ]),
      buildAvailabilityDay("2024-10-11", [
        ["10:00"],
        ["13:00"],
        ["15:30"],
      ]),
      buildAvailabilityDay("2024-10-15", [
        ["08:30"],
        ["12:00"],
        ["16:00"],
      ]),
    ],
  },
  {
    id: "mentor-david-chen",
    slug: "david-chen",
    name: "David Chen",
    headline: "SVP Platform",
    company: "Netflix",
    location: "Remote",
    bio: "Supports senior engineers moving into staff-plus roles through architecture coaching, influence mapping, and sharper systems judgment.",
    status: "approved",
    experienceLabel: "Staff+ and org-design mentor",
    rating: 5,
    reviewCount: 51,
    hourlyRateUsd: 280,
    avatarGradient: "linear-gradient(145deg, #111621 0%, #3f6cff 100%)",
    initials: "DC",
    focusAreas: [focusAreas.distributedSystems, focusAreas.scale, focusAreas.leadership],
    sessionTypes: [
      {
        id: "session-dc-scale",
        title: "Scale Deep Dive",
        description: "Architecture and career guidance for platform, infra, and systems-heavy roles.",
        durationMinutes: 45,
        priceUsd: 280,
        deliveryMode: "video",
        featured: true,
      },
      {
        id: "session-dc-rfc",
        title: "RFC Review",
        description: "Tighten trade-off framing, sequencing, and technical narrative before review.",
        durationMinutes: 45,
        priceUsd: 220,
        deliveryMode: "video",
      },
    ],
    profileStats: [
      { id: "stat-david-rating", value: "5.0", label: "Rating" },
      { id: "stat-david-sessions", value: "51+", label: "Sessions" },
      { id: "stat-david-response", value: "36h", label: "Response" },
    ],
    expertise: [
      {
        id: "expertise-david-platform",
        title: "Platform Strategy",
        description:
          "Shape internal platforms that improve leverage for the rest of the org without becoming abstract infrastructure for its own sake.",
        eyebrow: "Systems",
        icon: "briefcase",
      },
      {
        id: "expertise-david-influence",
        title: "Staff Scope",
        description:
          "Map where your influence should land next, and how to package technical choices into durable org-level progress.",
        eyebrow: "Career Design",
        icon: "rocket",
      },
    ],
    careerHistory: [
      {
        id: "career-david-netflix",
        company: "Netflix",
        role: "SVP Platform",
        period: "2021 to Present",
        summary:
          "Leads platform investments supporting experimentation, reliability, and developer effectiveness at global scale.",
      },
      {
        id: "career-david-cloudflare",
        company: "Cloudflare",
        role: "VP Engineering",
        period: "2016 to 2021",
        summary:
          "Built distributed systems teams across edge reliability, traffic intelligence, and internal infrastructure.",
      },
    ],
    availability: [
      buildAvailabilityDay("2024-10-08", [
        ["09:30"],
        ["11:30"],
        ["16:00"],
      ]),
      buildAvailabilityDay("2024-10-14", [
        ["10:00"],
        ["13:00"],
        ["17:00", false],
      ]),
      buildAvailabilityDay("2024-10-18", [
        ["09:00"],
        ["12:30"],
        ["15:30"],
      ]),
    ],
  },
];

export const discoveryMentors = [
  "elena-rodriguez",
  "marcus-thorne",
  "sarah-jenkins",
].flatMap((slug) => {
  const mentor = featuredMentors.find((item) => item.slug === slug);

  return mentor ? [mentor] : [];
});

export function getMentorBySlug(slug: string) {
  return featuredMentors.find((mentor) => mentor.slug === slug);
}

export const discoveryFilters = ["Goal", "Industry", "Price Range"];

export const dashboardPlan: GrowthPlan = {
  id: "plan-professional-os",
  title: "Architecting the Next Era of Digital Infrastructure",
  summary:
    "Translate strong IC execution into visible systems leadership, with a tighter narrative for staff-level scope.",
  nextStep: "Review Sarah Jenkins's architecture series deck before Thursday's mentor session.",
  weeklyFocus: "Architecture Design",
  milestones: [
    {
      id: "milestone-foundations",
      title: "Architecture Foundations",
      description: "Completed high-leverage pattern work and closed the baseline systems audit.",
      state: "complete",
      masteryPercent: 100,
      tags: ["Design", "Systems"],
    },
    {
      id: "milestone-scale",
      title: "Scale & Performance",
      description: "Translate distributed systems trade-offs into clear, leadership-ready decisions.",
      state: "active",
      masteryPercent: 61,
      tags: ["Scale", "Latency"],
    },
    {
      id: "milestone-lead",
      title: "Lead Engineering Path",
      description: "Unlock after current track completion and prepare for staff-level operating scope.",
      state: "locked",
      masteryPercent: 0,
      tags: ["Leadership"],
    },
  ],
};

export const curatorInsights: CuratorInsight[] = [
  {
    id: "insight-mentor-match",
    eyebrow: "AI Curator Insight",
    title: "Distributed Systems mentor match",
    body:
      "Based on your recent progress in distributed systems, David Chen is the strongest near-term mentor match. His published material mirrors the architecture patterns you are currently exploring.",
    actions: ["Schedule insight", "Dismiss"],
  },
  {
    id: "insight-weekly-review",
    eyebrow: "Weekly Reflection",
    title: "Consistency is compounding",
    body:
      "You completed four sessions this month. The strongest shift is in how you articulate trade-offs under ambiguity. Keep the same pace through your current milestone.",
    actions: ["Capture reflection"],
  },
];

export const sessionHistory = [
  {
    id: "session-upcoming",
    date: "Tomorrow",
    time: "10:00 AM",
    title: "Architecture Foundations",
    mentor: "Sarah Jenkins",
    duration: "45 min",
    type: "Zoom Call",
  },
  {
    id: "session-history-1",
    date: "Oct 24, 2023",
    title: "Product Market Fit Frameworks",
    summary:
      "Redefined the ICP to focus on mid-market SaaS companies in EMEA, and identified three leverage points in the outbound motion.",
  },
  {
    id: "session-history-2",
    date: "Oct 12, 2023",
    title: "Visionary Communication",
    summary:
      "Completed core storytelling framework work and aligned the executive narrative for the next planning cycle.",
  },
];

export const growthResources: Resource[] = [
  {
    id: "resource-distributed-systems",
    title: "Mastering Distributed Systems",
    category: "Technical",
    summary: "Led by Sarah Drasner and focused on real-world infrastructure decision-making.",
    completionPercent: 75,
  },
  {
    id: "resource-design-systems",
    title: "Design Systems at Scale",
    category: "Design",
    summary: "A curated path for translating craft quality into operating leverage.",
    completionPercent: 20,
  },
  {
    id: "resource-leadership",
    title: "Data-Informed Leadership",
    category: "Leadership",
    summary: "A concise path for higher-signal planning, retrospectives, and team influence.",
    completionPercent: 50,
  },
];

export const mentorSetupSteps = [
  "Define your signature session formats",
  "Set pricing and response expectations",
  "Open availability windows",
];

export const mentorProgramBenefits = [
  "Create premium session offerings without losing control over pricing, timing, or who you choose to work with.",
  "Use a calm operational layer for bookings, payments, and follow-through instead of manually stitching together tools.",
  "Present your expertise with an intentional profile surface built for trust, clarity, and repeat engagement.",
];

export const mentorDashboardMetrics = [
  { label: "Bookings This Week", value: "18", note: "+12% week over week" },
  { label: "Utilization", value: "86%", note: "Three open slots remain" },
  { label: "Repeat Clients", value: "64%", note: "Above category average" },
  { label: "Monthly Revenue", value: "$8.4k", note: "Highest in 90 days" },
];

export const adminMetrics = [
  { label: "Pending Mentor Reviews", value: "14", note: "5 new in the last 24h" },
  { label: "Active Members", value: "1,284", note: "Steady growth this month" },
  { label: "Quality Score", value: "97%", note: "Support load remains low" },
];

export const trustStats = [
  { label: "Mentor acceptance rate", value: "11%" },
  { label: "Average booking satisfaction", value: "4.9/5" },
  { label: "Professionals currently growing with Mastry", value: "1,284" },
];

export const faqItems: FaqItem[] = [
  {
    id: "faq-match-quality",
    question: "How does Mastry choose mentors?",
    answer:
      "Mentors go through a manual approval process focused on proven operating experience, signal quality, and repeatable guidance rather than volume.",
  },
  {
    id: "faq-ai-role",
    question: "Is the AI guidance a chat bot?",
    answer:
      "No. Mastry presents AI support as structured documents and action plans that fit around mentor sessions, milestones, and your growth trajectory.",
  },
  {
    id: "faq-booking",
    question: "Can I book a single session before committing?",
    answer:
      "Yes. Mentors can offer one-off strategy calls, async reviews, or longer packaged engagements. The booking flow is designed to start small and compound over time.",
  },
  {
    id: "faq-mentor-earnings",
    question: "How do mentors monetize on Mastry?",
    answer:
      "Mentors define session types, pricing, and availability. Mastry handles booking, payment collection, and the operating layer so mentors can stay focused on guidance.",
  },
];
