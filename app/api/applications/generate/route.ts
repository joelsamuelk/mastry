import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { generateCoverLetter } from "@/lib/ai/cover-letter";
import type { MaterialType } from "@/types/domain";

export async function POST(request: Request) {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return NextResponse.json({ error: "Service unavailable" }, { status: 503 });

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
  const { opportunityId, type } = body as { opportunityId: string; type: MaterialType };

  if (!opportunityId || !type) {
    return NextResponse.json({ error: "opportunityId and type required" }, { status: 400 });
  }

  // Fetch passport, employers, and opportunity
  const [passportRes, oppRes] = await Promise.all([
    supabase.from("career_passports").select("*").eq("user_id", user.id).maybeSingle(),
    supabase.from("opportunities").select("*").eq("id", opportunityId).eq("user_id", user.id).single(),
  ]);

  if (!passportRes.data?.career_summary) {
    return NextResponse.json({ error: "Complete your Career Passport first" }, { status: 400 });
  }
  if (!oppRes.data) {
    return NextResponse.json({ error: "Opportunity not found" }, { status: 404 });
  }

  const { data: employers } = await supabase
    .from("employers")
    .select("*")
    .eq("passport_id", passportRes.data.id)
    .order("start_date", { ascending: false });

  try {
    const content = await generateCoverLetter({
      passport: passportRes.data,
      employers: employers ?? [],
      opportunity: oppRes.data,
      type: type === "outreach_message" ? "outreach_message" : "cover_letter",
    });

    const title = type === "cover_letter"
      ? `Cover Letter — ${oppRes.data.title} at ${oppRes.data.company}`
      : `Outreach — ${oppRes.data.title} at ${oppRes.data.company}`;

    // Save to database
    const { data: material, error } = await supabase
      .from("application_materials")
      .insert({
        user_id: user.id,
        opportunity_id: opportunityId,
        type,
        title,
        content,
      })
      .select()
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({ data: material });
  } catch (error) {
    console.error("Content generation failed:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Content generation failed" },
      { status: 500 },
    );
  }
}
