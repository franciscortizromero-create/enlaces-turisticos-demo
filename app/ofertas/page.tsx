import Image from 'next/image'
import { createClient } from '@supabase/supabase-js'
import type { Offer } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

async function getOffers(): Promise<Offer[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) return []

  const supabase = createClient(url, key)
  const { data } = await supabase
    .from('offers')
    .select('*')
    .eq('active', true)
    .order('featured', { ascending: false })
    .order('created_at', { ascending: false })
  return data || []
}

const SECTION_LABELS: Record<string, string> = {
  mexico: 'Visit México', europa: 'Europa', playas: 'Playas', general: 'General'
}

const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '524491131242'

export default async function OfertasPage() {
  const offers = await getOffers()
  const featured = offers.filter(o => o.featured)
  const rest     = offers.filter(o => !o.featured)

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <header className="bg-navy-800 py-14 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-700/40 via-transparent to-navy-900/40" />
        <div className="relative">
          <p className="text-caption font-semibold uppercase tracking-widest text-gold-400 mb-3">
            Disponibles ahora
          </p>
          <h1 className="font-display text-display-lg sm:text-display-xl font-bold text-white mb-4 tracking-tight">
            Ofertas destacadas
          </h1>
          <p className="text-body-md text-white/70 max-w-xl mx-auto">
            Paquetes con precios reales, seleccionados esta semana para tu viaje.
          </p>
        </div>
      </header>

      <div className="container-page section">
        {/* Destacados */}
        {featured.length > 0 && (
          <div className="mb-14">
            <h2 className="font-display text-heading-lg sm:text-display-sm font-bold text-foreground mb-6 flex items-center gap-2">
              <svg className="h-7 w-7 text-accent" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
              Más populares
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {featured.map(o => <OfferCard key={o.id} offer={o} featured />)}
            </div>
          </div>
        )}

        {/* Todos */}
        {rest.length > 0 && (
          <div>
            <h2 className="font-display text-heading-lg sm:text-display-sm font-bold text-foreground mb-6">
              Todos los paquetes
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {rest.map(o => <OfferCard key={o.id} offer={o} />)}
            </div>
          </div>
        )}

        {offers.length === 0 && (
          <div className="text-center py-20 max-w-md mx-auto">
            <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-muted mb-6">
              <svg className="h-10 w-10 text-muted-foreground" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z"/>
              </svg>
            </div>
            <h2 className="text-heading-lg text-foreground mb-2">Próximamente nuevas ofertas</h2>
            <p className="text-body-md text-muted-foreground">
              Estamos preparando experiencias increíbles. Vuelve pronto.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

function OfferCard({ offer, featured }: { offer: Offer; featured?: boolean }) {
  const WA_TEXT = encodeURIComponent(`Hola, me interesa el paquete "${offer.title}" (${offer.dates}). ¿Me pueden dar información?`)
  const WA_LINK = `https://wa.me/${WA_NUMBER}?text=${WA_TEXT}`

  return (
    <article className={`group card-hover flex flex-col ${featured ? 'ring-2 ring-accent/30' : ''}`}>
      <div className="relative aspect-[4/3] overflow-hidden">
        {offer.image_url ? (
          <Image
            src={offer.image_url}
            alt={`${offer.title} - ${offer.city}`}
            fill
            className="object-cover transition-transform duration-500 ease-out-expo group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            loading="lazy"
          />
        ) : (
          <div className="h-full bg-gradient-to-br from-navy-700 to-navy-900 flex items-center justify-center">
            <svg className="h-16 w-16 text-white/30" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5z"/>
            </svg>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />

        {featured && (
          <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full bg-accent/95 backdrop-blur px-3 py-1.5 text-xs font-bold text-accent-foreground shadow-lg">
            <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>
            Destacado
          </div>
        )}
        <div className="absolute top-3 right-3 rounded-full bg-navy-900/70 backdrop-blur px-3 py-1.5 text-xs font-medium text-white">
          {SECTION_LABELS[offer.section] || offer.section}
        </div>
      </div>

      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-center gap-2 text-caption text-muted-foreground mb-2">
          <span className="font-medium">{offer.city}</span>
          <span className="h-1 w-1 rounded-full bg-muted-foreground/40" aria-hidden="true" />
          <span>{offer.hotel_category}</span>
          <span className="h-1 w-1 rounded-full bg-muted-foreground/40" aria-hidden="true" />
          <span>{offer.duration}</span>
        </div>
        <h3 className="text-heading-sm text-foreground mb-2 line-clamp-2">{offer.title}</h3>
        {offer.summary && (
          <p className="text-body-sm text-muted-foreground mb-3 line-clamp-2">{offer.summary}</p>
        )}

        {offer.includes?.length > 0 && (
          <ul className="mb-4 space-y-1.5">
            {offer.includes.slice(0, 3).map((inc, i) => (
              <li key={i} className="flex items-start gap-2 text-caption text-foreground/80">
                <svg className="h-4 w-4 text-success shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"/>
                </svg>
                <span className="line-clamp-1">{inc}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto pt-2 border-t border-border">
          <div className="flex items-baseline gap-1.5 mb-4 mt-3">
            <span className="text-caption text-muted-foreground">Desde</span>
            <span className="text-display-sm font-bold text-foreground tabular-nums">
              ${offer.price.toLocaleString()}
            </span>
            <span className="text-caption text-muted-foreground font-medium">{offer.currency}</span>
          </div>
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Cotizar ${offer.title} por WhatsApp`}
            className="btn-whatsapp w-full justify-center"
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.124 1.532 5.855L.054 23.454a.5.5 0 0 0 .492.546h.038l5.8-1.519A11.934 11.934 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.007-1.374l-.36-.214-3.724.976.994-3.62-.234-.373A9.818 9.818 0 1 1 12 21.818z"/>
            </svg>
            Cotizar por WhatsApp
          </a>
          {offer.dates && (
            <p className="text-caption text-center text-muted-foreground mt-2">{offer.dates}</p>
          )}
        </div>
      </div>
    </article>
  )
}
