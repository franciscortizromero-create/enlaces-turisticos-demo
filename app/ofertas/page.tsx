import Image from 'next/image'
import Link from 'next/link'
import { createClient } from '@supabase/supabase-js'
import type { Offer } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

async function getOffers(): Promise<Offer[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

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

export default async function OfertasPage() {
  const offers = await getOffers()
  const featured = offers.filter(o => o.featured)
  const rest     = offers.filter(o => !o.featured)

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero */}
      <div className="bg-navy-800 py-14 px-6 text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-gold-400 mb-2">Disponibles ahora</p>
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-3">Ofertas destacadas</h1>
        <p className="text-white/60 max-w-xl mx-auto">Paquetes con precios reales, seleccionados esta semana para tu viaje.</p>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12">

        {/* Destacados */}
        {featured.length > 0 && (
          <div className="mb-12">
            <h2 className="font-display text-2xl font-bold text-navy-900 mb-6 flex items-center gap-2">
              <span className="text-gold-500">⭐</span> Más populares
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featured.map(o => <OfferCard key={o.id} offer={o} featured />)}
            </div>
          </div>
        )}

        {/* Todos */}
        {rest.length > 0 && (
          <div>
            <h2 className="font-display text-2xl font-bold text-navy-900 mb-6">Todos los paquetes</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {rest.map(o => <OfferCard key={o.id} offer={o} />)}
            </div>
          </div>
        )}

        {offers.length === 0 && (
          <div className="text-center py-20 text-slate-400">
            <div className="text-6xl mb-4">🏖️</div>
            <p className="text-lg">Próximamente nuevas ofertas</p>
          </div>
        )}
      </div>
    </main>
  )
}

function OfferCard({ offer, featured }: { offer: Offer; featured?: boolean }) {
  const WA_TEXT = encodeURIComponent(`Hola, me interesa el paquete "${offer.title}" (${offer.dates}). ¿Me pueden dar información?`)
  const WA_LINK = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '524491131242'}?text=${WA_TEXT}`

  return (
    <div className={`card flex flex-col ${featured ? 'ring-2 ring-gold-400/40' : ''}`}>
      {/* Imagen */}
      <div className="relative aspect-video overflow-hidden">
        {offer.image_url ? (
          <Image src={offer.image_url} alt={offer.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
        ) : (
          <div className="h-full bg-gradient-to-br from-navy-700 to-navy-900 flex items-center justify-center text-4xl">🏖️</div>
        )}
        {featured && (
          <div className="absolute top-3 left-3 rounded-full bg-gold-400 px-2.5 py-1 text-xs font-bold text-navy-900">⭐ Destacado</div>
        )}
        <div className="absolute top-3 right-3 rounded-full bg-black/50 px-2.5 py-1 text-xs text-white backdrop-blur">
          {SECTION_LABELS[offer.section] || offer.section}
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-col flex-1 p-5">
        <div className="text-xs text-slate-400 mb-1">{offer.city} · {offer.hotel_category} · {offer.duration}</div>
        <h3 className="font-semibold text-navy-900 text-base leading-snug mb-2">{offer.title}</h3>
        {offer.summary && <p className="text-xs text-slate-500 mb-3 leading-relaxed">{offer.summary}</p>}

        {/* Incluye */}
        {offer.includes?.length > 0 && (
          <ul className="mb-4 space-y-1">
            {offer.includes.slice(0, 3).map((inc, i) => (
              <li key={i} className="flex items-center gap-1.5 text-xs text-slate-600">
                <span className="text-green-500">✓</span> {inc}
              </li>
            ))}
          </ul>
        )}

        {/* Precio */}
        <div className="mt-auto">
          <div className="flex items-baseline gap-1 mb-4">
            <span className="text-xs text-slate-400">Desde</span>
            <span className="text-2xl font-bold text-navy-900">${offer.price.toLocaleString()}</span>
            <span className="text-xs text-slate-400">{offer.currency}</span>
          </div>

          <a href={WA_LINK} target="_blank" rel="noreferrer" className="btn-whatsapp w-full justify-center text-sm py-2.5">
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.124 1.532 5.855L.054 23.454a.5.5 0 0 0 .492.546h.038l5.8-1.519A11.934 11.934 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.007-1.374l-.36-.214-3.724.976.994-3.62-.234-.373A9.818 9.818 0 1 1 12 21.818z"/>
            </svg>
            Cotizar por WhatsApp
          </a>
          {offer.dates && <p className="text-xs text-center text-slate-400 mt-2">📅 {offer.dates}</p>}
        </div>
      </div>
    </div>
  )
}
