import type { Metadata } from "next";
import { GoalsForm } from "@/features/goals/goals-form";

export const metadata: Metadata = { title: "Career Goals" };

export default function Page() {
  return <GoalsForm />;
}
