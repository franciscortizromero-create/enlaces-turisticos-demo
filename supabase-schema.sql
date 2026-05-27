-- =============================================
-- ENLACES TURÍSTICOS MARROQUÍ — Supabase Schema
-- Ejecutar en Supabase > SQL Editor
-- =============================================

-- 1. TABLA DE VIAJES/OFERTAS
create table offers (
  id           uuid primary key default gen_random_uuid(),
  slug         text unique not null,
  title        text not null,
  image_url    text,
  country      text not null default 'México',
  city         text not null,
  hotel        text not null,
  hotel_category text check (hotel_category in ('3★','4★','5★')) default '4★',
  duration     text not null,
  price        numeric not null,
  currency     text check (currency in ('MXN','USD')) default 'MXN',
  dates        text,
  start_date   date,
  category     text not null,
  section      text check (section in ('mexico','europa','playas','general')) default 'general',
  summary      text,
  includes     text[] default '{}',
  notes        text,
  active       boolean default true,
  featured     boolean default false,
  created_at   timestamptz default now()
);

-- 2. TABLA DE SERVICIOS DE TRANSPORTE
create table services (
  id           uuid primary key default gen_random_uuid(),
  type         text check (type in ('autobus','sprinter','traslado','helicoptero')) not null,
  name         text not null,
  description  text,
  capacity     text,
  price_from   numeric,
  currency     text check (currency in ('MXN','USD')) default 'MXN',
  image_url    text,
  active       boolean default true,
  created_at   timestamptz default now()
);

-- 3. STORAGE BUCKET para fotos
insert into storage.buckets (id, name, public) values ('ofertas', 'ofertas', true);

-- 4. POLÍTICAS RLS (Row Level Security)
-- Lectura pública
alter table offers enable row level security;
alter table services enable row level security;

create policy "Lectura pública de ofertas"
  on offers for select using (true);

create policy "Lectura pública de servicios"
  on services for select using (true);

-- Admin (solo usuarios autenticados con Google)
create policy "Admin puede todo en ofertas"
  on offers for all using (auth.role() = 'authenticated');

create policy "Admin puede todo en servicios"
  on services for all using (auth.role() = 'authenticated');

-- Storage: lectura pública, escritura solo autenticados
create policy "Imágenes públicas"
  on storage.objects for select using (bucket_id = 'ofertas');

create policy "Admin sube imágenes"
  on storage.objects for insert
  with check (bucket_id = 'ofertas' and auth.role() = 'authenticated');

create policy "Admin borra imágenes"
  on storage.objects for delete
  using (bucket_id = 'ofertas' and auth.role() = 'authenticated');

-- 5. DATOS INICIALES (los 3 viajes del demo original)
insert into offers (slug, title, country, city, hotel, hotel_category, duration, price, currency, dates, start_date, category, section, summary, includes, notes, active, featured)
values
  ('hard-rock-riviera-maya',
   'Hard Rock Riviera Maya 5★',
   'México', 'Riviera Maya', 'Hard Rock Riviera Maya', '5★',
   '4 días / 3 noches', 15599, 'MXN', 'Octubre 2026', '2026-10-01',
   'Familiar', 'playas',
   'Hotel 5 estrellas en Riviera Maya. 2 menores gratis.',
   ARRAY['Vuelos redondos','Hospedaje todo incluido','2 menores gratis'],
   'Precios por adulto en habitación doble. Sujeto a disponibilidad.',
   true, true),

  ('emporio-cancun',
   'Emporio Cancún 5★',
   'México', 'Cancún', 'Emporio Cancún', '5★',
   '4 días / 3 noches', 9599, 'MXN', 'Octubre 2026', '2026-10-01',
   'Familiar', 'mexico',
   'Excelente opción familiar en Cancún. 2 menores gratis.',
   ARRAY['Vuelos redondos','Hospedaje todo incluido','2 menores gratis'],
   'Precios por adulto en habitación doble. Sujeto a disponibilidad.',
   true, true),

  ('xcaret-arte-riviera-maya',
   'Xcaret Arte Riviera Maya 5★',
   'México', 'Riviera Maya', 'Xcaret Arte', '5★',
   '4 días / 3 noches', 23699, 'MXN', 'Octubre 2026', '2026-10-01',
   'Solo adultos', 'playas',
   'Resort de lujo solo adultos en Riviera Maya.',
   ARRAY['Vuelos redondos','Hospedaje todo incluido','Solo adultos'],
   'Precios por adulto en habitación doble. Sujeto a disponibilidad.',
   true, false);

-- 6. SERVICIOS DE TRANSPORTE INICIALES
insert into services (type, name, description, capacity, price_from, currency, active)
values
  ('autobus',    'Autobús de turismo',    'Autobús equipado con A/C, reclinable, ideal para grupos grandes', 'Hasta 50 personas', 8500,  'MXN', true),
  ('sprinter',   'Sprinter ejecutiva',    'Van ejecutiva Mercedes-Benz, perfecta para grupos medianos',      'Hasta 19 personas', 3500,  'MXN', true),
  ('traslado',   'Traslado aeropuerto',   'Servicio puerta a puerta desde/hacia aeropuerto, puntual',        'Hasta 8 personas',  650,   'MXN', true),
  ('helicoptero','Helicóptero turístico', 'Vuelos panorámicos y traslados exclusivos en helicóptero',        'Hasta 5 personas',  12000, 'MXN', true);
