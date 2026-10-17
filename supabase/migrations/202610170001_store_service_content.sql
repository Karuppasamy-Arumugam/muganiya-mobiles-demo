alter table public.services
  add column if not exists features jsonb not null default '[]'::jsonb,
  add column if not exists enquiry_service text,
  add column if not exists icon text not null default 'Wrench';