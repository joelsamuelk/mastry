import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { discoverJobs } from "@/lib/ai/job-discovery";

export async function POST(request: Request) {
  try {
    const supabase = await createSupabaseServerClient();
    if (!supabase) return NextResponse.json({ error: "Server not configured" }, { status: 500 });

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await request.json();
    const { query, filters } = body;

    if (!query) return NextResponse.json({ error: "Search query is required" }, { status: 400 });

    const admin = createSupabaseAdminClient();
    if (!admin) return NextResponse.json({ error: "Server not configured" }, { status: 500 });

    // Get passport and goals
    const [passportRes, goalsRes] = await Promise.all([
      admin.from("career_passports").select("*").eq("user_id", user.id).maybeSingle(),
      admin.from("career_goals").select("*").eq("user_id", user.id).maybeSingle(),
    ]);

    const passport = passportRes.data;
    if (!passport) return NextResponse.json({ error: "Complete your Career Passport first" }, { status: 400 });

    // Create search record
    const { data: search, error: insertError } = await admin
      .from("job_searches")
      .insert({
        user_id: user.id,
        query,
        filters: filters ?? {},
        status: "searching",
      })
      .select()
      .single();

    if (insertError) return NextResponse.json({ error: "Failed to create search" }, { status: 500 });

    // Run AI discovery
    const results = await discoverJobs({
      passport: {
        career_summary: passport.career_summary,
        current_role_title: passport.current_role_title,
        years_experience: passport.years_experience,
        seniority_level: passport.seniority_level,
        skills: passport.skills ?? [],
      },
      goals: goalsRes.data,
      query,
      filters,
    });

    // Update search with results
    await admin
      .from("job_searches")
      .update({
        results,
        result_count: results.length,
        status: "completed",
      })
      .eq("id", search.id);

    return NextResponse.json({ data: { ...search, results, result_count: results.length, status: "completed" } });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Job discovery failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
