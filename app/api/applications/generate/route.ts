import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { generateEnhancedCoverLetter, type CoverLetterTone, type CoverLetterVersion } from "@/lib/ai/cover-letter-enhanced";

export async function POST(request: Request) {
  try {
    const supabase = await createSupabaseServerClient();
    if (!supabase) return NextResponse.json({ error: "Server not configured" }, { status: 500 });

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await request.json();
    const {
      opportunityId,
      type = "cover_letter",
      tone = "professional",
      version = "standard",
      custom_instructions,
    } = body;

    if (!opportunityId) {
      return NextResponse.json({ error: "Opportunity ID is required" }, { status: 400 });
    }

    const admin = createSupabaseAdminClient();
    if (!admin) return NextResponse.json({ error: "Server not configured" }, { status: 500 });

    // Fetch passport
    const { data: passport } = await admin
      .from("career_passports")
      .select("*")
      .eq("user_id", user.id)
      .maybeSingle();

    if (!passport) return NextResponse.json({ error: "Complete your Career Passport first" }, { status: 400 });

    // Fetch employers and opportunity in parallel
    const [employersRes, oppRes] = await Promise.all([
      admin.from("employers").select("*").eq("passport_id", passport.id).order("start_date", { ascending: false }).limit(3),
      admin.from("opportunities").select("*").eq("id", opportunityId).eq("user_id", user.id).single(),
    ]);

    if (!oppRes.data) return NextResponse.json({ error: "Opportunity not found" }, { status: 404 });

    const content = await generateEnhancedCoverLetter({
      passport: {
        career_summary: passport.career_summary,
        current_role_title: passport.current_role_title,
        current_company: passport.current_company,
        years_experience: passport.years_experience,
        skills: passport.skills ?? [],
      },
      employers: (employersRes.data ?? []).map((e: Record<string, unknown>) => ({
        company_name: e.company_name as string,
        role_title: e.role_title as string,
        achievements: (e.achievements as string[]) ?? [],
      })),
      opportunity: {
        title: oppRes.data.title,
        company: oppRes.data.company,
        description: oppRes.data.description,
      },
      type,
      tone: tone as CoverLetterTone,
      version: version as CoverLetterVersion,
      custom_instructions,
    });

    const typeLabels: Record<string, string> = {
      cover_letter: "Cover Letter",
      outreach_message: "Outreach Message",
      follow_up: "Follow-up Email",
      thank_you: "Thank You Note",
    };

    const materialType = type === "follow_up" || type === "thank_you" ? "outreach_message" : type;

    const { data: material, error: saveError } = await admin
      .from("application_materials")
      .insert({
        user_id: user.id,
        opportunity_id: opportunityId,
        type: materialType,
        title: `${typeLabels[type]} — ${oppRes.data.title} at ${oppRes.data.company}`,
        content,
        metadata: { tone, version, custom_instructions, original_type: type },
      })
      .select()
      .single();

    if (saveError) return NextResponse.json({ error: "Generated content but failed to save" }, { status: 500 });

    return NextResponse.json({ data: material });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to generate content";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
