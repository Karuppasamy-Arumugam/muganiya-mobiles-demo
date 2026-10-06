alter table public.products
  add column if not exists model text,
  add column if not exists tagline text,
  add column if not exists original_price numeric,
  add column if not exists is_latest_launch boolean not null default false,
  add column if not exists is_best_seller boolean not null default false,
  add column if not exists badges jsonb not null default '[]'::jsonb;