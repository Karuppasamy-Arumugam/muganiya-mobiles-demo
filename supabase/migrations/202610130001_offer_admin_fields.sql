alter table public.offers
  add column if not exists badge_text text,
  add column if not exists provider text,
  add column if not exists min_purchase numeric not null default 0,
  add column if not exists tenure_options text,
  add column if not exists down_payment text,
  add column if not exists processing_fee text;