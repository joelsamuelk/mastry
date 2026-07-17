"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { FileUpload } from "@/components/ui/file-upload";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardTitle } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";

type Step = "upload" | "text-input" | "parsing" | "complete" | "error";

export function CVUploadPage() {
  const [step, setStep] = useState<Step>("upload");
  const [cvText, setCvText] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleFileSelect(file: File) {
    // For PDF files we need server-side parsing, for text files read directly
    if (file.name.endsWith(".txt")) {
      const text = await file.text();
      setCvText(text);
      setStep("text-input");
      return;
    }

    // Upload the file first
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/cv/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Upload failed");
        setStep("error");
        return;
      }

      // For non-text files, ask user to paste content for now
      // (PDF parsing would require pdf-parse on server)
      setStep("text-input");
    } catch {
      setError("Upload failed. Please try again.");
      setStep("error");
    }
  }

  async function handleParse() {
    if (cvText.trim().length < 50) {
      setError("Please provide more CV content for accurate parsing.");
      return;
    }

    setStep("parsing");
    setError(null);

    try {
      const res = await fetch("/api/cv/parse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cvText }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Parsing failed");
        setStep("error");
        return;
      }

      setStep("complete");
    } catch {
      setError("Parsing failed. Please try again.");
      setStep("error");
    }
  }

  return (
    <div className="mx-auto max-w-2xl">
      <SectionHeading
        eyebrow="Career Passport"
        title="Upload your CV"
        description="Upload your CV and let AI extract your career data into a structured Career Passport."
      />

      {step === "upload" && (
        <div className="space-y-6">
          <FileUpload onFileSelect={handleFileSelect} />

          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-[var(--surface-high)]" />
            <span className="text-xs font-medium text-[var(--muted)]">or paste your CV</span>
            <div className="h-px flex-1 bg-[var(--surface-high)]" />
          </div>

          <Button
            variant="quiet"
            className="w-full"
            onClick={() => setStep("text-input")}
          >
            Paste CV text instead
          </Button>
        </div>
      )}

      {step === "text-input" && (
        <div className="space-y-6">
          <Textarea
            label="CV content"
            placeholder="Paste your CV/resume content here..."
            value={cvText}
            onChange={(e) => setCvText(e.target.value)}
            className="min-h-[300px]"
          />
          {error && (
            <p className="text-sm text-[var(--danger)]">{error}</p>
          )}
          <div className="flex gap-3">
            <Button variant="quiet" onClick={() => setStep("upload")}>
              Back
            </Button>
            <Button onClick={handleParse} className="flex-1">
              Parse with AI
            </Button>
          </div>
        </div>
      )}

      {step === "parsing" && (
        <Card className="flex flex-col items-center gap-4 py-12 text-center">
          <Loader2 className="h-8 w-8 animate-spin text-[var(--accent)]" />
          <div>
            <CardTitle>Parsing your CV</CardTitle>
            <p className="mt-1 text-sm text-[var(--ink-muted)]">
              AI is extracting your career data. This takes 10-30 seconds.
            </p>
          </div>
        </Card>
      )}

      {step === "complete" && (
        <Card className="flex flex-col items-center gap-4 py-12 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[rgba(16,185,129,0.1)]">
            <CheckCircle2 className="h-7 w-7 text-[var(--success)]" />
          </div>
          <div>
            <CardTitle>Career Passport created</CardTitle>
            <p className="mt-1 text-sm text-[var(--ink-muted)]">
              Your CV has been parsed and your Career Passport is ready to review.
            </p>
          </div>
          <Button onClick={() => router.push("/passport")}>
            View Career Passport
          </Button>
        </Card>
      )}

      {step === "error" && (
        <Card className="flex flex-col items-center gap-4 py-12 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[rgba(239,68,68,0.1)]">
            <AlertCircle className="h-7 w-7 text-[var(--danger)]" />
          </div>
          <div>
            <CardTitle>Something went wrong</CardTitle>
            <p className="mt-1 text-sm text-[var(--ink-muted)]">
              {error || "An unexpected error occurred."}
            </p>
          </div>
          <Button variant="quiet" onClick={() => setStep("upload")}>
            Try again
          </Button>
        </Card>
      )}
    </div>
  );
}
