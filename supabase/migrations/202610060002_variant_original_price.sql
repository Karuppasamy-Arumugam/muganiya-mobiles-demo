alter table public.product_variants
  add column if not exists original_price numeric;