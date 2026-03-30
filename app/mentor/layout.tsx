import type { ReactNode } from "react";
import { AppShell } from "@/components/layout/app-shell";

export default function MentorLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <AppShell variant="mentor">{children}</AppShell>;
}
