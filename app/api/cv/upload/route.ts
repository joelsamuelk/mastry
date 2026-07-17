import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { PDFParse } from "pdf-parse";

export async function POST(request: Request) {
  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return NextResponse.json({ error: "Service unavailable" }, { status: 503 });
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file") as File | null;
  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const maxSize = 10 * 1024 * 1024;
  if (file.size > maxSize) {
    return NextResponse.json({ error: "File too large (max 10MB)" }, { status: 400 });
  }

  const ext = file.name.split(".").pop()?.toLowerCase();
  const allowedExts = ["pdf", "doc", "docx", "txt"];
  if (!ext || !allowedExts.includes(ext)) {
    return NextResponse.json({ error: "Invalid file type" }, { status: 400 });
  }

  // Read file buffer upfront — the File blob may not be re-readable after Supabase consumes it
  const fileBuffer = Buffer.from(await file.arrayBuffer());

  const fileName = `${user.id}/${Date.now()}.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from("cv-uploads")
    .upload(fileName, fileBuffer, {
      contentType: file.type,
      upsert: true,
    });

  if (uploadError) {
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }

  // Update or create career passport with CV URL
  const { data: existing } = await supabase
    .from("career_passports")
    .select("id")
    .eq("user_id", user.id)
    .maybeSingle();

  if (existing) {
    await supabase
      .from("career_passports")
      .update({
        raw_cv_url: fileName,
        ai_extraction_status: "pending",
        updated_at: new Date().toISOString(),
      })
      .eq("id", existing.id);
  } else {
    await supabase.from("career_passports").insert({
      user_id: user.id,
      raw_cv_url: fileName,
      ai_extraction_status: "pending",
    });
  }

  // Extract text from the file when possible
  let extractedText: string | null = null;

  if (ext === "pdf") {
    try {
      const parser = new PDFParse({ data: new Uint8Array(fileBuffer) });
      const result = await parser.getText();
      extractedText = result.text;
      await parser.destroy();
    } catch (e) {
      console.error("PDF text extraction failed:", e);
    }
  } else if (ext === "txt") {
    extractedText = fileBuffer.toString("utf-8");
  }

  return NextResponse.json({ success: true, fileName, extractedText });
}
