-- Allow the admin inbox to receive live enquiry changes and delete records.
grant delete on public.enquiries to authenticated;

drop policy if exists "admins delete enquiries" on public.enquiries;
create policy "admins delete enquiries" on public.enquiries
  for delete to authenticated using ((select public.is_admin()));

do $$
begin
  if exists (select 1 from pg_publication where pubname = 'supabase_realtime')
    and not exists (
      select 1 from pg_publication_tables
      where pubname = 'supabase_realtime'
        and schemaname = 'public'
        and tablename = 'enquiries'
    ) then
    alter publication supabase_realtime add table public.enquiries;
  end if;
end;
$$;
