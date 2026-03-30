import type { LucideIcon } from "lucide-react";
import {
  BadgeDollarSign,
  BookOpen,
  BriefcaseBusiness,
  Compass,
  Gauge,
  Shield,
  Sparkles,
  UserRound,
  Users,
} from "lucide-react";

export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

export const userNavigation: NavItem[] = [
  { href: "/dashboard", label: "Overview", icon: Gauge },
  { href: "/mentors", label: "Discover", icon: Compass },
  { href: "/sessions", label: "Sessions", icon: BriefcaseBusiness },
  { href: "/guidance", label: "Guidance", icon: Sparkles },
  { href: "/resources", label: "Growth", icon: BookOpen },
  { href: "/profile", label: "Profile", icon: UserRound },
];

export const mentorNavigation: NavItem[] = [
  { href: "/mentor/dashboard", label: "Overview", icon: Gauge },
  { href: "/mentor/profile", label: "Profile", icon: UserRound },
  { href: "/mentor/availability", label: "Availability", icon: BriefcaseBusiness },
  { href: "/mentor/bookings", label: "Bookings", icon: Users },
  { href: "/mentor/earnings", label: "Earnings", icon: BadgeDollarSign },
];

export const adminNavigation: NavItem[] = [
  { href: "/admin", label: "Overview", icon: Gauge },
  { href: "/admin/mentors", label: "Mentors", icon: Users },
  { href: "/mentor/dashboard", label: "Portal", icon: Shield },
];
