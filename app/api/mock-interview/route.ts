import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { startMockInterview, respondToCandidate, generateFeedback } from "@/lib/ai/mock-interviewer";
import type { MockInterviewMessage, MockInterviewType } from "@/types/domain";

// Start a new mock interview
export async function POST(request: Request) {
  try {
    const supabase = await createSupabaseServerClient();
    if (!supabase) return NextResponse.json({ error: "Server not configured" }, { status: 500 });

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await request.json();
    const { company, role_title, interview_type, difficulty, opportunity_id } = body;

    if (!company || !role_title) {
      return NextResponse.json({ error: "Company and role are required" }, { status: 400 });
    }

    const admin = createSupabaseAdminClient();
    if (!admin) return NextResponse.json({ error: "Server not configured" }, { status: 500 });

    // Get passport for context
    const { data: passport } = await admin
      .from("career_passports")
      .select("*")
      .eq("user_id", user.id)
      .maybeSingle();

    if (!passport) return NextResponse.json({ error: "Complete your Career Passport first" }, { status: 400 });

    const interviewerMessage = await startMockInterview({
      passport: {
        career_summary: passport.career_summary,
        current_role_title: passport.current_role_title,
        years_experience: passport.years_experience,
        seniority_level: passport.seniority_level,
        skills: passport.skills ?? [],
      },
      company,
      role_title,
      interview_type: (interview_type ?? "behavioral") as MockInterviewType,
      difficulty: difficulty ?? "medium",
    });

    const messages: MockInterviewMessage[] = [
      {
        role: "interviewer",
        content: interviewerMessage,
        timestamp: new Date().toISOString(),
      },
    ];

    const { data, error } = await admin
      .from("mock_interviews")
      .insert({
        user_id: user.id,
        opportunity_id: opportunity_id ?? null,
        company,
        role_title,
        interview_type: interview_type ?? "behavioral",
        difficulty: difficulty ?? "medium",
        messages,
        status: "in_progress",
      })
      .select()
      .single();

    if (error) return NextResponse.json({ error: "Failed to create mock interview" }, { status: 500 });

    return NextResponse.json({ data });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to start mock interview";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// Continue a mock interview (send candidate response)
export async function PATCH(request: Request) {
  try {
    const supabase = await createSupabaseServerClient();
    if (!supabase) return NextResponse.json({ error: "Server not configured" }, { status: 500 });

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await request.json();
    const { id, response: candidateResponse, end_interview } = body;

    if (!id) return NextResponse.json({ error: "Mock interview ID is required" }, { status: 400 });

    const admin = createSupabaseAdminClient();
    if (!admin) return NextResponse.json({ error: "Server not configured" }, { status: 500 });

    // Get current interview
    const { data: interview } = await admin
      .from("mock_interviews")
      .select("*")
      .eq("id", id)
      .eq("user_id", user.id)
      .single();

    if (!interview) return NextResponse.json({ error: "Interview not found" }, { status: 404 });
    if (interview.status === "completed") return NextResponse.json({ error: "Interview already completed" }, { status: 400 });

    const currentMessages = interview.messages as MockInterviewMessage[];

    // If ending the interview, generate feedback
    if (end_interview) {
      const feedback = await generateFeedback({
        company: interview.company,
        role_title: interview.role_title,
        interview_type: interview.interview_type as MockInterviewType,
        messages: currentMessages,
      });

      const { data: updated } = await admin
        .from("mock_interviews")
        .update({
          status: "completed",
          feedback,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id)
        .select()
        .single();

      return NextResponse.json({ data: updated });
    }

    if (!candidateResponse) {
      return NextResponse.json({ error: "Response is required" }, { status: 400 });
    }

    // Add candidate message
    const updatedMessages: MockInterviewMessage[] = [
      ...currentMessages,
      {
        role: "candidate",
        content: candidateResponse,
        timestamp: new Date().toISOString(),
      },
    ];

    // Get interviewer response
    const result = await respondToCandidate({
      company: interview.company,
      role_title: interview.role_title,
      interview_type: interview.interview_type as MockInterviewType,
      difficulty: interview.difficulty,
      messages: currentMessages,
      candidate_response: candidateResponse,
    });

    updatedMessages.push({
      role: "interviewer",
      content: result.message,
      timestamp: new Date().toISOString(),
    });

    const updatePayload: Record<string, unknown> = {
      messages: updatedMessages,
      updated_at: new Date().toISOString(),
    };

    // Auto-complete if interviewer signals end
    if (result.is_complete) {
      const feedback = await generateFeedback({
        company: interview.company,
        role_title: interview.role_title,
        interview_type: interview.interview_type as MockInterviewType,
        messages: updatedMessages,
      });
      updatePayload.status = "completed";
      updatePayload.feedback = feedback;
    }

    const { data: updated } = await admin
      .from("mock_interviews")
      .update(updatePayload)
      .eq("id", id)
      .select()
      .single();

    return NextResponse.json({ data: updated });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to continue interview";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
