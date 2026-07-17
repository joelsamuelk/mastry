-- Mastry.co MVP Schema
-- Career Passport, Goals, Evidence, and Activity Log

-- Enums
create type extraction_status as enum ('pending', 'processing', 'completed', 'failed');
create type evidence_type as enum ('publication', 'talk', 'project', 'award', 'patent', 'other');
create type seniority_level as enum ('junior', 'mid', 'senior', 'lead', 'principal', 'director', 'vp', 'c_level');
create type remote_preference as enum ('remote', 'hybrid', 'onsite', 'any');

-- Profiles (extends auth.users)
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  email text not null,
  avatar_url text,
  headline text,
  timezone text,
  onboarding_completed_at timestamptz,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

alter table profiles enable row level security;

create policy "Users can view own profile"
  on profiles for select using (auth.uid() = id);
create policy "Users can update own profile"
  on profiles for update using (auth.uid() = id);
create policy "Users can insert own profile"
  on profiles for insert with check (auth.uid() = id);

-- Career Passports
create table career_passports (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade unique,
  career_summary text,
  current_role_title text,
  current_company text,
  years_experience integer,
  seniority_level seniority_level,
  skills text[] default '{}',
  languages text[] default '{}',
  raw_cv_url text,
  raw_cv_text text,
  ai_extraction_status extraction_status default 'pending',
  ai_extraction_result jsonb,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

alter table career_passports enable row level security;

create policy "Users can view own passport"
  on career_passports for select using (auth.uid() = user_id);
create policy "Users can update own passport"
  on career_passports for update using (auth.uid() = user_id);
create policy "Users can insert own passport"
  on career_passports for insert with check (auth.uid() = user_id);

-- Employers (work history)
create table employers (
  id uuid primary key default gen_random_uuid(),
  passport_id uuid not null references career_passports(id) on delete cascade,
  company_name text not null,
  role_title text not null,
  start_date text,
  end_date text,
  is_current boolean default false,
  description text,
  achievements text[] default '{}',
  technologies text[] default '{}',
  people_managed integer,
  created_at timestamptz default now() not null
);

alter table employers enable row level security;

create policy "Users can view own employers"
  on employers for select using (
    passport_id in (select id from career_passports where user_id = auth.uid())
  );
create policy "Users can insert own employers"
  on employers for insert with check (
    passport_id in (select id from career_passports where user_id = auth.uid())
  );
create policy "Users can update own employers"
  on employers for update using (
    passport_id in (select id from career_passports where user_id = auth.uid())
  );
create policy "Users can delete own employers"
  on employers for delete using (
    passport_id in (select id from career_passports where user_id = auth.uid())
  );

-- Education
create table education (
  id uuid primary key default gen_random_uuid(),
  passport_id uuid not null references career_passports(id) on delete cascade,
  institution text not null,
  degree text,
  field_of_study text,
  start_year integer,
  end_year integer,
  created_at timestamptz default now() not null
);

alter table education enable row level security;

create policy "Users can view own education"
  on education for select using (
    passport_id in (select id from career_passports where user_id = auth.uid())
  );
create policy "Users can insert own education"
  on education for insert with check (
    passport_id in (select id from career_passports where user_id = auth.uid())
  );
create policy "Users can update own education"
  on education for update using (
    passport_id in (select id from career_passports where user_id = auth.uid())
  );
create policy "Users can delete own education"
  on education for delete using (
    passport_id in (select id from career_passports where user_id = auth.uid())
  );

-- Certifications
create table certifications (
  id uuid primary key default gen_random_uuid(),
  passport_id uuid not null references career_passports(id) on delete cascade,
  name text not null,
  issuer text,
  date_obtained text,
  expiry_date text,
  credential_url text,
  created_at timestamptz default now() not null
);

alter table certifications enable row level security;

create policy "Users can view own certifications"
  on certifications for select using (
    passport_id in (select id from career_passports where user_id = auth.uid())
  );
create policy "Users can insert own certifications"
  on certifications for insert with check (
    passport_id in (select id from career_passports where user_id = auth.uid())
  );
create policy "Users can update own certifications"
  on certifications for update using (
    passport_id in (select id from career_passports where user_id = auth.uid())
  );
create policy "Users can delete own certifications"
  on certifications for delete using (
    passport_id in (select id from career_passports where user_id = auth.uid())
  );

-- Career Evidence
create table career_evidence (
  id uuid primary key default gen_random_uuid(),
  passport_id uuid not null references career_passports(id) on delete cascade,
  type evidence_type not null,
  title text not null,
  description text,
  url text,
  date text,
  created_at timestamptz default now() not null
);

alter table career_evidence enable row level security;

create policy "Users can view own evidence"
  on career_evidence for select using (
    passport_id in (select id from career_passports where user_id = auth.uid())
  );
create policy "Users can insert own evidence"
  on career_evidence for insert with check (
    passport_id in (select id from career_passports where user_id = auth.uid())
  );
create policy "Users can update own evidence"
  on career_evidence for update using (
    passport_id in (select id from career_passports where user_id = auth.uid())
  );
create policy "Users can delete own evidence"
  on career_evidence for delete using (
    passport_id in (select id from career_passports where user_id = auth.uid())
  );

-- Career Goals
create table career_goals (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade unique,
  target_role_title text,
  target_seniority seniority_level,
  preferred_industries text[] default '{}',
  preferred_locations text[] default '{}',
  remote_preference remote_preference default 'any',
  salary_min integer,
  salary_currency text default 'GBP',
  requires_sponsorship boolean default false,
  is_actively_looking boolean default true,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

alter table career_goals enable row level security;

create policy "Users can view own goals"
  on career_goals for select using (auth.uid() = user_id);
create policy "Users can insert own goals"
  on career_goals for insert with check (auth.uid() = user_id);
create policy "Users can update own goals"
  on career_goals for update using (auth.uid() = user_id);

-- Activity Log
create table activity_log (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  action text not null,
  entity_type text,
  entity_id uuid,
  metadata jsonb,
  created_at timestamptz default now() not null
);

alter table activity_log enable row level security;

create policy "Users can view own activity"
  on activity_log for select using (auth.uid() = user_id);
create policy "Users can insert own activity"
  on activity_log for insert with check (auth.uid() = user_id);

-- Auto-create profile and passport on signup
create or replace function handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, email, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', ''),
    new.email,
    coalesce(new.raw_user_meta_data ->> 'avatar_url', null)
  );

  insert into public.career_passports (user_id)
  values (new.id);

  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function handle_new_user();

-- Storage bucket for CV uploads
insert into storage.buckets (id, name, public)
values ('cv-uploads', 'cv-uploads', false);

create policy "Users can upload own CVs"
  on storage.objects for insert
  with check (
    bucket_id = 'cv-uploads' and
    (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "Users can read own CVs"
  on storage.objects for select
  using (
    bucket_id = 'cv-uploads' and
    (storage.foldername(name))[1] = auth.uid()::text
  );
