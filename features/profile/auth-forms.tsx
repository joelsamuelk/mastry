"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { startTransition, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  Layers3,
  Rocket,
  Sparkles,
} from "lucide-react";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { Brand } from "@/components/brand/brand";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pill } from "@/components/ui/pill";
import { SurfaceCard } from "@/components/ui/surface-card";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";
import { cn } from "@/lib/utils";

const supabaseConfigMessage =
  "Supabase env vars are not configured yet. Add your real project URL and anon key in .env.local to enable authentication.";

const careerGoalOptions = [
  {
    value: "Promotion",
    title: "Promotion",
    description: "Elevate within your current organization.",
    icon: ArrowUpRight,
  },
  {
    value: "Career Switch",
    title: "Career Switch",
    description: "Pivot to a new industry or role.",
    icon: Layers3,
  },
  {
    value: "Start-up / Launch",
    title: "Start-up / Launch",
    description: "Build something new from scratch.",
    icon: Rocket,
  },
] as const;

const focusAreaOptions = [
  { value: "distributed-systems", label: "Distributed Systems" },
  { value: "leadership", label: "Leadership" },
  { value: "product-design", label: "Product Design" },
  { value: "design-systems", label: "Design Systems" },
  { value: "platform-engineering", label: "Platform Engineering" },
  { value: "career-strategy", label: "Career Strategy" },
  { value: "fintech", label: "FinTech" },
  { value: "ai-product", label: "AI Product" },
] as const;

const experienceLevels = [
  "Early Career",
  "Mid Career",
  "Senior IC",
  "Manager+",
] as const;

const industryOptions = [
  "SaaS",
  "FinTech",
  "AI / ML",
  "Design",
  "Platform",
] as const;

const onboardingSteps = [
  {
    title: "Let’s craft your curated trajectory.",
    description:
      "Help us understand where you stand and where your ambition is leading you.",
  },
  {
    title: "Choose the arenas you want to deepen.",
    description:
      "These focus areas shape mentor matching and the guidance layer around your plan.",
  },
  {
    title: "Add the context that makes matching sharper.",
    description:
      "A little more operating context helps Mastry recommend the right mentors and milestones.",
  },
  {
    title: "Review your curator brief.",
    description:
      "This summary is what Mastry will use to initialize your first growth dashboard state.",
  },
] as const;

const signInSchema = z.object({
  email: z.string().email("Enter a valid email address."),
  password: z.string().min(8, "Password must be at least 8 characters."),
});

const signUpSchema = z.object({
  fullName: z.string().min(2, "Enter your full name."),
  email: z.string().email("Enter a valid email address."),
  password: z.string().min(8, "Password must be at least 8 characters."),
});

const onboardingSchema = z.object({
  currentRole: z.string().min(2, "Tell us your current role."),
  careerGoal: z.enum(["Promotion", "Career Switch", "Start-up / Launch"]),
  focusAreas: z.array(z.string()).min(1, "Choose at least one focus area."),
  targetRole: z.string().min(2, "Tell us the role or outcome you are growing toward."),
  industry: z.string().optional(),
  experienceLevel: z.string().optional(),
});

type SignInValues = z.infer<typeof signInSchema>;
type SignUpValues = z.infer<typeof signUpSchema>;
type OnboardingValues = z.infer<typeof onboardingSchema>;

interface AuthShellProps {
  step?: string;
  title: string;
  description: string;
  children: ReactNode;
  footer: ReactNode;
}

function AuthShell({ step, title, description, children, footer }: AuthShellProps) {
  return (
    <div className="min-h-screen bg-[var(--surface)] px-4 py-8 md:px-6 md:py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 lg:flex-row lg:items-start lg:gap-20">
        <div className="space-y-8 pt-4 lg:max-w-[29rem] lg:pt-14">
          <Brand />
          <div className="space-y-5">
            {step ? <p className="eyebrow">{step}</p> : null}
            <h1 className="font-display text-balance text-4xl font-extrabold tracking-[-0.07em] text-[var(--ink)] md:text-5xl">
              {title}
            </h1>
            <p className="max-w-lg text-sm leading-7 text-[var(--ink-muted)] md:text-base">
              {description}
            </p>
          </div>
        </div>
        <SurfaceCard className="w-full max-w-2xl p-6 md:p-8">
          <div className="space-y-6">
            {children}
            <div className="text-sm text-[var(--ink-muted)]">{footer}</div>
          </div>
        </SurfaceCard>
      </div>
    </div>
  );
}

function FormError({ message }: { message?: string }) {
  if (!message) {
    return null;
  }

  return <p className="text-sm text-red-500">{message}</p>;
}

function FormStatus({
  tone,
  message,
}: {
  tone: "error" | "success" | "info";
  message: string | null;
}) {
  if (!message) {
    return null;
  }

  return (
    <div
      className={cn(
        "rounded-[24px] px-4 py-3 text-sm",
        tone === "error" && "bg-red-50 text-red-600",
        tone === "success" && "bg-emerald-50 text-emerald-700",
        tone === "info" && "bg-[var(--surface-low)] text-[var(--ink-muted)]",
      )}
    >
      {message}
    </div>
  );
}

function getSafeNextPath(nextPath: string | null) {
  if (!nextPath || !nextPath.startsWith("/")) {
    return null;
  }

  return nextPath;
}

export function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = useMemo(() => createSupabaseBrowserClient(), []);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = handleSubmit(async (values) => {
    setSubmissionError(null);
    setSuccessMessage(null);

    if (!supabase) {
      setSubmissionError(supabaseConfigMessage);
      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });

    if (error) {
      setSubmissionError(error.message);
      return;
    }

    const nextPath = getSafeNextPath(searchParams.get("next"));
    const hasCompletedOnboarding = Boolean(data.user?.user_metadata?.onboarding_completed);
    const destination = hasCompletedOnboarding ? nextPath ?? "/dashboard" : "/onboarding";

    startTransition(() => {
      router.replace(destination);
      router.refresh();
    });
  });

  return (
    <AuthShell
      title="Continue your trajectory."
      description="Sign in to enter your growth dashboard, review mentor matches, and continue your current plan."
      footer={
        <>
          New to Mastry?{" "}
          <Link href="/signup" className="font-semibold text-[var(--accent)]">
            Create an account
          </Link>
        </>
      }
    >
      <form className="space-y-5" onSubmit={onSubmit}>
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
            Email
          </label>
          <Input type="email" placeholder="you@company.com" {...register("email")} />
          <FormError message={errors.email?.message} />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
            Password
          </label>
          <Input type="password" placeholder="••••••••" {...register("password")} />
          <FormError message={errors.password?.message} />
        </div>

        <Button type="submit" size="lg" disabled={isSubmitting}>
          Sign In
        </Button>
      </form>

      <FormStatus tone="error" message={submissionError} />
      <FormStatus tone="success" message={successMessage} />
    </AuthShell>
  );
}

export function SignUpForm() {
  const router = useRouter();
  const supabase = useMemo(() => createSupabaseBrowserClient(), []);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = handleSubmit(async (values) => {
    setSubmissionError(null);
    setSuccessMessage(null);

    if (!supabase) {
      setSubmissionError(supabaseConfigMessage);
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
        data: {
          full_name: values.fullName,
          onboarding_completed: false,
        },
      },
    });

    if (error) {
      setSubmissionError(error.message);
      return;
    }

    if (!data.session) {
      setSuccessMessage("Account created. Check your email to confirm your address and continue.");
      return;
    }

    startTransition(() => {
      router.replace("/onboarding");
      router.refresh();
    });
  });

  return (
    <AuthShell
      title="Start with a more intentional growth system."
      description="Create your account to define goals, discover mentors, and enter the Personal OS."
      footer={
        <>
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-[var(--accent)]">
            Sign in
          </Link>
        </>
      }
    >
      <form className="space-y-5" onSubmit={onSubmit}>
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
            Full name
          </label>
          <Input placeholder="Alex Sterling" {...register("fullName")} />
          <FormError message={errors.fullName?.message} />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
            Email
          </label>
          <Input type="email" placeholder="you@company.com" {...register("email")} />
          <FormError message={errors.email?.message} />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
            Password
          </label>
          <Input type="password" placeholder="Create a secure password" {...register("password")} />
          <FormError message={errors.password?.message} />
        </div>

        <Button type="submit" size="lg" disabled={isSubmitting}>
          Continue Journey
        </Button>
      </form>

      <FormStatus tone="error" message={submissionError} />
      <FormStatus tone="success" message={successMessage} />
    </AuthShell>
  );
}

function StepCard({
  active,
  icon: Icon,
  title,
  description,
  onClick,
}: {
  active: boolean;
  icon: typeof ArrowUpRight;
  title: string;
  description: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-[28px] p-5 text-left shadow-[0_12px_32px_rgba(45,51,56,0.06)] transition",
        active ? "bg-[var(--surface-low)]" : "bg-white hover:-translate-y-0.5",
      )}
    >
      <div className="flex items-start gap-4">
        <div className="grid size-11 place-items-center rounded-full bg-white text-[var(--accent)]">
          <Icon className="size-5" />
        </div>
        <div className="space-y-1">
          <p className="text-base font-semibold text-[var(--ink)]">{title}</p>
          <p className="text-sm text-[var(--ink-muted)]">{description}</p>
        </div>
      </div>
    </button>
  );
}

export function OnboardingForm() {
  const router = useRouter();
  const supabase = useMemo(() => createSupabaseBrowserClient(), []);
  const [stepIndex, setStepIndex] = useState(0);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const {
    control,
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<OnboardingValues>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      careerGoal: "Promotion",
      focusAreas: [],
      targetRole: "",
      industry: "",
      experienceLevel: "",
    },
  });

  const values = useWatch({ control });
  const step = onboardingSteps[stepIndex];
  const selectedFocusAreas = values.focusAreas ?? [];
  const stepProgress = ((stepIndex + 1) / onboardingSteps.length) * 100;

  const nextStep = async () => {
    const fieldsPerStep: Array<Array<keyof OnboardingValues>> = [
      ["currentRole", "careerGoal"],
      ["focusAreas"],
      ["targetRole"],
      [],
    ];

    const isValid = await trigger(fieldsPerStep[stepIndex]);

    if (!isValid) {
      return;
    }

    setStepIndex((current) => Math.min(current + 1, onboardingSteps.length - 1));
  };

  const previousStep = () => {
    setStepIndex((current) => Math.max(current - 1, 0));
  };

  const onSubmit = handleSubmit(async (formValues) => {
    setSubmissionError(null);

    if (!supabase) {
      setSubmissionError(supabaseConfigMessage);
      return;
    }

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      setSubmissionError("Your session has expired. Sign in again to continue.");
      startTransition(() => {
        router.replace("/login");
      });
      return;
    }

    const completedAt = new Date().toISOString();

    const profileResult = await supabase.from("profiles").upsert(
      {
        id: user.id,
        full_name:
          typeof user.user_metadata?.full_name === "string"
            ? user.user_metadata.full_name
            : user.email?.split("@")[0] ?? null,
        current_role: formValues.currentRole,
        industry: formValues.industry || null,
        experience_level: formValues.experienceLevel || null,
        onboarding_completed_at: completedAt,
      },
      {
        onConflict: "id",
      },
    );

    if (profileResult.error) {
      setSubmissionError(profileResult.error.message);
      return;
    }

    const focusAreaResult = await supabase
      .from("focus_areas")
      .select("id, slug")
      .in("slug", formValues.focusAreas);

    if (focusAreaResult.error) {
      setSubmissionError(focusAreaResult.error.message);
      return;
    }

    const deleteFocusAreaResult = await supabase
      .from("profile_focus_areas")
      .delete()
      .eq("profile_id", user.id);

    if (deleteFocusAreaResult.error) {
      setSubmissionError(deleteFocusAreaResult.error.message);
      return;
    }

    if (focusAreaResult.data.length) {
      const insertFocusAreaResult = await supabase.from("profile_focus_areas").insert(
        focusAreaResult.data.map((focusArea) => ({
          profile_id: user.id,
          focus_area_id: focusArea.id,
        })),
      );

      if (insertFocusAreaResult.error) {
        setSubmissionError(insertFocusAreaResult.error.message);
        return;
      }
    }

    const existingGoalResult = await supabase
      .from("goals")
      .select("id")
      .eq("user_id", user.id)
      .in("status", ["draft", "active"])
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (existingGoalResult.error) {
      setSubmissionError(existingGoalResult.error.message);
      return;
    }

    const focusAreaSummary = focusAreaOptions
      .filter((option) => formValues.focusAreas.includes(option.value))
      .map((option) => option.label)
      .join(", ");

    const goalPayload = {
      user_id: user.id,
      status: "active",
      title: `${formValues.careerGoal}: ${formValues.targetRole}`,
      summary: focusAreaSummary || null,
      objective_type: formValues.careerGoal,
      desired_role: formValues.targetRole,
    };

    const goalResult = existingGoalResult.data?.id
      ? await supabase.from("goals").update(goalPayload).eq("id", existingGoalResult.data.id)
      : await supabase.from("goals").insert(goalPayload);

    if (goalResult.error) {
      setSubmissionError(goalResult.error.message);
      return;
    }

    const authUpdateResult = await supabase.auth.updateUser({
      data: {
        onboarding_completed: true,
        full_name:
          typeof user.user_metadata?.full_name === "string"
            ? user.user_metadata.full_name
            : user.email?.split("@")[0] ?? null,
      },
    });

    if (authUpdateResult.error) {
      setSubmissionError(authUpdateResult.error.message);
      return;
    }

    startTransition(() => {
      router.replace("/dashboard");
      router.refresh();
    });
  });

  return (
    <AuthShell
      step={`Step ${String(stepIndex + 1).padStart(2, "0")} / 04`}
      title={step.title}
      description={step.description}
      footer={<span>Your answers are stored in Supabase and used to initialize your profile.</span>}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-4 gap-3">
          {onboardingSteps.map((_, index) => (
            <div key={`step-${index}`} className="h-1 rounded-full bg-[var(--surface-high)]">
              <div
                className="h-full rounded-full bg-[var(--accent)] transition-all"
                style={{
                  width:
                    index < stepIndex ? "100%" : index === stepIndex ? `${stepProgress}%` : "0%",
                }}
              />
            </div>
          ))}
        </div>

        <form className="space-y-6" onSubmit={onSubmit}>
          {stepIndex === 0 ? (
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                  What is your current role?
                </label>
                <Input
                  placeholder="e.g. Senior Product Designer"
                  {...register("currentRole")}
                />
                <FormError message={errors.currentRole?.message} />
              </div>

              <div className="space-y-3">
                <label className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                  What is your career goal?
                </label>
                <div className="grid gap-3">
                  {careerGoalOptions.map((option) => (
                    <StepCard
                      key={option.value}
                      active={values.careerGoal === option.value}
                      icon={option.icon}
                      title={option.title}
                      description={option.description}
                      onClick={() =>
                        setValue("careerGoal", option.value, { shouldValidate: true })
                      }
                    />
                  ))}
                </div>
                <FormError message={errors.careerGoal?.message} />
              </div>
            </div>
          ) : null}

          {stepIndex === 1 ? (
            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                  Focus areas
                </label>
                <p className="text-sm text-[var(--ink-muted)]">
                  Select the domains you most want mentors and guidance to emphasize.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                {focusAreaOptions.map((option) => {
                  const active = selectedFocusAreas.includes(option.value);

                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => {
                        const next = active
                          ? selectedFocusAreas.filter((value) => value !== option.value)
                          : [...selectedFocusAreas, option.value];

                        setValue("focusAreas", next, { shouldValidate: true });
                      }}
                      className={cn(
                        "rounded-full px-4 py-3 text-sm font-semibold transition",
                        active
                          ? "bg-[rgba(78,69,228,0.12)] text-[var(--accent)]"
                          : "bg-white text-[var(--ink-muted)] shadow-[0_12px_32px_rgba(45,51,56,0.06)] hover:-translate-y-0.5",
                      )}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>
              <FormError message={errors.focusAreas?.message} />
            </div>
          ) : null}

          {stepIndex === 2 ? (
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                  What role or outcome are you growing toward?
                </label>
                <Input
                  placeholder="e.g. Staff Engineer, Principal Designer"
                  {...register("targetRole")}
                />
                <FormError message={errors.targetRole?.message} />
              </div>

              <div className="space-y-3">
                <label className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                  Industry
                </label>
                <div className="flex flex-wrap gap-3">
                  {industryOptions.map((industry) => (
                    <button
                      key={industry}
                      type="button"
                      onClick={() => setValue("industry", values.industry === industry ? "" : industry)}
                      className={cn(
                        "rounded-full px-4 py-3 text-sm font-semibold transition",
                        values.industry === industry
                          ? "bg-[rgba(78,69,228,0.12)] text-[var(--accent)]"
                          : "bg-white text-[var(--ink-muted)] shadow-[0_12px_32px_rgba(45,51,56,0.06)]",
                      )}
                    >
                      {industry}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                  Experience level
                </label>
                <div className="grid gap-3 sm:grid-cols-2">
                  {experienceLevels.map((level) => (
                    <button
                      key={level}
                      type="button"
                      onClick={() =>
                        setValue("experienceLevel", values.experienceLevel === level ? "" : level)
                      }
                      className={cn(
                        "rounded-[24px] p-4 text-left text-sm font-semibold transition",
                        values.experienceLevel === level
                          ? "bg-[var(--surface-low)] text-[var(--accent)]"
                          : "bg-white text-[var(--ink-muted)] shadow-[0_12px_32px_rgba(45,51,56,0.06)]",
                      )}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : null}

          {stepIndex === 3 ? (
            <div className="space-y-5">
              <SurfaceCard tone="soft" className="p-5">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <p className="eyebrow">Curator Brief</p>
                    <Pill active>AI</Pill>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-1">
                      <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                        Current role
                      </p>
                      <p className="text-sm font-semibold text-[var(--ink)]">{values.currentRole}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                        Goal
                      </p>
                      <p className="text-sm font-semibold text-[var(--ink)]">{values.careerGoal}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                        Target role
                      </p>
                      <p className="text-sm font-semibold text-[var(--ink)]">{values.targetRole}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                        Experience
                      </p>
                      <p className="text-sm font-semibold text-[var(--ink)]">
                        {values.experienceLevel || "Not specified"}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                      Focus areas
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {selectedFocusAreas.map((focusArea) => {
                        const label =
                          focusAreaOptions.find((option) => option.value === focusArea)?.label ??
                          focusArea;
                        return <Pill key={focusArea}>{label}</Pill>;
                      })}
                    </div>
                  </div>
                </div>
              </SurfaceCard>

              <SurfaceCard tone="soft" className="p-5">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="size-4 text-[var(--accent)]" />
                    <p className="text-sm font-semibold text-[var(--ink)]">The Curator’s Note</p>
                  </div>
                  <p className="text-sm leading-7 text-[var(--ink-muted)]">
                    Once submitted, Mastry will store these answers in Supabase, initialize your
                    profile, and create an active goal record for the dashboard to build on.
                  </p>
                </div>
              </SurfaceCard>
            </div>
          ) : null}

          <FormStatus tone="error" message={submissionError} />

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Button
              type="button"
              variant="ghost"
              size="lg"
              onClick={previousStep}
              disabled={stepIndex === 0 || isSubmitting}
            >
              Back
            </Button>

            {stepIndex < onboardingSteps.length - 1 ? (
              <Button type="button" size="lg" onClick={nextStep} disabled={isSubmitting}>
                Continue Journey
                <ArrowRight className="size-4" />
              </Button>
            ) : (
              <Button type="submit" size="lg" disabled={isSubmitting}>
                Enter Mastry
                <BriefcaseBusiness className="size-4" />
              </Button>
            )}
          </div>
        </form>
      </div>
    </AuthShell>
  );
}
