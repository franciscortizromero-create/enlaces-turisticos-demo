import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import './globals.css'

export const metadata: Metadata = {
  title: 'Enlaces Turísticos Marroquí | Viajes organizados',
  description: 'Agencia de viajes en Aguascalientes. Europa, playas mexicanas, traslados y más. Cotiza directo por WhatsApp.',
  openGraph: {
    title: 'Enlaces Turísticos Marroquí',
    description: 'Viajes organizados, precios claros, atención directa.',
    locale: 'es_MX',
    type: 'website',
  },
}

const WA_NUMBER  = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '524491131242'
const WA_TEXT    = encodeURIComponent('Hola, quiero cotizar un viaje. ¿Me puedes ayudar?')
const WA_LINK    = `https://wa.me/${WA_NUMBER}?text=${WA_TEXT}`
const FB_URL     = process.env.NEXT_PUBLIC_FACEBOOK_URL  || 'https://facebook.com'
const IG_URL     = process.env.NEXT_PUBLIC_INSTAGRAM_URL || 'https://instagram.com'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="min-h-screen antialiased">

        {/* ═══════════════════════════════════════
            HEADER — Azul marino profesional
        ═══════════════════════════════════════ */}
        <header className="sticky top-0 z-50 bg-navy-800 shadow-lg">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="flex h-16 items-center justify-between gap-4">

              {/* Logo */}
              <Link href="/" className="flex items-center gap-3 shrink-0">
                <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-white/20 bg-white/10">
                  <Image src="/logo-etm.png" alt="ETM" width={40} height={40} priority />
                </div>
                <div className="hidden sm:block">
                  <div className="font-display text-base font-bold text-white leading-tight">
                    Enlaces Turísticos
                  </div>
                  <div className="text-xs text-white/60 -mt-0.5 font-body">Marroquí</div>
                </div>
              </Link>

              {/* Nav desktop */}
              <nav className="hidden md:flex items-center gap-7">
                <Link href="/ofertas"    className="nav-link">Ofertas</Link>
                <Link href="/mexico"     className="nav-link">Visit México</Link>
                <Link href="/europa"     className="nav-link">Europa</Link>
                <Link href="/playas"     className="nav-link">Playas</Link>
                <Link href="/transportes" className="nav-link">Transportes</Link>
                <Link href="/catalogo"   className="nav-link">Catálogo</Link>
              </nav>

              {/* CTA */}
              <a href={WA_LINK} target="_blank" rel="noreferrer"
                className="btn-whatsapp shrink-0 text-xs sm:text-sm px-3 sm:px-5 py-2 sm:py-3">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.124 1.532 5.855L.054 23.454a.5.5 0 0 0 .492.546h.038l5.8-1.519A11.934 11.934 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.007-1.374l-.36-.214-3.724.976.994-3.62-.234-.373A9.818 9.818 0 1 1 12 21.818z"/>
                </svg>
                <span className="hidden sm:inline">Cotizar</span>
              </a>
            </div>
          </div>

          {/* Nav mobile */}
          <div className="md:hidden border-t border-white/10 bg-navy-900 overflow-x-auto">
            <div className="flex items-center gap-1 px-4 py-2 min-w-max">
              {[
                ['/ofertas', 'Ofertas'],
                ['/mexico', 'México'],
                ['/europa', 'Europa'],
                ['/playas', 'Playas'],
                ['/transportes', 'Transportes'],
                ['/catalogo', 'Catálogo'],
              ].map(([href, label]) => (
                <Link key={href} href={href}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium text-white/70 hover:text-white hover:bg-white/10 whitespace-nowrap transition-colors">
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </header>

        {/* Contenido */}
        {children}

        {/* ═══════════════════════════════════════
            FOOTER — Negro con redes sociales
        ═══════════════════════════════════════ */}
        <footer className="bg-gray-950 text-white">
          <div className="mx-auto max-w-7xl px-6 py-14">
            <div className="grid gap-10 md:grid-cols-3">

              {/* Marca */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 rounded-full overflow-hidden border border-white/20">
                    <Image src="/logo-etm.png" alt="ETM" width={40} height={40} />
                  </div>
                  <div>
                    <div className="font-display font-bold text-white">Enlaces Turísticos</div>
                    <div className="text-xs text-white/50">Marroquí</div>
                  </div>
                </div>
                <p className="text-sm text-white/60 leading-relaxed max-w-xs">
                  Agencia de viajes en Aguascalientes. Organizamos tu viaje con precios claros y atención directa.
                </p>

                {/* Redes sociales */}
                <div className="mt-5 flex items-center gap-3">
                  <a href={FB_URL} target="_blank" rel="noreferrer" aria-label="Facebook"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white/60 transition hover:border-blue-400 hover:text-blue-400">
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <a href={IG_URL} target="_blank" rel="noreferrer" aria-label="Instagram"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white/60 transition hover:border-pink-400 hover:text-pink-400">
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
                    </svg>
                  </a>
                  <a href={WA_LINK} target="_blank" rel="noreferrer" aria-label="WhatsApp"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white/60 transition hover:border-green-400 hover:text-green-400">
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.124 1.532 5.855L.054 23.454a.5.5 0 0 0 .492.546h.038l5.8-1.519A11.934 11.934 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.007-1.374l-.36-.214-3.724.976.994-3.62-.234-.373A9.818 9.818 0 1 1 12 21.818z"/>
                    </svg>
                  </a>
                </div>
              </div>

              {/* Links */}
              <div>
                <div className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4">Destinos</div>
                <ul className="space-y-2.5">
                  {[
                    ['Visit México', '/mexico'],
                    ['Europa', '/europa'],
                    ['Playas', '/playas'],
                    ['Ofertas destacadas', '/ofertas'],
                    ['Catálogo completo', '/catalogo'],
                  ].map(([label, href]) => (
                    <li key={href}>
                      <Link href={href} className="text-sm text-white/60 hover:text-white transition-colors">
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Servicios + CTA */}
              <div>
                <div className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4">Servicios</div>
                <ul className="space-y-2.5 mb-6">
                  {[
                    ['Renta de autobuses', '/transportes'],
                    ['Sprinters ejecutivas', '/transportes'],
                    ['Traslados aeropuerto', '/transportes'],
                    ['Helicópteros', '/transportes'],
                  ].map(([label, href]) => (
                    <li key={label}>
                      <Link href={href} className="text-sm text-white/60 hover:text-white transition-colors">
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>

                <a href={WA_LINK} target="_blank" rel="noreferrer" className="btn-whatsapp text-sm">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.124 1.532 5.855L.054 23.454a.5.5 0 0 0 .492.546h.038l5.8-1.519A11.934 11.934 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.007-1.374l-.36-.214-3.724.976.994-3.62-.234-.373A9.818 9.818 0 1 1 12 21.818z"/>
                  </svg>
                  Cotizar ahora
                </a>
              </div>
            </div>

            <div className="mt-10 border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/30">
              <span>© {new Date().getFullYear()} Enlaces Turísticos Marroquí. Todos los derechos reservados.</span>
              <span>Aguascalientes, México</span>
            </div>
          </div>
        </footer>

      </body>
    </html>
  )
}
