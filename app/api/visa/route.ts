import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { analyzeVisa } from "@/lib/ai/visa-analyzer";

export async function POST(request: Request) {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return NextResponse.json({ error: "Service unavailable" }, { status: 503 });

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const { nationality } = body;

  // Fetch passport and goals
  const [passportRes, goalsRes] = await Promise.all([
    supabase.from("career_passports").select("*").eq("user_id", user.id).maybeSingle(),
    supabase.from("career_goals").select("*").eq("user_id", user.id).maybeSingle(),
  ]);

  if (!passportRes.data?.career_summary) {
    return NextResponse.json({ error: "Complete your Career Passport first" }, { status: 400 });
  }

  const analysis = await analyzeVisa({
    nationality: nationality || null,
    target_locations: goalsRes.data?.preferred_locations ?? [],
    current_role: passportRes.data.current_role_title,
    years_experience: passportRes.data.years_experience,
    seniority_level: passportRes.data.seniority_level,
    skills: passportRes.data.skills,
    requires_sponsorship: goalsRes.data?.requires_sponsorship ?? false,
  });

  return NextResponse.json({ data: analysis });
}
