import type { Metadata } from "next";
import { CVUploadPage } from "@/features/upload/cv-upload-page";

export const metadata: Metadata = { title: "Upload CV" };

export default function Page() {
  return <CVUploadPage />;
}
