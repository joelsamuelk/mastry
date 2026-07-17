import type { Metadata } from "next";
import { PassportView } from "@/features/passport/passport-view";

export const metadata: Metadata = { title: "Career Passport" };

export default function Page() {
  return <PassportView />;
}
