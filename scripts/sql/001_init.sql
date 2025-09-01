-- Run this in your Supabase project's SQL editor.

-- Profiles (role: 'user' | 'admin')
create table if not exists public.profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  role text not null default 'user',
  created_at timestamp with time zone default now()
);

-- Applications authored by users
create table if not exists public.applications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text,
  email text,
  year text,
  focus text,
  team_size text,
  brief text,
  problem text,
  progress text,
  links text,
  submitted_at timestamp with time zone,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Ensure columns exist when upgrading
alter table if exists public.applications add column if not exists apply_elevate boolean default false;
alter table if exists public.applications add column if not exists elevate_video text;

-- Admin comments
create table if not exists public.admin_comments (
  id uuid primary key default gen_random_uuid(),
  application_id uuid not null references public.applications(id) on delete cascade,
  admin_id uuid not null references auth.users(id) on delete cascade,
  comment text not null,
  selection text check (selection in ('yes','maybe','no')),
  created_at timestamp with time zone default now()
);

-- Admin votes (one per admin per application)
create table if not exists public.admin_votes (
  application_id uuid not null references public.applications(id) on delete cascade,
  admin_id uuid not null references auth.users(id) on delete cascade,
  selection text not null check (selection in ('yes','maybe','no')),
  updated_at timestamp with time zone default now(),
  primary key (application_id, admin_id)
);

-- RLS
alter table public.profiles enable row level security;
alter table public.applications enable row level security;
alter table public.admin_comments enable row level security;
alter table public.admin_votes enable row level security;

-- Profiles policies
drop policy if exists "users can read own profile" on public.profiles;
create policy "users can read own profile"
  on public.profiles for select
  using (auth.uid() = user_id);

drop policy if exists "users can upsert own profile" on public.profiles;
create policy "users can upsert own profile"
  on public.profiles for insert
  with check (auth.uid() = user_id);

drop policy if exists "users can update own profile" on public.profiles;
create policy "users can update own profile"
  on public.profiles for update
  using (auth.uid() = user_id);

-- Helper: check admin role of current user
-- (Used inline in policies with EXISTS)
-- No function needed; we use EXISTS(select 1 from profiles ...)

-- Applications policies
drop policy if exists "owner can insert application" on public.applications;
create policy "owner can insert application"
  on public.applications for insert
  with check (auth.uid() = user_id);

drop policy if exists "owner can select application" on public.applications;
create policy "owner can select application"
  on public.applications for select
  using (auth.uid() = user_id
    or exists (select 1 from profiles p where p.user_id = auth.uid() and p.role = 'admin'));

drop policy if exists "owner can update application" on public.applications;
create policy "owner can update application"
  on public.applications for update
  using (auth.uid() = user_id);

-- Admin-only comments
drop policy if exists "admins can select comments" on public.admin_comments;
create policy "admins can select comments"
  on public.admin_comments for select
  using (exists (select 1 from profiles p where p.user_id = auth.uid() and p.role = 'admin'));

drop policy if exists "admins can insert comments" on public.admin_comments;
create policy "admins can insert comments"
  on public.admin_comments for insert
  with check (exists (select 1 from profiles p where p.user_id = auth.uid() and p.role = 'admin')
              and admin_id = auth.uid());

-- Admin-only votes
drop policy if exists "admins can select votes" on public.admin_votes;
create policy "admins can select votes"
  on public.admin_votes for select
  using (exists (select 1 from profiles p where p.user_id = auth.uid() and p.role = 'admin'));

drop policy if exists "admins can upsert votes" on public.admin_votes;
create policy "admins can upsert votes"
  on public.admin_votes for insert
  with check (exists (select 1 from profiles p where p.user_id = auth.uid() and p.role = 'admin')
              and admin_id = auth.uid());

drop policy if exists "admins can update votes" on public.admin_votes;
create policy "admins can update votes"
  on public.admin_votes for update
  using (exists (select 1 from profiles p where p.user_id = auth.uid() and p.role = 'admin')
          and admin_id = auth.uid());

-- Optional: trigger to keep updated_at fresh
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_touch_updated_at on public.applications;
create trigger trg_touch_updated_at
before update on public.applications
for each row execute function public.touch_updated_at();

-- Seed: elevate a user to admin (replace with your auth user UUID)
-- update public.profiles set role='admin' where user_id = 'YOUR-USER-ID';
