create table if not exists public.website_content (
  id boolean primary key default true check (id = true),
  content jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.website_content enable row level security;

grant select on public.website_content to anon, authenticated;
grant insert, update, delete on public.website_content to authenticated;

drop policy if exists "Website content is readable by everyone"
  on public.website_content;

create policy "Website content is readable by everyone"
  on public.website_content
  for select
  to anon, authenticated
  using (true);

drop policy if exists "Active admins can insert website content"
  on public.website_content;

create policy "Active admins can insert website content"
  on public.website_content
  for insert
  to authenticated
  with check (
    exists (
      select 1
      from public.profiles
      where profiles.id = auth.uid()
        and profiles.role in ('owner', 'admin')
        and profiles.status = 'active'
    )
  );

drop policy if exists "Active admins can update website content"
  on public.website_content;

create policy "Active admins can update website content"
  on public.website_content
  for update
  to authenticated
  using (
    exists (
      select 1
      from public.profiles
      where profiles.id = auth.uid()
        and profiles.role in ('owner', 'admin')
        and profiles.status = 'active'
    )
  )
  with check (
    exists (
      select 1
      from public.profiles
      where profiles.id = auth.uid()
        and profiles.role in ('owner', 'admin')
        and profiles.status = 'active'
    )
  );

drop policy if exists "Active admins can delete website content"
  on public.website_content;

create policy "Active admins can delete website content"
  on public.website_content
  for delete
  to authenticated
  using (
    exists (
      select 1
      from public.profiles
      where profiles.id = auth.uid()
        and profiles.role in ('owner', 'admin')
        and profiles.status = 'active'
    )
  );