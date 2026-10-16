-- Additive migration for both a new project and the original Pencily MVP schema.
-- Run as the Supabase database owner. No existing classes or accounts are deleted.
do $$ begin
  create type public.class_status as enum ('draft','pending_demo','needs_revision','approved','live','completed','cancelled');
exception when duplicate_object then null; end $$;

create table if not exists public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  name text not null default 'Học sinh Pencily', real_name text not null default '', age integer check(age between 1 and 120),
  school text not null default '', grade text not null default '', avatar text not null default '',
  role text not null default 'learner' check(role in ('learner','tutor','academic','admin')),
  points integer not null default 0 check(points >= 0), learning_minutes integer not null default 0,
  teaching_minutes integer not null default 0, sessions_attended integer not null default 0,
  interests text[] not null default '{}', has_completed_profile boolean not null default false,
  created_at timestamptz not null default now()
);
create or replace function public.create_pencily_profile() returns trigger language plpgsql security definer set search_path=public,pg_temp as $$
begin
  insert into public.users(id,name,avatar) values(new.id, left(coalesce(new.raw_user_meta_data->>'full_name',new.raw_user_meta_data->>'name','Học sinh Pencily'),100), coalesce(new.raw_user_meta_data->>'avatar_url','')) on conflict do nothing;
  return new;
end $$;
drop trigger if exists pencily_new_user on auth.users;
create trigger pencily_new_user after insert on auth.users for each row execute function public.create_pencily_profile();
insert into public.users(id,name) select id,left(coalesce(raw_user_meta_data->>'full_name','Học sinh Pencily'),100) from auth.users on conflict do nothing;
create or replace function public.is_academic() returns boolean language sql stable security definer set search_path=public,pg_temp as $$
  select exists(select 1 from public.users where id=auth.uid() and role in ('academic','admin'));
$$;

create table if not exists public.tutor_applications (
  id uuid primary key default gen_random_uuid(), user_id uuid not null unique references public.users(id) on delete cascade,
  full_name text not null, subjects text not null, motivation text not null, credentials_url text not null default '',
  programs text[] not null, status text not null default 'pending' check(status in ('pending','approved','rejected')),
  feedback text not null default '', reviewed_by uuid references public.users(id), reviewed_at timestamptz,
  created_at timestamptz not null default now()
);
create table if not exists public.classes (
  id uuid primary key default gen_random_uuid(), title text not null, category text not null default 'khac',
  tutor_name text not null, tutor_discord text, tutor_avatar text, schedule text not null,
  meet_url text not null, max_seats integer default 15, enrolled_count integer default 0,
  description text, created_at timestamptz default now()
);
alter table public.classes
  add column if not exists tutor_id uuid references public.users(id),
  add column if not exists tutor_school text not null default '',
  add column if not exists program_type text not null default 'study_buddy',
  add column if not exists objectives text not null default '',
  add column if not exists main_topics text not null default '',
  add column if not exists materials_url text not null default '',
  add column if not exists interactive_activities text not null default '',
  add column if not exists practice_exercises text not null default '',
  add column if not exists reference_sources text not null default '',
  add column if not exists platform text not null default 'web',
  add column if not exists scheduled_time timestamptz,
  add column if not exists demo_date timestamptz,
  add column if not exists status public.class_status not null default 'draft',
  add column if not exists reviewed_by uuid references public.users(id),
  add column if not exists academic_feedback text,
  add column if not exists reviewed_at timestamptz,
  add column if not exists updated_at timestamptz not null default now();
-- Old unreviewed MVP classes intentionally remain private drafts.
create table if not exists public.enrollments (
  id uuid primary key default gen_random_uuid(), class_id uuid references public.classes(id) on delete cascade,
  student_discord_id text not null, student_name text not null, created_at timestamptz default now(),
  unique(class_id,student_discord_id)
);
alter table public.enrollments add column if not exists user_id uuid references public.users(id) on delete cascade;
create unique index if not exists enrollments_by_user on public.enrollments(class_id,user_id);
create table if not exists public.class_reviews (
  id uuid primary key default gen_random_uuid(), class_id uuid not null references public.classes(id) on delete cascade,
  reviewer_id uuid not null references public.users(id), action text not null, feedback text not null,
  created_at timestamptz not null default now()
);
create table if not exists public.notification_outbox (
  id uuid primary key default gen_random_uuid(), class_id uuid not null references public.classes(id) on delete cascade,
  review_id uuid not null unique references public.class_reviews(id), status text not null default 'pending',
  last_error text, sent_at timestamptz, created_at timestamptz not null default now()
);
create table if not exists public.room_members (
  connection_id uuid primary key default gen_random_uuid(), class_id uuid not null references public.classes(id) on delete cascade,
  user_id uuid not null references public.users(id) on delete cascade, name text not null, avatar text not null default '',
  is_host boolean not null default false, joined_at timestamptz not null default now(),
  last_seen_at timestamptz not null default now(), last_activity_at timestamptz not null default now(), left_at timestamptz
);
create unique index if not exists one_active_room_per_user on public.room_members(user_id) where left_at is null;
create index if not exists active_room_members on public.room_members(class_id,last_seen_at) where left_at is null;
create table if not exists public.room_signals (
  id uuid primary key default gen_random_uuid(), class_id uuid not null references public.classes(id) on delete cascade,
  from_connection_id uuid not null references public.room_members(connection_id) on delete cascade,
  to_connection_id uuid not null references public.room_members(connection_id) on delete cascade,
  kind text not null check(kind in ('hello','description','ice')), payload jsonb not null,
  created_at timestamptz not null default now(), check(pg_column_size(payload) < 24000)
);
create index if not exists room_signals_recipient on public.room_signals(to_connection_id,created_at);
create table if not exists public.attendance_records (
  class_id uuid not null references public.classes(id) on delete cascade,
  user_id uuid not null references public.users(id) on delete cascade,
  verified_minutes integer not null default 0, last_credited_at timestamptz not null,
  primary key(class_id,user_id)
);
create table if not exists public.attendance_challenges (
  id uuid primary key default gen_random_uuid(), nonce uuid not null default gen_random_uuid(),
  class_id uuid not null references public.classes(id) on delete cascade,
  student_connection_id uuid not null references public.room_members(connection_id),
  tutor_connection_id uuid not null references public.room_members(connection_id),
  issued_at timestamptz not null default now(), expires_at timestamptz not null default now()+interval '90 seconds',
  acknowledged_at timestamptz, consumed_at timestamptz
);
create index if not exists attendance_challenges_student on public.attendance_challenges(student_connection_id,issued_at);
create table if not exists public.points_ledger (
  id uuid primary key default gen_random_uuid(), user_id uuid not null references public.users(id),
  amount integer not null, reason text not null, reference text not null, created_at timestamptz not null default now(),
  unique(user_id,reason,reference)
);
create table if not exists public.reward_redemptions (
  user_id uuid not null references public.users(id), reward_id text not null, cost integer not null,
  created_at timestamptz not null default now(), primary key(user_id,reward_id)
);
create table if not exists public.api_quotas (
  bucket_key text not null, window_start timestamptz not null, hits integer not null default 1,
  primary key(bucket_key,window_start)
);

-- All mutations are authenticated by the API and performed with service_role.
-- Remove the permissive policies from the previous MVP.
drop policy if exists "Allow public read classes" on public.classes;
drop policy if exists "Allow insert classes" on public.classes;
drop policy if exists "Allow update enrolled_count" on public.classes;
drop policy if exists "Allow public read enrollments" on public.enrollments;
drop policy if exists "Allow insert enrollments" on public.enrollments;
drop policy if exists "Pencily classes read" on public.classes;
create policy "Pencily classes read" on public.classes for select using(status in ('approved','live','completed') or tutor_id=auth.uid() or public.is_academic());
drop policy if exists "Pencily own enrollment" on public.enrollments;
create policy "Pencily own enrollment" on public.enrollments for select to authenticated using(user_id=auth.uid() or public.is_academic());
drop policy if exists "Pencily own profile" on public.users;
create policy "Pencily own profile" on public.users for select to authenticated using(id=auth.uid() or public.is_academic());
drop policy if exists "Pencily tutor applications" on public.tutor_applications;
create policy "Pencily tutor applications" on public.tutor_applications for select to authenticated using(user_id=auth.uid() or public.is_academic());
create or replace function public.can_enter_pencily_room(p_class uuid) returns boolean language sql stable security definer set search_path=public,pg_temp as $$
  select exists(select 1 from public.room_members m join public.classes c on c.id=m.class_id where m.user_id=auth.uid() and m.class_id=p_class and m.left_at is null and c.status in ('approved','live','pending_demo'));
$$;
drop policy if exists "Pencily room roster" on public.room_members;
create policy "Pencily room roster" on public.room_members for select to authenticated using(public.can_enter_pencily_room(class_id));
drop policy if exists "Pencily incoming signals" on public.room_signals;
create policy "Pencily incoming signals" on public.room_signals for select to authenticated using(exists(select 1 from public.room_members m where m.connection_id=to_connection_id and m.user_id=auth.uid() and m.left_at is null));
drop policy if exists "Pencily own attendance" on public.attendance_records;
create policy "Pencily own attendance" on public.attendance_records for select to authenticated using(user_id=auth.uid() or public.is_academic());
drop policy if exists "Pencily own rewards" on public.reward_redemptions;
create policy "Pencily own rewards" on public.reward_redemptions for select to authenticated using(user_id=auth.uid());
do $$ declare t text; begin
  foreach t in array array['users','tutor_applications','classes','enrollments','class_reviews','notification_outbox','room_members','room_signals','attendance_records','attendance_challenges','points_ledger','reward_redemptions','api_quotas'] loop
    execute format('alter table public.%I enable row level security',t);
    execute format('revoke all on public.%I from anon,authenticated',t);
    execute format('grant all on public.%I to service_role',t);
  end loop;
end $$;
grant select on public.classes to anon,authenticated;
grant select on public.users,public.tutor_applications,public.enrollments,public.room_members,public.room_signals,public.attendance_records,public.reward_redemptions to authenticated;
drop policy if exists "Pencily private room" on realtime.messages;
create policy "Pencily private room" on realtime.messages for select to authenticated using(exists(select 1 from public.room_members where user_id=auth.uid() and left_at is null and ('pencily:'||class_id::text)=realtime.topic()));
do $$ begin
  if not exists(select 1 from pg_publication_tables where pubname='supabase_realtime' and tablename='room_signals') then alter publication supabase_realtime add table public.room_signals; end if;
  if not exists(select 1 from pg_publication_tables where pubname='supabase_realtime' and tablename='room_members') then alter publication supabase_realtime add table public.room_members; end if;
end $$;

create or replace function public.take_api_quota(p_key text,p_limit integer) returns boolean language plpgsql security definer set search_path=public,pg_temp as $$
declare n integer; begin
  insert into public.api_quotas values(p_key,date_trunc('minute',clock_timestamp()),1) on conflict(bucket_key,window_start) do update set hits=api_quotas.hits+1 returning hits into n;
  delete from public.api_quotas where window_start < now()-interval '1 day';
  return n<=p_limit;
end $$;
create or replace function public.join_pencily_room(p_class uuid,p_user uuid) returns uuid language plpgsql security definer set search_path=public,pg_temp as $$
declare c public.classes; u public.users; cid uuid; begin
  select * into c from public.classes where id=p_class for update;
  if not found or c.platform<>'web' then raise exception 'PENCILY: Phòng học không tồn tại hoặc dùng nền tảng khác.'; end if;
  if c.status not in ('approved','live') and not(c.status='pending_demo' and (c.tutor_id=p_user or exists(select 1 from public.users where id=p_user and role in ('academic','admin')))) then raise exception 'PENCILY: Phòng chưa duyệt chỉ dành cho tutor và Academic dự demo.'; end if;
  select * into u from public.users where id=p_user for update;
  if not found or not u.has_completed_profile then raise exception 'PENCILY: Hãy hoàn thiện hồ sơ trước khi vào phòng.'; end if;
  update public.room_members set left_at=now() where user_id=p_user and left_at is null;
  update public.room_members set left_at=now() where class_id=p_class and last_seen_at<now()-interval '90 seconds' and left_at is null;
  if (select count(*) from public.room_members where class_id=p_class and left_at is null)>=least(c.max_seats,6) then raise exception 'PENCILY: Phòng P2P đã đủ người.'; end if;
  insert into public.room_members(class_id,user_id,name,avatar,is_host) values(p_class,p_user,u.name,u.avatar,c.tutor_id=p_user) returning connection_id into cid;
  delete from public.room_signals where created_at<now()-interval '10 minutes';
  return cid;
end $$;
create or replace function public.enroll_pencily_class(p_class uuid,p_user uuid,p_cancel boolean default false) returns boolean language plpgsql security definer set search_path=public,pg_temp as $$
declare c public.classes; begin
  select * into c from public.classes where id=p_class for update;
  if not found or c.status not in ('approved','live') then raise exception 'PENCILY: Lớp chưa mở ghi danh.'; end if;
  if p_cancel then delete from public.enrollments where class_id=p_class and user_id=p_user;
  else
    if exists(select 1 from public.enrollments where class_id=p_class and user_id=p_user) then return true; end if;
    if c.tutor_id=p_user then return true; end if;
    if c.enrolled_count >= (c.max_seats - (case when c.platform='web' then 1 else 0 end)) then raise exception 'PENCILY: Lớp đã đủ chỗ.'; end if;
    insert into public.enrollments(class_id,user_id,student_discord_id,student_name) select p_class,p_user,p_user::text,name from public.users where id=p_user;
  end if;
  update public.classes set enrolled_count=(select count(*) from public.enrollments where class_id=p_class) where id=p_class;
  return true;
end $$;
create or replace function public.review_pencily_class(p_class uuid,p_reviewer uuid,p_action text,p_feedback text,p_demo timestamptz default null) returns public.classes language plpgsql security definer set search_path=public,pg_temp as $$
declare c public.classes; rid uuid; begin
  if not exists(select 1 from public.users where id=p_reviewer and role in ('academic','admin')) then raise exception 'PENCILY: Không có quyền Academic.'; end if;
  select * into c from public.classes where id=p_class for update;
  if not found or c.status not in ('pending_demo','needs_revision') then raise exception 'PENCILY: Lớp không còn trong hàng đợi duyệt.'; end if;
  if c.tutor_id=p_reviewer then raise exception 'PENCILY: Không được tự duyệt lớp của mình.'; end if;
  if p_action='approve' and (c.demo_date>now() or c.demo_date is null) then raise exception 'PENCILY: Chỉ duyệt sau buổi demo.'; end if;
  if p_action='approve' and (not exists(select 1 from public.tutor_applications a where a.user_id=c.tutor_id and a.status='approved' and c.program_type=any(a.programs)) or (c.program_type in ('basic_science','flagship') and not exists(select 1 from public.users where id=c.tutor_id and age>=16))) then raise exception 'PENCILY: Hồ sơ hoặc độ tuổi tutor chưa đủ điều kiện.'; end if;
  if p_action not in ('approve','revise','reschedule') then raise exception 'PENCILY: Quyết định không hợp lệ.'; end if;
  if p_action='reschedule' and (p_demo is null or p_demo<now() or c.scheduled_time-p_demo<interval '2 days') then raise exception 'PENCILY: Lịch demo mới phải trước lịch học ít nhất 2 ngày.'; end if;
  update public.classes set status=case when p_action='approve' then 'approved'::public.class_status else 'needs_revision'::public.class_status end,
    academic_feedback=p_feedback,reviewed_by=p_reviewer,reviewed_at=now(),updated_at=now(),demo_date=coalesce(p_demo,demo_date) where id=p_class returning * into c;
  insert into public.class_reviews(class_id,reviewer_id,action,feedback) values(p_class,p_reviewer,p_action,p_feedback) returning id into rid;
  if p_action='approve' then insert into public.notification_outbox(class_id,review_id) values(p_class,rid); end if;
  return c;
end $$;

create or replace function public.issue_attendance_challenge(p_connection uuid,p_user uuid) returns public.attendance_challenges language plpgsql security definer set search_path=public,pg_temp as $$
declare s public.room_members; h public.room_members; c public.attendance_challenges; begin
  select * into s from public.room_members where connection_id=p_connection and user_id=p_user and left_at is null for update;
  if not found or s.is_host or s.last_seen_at<now()-interval '90 seconds' or s.last_activity_at<now()-interval '15 minutes' then raise exception 'PENCILY: Phiên học chưa đủ điều kiện tính giờ.'; end if;
  if not exists(select 1 from public.classes where id=s.class_id and status='live') then raise exception 'PENCILY: Tutor chưa bắt đầu buổi học.'; end if;
  select * into h from public.room_members where class_id=s.class_id and is_host and user_id<>p_user and left_at is null and last_seen_at>now()-interval '90 seconds';
  if not found then raise exception 'PENCILY: Cần tutor và học viên cùng kết nối.'; end if;
  select * into c from public.attendance_challenges where student_connection_id=p_connection and issued_at>now()-interval '50 seconds' order by issued_at desc limit 1;
  if found then return c; end if;
  insert into public.attendance_challenges(class_id,student_connection_id,tutor_connection_id) values(s.class_id,p_connection,h.connection_id) returning * into c;
  return c;
end $$;
create or replace function public.ack_attendance_challenge(p_challenge uuid,p_nonce uuid,p_connection uuid,p_student uuid,p_user uuid) returns boolean language plpgsql security definer set search_path=public,pg_temp as $$
begin
  update public.attendance_challenges c set acknowledged_at=now() where c.id=p_challenge and c.nonce=p_nonce and c.tutor_connection_id=p_connection and c.student_connection_id=p_student and c.expires_at>now() and c.consumed_at is null
    and exists(select 1 from public.room_members m where m.connection_id=p_connection and m.user_id=p_user and m.is_host and m.left_at is null and m.last_seen_at>now()-interval '90 seconds');
  if not found then raise exception 'PENCILY: Xác nhận hiện diện không hợp lệ hoặc đã hết hạn.'; end if;
  return true;
end $$;
create or replace function public.claim_attendance_minute(p_challenge uuid,p_user uuid) returns integer language plpgsql security definer set search_path=public,pg_temp as $$
declare ch public.attendance_challenges; s public.room_members; h public.room_members; r public.attendance_records; member public.room_members; delta integer; divisor integer; begin
  select * into ch from public.attendance_challenges where id=p_challenge for update;
  if not found or ch.expires_at<now() or ch.acknowledged_at is null or ch.consumed_at is not null then raise exception 'PENCILY: Cần xác nhận hai phía mới được tính giờ.'; end if;
  select * into s from public.room_members where connection_id=ch.student_connection_id and user_id=p_user;
  select * into h from public.room_members where connection_id=ch.tutor_connection_id;
  perform 1 from public.classes where id=ch.class_id and status='live' for update;
  if not found or s.user_id is null or h.user_id is null or s.user_id=h.user_id or s.left_at is not null or h.left_at is not null or s.last_seen_at<now()-interval '90 seconds' or h.last_seen_at<now()-interval '90 seconds' or s.last_activity_at<now()-interval '15 minutes' or h.last_activity_at<now()-interval '15 minutes' then raise exception 'PENCILY: Kết nối đã gián đoạn hoặc không còn hoạt động.'; end if;
  for member in select * from public.room_members where connection_id in (s.connection_id,h.connection_id) order by user_id loop
    insert into public.attendance_records(class_id,user_id,last_credited_at) values(ch.class_id,member.user_id,member.joined_at) on conflict do nothing;
    select * into r from public.attendance_records where class_id=ch.class_id and user_id=member.user_id for update;
    if now()-greatest(r.last_credited_at,member.joined_at)>=interval '60 seconds' then
      divisor:=case when member.is_host then 2 else 12 end;
      delta:=((r.verified_minutes+1)/divisor)-(r.verified_minutes/divisor);
      update public.attendance_records set verified_minutes=verified_minutes+1,last_credited_at=now() where class_id=ch.class_id and user_id=member.user_id;
      update public.users set learning_minutes=learning_minutes+1, teaching_minutes=teaching_minutes+case when member.is_host then 1 else 0 end,
        points=points+delta,sessions_attended=sessions_attended+case when r.verified_minutes=0 then 1 else 0 end where id=member.user_id;
      if delta>0 then insert into public.points_ledger(user_id,amount,reason,reference) values(member.user_id,delta,'attendance',ch.id::text); end if;
    end if;
  end loop;
  update public.attendance_challenges set consumed_at=now() where id=ch.id;
  return (select learning_minutes from public.users where id=p_user);
end $$;
create or replace function public.redeem_pencily_reward(p_user uuid,p_reward text,p_cost integer) returns boolean language plpgsql security definer set search_path=public,pg_temp as $$
begin
  perform 1 from public.users where id=p_user for update;
  if exists(select 1 from public.reward_redemptions where user_id=p_user and reward_id=p_reward) then raise exception 'PENCILY: Bạn đã đổi phần thưởng này.'; end if;
  update public.users set points=points-p_cost where id=p_user and points>=p_cost and p_cost>0;
  if not found then raise exception 'PENCILY: Chưa đủ điểm.'; end if;
  insert into public.reward_redemptions(user_id,reward_id,cost) values(p_user,p_reward,p_cost);
  insert into public.points_ledger(user_id,amount,reason,reference) values(p_user,-p_cost,'redemption',p_reward);
  return true;
end $$;
create or replace function public.review_pencily_tutor(p_application uuid,p_reviewer uuid,p_approve boolean,p_feedback text) returns public.tutor_applications language plpgsql security definer set search_path=public,pg_temp as $$
declare a public.tutor_applications; u public.users;
begin
  if not exists(select 1 from public.users where id=p_reviewer and role in ('academic','admin')) then raise exception 'PENCILY: Chỉ Academic được duyệt hồ sơ.'; end if;
  select * into a from public.tutor_applications where id=p_application for update;
  if not found or a.status<>'pending' then raise exception 'PENCILY: Hồ sơ không còn chờ duyệt.'; end if;
  if a.user_id=p_reviewer then raise exception 'PENCILY: Không được tự duyệt hồ sơ.'; end if;
  if nullif(trim(p_feedback),'') is null then raise exception 'PENCILY: Cần nhận xét Academic.'; end if;
  select * into u from public.users where id=a.user_id for update;
  if p_approve then
    if not u.has_completed_profile or u.age is null then raise exception 'PENCILY: Hồ sơ học sinh chưa hoàn thiện.'; end if;
    if a.programs && array['basic_science','flagship'] and u.age<16 then raise exception 'PENCILY: Chương trình yêu cầu từ 16 tuổi.'; end if;
    if 'flagship'=any(a.programs) and a.credentials_url='' then raise exception 'PENCILY: Flagship cần minh chứng học thuật.'; end if;
    update public.users set role='tutor' where id=a.user_id and role='learner';
  end if;
  update public.tutor_applications set status=case when p_approve then 'approved' else 'rejected' end, feedback=p_feedback,reviewed_by=p_reviewer,reviewed_at=now() where id=a.id returning * into a;
  return a;
end $$;
-- Never expose privileged RPCs to the browser's anon/authenticated keys.
do $$ declare f record; begin
  for f in select oid::regprocedure as signature from pg_proc where pronamespace='public'::regnamespace and proname in ('review_pencily_tutor','take_api_quota','join_pencily_room','enroll_pencily_class','review_pencily_class','issue_attendance_challenge','ack_attendance_challenge','claim_attendance_minute','redeem_pencily_reward') loop
    execute format('revoke all on function %s from public,anon,authenticated',f.signature);
    execute format('grant execute on function %s to service_role',f.signature);
  end loop;
end $$;
