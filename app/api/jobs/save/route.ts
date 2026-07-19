import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import type { JobSearchResult } from "@/types/domain";

export async function POST(request: Request) {
  try {
    const supabase = await createSupabaseServerClient();
    if (!supabase) return NextResponse.json({ error: "Server not configured" }, { status: 500 });

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body: { job: JobSearchResult } = await request.json();
    const { job } = body;

    if (!job?.title || !job?.company) {
      return NextResponse.json({ error: "Job title and company are required" }, { status: 400 });
    }

    const admin = createSupabaseAdminClient();
    if (!admin) return NextResponse.json({ error: "Server not configured" }, { status: 500 });

    const { data, error } = await admin
      .from("opportunities")
      .insert({
        user_id: user.id,
        title: job.title,
        company: job.company,
        location: job.location,
        salary_min: job.salary_min,
        salary_max: job.salary_max,
        salary_currency: job.salary_currency ?? "GBP",
        remote_type: job.remote_type,
        description: job.description,
        url: job.url,
        source: job.source ?? "ai_discovery",
        status: "saved",
      })
      .select()
      .single();

    if (error) return NextResponse.json({ error: "Failed to save opportunity" }, { status: 500 });

    return NextResponse.json({ data });
  } catch {
    return NextResponse.json({ error: "Failed to save job" }, { status: 500 });
  }
}
