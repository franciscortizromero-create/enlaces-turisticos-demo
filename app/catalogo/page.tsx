'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import type { Offer } from '@/lib/supabase'

const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '524491131242'

const SECTIONS = [
  { value: '',        label: 'Todos' },
  { value: 'mexico',  label: 'Visit México' },
  { value: 'europa',  label: 'Europa' },
  { value: 'playas',  label: 'Playas' },
  { value: 'general', label: 'General' },
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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-navy-800 py-14 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-700/40 via-transparent to-navy-900/40" />
        <div className="relative">
          <h1 className="font-display text-display-lg sm:text-display-xl font-bold text-white mb-3 tracking-tight">
            Catálogo completo
          </h1>
          <p className="text-body-md text-white/70 max-w-xl mx-auto">
            Filtra por destino, categoría o busca tu viaje ideal.
          </p>
        </div>
      </header>

      {/* Filtros */}
      <div className="sticky top-16 z-30 bg-surface/95 backdrop-blur border-b border-border shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-3 flex flex-wrap gap-3 items-center">
          {/* Búsqueda */}
          <div className="relative flex-1 min-w-[200px]">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/>
            </svg>
            <input
              type="search"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Buscar destino o hotel..."
              aria-label="Buscar paquete"
              className="input pl-9"
            />
          </div>
          {/* Sección */}
          <div className="flex gap-1.5 flex-wrap" role="tablist" aria-label="Filtro por sección">
            {SECTIONS.map(s => (
              <button
                key={s.value}
                onClick={() => setSection(s.value)}
                role="tab"
                aria-selected={section === s.value}
                className={`px-3 py-2 rounded-lg text-xs font-medium transition-all min-h-[36px] ${
                  section === s.value
                    ? 'bg-primary text-primary-foreground shadow-md'
                    : 'bg-muted text-muted-foreground hover:bg-border'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
          {/* Categoría */}
          <select
            value={category}
            onChange={e => setCategory(e.target.value)}
            aria-label="Filtrar por categoría"
            className="input w-auto"
          >
            {CATEGORIES.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
      </div>

      {/* Resultados */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-10" aria-label="Resultados del catálogo">
        {loading ? (
          <div className="flex justify-center py-20" role="status" aria-label="Cargando paquetes">
            <div className="h-10 w-10 border-3 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 max-w-md mx-auto">
            <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-muted mb-6">
              <svg className="h-10 w-10 text-muted-foreground" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/>
              </svg>
            </div>
            <h2 className="text-heading-lg text-foreground mb-2">Sin resultados</h2>
            <p className="text-body-md text-muted-foreground">
              No encontramos paquetes con esos filtros. Prueba con otros.
            </p>
          </div>
        ) : (
          <>
            <p className="text-body-sm text-muted-foreground mb-6">
              {filtered.length} paquete{filtered.length !== 1 ? 's' : ''} encontrado{filtered.length !== 1 ? 's' : ''}
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {filtered.map(offer => <CatalogCard key={offer.id} offer={offer} />)}
            </div>
          </>
        )}
      </section>
    </div>
  )
}

function CatalogCard({ offer }: { offer: Offer }) {
  const WA_TEXT = encodeURIComponent(`Hola, me interesa el paquete "${offer.title}" (${offer.dates}). ¿Me pueden dar información?`)
  const WA_LINK = `https://wa.me/${WA_NUMBER}?text=${WA_TEXT}`

  return (
    <article className="group card-hover flex flex-col">
      <div className="relative aspect-[4/3] overflow-hidden">
        {offer.image_url ? (
          <Image
            src={offer.image_url}
            alt={`${offer.title} en ${offer.city}`}
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

        {offer.featured && (
          <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full bg-accent/95 backdrop-blur px-3 py-1.5 text-xs font-bold text-accent-foreground shadow-lg">
            <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>
            Popular
          </div>
        )}
        <div className="absolute top-3 right-3 rounded-full bg-navy-900/70 backdrop-blur px-3 py-1.5 text-xs font-medium text-white">
          {offer.category}
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
        <h3 className="text-heading-sm text-foreground mb-3 line-clamp-2">{offer.title}</h3>
        {offer.includes?.slice(0,2).map((inc,i) => (
          <p key={i} className="text-caption text-foreground/80 flex items-start gap-1.5 mb-1.5">
            <svg className="h-4 w-4 text-success shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"/>
            </svg>
            <span className="line-clamp-1">{inc}</span>
          </p>
        ))}
        <div className="mt-auto pt-4 border-t border-border flex items-center justify-between gap-3">
          <div className="flex items-baseline gap-1">
            <span className="text-caption text-muted-foreground">Desde</span>
            <span className="text-heading-md font-bold text-foreground tabular-nums">${offer.price.toLocaleString()}</span>
            <span className="text-caption text-muted-foreground">{offer.currency}</span>
          </div>
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Cotizar ${offer.title} por WhatsApp`}
            className="btn-whatsapp btn-sm"
          >
            Cotizar
          </a>
        </div>
      </div>
    </article>
  )
}
