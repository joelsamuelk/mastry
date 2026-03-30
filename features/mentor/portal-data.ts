import { getMentorBySlug } from "@/lib/mock-data";

const mentor = getMentorBySlug("marcus-thorne");

if (!mentor) {
  throw new Error("Mentor portal seed is missing Marcus Thorne.");
}

export const mentorPortalMentor = mentor;

export const mentorOverviewRevenue = {
  headline: "$14,820.00",
  eyebrow: "Revenue Momentum",
  delta: "+12.4%",
  peakLabel: "Peak: $4.2k",
  bars: [
    { id: "apr", value: 34, highlight: false },
    { id: "may", value: 46, highlight: false },
    { id: "jun", value: 38, highlight: false },
    { id: "jul", value: 72, highlight: true },
    { id: "aug", value: 50, highlight: false },
    { id: "sep", value: 58, highlight: false },
    { id: "oct", value: 52, highlight: false },
  ],
  stats: [
    { label: "Active Students", value: "24" },
    { label: "Hours Logged", value: "142h" },
    { label: "Session Avg", value: "$125" },
  ],
};

export const mentorOverviewBookings = [
  {
    id: "booking-sarah",
    month: "Oct",
    day: "14",
    title: "UI/UX Strategy: Scale Deep Dive",
    person: "Sarah Jenkins",
    time: "10:00 AM - 11:30 AM",
    status: "confirmed" as const,
    action: "video" as const,
  },
  {
    id: "booking-leo",
    month: "Oct",
    day: "16",
    title: "Portfolio Audit & Critique",
    person: "Leo Martinez",
    time: "2:00 PM - 3:00 PM",
    status: "confirmed" as const,
    action: "calendar" as const,
  },
  {
    id: "booking-emily",
    month: "Oct",
    day: "18",
    title: "Career Path Planning",
    person: "Emily Chen",
    time: "9:00 AM - 10:00 AM",
    status: "tentative" as const,
    action: "none" as const,
  },
];

export const mentorAiPerformanceInsight = {
  quote:
    "Demand for Portfolio Audits is up 40% in your region. Consider opening two additional slots on Thursday mornings to capture this momentum.",
  themeLabel: "Top Feedback Theme",
  themeScore: "98%",
  themeTitle: "Actionable Guidance",
  themeBody: "Students highly value your direct technical critiques.",
};

export const mentorSettingsTabs = ["Account", "Preferences", "Security"] as const;

export const mentorNotificationSettings = [
  {
    id: "session-reminders",
    title: "Session Reminders",
    description: "Push notifications before meetings",
    enabled: true,
  },
  {
    id: "mentor-messages",
    title: "Mentor Messages",
    description: "Email alerts for new mentee messages",
    enabled: true,
  },
  {
    id: "growth-insights",
    title: "Growth Insights",
    description: "Weekly AI-curated performance reports",
    enabled: false,
  },
];

export const mentorPayoutMethods = [
  {
    id: "payout-visa",
    brand: "Visa",
    label: "Chase Business Checking",
    detail: "**** 8821 - Primary",
  },
  {
    id: "payout-paypal",
    brand: "PayPal",
    label: "vance.alex@fintech.io",
    detail: "Instant payouts enabled",
  },
];

export const mentorSecurityNote = {
  title: "Security Baseline",
  body: "Your account uses 2FA via authenticator app. Last login from San Francisco, CA.",
  action: "Review Security Log",
};

export const mentorProfileFields = {
  displayName: "Marcus Thorne",
  primaryExpertise: "Product Design",
  biography:
    "Dedicated to helping ambitious operators turn design systems and product strategy into visible business leverage. Currently advising 4 portfolio startups on series B readiness.",
};

export const mentorSessionOffering = {
  standardRate: "$150",
  proBonoEnabled: true,
  focusAreas: ["Venture Capital", "SaaS Scaling", "AI Product Strategy"],
};

export const mentorAvailabilitySteps = [
  "Session Rules",
  "Weekly Pattern",
  "Availability Windows",
];

export const mentorAvailabilityQuote = {
  body:
    "Mastry has redefined how I scale my knowledge while maintaining high-impact relationships with tomorrow's leaders.",
  source: "Sarah J., Engineering Director",
};

export const mentorAvailabilityRules = [
  { id: "timezone", label: "Timezone", value: "Pacific Time (PT)" },
  { id: "lead-time", label: "Minimum Lead Time", value: "24 hours" },
  { id: "buffer", label: "Buffer Between Sessions", value: "30 minutes" },
];

export const mentorWeeklyAvailability = [
  {
    id: "mon",
    label: "Monday",
    shortLabel: "Mon",
    enabled: true,
    windows: ["09:00 AM", "10:30 AM", "01:00 PM", "02:30 PM"],
    demand: "High demand",
  },
  {
    id: "tue",
    label: "Tuesday",
    shortLabel: "Tue",
    enabled: false,
    windows: [],
    demand: "Closed",
  },
  {
    id: "wed",
    label: "Wednesday",
    shortLabel: "Wed",
    enabled: true,
    windows: ["11:00 AM", "01:30 PM", "03:00 PM"],
    demand: "Core day",
  },
  {
    id: "thu",
    label: "Thursday",
    shortLabel: "Thu",
    enabled: true,
    windows: ["09:00 AM", "10:30 AM", "01:00 PM"],
    demand: "Suggested expansion",
  },
  {
    id: "fri",
    label: "Friday",
    shortLabel: "Fri",
    enabled: true,
    windows: ["09:30 AM", "12:30 PM"],
    demand: "Light load",
  },
  {
    id: "sat",
    label: "Saturday",
    shortLabel: "Sat",
    enabled: false,
    windows: [],
    demand: "Closed",
  },
  {
    id: "sun",
    label: "Sunday",
    shortLabel: "Sun",
    enabled: false,
    windows: [],
    demand: "Closed",
  },
];

export const mentorAvailabilitySuggestion =
  "Thursday demand is climbing fastest. Opening two more morning slots would align with current discovery traffic.";

export const mentorBookingStats = [
  { label: "Upcoming Sessions", value: "12", note: "4 this week" },
  { label: "Pending Requests", value: "3", note: "Average response 2h" },
  { label: "Completion Rate", value: "96%", note: "Across last 90 days" },
];

export const mentorDetailedBookings = [
  {
    id: "detail-sarah",
    month: "Oct",
    day: "14",
    title: "UI/UX Strategy: Scale Deep Dive",
    student: "Sarah Jenkins",
    studentRole: "Principal Engineer at Linear",
    time: "10:00 AM - 11:30 AM",
    status: "Confirmed",
    preparation: "Review Sarah's design system memo and annotate three leverage points.",
  },
  {
    id: "detail-leo",
    month: "Oct",
    day: "16",
    title: "Portfolio Audit & Critique",
    student: "Leo Martinez",
    studentRole: "Lead Product Designer at Ramp",
    time: "2:00 PM - 3:00 PM",
    status: "Confirmed",
    preparation: "Open submitted portfolio and pre-tag storytelling gaps before the session.",
  },
  {
    id: "detail-emily",
    month: "Oct",
    day: "18",
    title: "Career Path Planning",
    student: "Emily Chen",
    studentRole: "Staff Designer Candidate",
    time: "9:00 AM - 10:00 AM",
    status: "Tentative",
    preparation: "Await mentee goal brief and reshare pre-session questionnaire if needed.",
  },
];

export const mentorBookingRequests = [
  {
    id: "request-1",
    name: "David Chen",
    note: "Requested an async product review for Friday with a 24h turnaround.",
  },
  {
    id: "request-2",
    name: "Elena Rodriguez",
    note: "Wants a follow-up strategy call focused on series B narrative refinement.",
  },
];

export const mentorEarningsHighlights = [
  { label: "Revenue YTD", value: "$64,920", note: "+18% vs last year" },
  { label: "Next Payout", value: "$3,240", note: "Arrives Oct 18" },
  { label: "Avg Session Value", value: "$312", note: "After platform fees" },
];

export const mentorEarningsTrend = [
  { id: "apr", label: "Apr", value: 30 },
  { id: "may", label: "May", value: 42 },
  { id: "jun", label: "Jun", value: 37 },
  { id: "jul", label: "Jul", value: 56 },
  { id: "aug", label: "Aug", value: 48 },
  { id: "sep", label: "Sep", value: 64, highlight: true },
  { id: "oct", label: "Oct", value: 52 },
];

export const mentorRecentPayouts = [
  {
    id: "payout-oct",
    date: "Oct 12, 2024",
    amount: "$2,840",
    destination: "Chase Business Checking",
    status: "Paid",
  },
  {
    id: "payout-sep",
    date: "Sep 28, 2024",
    amount: "$3,120",
    destination: "Chase Business Checking",
    status: "Paid",
  },
  {
    id: "payout-sep-2",
    date: "Sep 15, 2024",
    amount: "$1,940",
    destination: "PayPal",
    status: "Paid",
  },
];
