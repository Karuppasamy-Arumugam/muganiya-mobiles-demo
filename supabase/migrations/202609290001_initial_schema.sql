-- Muganiyaa Mobiles initial schema for local development.
-- Real customer data belongs only in the client's secured production project.

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  role text not null default 'admin' check (role in ('admin', 'owner', 'manager')),
  status text not null default 'active' check (status in ('active', 'disabled')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.profiles p
    where p.id = (select auth.uid())
      and p.status = 'active'
      and p.role in ('admin', 'owner', 'manager')
  );
$$;
revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated;

create table public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null check (length(trim(name)) > 0),
  slug text not null unique,
  description text,
  sort_order integer not null default 0 check (sort_order >= 0),
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.products (
  id uuid primary key default gen_random_uuid(),
  category_id uuid not null references public.categories(id) on delete restrict,
  name text not null check (length(trim(name)) > 0),
  slug text not null unique,
  brand text not null check (length(trim(brand)) > 0),
  description text,
  base_price numeric(12,2) not null default 0 check (base_price >= 0),
  status text not null default 'draft' check (status in ('draft', 'active', 'archived')),
  is_active boolean not null default false,
  is_featured boolean not null default false,
  highlights jsonb not null default '[]'::jsonb check (jsonb_typeof(highlights) = 'array'),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  storage_path text not null,
  alt_text text,
  sort_order integer not null default 0 check (sort_order >= 0),
  is_primary boolean not null default false,
  created_at timestamptz not null default now(),
  unique (product_id, storage_path)
);
create unique index product_images_one_primary_per_product
  on public.product_images(product_id) where is_primary;

create table public.product_variants (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  sku text unique,
  color_name text,
  color_hex text check (color_hex is null or color_hex ~ '^#[0-9A-Fa-f]{6}$'),
  ram text,
  storage text,
  price numeric(12,2) not null check (price >= 0),
  stock_quantity integer not null default 0 check (stock_quantity >= 0),
  is_available boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.product_specifications (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  group_name text,
  name text not null check (length(trim(name)) > 0),
  value text not null,
  sort_order integer not null default 0 check (sort_order >= 0),
  created_at timestamptz not null default now()
);

create table public.banners (
  id uuid primary key default gen_random_uuid(),
  title text not null check (length(trim(title)) > 0),
  subtitle text,
  image_path text not null,
  target_url text,
  button_label text,
  sort_order integer not null default 0 check (sort_order >= 0),
  is_active boolean not null default false,
  start_at timestamptz,
  end_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (start_at is null or end_at is null or end_at >= start_at)
);

create table public.offers (
  id uuid primary key default gen_random_uuid(),
  title text not null check (length(trim(title)) > 0),
  description text,
  offer_type text not null check (offer_type in ('percentage', 'fixed', 'bank_offer', 'promotional', 'informational')),
  discount_value numeric(12,2) check (discount_value is null or discount_value >= 0),
  start_at timestamptz,
  end_at timestamptz,
  terms text,
  is_active boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (start_at is null or end_at is null or end_at >= start_at),
  check (offer_type <> 'percentage' or discount_value is null or discount_value <= 100)
);

create table public.product_offers (
  product_id uuid not null references public.products(id) on delete cascade,
  offer_id uuid not null references public.offers(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (product_id, offer_id)
);

create table public.services (
  id uuid primary key default gen_random_uuid(),
  name text not null check (length(trim(name)) > 0),
  slug text not null unique,
  description text,
  image_path text,
  sort_order integer not null default 0 check (sort_order >= 0),
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.enquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null check (length(trim(name)) > 0),
  phone text not null check (length(trim(phone)) > 0),
  email text,
  subject text,
  message text not null check (length(trim(message)) > 0),
  product_id uuid references public.products(id) on delete set null,
  internal_status text not null default 'new' check (internal_status in ('new', 'contacted', 'resolved', 'archived')),
  internal_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.repair_requests (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null check (length(trim(customer_name)) > 0),
  phone text not null check (length(trim(phone)) > 0),
  device_type text not null check (length(trim(device_type)) > 0),
  brand text,
  model text,
  problem_description text not null check (length(trim(problem_description)) > 0),
  preferred_contact_method text check (preferred_contact_method is null or preferred_contact_method in ('phone', 'whatsapp', 'email')),
  internal_status text not null default 'new' check (internal_status in ('new', 'contacted', 'in_progress', 'completed', 'cancelled', 'archived')),
  internal_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.chatbot_faqs (
  id uuid primary key default gen_random_uuid(),
  question text not null check (length(trim(question)) > 0),
  answer text not null check (length(trim(answer)) > 0),
  topic text,
  is_active boolean not null default true,
  sort_order integer not null default 0 check (sort_order >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.store_settings (
  id boolean primary key default true check (id),
  store_name text not null default 'Muganiyaa Mobiles',
  phone text,
  whatsapp text,
  email text,
  address text,
  opening_hours jsonb not null default '{}'::jsonb,
  map_url text,
  social_urls jsonb not null default '{}'::jsonb,
  about_content text,
  privacy_content text,
  updated_at timestamptz not null default now()
);

create table public.security_events (
  id uuid primary key default gen_random_uuid(),
  event_type text not null,
  actor_id uuid references auth.users(id) on delete set null,
  identifier_hash text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index products_category_id_idx on public.products(category_id);
create index products_brand_idx on public.products(brand);
create index products_status_idx on public.products(status);
create index products_featured_idx on public.products(is_featured) where is_featured;
create index product_variants_product_id_idx on public.product_variants(product_id);
create index product_variants_price_idx on public.product_variants(price);
create index product_specifications_product_id_idx on public.product_specifications(product_id);
create index banners_public_order_idx on public.banners(is_active, sort_order);
create index offers_public_window_idx on public.offers(is_active, start_at, end_at);
create index services_public_order_idx on public.services(is_active, sort_order);
create index enquiries_created_at_idx on public.enquiries(created_at desc);
create index enquiries_status_idx on public.enquiries(internal_status);
create index repair_requests_created_at_idx on public.repair_requests(created_at desc);
create index repair_requests_status_idx on public.repair_requests(internal_status);
create index chatbot_faqs_active_idx on public.chatbot_faqs(is_active, sort_order);

do $$
declare
  table_name text;
begin
  foreach table_name in array array[
    'profiles', 'categories', 'products', 'product_variants', 'banners',
    'offers', 'services', 'enquiries', 'repair_requests', 'chatbot_faqs', 'store_settings'
  ] loop
    execute format(
      'create trigger set_updated_at before update on public.%I for each row execute function public.set_updated_at()',
      table_name
    );
  end loop;
end;
$$;

alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.product_images enable row level security;
alter table public.product_variants enable row level security;
alter table public.product_specifications enable row level security;
alter table public.banners enable row level security;
alter table public.offers enable row level security;
alter table public.product_offers enable row level security;
alter table public.services enable row level security;
alter table public.enquiries enable row level security;
alter table public.repair_requests enable row level security;
alter table public.chatbot_faqs enable row level security;
alter table public.store_settings enable row level security;
alter table public.security_events enable row level security;

create policy "public read active categories" on public.categories
  for select to anon, authenticated using (is_active);
create policy "admins manage categories" on public.categories
  for all to authenticated using ((select public.is_admin())) with check ((select public.is_admin()));

create policy "public read active products" on public.products
  for select to anon, authenticated using (
    status = 'active' and is_active
    and exists (select 1 from public.categories c where c.id = category_id and c.is_active)
  );
create policy "admins manage products" on public.products
  for all to authenticated using ((select public.is_admin())) with check ((select public.is_admin()));

create policy "public read images for active products" on public.product_images
  for select to anon, authenticated using (exists (
    select 1 from public.products p join public.categories c on c.id = p.category_id
    where p.id = product_id and p.status = 'active' and p.is_active and c.is_active
  ));
create policy "admins manage product images" on public.product_images
  for all to authenticated using ((select public.is_admin())) with check ((select public.is_admin()));

create policy "public read available variants for active products" on public.product_variants
  for select to anon, authenticated using (
    is_available and exists (
      select 1 from public.products p join public.categories c on c.id = p.category_id
      where p.id = product_id and p.status = 'active' and p.is_active and c.is_active
    )
  );
create policy "admins manage product variants" on public.product_variants
  for all to authenticated using ((select public.is_admin())) with check ((select public.is_admin()));

create policy "public read specifications for active products" on public.product_specifications
  for select to anon, authenticated using (exists (
    select 1 from public.products p join public.categories c on c.id = p.category_id
    where p.id = product_id and p.status = 'active' and p.is_active and c.is_active
  ));
create policy "admins manage product specifications" on public.product_specifications
  for all to authenticated using ((select public.is_admin())) with check ((select public.is_admin()));

create policy "public read current banners" on public.banners
  for select to anon, authenticated using (
    is_active and (start_at is null or start_at <= now()) and (end_at is null or end_at >= now())
  );
create policy "admins manage banners" on public.banners
  for all to authenticated using ((select public.is_admin())) with check ((select public.is_admin()));

create policy "public read current offers" on public.offers
  for select to anon, authenticated using (
    is_active and (start_at is null or start_at <= now()) and (end_at is null or end_at >= now())
  );
create policy "admins manage offers" on public.offers
  for all to authenticated using ((select public.is_admin())) with check ((select public.is_admin()));
create policy "public read offers for active products" on public.product_offers
  for select to anon, authenticated using (
    exists (select 1 from public.products p join public.categories c on c.id = p.category_id
      where p.id = product_id and p.status = 'active' and p.is_active and c.is_active)
    and exists (select 1 from public.offers o where o.id = offer_id and o.is_active
      and (o.start_at is null or o.start_at <= now()) and (o.end_at is null or o.end_at >= now()))
  );
create policy "admins manage product offers" on public.product_offers
  for all to authenticated using ((select public.is_admin())) with check ((select public.is_admin()));

create policy "public read active services" on public.services
  for select to anon, authenticated using (is_active);
create policy "admins manage services" on public.services
  for all to authenticated using ((select public.is_admin())) with check ((select public.is_admin()));

create policy "public submit enquiries" on public.enquiries
  for insert to anon, authenticated with check (internal_status = 'new' and internal_notes is null);
create policy "admins read enquiries" on public.enquiries
  for select to authenticated using ((select public.is_admin()));
create policy "admins update enquiries" on public.enquiries
  for update to authenticated using ((select public.is_admin())) with check ((select public.is_admin()));

create policy "public submit repair requests" on public.repair_requests
  for insert to anon, authenticated with check (internal_status = 'new' and internal_notes is null);
create policy "admins read repair requests" on public.repair_requests
  for select to authenticated using ((select public.is_admin()));
create policy "admins update repair requests" on public.repair_requests
  for update to authenticated using ((select public.is_admin())) with check ((select public.is_admin()));

create policy "public read active FAQs" on public.chatbot_faqs
  for select to anon, authenticated using (is_active);
create policy "admins manage FAQs" on public.chatbot_faqs
  for all to authenticated using ((select public.is_admin())) with check ((select public.is_admin()));

create policy "public read store settings" on public.store_settings
  for select to anon, authenticated using (true);
create policy "admins manage store settings" on public.store_settings
  for all to authenticated using ((select public.is_admin())) with check ((select public.is_admin()));

create policy "users read own profile or admins read profiles" on public.profiles
  for select to authenticated using (id = (select auth.uid()) or (select public.is_admin()));
create policy "admins read security events" on public.security_events
  for select to authenticated using ((select public.is_admin()));

grant usage on schema public to anon, authenticated;
grant select on public.categories, public.products, public.product_images, public.product_variants,
  public.product_specifications, public.banners, public.offers, public.product_offers,
  public.services, public.chatbot_faqs, public.store_settings to anon, authenticated;
grant select, insert, update, delete on public.categories, public.products, public.product_images,
  public.product_variants, public.product_specifications, public.banners, public.offers,
  public.product_offers, public.services, public.chatbot_faqs, public.store_settings to authenticated;
grant select on public.profiles, public.security_events to authenticated;
grant select, update on public.enquiries, public.repair_requests to authenticated;
grant insert (name, phone, email, subject, message, product_id) on public.enquiries to anon, authenticated;
grant insert (customer_name, phone, device_type, brand, model, problem_description, preferred_contact_method)
  on public.repair_requests to anon, authenticated;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values
  ('product-images', 'product-images', true, 10485760, array['image/jpeg', 'image/png', 'image/webp']),
  ('banner-images', 'banner-images', true, 10485760, array['image/jpeg', 'image/png', 'image/webp']),
  ('service-images', 'service-images', true, 10485760, array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do nothing;

create policy "public read approved image buckets" on storage.objects
  for select to anon, authenticated using (bucket_id in ('product-images', 'banner-images', 'service-images'));
create policy "admins upload approved image buckets" on storage.objects
  for insert to authenticated with check (
    bucket_id in ('product-images', 'banner-images', 'service-images') and (select public.is_admin())
  );
create policy "admins update approved image buckets" on storage.objects
  for update to authenticated using (
    bucket_id in ('product-images', 'banner-images', 'service-images') and (select public.is_admin())
  ) with check (
    bucket_id in ('product-images', 'banner-images', 'service-images') and (select public.is_admin())
  );
create policy "admins delete approved image buckets" on storage.objects
  for delete to authenticated using (
    bucket_id in ('product-images', 'banner-images', 'service-images') and (select public.is_admin())
  );

