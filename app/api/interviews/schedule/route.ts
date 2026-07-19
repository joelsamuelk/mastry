import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export async function GET() {
  try {
    const supabase = await createSupabaseServerClient();
    if (!supabase) return NextResponse.json({ error: "Server not configured" }, { status: 500 });

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { data } = await supabase
      .from("interview_schedules")
      .select("*")
      .eq("user_id", user.id)
      .order("scheduled_at", { ascending: true });

    return NextResponse.json({ data: data ?? [] });
  } catch {
    return NextResponse.json({ error: "Failed to load schedules" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const supabase = await createSupabaseServerClient();
    if (!supabase) return NextResponse.json({ error: "Server not configured" }, { status: 500 });

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await request.json();
    const { opportunity_id, company, role_title, round, interview_type, scheduled_at, duration_minutes, location, meeting_link, interviewer_names, notes } = body;

    if (!company || !role_title || !scheduled_at) {
      return NextResponse.json({ error: "Company, role, and date/time are required" }, { status: 400 });
    }

    const admin = createSupabaseAdminClient();
    if (!admin) return NextResponse.json({ error: "Server not configured" }, { status: 500 });

    const { data, error } = await admin
      .from("interview_schedules")
      .insert({
        user_id: user.id,
        opportunity_id: opportunity_id ?? null,
        company,
        role_title,
        round: round ?? "Phone Screen",
        interview_type: interview_type ?? "video",
        scheduled_at,
        duration_minutes: duration_minutes ?? 60,
        location: location ?? null,
        meeting_link: meeting_link ?? null,
        interviewer_names: interviewer_names ?? [],
        notes: notes ?? null,
      })
      .select()
      .single();

    if (error) return NextResponse.json({ error: "Failed to schedule interview" }, { status: 500 });

    return NextResponse.json({ data });
  } catch {
    return NextResponse.json({ error: "Failed to schedule interview" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const supabase = await createSupabaseServerClient();
    if (!supabase) return NextResponse.json({ error: "Server not configured" }, { status: 500 });

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) return NextResponse.json({ error: "Schedule ID is required" }, { status: 400 });

    const admin = createSupabaseAdminClient();
    if (!admin) return NextResponse.json({ error: "Server not configured" }, { status: 500 });

    const { data, error } = await admin
      .from("interview_schedules")
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq("id", id)
      .eq("user_id", user.id)
      .select()
      .single();

    if (error) return NextResponse.json({ error: "Failed to update schedule" }, { status: 500 });

    return NextResponse.json({ data });
  } catch {
    return NextResponse.json({ error: "Failed to update schedule" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const supabase = await createSupabaseServerClient();
    if (!supabase) return NextResponse.json({ error: "Server not configured" }, { status: 500 });

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Schedule ID is required" }, { status: 400 });

    const admin = createSupabaseAdminClient();
    if (!admin) return NextResponse.json({ error: "Server not configured" }, { status: 500 });

    await admin.from("interview_schedules").delete().eq("id", id).eq("user_id", user.id);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete schedule" }, { status: 500 });
  }
}
