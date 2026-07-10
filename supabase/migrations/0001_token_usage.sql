-- Per-user daily token usage for the Oracle fair-use cap.
-- Keyed by (user_id, day); one row per user per UTC day.

create table if not exists public.token_usage (
  user_id text not null,
  day     date not null,
  tokens  integer not null default 0,
  primary key (user_id, day)
);

-- Only the service_role (used server-side) may touch it; RLS blocks anon/auth.
alter table public.token_usage enable row level security;

-- Atomic increment: returns the new running total for the day.
create or replace function public.increment_token_usage(
  p_user_id text,
  p_day     date,
  p_amount  integer
) returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  new_total integer;
begin
  insert into public.token_usage (user_id, day, tokens)
  values (p_user_id, p_day, p_amount)
  on conflict (user_id, day)
  do update set tokens = token_usage.tokens + excluded.tokens
  returning tokens into new_total;
  return new_total;
end;
$$;

-- SECURITY DEFINER + exposed via PostgREST would let anon/authenticated call
-- this RPC with the public anon key. Only the server (service_role) may.
revoke execute on function public.increment_token_usage(text, date, integer)
  from public, anon, authenticated;
grant execute on function public.increment_token_usage(text, date, integer)
  to service_role;

-- Data minimisation: prune rows older than 30 days. Enable pg_cron in the
-- Supabase dashboard (Database → Extensions), then schedule:
--   select cron.schedule('prune-token-usage', '0 3 * * *',
--     $$delete from public.token_usage where day < current_date - 30$$);
