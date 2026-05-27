-- =============================================
-- ENLACES TURÍSTICOS MARROQUÍ — Supabase Schema v2
-- Ejecutar en Supabase > SQL Editor
-- =============================================
-- Incluye:
-- ✓ Tabla offers (paquetes/viajes)
-- ✓ Tabla services (transportes)
-- ✓ Tabla admins (control de acceso por email)
-- ✓ Row Level Security robusto
-- ✓ Triggers de updated_at
-- ✓ Índices para performance
-- ✓ Storage bucket para imágenes
-- =============================================

-- ───────────────────────────────────────────────
-- 1. EXTENSIONES
-- ───────────────────────────────────────────────
create extension if not exists "uuid-ossp";

-- ───────────────────────────────────────────────
-- 2. TABLA DE ADMINS (control de acceso por email)
-- ───────────────────────────────────────────────
create table if not exists admins (
  id          uuid primary key default gen_random_uuid(),
  email       text unique not null,
  name        text,
  role        text check (role in ('super_admin', 'admin', 'editor')) default 'admin',
  active      boolean default true,
  created_at  timestamptz default now(),
  last_login  timestamptz
);

comment on table admins is 'Lista de emails autorizados para acceder al panel admin';

-- Función helper: ¿el usuario actual es admin?
create or replace function is_admin()
returns boolean
language sql security definer stable
as $$
  select exists (
    select 1 from admins
    where email = auth.jwt()->>'email'
      and active = true
  );
$$;

-- ───────────────────────────────────────────────
-- 3. TABLA DE OFERTAS / VIAJES
-- ───────────────────────────────────────────────
create table if not exists offers (
  id              uuid primary key default gen_random_uuid(),
  slug            text unique not null,
  title           text not null check (length(title) >= 3 and length(title) <= 200),
  image_url       text,
  country         text not null default 'México',
  city            text not null,
  hotel           text not null,
  hotel_category  text check (hotel_category in ('3★','4★','5★')) default '4★',
  duration        text not null,
  price           numeric not null check (price > 0),
  currency        text check (currency in ('MXN','USD')) default 'MXN',
  dates           text,
  start_date      date,
  category        text not null,
  section         text check (section in ('mexico','europa','playas','general')) default 'general',
  summary         text check (length(summary) <= 500),
  includes        text[] default '{}',
  notes           text check (length(notes) <= 1000),
  active          boolean default true,
  featured        boolean default false,
  created_by      uuid references auth.users(id),
  updated_by      uuid references auth.users(id),
  created_at      timestamptz default now(),
  updated_at      timestamptz default now()
);

comment on table offers is 'Paquetes y ofertas de viajes disponibles';

-- Índices para performance
create index if not exists idx_offers_active_featured on offers(active, featured);
create index if not exists idx_offers_section on offers(section) where active = true;
create index if not exists idx_offers_slug on offers(slug);
create index if not exists idx_offers_created_at on offers(created_at desc);

-- ───────────────────────────────────────────────
-- 4. TABLA DE SERVICIOS DE TRANSPORTE
-- ───────────────────────────────────────────────
create table if not exists services (
  id            uuid primary key default gen_random_uuid(),
  type          text check (type in ('autobus','sprinter','traslado','helicoptero')) not null,
  name          text not null check (length(name) >= 3 and length(name) <= 100),
  description   text check (length(description) <= 500),
  capacity      text,
  price_from    numeric check (price_from >= 0),
  currency      text check (currency in ('MXN','USD')) default 'MXN',
  image_url     text,
  active        boolean default true,
  created_by    uuid references auth.users(id),
  updated_by    uuid references auth.users(id),
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

comment on table services is 'Servicios de transporte disponibles';

create index if not exists idx_services_active on services(active);
create index if not exists idx_services_type on services(type) where active = true;

-- ───────────────────────────────────────────────
-- 5. TRIGGERS PARA updated_at AUTOMÁTICO
-- ───────────────────────────────────────────────
create or replace function set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists offers_updated_at on offers;
create trigger offers_updated_at
  before update on offers
  for each row execute function set_updated_at();

drop trigger if exists services_updated_at on services;
create trigger services_updated_at
  before update on services
  for each row execute function set_updated_at();

-- ───────────────────────────────────────────────
-- 6. ROW LEVEL SECURITY
-- ───────────────────────────────────────────────
alter table offers   enable row level security;
alter table services enable row level security;
alter table admins   enable row level security;

-- ── Offers: lectura pública SOLO si active=true ──
drop policy if exists "Public read active offers" on offers;
create policy "Public read active offers"
  on offers for select
  using (active = true);

drop policy if exists "Admins read all offers" on offers;
create policy "Admins read all offers"
  on offers for select
  using (is_admin());

drop policy if exists "Admins insert offers" on offers;
create policy "Admins insert offers"
  on offers for insert
  with check (is_admin());

drop policy if exists "Admins update offers" on offers;
create policy "Admins update offers"
  on offers for update
  using (is_admin())
  with check (is_admin());

drop policy if exists "Admins delete offers" on offers;
create policy "Admins delete offers"
  on offers for delete
  using (is_admin());

-- ── Services: lectura pública SOLO si active=true ──
drop policy if exists "Public read active services" on services;
create policy "Public read active services"
  on services for select
  using (active = true);

drop policy if exists "Admins manage services" on services;
create policy "Admins manage services"
  on services for all
  using (is_admin())
  with check (is_admin());

-- ── Admins: solo super_admin puede ver/modificar ──
drop policy if exists "Admins view admins list" on admins;
create policy "Admins view admins list"
  on admins for select
  using (is_admin());

drop policy if exists "Super admins manage admins" on admins;
create policy "Super admins manage admins"
  on admins for all
  using (
    exists (
      select 1 from admins
      where email = auth.jwt()->>'email'
        and role = 'super_admin'
        and active = true
    )
  );

-- ───────────────────────────────────────────────
-- 7. STORAGE BUCKET para fotos
-- ───────────────────────────────────────────────
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('ofertas', 'ofertas', true, 5242880, array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do update set
  public = true,
  file_size_limit = 5242880,
  allowed_mime_types = array['image/jpeg', 'image/png', 'image/webp'];

-- Storage policies
drop policy if exists "Public read images" on storage.objects;
create policy "Public read images"
  on storage.objects for select
  using (bucket_id = 'ofertas');

drop policy if exists "Admins upload images" on storage.objects;
create policy "Admins upload images"
  on storage.objects for insert
  with check (bucket_id = 'ofertas' and is_admin());

drop policy if exists "Admins update images" on storage.objects;
create policy "Admins update images"
  on storage.objects for update
  using (bucket_id = 'ofertas' and is_admin());

drop policy if exists "Admins delete images" on storage.objects;
create policy "Admins delete images"
  on storage.objects for delete
  using (bucket_id = 'ofertas' and is_admin());

-- ───────────────────────────────────────────────
-- 8. INSERTAR ADMIN INICIAL
-- ───────────────────────────────────────────────
-- ⚠️ CAMBIA estos emails por los reales del cliente
insert into admins (email, name, role)
values
  ('franciscortiz.romero@gmail.com', 'Francisco Ortiz', 'super_admin')
on conflict (email) do nothing;

-- Para agregar más admins después, ejecuta:
-- insert into admins (email, name, role) values ('cliente@email.com', 'Nombre Cliente', 'admin');

-- ───────────────────────────────────────────────
-- 9. DATOS INICIALES DE OFERTAS
-- ───────────────────────────────────────────────
insert into offers (slug, title, country, city, hotel, hotel_category, duration, price, currency, dates, start_date, category, section, summary, includes, notes, active, featured)
values
  ('hard-rock-riviera-maya',
   'Hard Rock Riviera Maya 5★',
   'México', 'Riviera Maya', 'Hard Rock Riviera Maya', '5★',
   '4 días / 3 noches', 15599, 'MXN', 'Octubre 2026', '2026-10-01',
   'Familiar', 'playas',
   'Hotel 5 estrellas en Riviera Maya. 2 menores gratis.',
   array['Vuelos redondos','Hospedaje todo incluido','2 menores gratis'],
   'Precios por adulto en habitación doble. Sujeto a disponibilidad.',
   true, true),

  ('emporio-cancun',
   'Emporio Cancún 5★',
   'México', 'Cancún', 'Emporio Cancún', '5★',
   '4 días / 3 noches', 9599, 'MXN', 'Octubre 2026', '2026-10-01',
   'Familiar', 'mexico',
   'Excelente opción familiar en Cancún. 2 menores gratis.',
   array['Vuelos redondos','Hospedaje todo incluido','2 menores gratis'],
   'Precios por adulto en habitación doble. Sujeto a disponibilidad.',
   true, true),

  ('xcaret-arte-riviera-maya',
   'Xcaret Arte Riviera Maya 5★',
   'México', 'Riviera Maya', 'Xcaret Arte', '5★',
   '4 días / 3 noches', 23699, 'MXN', 'Octubre 2026', '2026-10-01',
   'Solo adultos', 'playas',
   'Resort de lujo solo adultos en Riviera Maya.',
   array['Vuelos redondos','Hospedaje todo incluido','Solo adultos'],
   'Precios por adulto en habitación doble. Sujeto a disponibilidad.',
   true, false)
on conflict (slug) do nothing;

-- ───────────────────────────────────────────────
-- 10. SERVICIOS DE TRANSPORTE INICIALES
-- ───────────────────────────────────────────────
insert into services (type, name, description, capacity, price_from, currency, active)
values
  ('autobus',    'Autobús de turismo',    'Autobús equipado con A/C, reclinable, ideal para grupos grandes', 'Hasta 50 personas', 8500,  'MXN', true),
  ('sprinter',   'Sprinter ejecutiva',    'Van ejecutiva Mercedes-Benz, perfecta para grupos medianos',      'Hasta 19 personas', 3500,  'MXN', true),
  ('traslado',   'Traslado aeropuerto',   'Servicio puerta a puerta desde/hacia aeropuerto, puntual',        'Hasta 8 personas',  650,   'MXN', true),
  ('helicoptero','Helicóptero turístico', 'Vuelos panorámicos y traslados exclusivos en helicóptero',        'Hasta 5 personas',  12000, 'MXN', true)
on conflict do nothing;

-- ───────────────────────────────────────────────
-- ✅ SCHEMA COMPLETO
-- ───────────────────────────────────────────────
-- Próximos pasos:
-- 1. Activar Google OAuth en Supabase > Authentication > Providers
-- 2. Agregar URLs autorizadas en Authentication > URL Configuration:
--    - http://localhost:3000/auth/callback (desarrollo)
--    - https://enlaces-turisticos-demo.vercel.app/auth/callback (producción)
-- 3. Para agregar más admins:
--    insert into admins (email, name, role) values ('email@ejemplo.com', 'Nombre', 'admin');
-- ───────────────────────────────────────────────
