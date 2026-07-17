import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { prepareInterview } from "@/lib/ai/interview-coach";

export async function POST(request: Request) {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return NextResponse.json({ error: "Service unavailable" }, { status: 503 });

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const { opportunityId, company, role_title } = body;

  if (!company || !role_title) {
    return NextResponse.json({ error: "company and role_title required" }, { status: 400 });
  }

  // Fetch passport and employers
  const { data: passport } = await supabase
    .from("career_passports")
    .select("*")
    .eq("user_id", user.id)
    .maybeSingle();

  if (!passport?.career_summary) {
    return NextResponse.json({ error: "Complete your Career Passport first" }, { status: 400 });
  }

  const { data: employers } = await supabase
    .from("employers")
    .select("*")
    .eq("passport_id", passport.id)
    .order("start_date", { ascending: false });

  // Get opportunity description if opportunityId provided
  let description: string | null = null;
  if (opportunityId) {
    const { data: opp } = await supabase
      .from("opportunities")
      .select("description")
      .eq("id", opportunityId)
      .eq("user_id", user.id)
      .single();
    description = opp?.description ?? null;
  }

  const result = await prepareInterview({
    passport,
    employers: employers ?? [],
    opportunity: { title: role_title, company, description },
  });

  // Save to database
  const { data: prep, error } = await supabase
    .from("interview_preps")
    .insert({
      user_id: user.id,
      opportunity_id: opportunityId || null,
      company,
      role_title,
      likely_questions: result.likely_questions,
      star_examples: result.star_examples,
      company_research: result.company_research,
      questions_to_ask: result.questions_to_ask,
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ data: prep });
}
