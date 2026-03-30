create extension if not exists "pgcrypto";

create type public.app_role as enum ('mentee', 'mentor', 'admin');
create type public.mentor_status as enum ('draft', 'pending_review', 'approved', 'rejected', 'suspended');
create type public.goal_status as enum ('draft', 'active', 'completed', 'archived');
create type public.plan_status as enum ('draft', 'active', 'completed', 'archived');
create type public.booking_status as enum ('pending', 'confirmed', 'completed', 'cancelled', 'refunded', 'no_show');
create type public.payment_status as enum ('pending', 'succeeded', 'failed', 'refunded');
create type public.guidance_status as enum ('queued', 'ready', 'failed');

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  role public.app_role not null default 'mentee',
  full_name text,
  headline text,
  avatar_url text,
  current_role text,
  industry text,
  experience_level text,
  timezone text not null default 'UTC',
  onboarding_completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.focus_areas (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  label text not null,
  category text not null,
  created_at timestamptz not null default now()
);

create table public.mentor_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references public.profiles (id) on delete cascade,
  status public.mentor_status not null default 'draft',
  slug text not null unique,
  bio text not null default '',
  company text,
  location text,
  years_experience integer,
  intro_video_url text,
  featured boolean not null default false,
  hourly_rate_cents integer not null default 0,
  verification_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.mentor_focus_areas (
  mentor_profile_id uuid not null references public.mentor_profiles (id) on delete cascade,
  focus_area_id uuid not null references public.focus_areas (id) on delete cascade,
  primary key (mentor_profile_id, focus_area_id)
);

create table public.goals (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  status public.goal_status not null default 'draft',
  title text not null,
  summary text,
  objective_type text,
  desired_role text,
  target_date date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.growth_plans (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  goal_id uuid references public.goals (id) on delete set null,
  status public.plan_status not null default 'draft',
  title text not null,
  summary text not null,
  next_step text,
  source text not null default 'ai',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.growth_milestones (
  id uuid primary key default gen_random_uuid(),
  growth_plan_id uuid not null references public.growth_plans (id) on delete cascade,
  title text not null,
  description text,
  state text not null default 'locked',
  mastery_percent integer not null default 0,
  order_index integer not null default 0,
  due_date date,
  created_at timestamptz not null default now()
);

create table public.session_types (
  id uuid primary key default gen_random_uuid(),
  mentor_profile_id uuid not null references public.mentor_profiles (id) on delete cascade,
  slug text not null,
  title text not null,
  description text not null default '',
  duration_minutes integer not null,
  price_cents integer not null,
  delivery_mode text not null default 'video',
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (mentor_profile_id, slug)
);

create table public.mentor_availability_slots (
  id uuid primary key default gen_random_uuid(),
  mentor_profile_id uuid not null references public.mentor_profiles (id) on delete cascade,
  session_type_id uuid references public.session_types (id) on delete set null,
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  timezone text not null default 'UTC',
  is_booked boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.bookings (
  id uuid primary key default gen_random_uuid(),
  mentee_id uuid not null references public.profiles (id) on delete cascade,
  mentor_profile_id uuid not null references public.mentor_profiles (id) on delete cascade,
  session_type_id uuid not null references public.session_types (id) on delete restrict,
  availability_slot_id uuid references public.mentor_availability_slots (id) on delete set null,
  status public.booking_status not null default 'pending',
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  timezone text not null default 'UTC',
  amount_cents integer not null,
  currency text not null default 'usd',
  stripe_checkout_session_id text,
  stripe_payment_intent_id text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.payments (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid not null unique references public.bookings (id) on delete cascade,
  status public.payment_status not null default 'pending',
  provider text not null default 'stripe',
  external_reference text,
  amount_cents integer not null,
  fee_cents integer,
  net_cents integer,
  processed_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.ai_guidance_runs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  goal_id uuid references public.goals (id) on delete set null,
  status public.guidance_status not null default 'queued',
  prompt text not null,
  summary text,
  next_steps jsonb not null default '[]'::jsonb,
  milestones jsonb not null default '[]'::jsonb,
  focus_areas jsonb not null default '[]'::jsonb,
  model text,
  created_at timestamptz not null default now()
);

create table public.mentor_reviews (
  id uuid primary key default gen_random_uuid(),
  mentor_profile_id uuid not null references public.mentor_profiles (id) on delete cascade,
  reviewer_id uuid references public.profiles (id) on delete set null,
  decision public.mentor_status not null,
  notes text,
  created_at timestamptz not null default now()
);

create index goals_user_id_idx on public.goals (user_id);
create index growth_plans_user_id_idx on public.growth_plans (user_id);
create index growth_milestones_plan_id_idx on public.growth_milestones (growth_plan_id, order_index);
create index mentor_profiles_status_idx on public.mentor_profiles (status, featured);
create index mentor_availability_slots_lookup_idx on public.mentor_availability_slots (mentor_profile_id, starts_at) where is_booked = false;
create index session_types_mentor_profile_id_idx on public.session_types (mentor_profile_id);
create index bookings_mentee_id_idx on public.bookings (mentee_id, starts_at desc);
create index bookings_mentor_profile_id_idx on public.bookings (mentor_profile_id, starts_at desc);
create index ai_guidance_runs_user_id_idx on public.ai_guidance_runs (user_id, created_at desc);
