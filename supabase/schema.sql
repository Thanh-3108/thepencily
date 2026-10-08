-- ==============================================================================
-- The Pencily - Supabase Database Schema (MVP)
-- Copy and run this script in Supabase SQL Editor
-- ==============================================================================

-- 1. Bảng lớp học (Classes)
create table if not exists public.classes (
  id uuid primary key default gen_random_uuid(),
  created_at timestamp with time zone default now(),
  title text not null,
  category text not null default 'khac',
  tutor_name text not null,
  tutor_discord text,
  tutor_avatar text,
  schedule text not null,
  meet_url text not null, -- Link Discord Voice hoặc Google Meet
  max_seats integer default 20,
  enrolled_count integer default 0,
  description text
);

-- 2. Bảng ghi danh tham gia lớp học (Enrollments)
create table if not exists public.enrollments (
  id uuid primary key default gen_random_uuid(),
  created_at timestamp with time zone default now(),
  class_id uuid references public.classes(id) on delete cascade,
  student_discord_id text not null,
  student_name text not null,
  unique(class_id, student_discord_id)
);

-- 3. Cấu hình Row Level Security (RLS)
alter table public.classes enable row level security;
alter table public.enrollments enable row level security;

-- Policies cho bảng classes
create policy "Allow public read classes"
  on public.classes for select
  using (true);

create policy "Allow insert classes"
  on public.classes for insert
  with check (true);

create policy "Allow update enrolled_count"
  on public.classes for update
  using (true);

-- Policies cho bảng enrollments
create policy "Allow public read enrollments"
  on public.enrollments for select
  using (true);

create policy "Allow insert enrollments"
  on public.enrollments for insert
  with check (true);

create policy "Allow delete enrollments"
  on public.enrollments for delete
  using (true);
