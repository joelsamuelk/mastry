import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { parseCV } from "@/lib/anthropic/cv-parser";

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

  const body = await request.json();
  const cvText = body.cvText as string;

  if (!cvText || cvText.trim().length < 50) {
    return NextResponse.json(
      { error: "CV text too short to parse" },
      { status: 400 },
    );
  }

  // Update status to processing
  await supabase
    .from("career_passports")
    .update({ ai_extraction_status: "processing" })
    .eq("user_id", user.id);

  try {
    const parsed = await parseCV(cvText);

    // Update passport with parsed data
    await supabase
      .from("career_passports")
      .update({
        career_summary: parsed.career_summary,
        current_role_title: parsed.current_role_title,
        current_company: parsed.current_company,
        years_experience: parsed.years_experience,
        seniority_level: parsed.seniority_level,
        skills: parsed.skills,
        languages: parsed.languages,
        raw_cv_text: cvText,
        ai_extraction_status: "completed",
        ai_extraction_result: parsed,
        updated_at: new Date().toISOString(),
      })
      .eq("user_id", user.id);

    // Get passport ID
    const { data: passport } = await supabase
      .from("career_passports")
      .select("id")
      .eq("user_id", user.id)
      .single();

    if (passport) {
      // Clear old employers/education/certifications before inserting new ones
      await Promise.all([
        supabase.from("employers").delete().eq("passport_id", passport.id),
        supabase.from("education").delete().eq("passport_id", passport.id),
        supabase.from("certifications").delete().eq("passport_id", passport.id),
      ]);

      // Insert employers
      if (parsed.employers.length > 0) {
        await supabase.from("employers").insert(
          parsed.employers.map((emp) => ({
            passport_id: passport.id,
            ...emp,
          })),
        );
      }

      // Insert education
      if (parsed.education.length > 0) {
        await supabase.from("education").insert(
          parsed.education.map((edu) => ({
            passport_id: passport.id,
            ...edu,
          })),
        );
      }

      // Insert certifications
      if (parsed.certifications.length > 0) {
        await supabase.from("certifications").insert(
          parsed.certifications.map((cert) => ({
            passport_id: passport.id,
            ...cert,
          })),
        );
      }
    }

    return NextResponse.json({ success: true, data: parsed });
  } catch (error) {
    await supabase
      .from("career_passports")
      .update({ ai_extraction_status: "failed" })
      .eq("user_id", user.id);

    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Parsing failed" },
      { status: 500 },
    );
  }
}
