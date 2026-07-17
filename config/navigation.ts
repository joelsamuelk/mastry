import {
  LayoutDashboard,
  Fingerprint,
  Upload,
  Target,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export const appNavigation: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Career Passport", href: "/passport", icon: Fingerprint },
  { label: "Upload CV", href: "/upload", icon: Upload },
  { label: "Goals", href: "/goals", icon: Target },
];
