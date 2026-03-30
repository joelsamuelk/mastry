import type { ReactNode } from "react";
import { AppShell } from "@/components/layout/app-shell";

export default function UserAppLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <AppShell variant="user">{children}</AppShell>;
}
