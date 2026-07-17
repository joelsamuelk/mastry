import type { Metadata } from "next";
import { PassportEditor } from "@/features/passport/passport-editor";

export const metadata: Metadata = { title: "Edit Career Passport" };

export default function Page() {
  return <PassportEditor />;
}
