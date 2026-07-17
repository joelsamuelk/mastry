import {
  LayoutDashboard,
  Fingerprint,
  Upload,
  Target,
  Search,
  BarChart3,
  FileText,
  Shield,
  MessageSquare,
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
  { label: "Opportunity Scout", href: "/opportunities", icon: Search },
  { label: "Applications", href: "/applications", icon: FileText },
  { label: "Visa Intelligence", href: "/visa", icon: Shield },
  { label: "Interview Coach", href: "/interview", icon: MessageSquare },
];
