import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { scoreMatch } from "@/lib/ai/match-scorer";

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

  const { opportunityId } = body;
  if (!opportunityId) return NextResponse.json({ error: "opportunityId required" }, { status: 400 });

  // Fetch passport, goals, and opportunity in parallel
  const [passportRes, goalsRes, oppRes] = await Promise.all([
    supabase.from("career_passports").select("*").eq("user_id", user.id).maybeSingle(),
    supabase.from("career_goals").select("*").eq("user_id", user.id).maybeSingle(),
    supabase.from("opportunities").select("*").eq("id", opportunityId).eq("user_id", user.id).single(),
  ]);

  if (!passportRes.data?.career_summary) {
    return NextResponse.json({ error: "Complete your Career Passport first" }, { status: 400 });
  }
  if (!oppRes.data) {
    return NextResponse.json({ error: "Opportunity not found" }, { status: 404 });
  }

  try {
    const { score, breakdown } = await scoreMatch({
      passport: passportRes.data,
      goals: goalsRes.data,
      opportunity: oppRes.data,
    });

    // Save scores to the opportunity
    await supabase
      .from("opportunities")
      .update({ match_score: score, match_breakdown: breakdown, updated_at: new Date().toISOString() })
      .eq("id", opportunityId);

    return NextResponse.json({ score, breakdown });
  } catch (error) {
    console.error("Match scoring failed:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Match scoring failed" },
      { status: 500 },
    );
  }
}
