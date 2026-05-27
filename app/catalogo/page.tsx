'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import type { Offer } from '@/lib/supabase'

const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '524491131242'

const SECTIONS = [
  { value: '',        label: 'Todos' },
  { value: 'mexico',  label: '🇲🇽 Visit México' },
  { value: 'europa',  label: '🗼 Europa' },
  { value: 'playas',  label: '🌴 Playas' },
  { value: 'general', label: '🌍 General' },
]

const CATEGORIES = ['Todos', 'Playa', 'Todo incluido', 'Familiar', 'Solo adultos', 'Lujo', 'Cultural', 'Aventura']

export default function CatalogoPage() {
  const [offers, setOffers]       = useState<Offer[]>([])
  const [loading, setLoading]     = useState(true)
  const [section, setSection]     = useState('')
  const [category, setCategory]   = useState('Todos')
  const [search, setSearch]       = useState('')

  useEffect(() => {
    setLoading(true)
    const params = new URLSearchParams()
    if (section) params.set('section', section)
    if (category !== 'Todos') params.set('category', category)

    fetch(`/api/offers?${params}`)
      .then(r => r.json())
      .then(data => { setOffers(Array.isArray(data) ? data : []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [section, category])

  const filtered = offers.filter(o =>
    !search || o.title.toLowerCase().includes(search.toLowerCase()) ||
    o.city.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-navy-800 py-12 px-6 text-center">
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-2">Catálogo completo</h1>
        <p className="text-white/60">Filtra por destino, categoría o busca tu viaje ideal.</p>
      </div>

      {/* Filtros */}
      <div className="sticky top-16 z-30 bg-white border-b border-slate-100 shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-3 flex flex-wrap gap-3 items-center">
          {/* Búsqueda */}
          <input
            type="search"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Buscar destino o hotel..."
            className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm outline-none focus:border-navy-400 focus:ring-2 focus:ring-navy-100 flex-1 min-w-40"
          />
          {/* Sección */}
          <div className="flex gap-1.5 flex-wrap">
            {SECTIONS.map(s => (
              <button key={s.value} onClick={() => setSection(s.value)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${section === s.value ? 'bg-navy-700 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
                {s.label}
              </button>
            ))}
          </div>
          {/* Categoría */}
          <select value={category} onChange={e => setCategory(e.target.value)}
            className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-navy-400">
            {CATEGORIES.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
      </div>

      {/* Resultados */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin h-8 w-8 border-2 border-navy-600 border-t-transparent rounded-full" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-slate-400">
            <div className="text-5xl mb-4">🔍</div>
            <p>No encontramos resultados. Intenta con otros filtros.</p>
          </div>
        ) : (
          <>
            <p className="text-sm text-slate-500 mb-6">{filtered.length} paquete{filtered.length !== 1 ? 's' : ''} encontrado{filtered.length !== 1 ? 's' : ''}</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map(offer => <CatalogCard key={offer.id} offer={offer} />)}
            </div>
          </>
        )}
      </div>
    </main>
  )
}

function CatalogCard({ offer }: { offer: Offer }) {
  const WA_TEXT = encodeURIComponent(`Hola, me interesa el paquete "${offer.title}" (${offer.dates}). ¿Me pueden dar información?`)
  const WA_LINK = `https://wa.me/${WA_NUMBER}?text=${WA_TEXT}`

  return (
    <div className="card flex flex-col">
      <div className="relative aspect-video overflow-hidden">
        {offer.image_url ? (
          <Image src={offer.image_url} alt={offer.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
        ) : (
          <div className="h-full bg-gradient-to-br from-navy-700 to-navy-900 flex items-center justify-center text-4xl">🌍</div>
        )}
        {offer.featured && <div className="absolute top-2 left-2 rounded-full bg-gold-400 px-2 py-0.5 text-xs font-bold text-navy-900">⭐</div>}
        <div className="absolute top-2 right-2 rounded-full bg-black/50 px-2 py-0.5 text-xs text-white backdrop-blur">{offer.category}</div>
      </div>
      <div className="flex flex-col flex-1 p-5">
        <div className="text-xs text-slate-400 mb-1">{offer.city} · {offer.hotel_category} · {offer.duration}</div>
        <h3 className="font-semibold text-navy-900 leading-snug mb-3">{offer.title}</h3>
        {offer.includes?.slice(0,2).map((inc,i) => (
          <p key={i} className="text-xs text-slate-500 flex items-center gap-1.5 mb-1"><span className="text-green-500">✓</span>{inc}</p>
        ))}
        <div className="mt-auto pt-4 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400">Desde </span>
            <span className="text-xl font-bold text-navy-900">${offer.price.toLocaleString()}</span>
            <span className="text-xs text-slate-400"> {offer.currency}</span>
          </div>
          <a href={WA_LINK} target="_blank" rel="noreferrer" className="btn-whatsapp text-xs px-3 py-2">Cotizar</a>
        </div>
      </div>
    </div>
  )
}
