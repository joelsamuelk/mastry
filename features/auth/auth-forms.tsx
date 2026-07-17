"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Brand } from "@/components/brand/brand";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";
import {
  loginSchema,
  signupSchema,
  type LoginFormData,
  type SignupFormData,
} from "@/lib/validations/auth";

export function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data: LoginFormData) {
    setError(null);
    setLoading(true);

    const supabase = createSupabaseBrowserClient();
    if (!supabase) {
      setError("Service unavailable");
      setLoading(false);
      return;
    }

    const { error: authError } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <div className="mx-auto w-full max-w-sm">
      <div className="mb-10 text-center">
        <Brand size="lg" className="mb-4" />
        <h1 className="font-display text-2xl font-bold text-[var(--ink)]">
          Welcome back
        </h1>
        <p className="mt-1 text-sm text-[var(--ink-muted)]">
          Sign in to continue to your career dashboard
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <Input
          label="Email"
          type="email"
          placeholder="you@example.com"
          error={errors.email?.message}
          {...register("email")}
        />
        <Input
          label="Password"
          type="password"
          placeholder="Enter your password"
          error={errors.password?.message}
          {...register("password")}
        />

        {error && (
          <p className="rounded-xl bg-[rgba(239,68,68,0.08)] px-4 py-2.5 text-sm text-[var(--danger)]">
            {error}
          </p>
        )}

        <Button type="submit" disabled={loading} className="mt-2 w-full">
          {loading ? "Signing in..." : "Sign in"}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-[var(--ink-muted)]">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="font-semibold text-[var(--accent)] hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
}

export function SignupForm() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  async function onSubmit(data: SignupFormData) {
    setError(null);
    setLoading(true);

    const supabase = createSupabaseBrowserClient();
    if (!supabase) {
      setError("Service unavailable");
      setLoading(false);
      return;
    }

    const { error: authError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: { full_name: data.full_name },
      },
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    router.push("/onboarding");
    router.refresh();
  }

  return (
    <div className="mx-auto w-full max-w-sm">
      <div className="mb-10 text-center">
        <Brand size="lg" className="mb-4" />
        <h1 className="font-display text-2xl font-bold text-[var(--ink)]">
          Build your Career Passport
        </h1>
        <p className="mt-1 text-sm text-[var(--ink-muted)]">
          Create your account and let AI master your career
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <Input
          label="Full name"
          placeholder="Joel Kapepula"
          error={errors.full_name?.message}
          {...register("full_name")}
        />
        <Input
          label="Email"
          type="email"
          placeholder="you@example.com"
          error={errors.email?.message}
          {...register("email")}
        />
        <Input
          label="Password"
          type="password"
          placeholder="At least 8 characters"
          error={errors.password?.message}
          {...register("password")}
        />

        {error && (
          <p className="rounded-xl bg-[rgba(239,68,68,0.08)] px-4 py-2.5 text-sm text-[var(--danger)]">
            {error}
          </p>
        )}

        <Button type="submit" disabled={loading} className="mt-2 w-full">
          {loading ? "Creating account..." : "Create account"}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-[var(--ink-muted)]">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-[var(--accent)] hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
