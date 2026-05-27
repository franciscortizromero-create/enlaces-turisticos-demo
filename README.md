# Enlaces Turísticos Marroquí — v2

Sitio web completo con panel de administración, base de datos en Supabase y hosting en Vercel.

---

## 🚀 Guía de instalación paso a paso

### 1. Configurar Supabase

1. Ve a [supabase.com](https://supabase.com) → **New project**
2. Ponle nombre: `enlaces-turisticos`
3. Ve a **SQL Editor** y ejecuta todo el contenido de `supabase-schema.sql`
4. Ve a **Settings → API** y copia:
   - `Project URL` → es tu `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → es tu `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 2. Habilitar Google Auth en Supabase

1. Ve a **Authentication → Providers → Google**
2. Actívalo y sigue las instrucciones para crear credenciales en Google Cloud Console
3. En **Authentication → URL Configuration**, agrega:
   - Site URL: `https://tu-dominio.vercel.app`
   - Redirect URL: `https://tu-dominio.vercel.app/admin/dashboard`

### 3. Instalar dependencias

```bash
cd enlaces-v2
npm install
```

### 4. Variables de entorno locales

```bash
cp .env.example .env.local
# Edita .env.local con tus valores reales
```

### 5. Correr en desarrollo

```bash
npm run dev
# Abre http://localhost:3000
```

### 6. Deploy a Vercel

```bash
# Opción A: desde la terminal
npx vercel

# Opción B: conectar el repo en vercel.com
# 1. Sube el código a GitHub
# 2. Importa el repo en vercel.com
# 3. Agrega las variables de entorno en Vercel → Settings → Environment Variables
```

---

## 📁 Estructura del proyecto

```
app/
  layout.tsx          ← Header azul + Footer negro con redes sociales
  page.tsx            ← Home con slider de promociones
  ofertas/page.tsx    ← Todas las ofertas
  mexico/page.tsx     ← Sección Visit México
  europa/page.tsx     ← Sección Europa
  playas/page.tsx     ← Sección Playas
  transportes/page.tsx← Servicios de transporte
  catalogo/page.tsx   ← Catálogo con filtros
  admin/
    page.tsx          ← Login con Google
    dashboard/page.tsx← Panel admin (CRUD completo)
  api/
    offers/route.ts   ← API de viajes
    upload/route.ts   ← API de subida de imágenes

components/
  SectionPage.tsx     ← Componente reutilizable para secciones

lib/
  supabase.ts         ← Cliente y tipos de Supabase
```

---

## 🎛️ Cómo usa el admin el cliente

1. Va a `https://tu-sitio.com/admin`
2. Hace clic en **Entrar con Google** (su cuenta de Gmail)
3. En el dashboard puede:
   - **+ Nuevo viaje** → llena el formulario con foto, precio, fechas, etc.
   - **Editar** un viaje existente
   - **Borrar** un viaje
   - Marcar como **⭐ Destacado** o **Publicado/Oculto**
4. Los cambios aparecen en el sitio al instante

---

## 🎨 Variables que puedes cambiar fácilmente

En `.env.local`:
```
NEXT_PUBLIC_WHATSAPP_NUMBER=524491131242   ← número real de WhatsApp
NEXT_PUBLIC_FACEBOOK_URL=https://...      ← URL de Facebook
NEXT_PUBLIC_INSTAGRAM_URL=https://...     ← URL de Instagram
```

---

## 💰 Costo estimado

| Servicio | Plan | Costo |
|----------|------|-------|
| Vercel | Hobby (gratis) | $0 |
| Supabase | Free tier | $0 |
| Dominio | Namecheap/GoDaddy | ~$150 MXN/año |

El cliente puede operar sin pagar nada hasta que el tráfico crezca significativamente.
