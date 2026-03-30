create table if not exists public.profile_focus_areas (
  profile_id uuid not null references public.profiles (id) on delete cascade,
  focus_area_id uuid not null references public.focus_areas (id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (profile_id, focus_area_id)
);

insert into public.focus_areas (slug, label, category)
values
  ('distributed-systems', 'Distributed Systems', 'discipline'),
  ('leadership', 'Leadership', 'discipline'),
  ('product-design', 'Product Design', 'discipline'),
  ('fintech', 'FinTech', 'industry'),
  ('ai-product', 'AI Product', 'industry'),
  ('platform-engineering', 'Platform Engineering', 'discipline'),
  ('career-strategy', 'Career Strategy', 'goal'),
  ('design-systems', 'Design Systems', 'discipline')
on conflict (slug) do update
set label = excluded.label,
    category = excluded.category;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, full_name, role)
  values (
    new.id,
    coalesce(
      new.raw_user_meta_data ->> 'full_name',
      nullif(split_part(new.email, '@', 1), '')
    ),
    'mentee'
  )
  on conflict (id) do update
  set full_name = coalesce(excluded.full_name, public.profiles.full_name);

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
after insert on auth.users
for each row
execute procedure public.handle_new_user();

alter table public.profiles enable row level security;
alter table public.goals enable row level security;
alter table public.focus_areas enable row level security;
alter table public.profile_focus_areas enable row level security;

drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own"
on public.profiles
for select
to authenticated
using ((select auth.uid()) = id);

drop policy if exists "profiles_insert_own" on public.profiles;
create policy "profiles_insert_own"
on public.profiles
for insert
to authenticated
with check ((select auth.uid()) = id);

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own"
on public.profiles
for update
to authenticated
using ((select auth.uid()) = id)
with check ((select auth.uid()) = id);

drop policy if exists "goals_select_own" on public.goals;
create policy "goals_select_own"
on public.goals
for select
to authenticated
using ((select auth.uid()) = user_id);

drop policy if exists "goals_insert_own" on public.goals;
create policy "goals_insert_own"
on public.goals
for insert
to authenticated
with check ((select auth.uid()) = user_id);

drop policy if exists "goals_update_own" on public.goals;
create policy "goals_update_own"
on public.goals
for update
to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

drop policy if exists "goals_delete_own" on public.goals;
create policy "goals_delete_own"
on public.goals
for delete
to authenticated
using ((select auth.uid()) = user_id);

drop policy if exists "focus_areas_read_all" on public.focus_areas;
create policy "focus_areas_read_all"
on public.focus_areas
for select
to authenticated
using (true);

drop policy if exists "profile_focus_areas_select_own" on public.profile_focus_areas;
create policy "profile_focus_areas_select_own"
on public.profile_focus_areas
for select
to authenticated
using ((select auth.uid()) = profile_id);

drop policy if exists "profile_focus_areas_insert_own" on public.profile_focus_areas;
create policy "profile_focus_areas_insert_own"
on public.profile_focus_areas
for insert
to authenticated
with check ((select auth.uid()) = profile_id);

drop policy if exists "profile_focus_areas_delete_own" on public.profile_focus_areas;
create policy "profile_focus_areas_delete_own"
on public.profile_focus_areas
for delete
to authenticated
using ((select auth.uid()) = profile_id);

create index if not exists profile_focus_areas_profile_id_idx
on public.profile_focus_areas (profile_id);
