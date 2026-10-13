alter table public.product_variants
  add column if not exists variant_attributes jsonb not null default '{}'::jsonb;