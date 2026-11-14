-- Run this once in Supabase → SQL Editor (after profiles.sql)
-- Adds a free/premium plan to each profile. Only the server (service role)
-- can change it, so students can't upgrade themselves from the browser.

alter table public.profiles
  add column if not exists plan text not null default 'free'
  check (plan in ('free', 'premium'));

-- Browser clients may only write name/email — never plan.
revoke insert, update on public.profiles from anon, authenticated;
grant insert (id, name, email) on public.profiles to authenticated;
grant update (name, email) on public.profiles to authenticated;
