'use client'

import { useEffect, useState, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import useEmblaCarousel from 'embla-carousel-react'

const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '524491131242'
const WA_TEXT   = encodeURIComponent('Hola, quiero cotizar un viaje. ¿Me puedes ayudar?')
const WA_LINK   = `https://wa.me/${WA_NUMBER}?text=${WA_TEXT}`

// ── Slides del hero (fotos Unsplash de alta calidad) ──
const HERO_SLIDES = [
  {
    img: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=1600&q=80',
    tag: 'Caribe Mexicano',
    title: 'Riviera Maya',
    sub: 'Todo incluido desde $9,599 MXN',
    href: '/playas',
  },
  {
    img: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=1600&q=80',
    tag: 'Europa',
    title: 'París, Roma y Madrid',
    sub: 'Paquetes europeos con todo incluido',
    href: '/europa',
  },
  {
    img: 'https://images.unsplash.com/photo-1518638150340-f706e86654de?w=1600&q=80',
    tag: 'Visit México',
    title: 'Conoce México',
    sub: 'Los mejores destinos nacionales',
    href: '/mexico',
  },
  {
    img: 'https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?w=1600&q=80',
    tag: 'Traslados exclusivos',
    title: 'Helicópteros y más',
    sub: 'Autobuses, sprinters y helicópteros',
    href: '/transportes',
  },
]

// ── Destinos destacados ──
const DESTINOS = [
  {
    img: 'https://images.unsplash.com/photo-1512813195386-6cf811ad3542?w=800&q=80',
    label: 'Visit México',
    desc: 'Cancún, CDMX, Los Cabos y más',
    href: '/mexico',
    color: 'from-green-900/80',
  },
  {
    img: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&q=80',
    label: 'Europa',
    desc: 'París, Roma, Barcelona, Ámsterdam',
    href: '/europa',
    color: 'from-blue-900/80',
  },
  {
    img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
    label: 'Playas',
    desc: 'Riviera Maya, Huatulco, Los Cabos',
    href: '/playas',
    color: 'from-cyan-900/80',
  },
  {
    img: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&q=80',
    label: 'Transportes',
    desc: 'Autobuses, sprinters, helicópteros',
    href: '/transportes',
    color: 'from-slate-900/80',
  },
]

// ── Servicios de transporte (SVG icons profesionales) ──
const TRANSPORTES = [
  {
    title: 'Autobús de turismo',
    cap: 'Hasta 50 personas',
    desc: 'Ideal para grupos grandes. A/C, reclinable.',
    svg: (
      <svg className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"/>
      </svg>
    ),
  },
  {
    title: 'Sprinter ejecutiva',
    cap: 'Hasta 19 personas',
    desc: 'Van Mercedes-Benz para grupos medianos.',
    svg: (
      <svg className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0112 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125"/>
      </svg>
    ),
  },
  {
    title: 'Traslado aeropuerto',
    cap: 'Hasta 8 personas',
    desc: 'Puerta a puerta, puntual y seguro.',
    svg: (
      <svg className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25"/>
      </svg>
    ),
  },
  {
    title: 'Helicóptero',
    cap: 'Hasta 5 personas',
    desc: 'Vuelos panorámicos y traslados exclusivos.',
    svg: (
      <svg className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"/>
      </svg>
    ),
  },
]

// ── Componente Slider ──
function HeroSlider() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
  const [current, setCurrent] = useState(0)

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setCurrent(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    emblaApi.on('select', onSelect)
    // autoplay
    const interval = setInterval(() => emblaApi.scrollNext(), 5000)
    return () => { clearInterval(interval); emblaApi.off('select', onSelect) }
  }, [emblaApi, onSelect])

  return (
    <div className="relative h-[92vh] min-h-[580px] max-h-[900px]">
      <div className="embla h-full" ref={emblaRef}>
        <div className="embla__container h-full">
          {HERO_SLIDES.map((slide, i) => (
            <div key={i} className="embla__slide relative h-full">
              <Image
                src={slide.img}
                alt={slide.title}
                fill
                priority={i === 0}
                className="object-cover"
                sizes="100vw"
              />
              {/* Overlay degradado */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70" />

              {/* Contenido */}
              <div className="absolute inset-0 flex items-center">
                <div className="mx-auto max-w-7xl px-6 w-full">
                  <div className="max-w-2xl">
                    <span className="inline-block rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs font-semibold text-white backdrop-blur mb-5">
                      {slide.tag}
                    </span>
                    <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-4">
                      {slide.title}
                    </h1>
                    <p className="text-lg sm:text-xl text-white/85 mb-8 font-body">
                      {slide.sub}
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <Link href={slide.href} className="btn-gold text-base px-7 py-3.5">
                        Ver paquetes
                      </Link>
                      <a href={WA_LINK} target="_blank" rel="noreferrer" className="btn-whatsapp text-base px-7 py-3.5">
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.124 1.532 5.855L.054 23.454a.5.5 0 0 0 .492.546h.038l5.8-1.519A11.934 11.934 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.007-1.374l-.36-.214-3.724.976.994-3.62-.234-.373A9.818 9.818 0 1 1 12 21.818z"/>
                        </svg>
                        Cotizar
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => emblaApi?.scrollTo(i)}
            className={`h-1.5 rounded-full transition-all ${
              i === current ? 'w-8 bg-gold-400' : 'w-2 bg-white/40'
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

// ── Página principal ──
export default function HomePage() {
  return (
    <>

      {/* HERO SLIDER */}
      <HeroSlider />

      {/* DESTINOS GRID */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest text-navy-500 mb-3">Explora nuestros destinos</p>
            <h2 className="section-title">¿A dónde quieres ir?</h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {DESTINOS.map((d) => (
              <Link key={d.href} href={d.href}
                className="group relative rounded-2xl overflow-hidden aspect-[3/4] block">
                <Image src={d.img} alt={d.label} fill className="object-cover transition-transform duration-500 group-hover:scale-110" sizes="(max-width: 768px) 50vw, 25vw" />
                <div className={`absolute inset-0 bg-gradient-to-t ${d.color} to-transparent`} />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div className="font-display text-xl font-bold text-white">{d.label}</div>
                  <div className="text-xs text-white/75 mt-1">{d.desc}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* TRANSPORTES */}
      <section className="py-20 bg-navy-900">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest text-gold-400 mb-3">Movilidad total</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">Servicios de transporte</h2>
            <p className="mt-3 text-white/60 max-w-xl mx-auto">
              Desde traslados al aeropuerto hasta vuelos en helicóptero. Nos adaptamos a tu grupo y presupuesto.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {TRANSPORTES.map((t) => (
              <div
                key={t.title}
                className="group rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 hover:border-gold-400/30 transition-all duration-300 ease-out-expo hover:-translate-y-1"
              >
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gold-400/10 text-gold-400 mb-4 group-hover:bg-gold-400/20 transition-colors">
                  {t.svg}
                </div>
                <div className="font-semibold text-white mb-1">{t.title}</div>
                <div className="text-xs text-gold-400 font-medium mb-3">{t.cap}</div>
                <p className="text-sm text-white/60 leading-relaxed">{t.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link href="/transportes" className="btn-gold inline-flex px-8 py-3.5 text-base">
              Ver todos los servicios
            </Link>
          </div>
        </div>
      </section>

      {/* CÓMO FUNCIONA */}
      <section className="py-20 bg-slate-50">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-navy-500 mb-3">Así de fácil</p>
          <h2 className="section-title mb-14">¿Cómo funciona?</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { n: '01', title: 'Explora', desc: 'Navega entre nuestros destinos y paquetes disponibles.' },
              { n: '02', title: 'Elige', desc: 'Selecciona el viaje que más te gusta y revisa lo que incluye.' },
              { n: '03', title: 'Cotiza', desc: 'Contáctanos por WhatsApp y te mandamos tu propuesta en minutos.' },
            ].map((s) => (
              <div key={s.n} className="text-center">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-navy-800 text-gold-400 font-display text-xl font-bold mb-5">
                  {s.n}
                </div>
                <h3 className="font-display text-xl font-bold text-navy-900 mb-2">{s.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="section-title mb-4">¿Listo para tu próximo viaje?</h2>
          <p className="text-slate-500 mb-8 text-lg">
            Cuéntanos tu destino, fechas y número de personas.<br/>
            Te respondemos rápido con opciones a tu medida.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href={WA_LINK} target="_blank" rel="noreferrer" className="btn-whatsapp text-base px-8 py-4">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.124 1.532 5.855L.054 23.454a.5.5 0 0 0 .492.546h.038l5.8-1.519A11.934 11.934 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.007-1.374l-.36-.214-3.724.976.994-3.62-.234-.373A9.818 9.818 0 1 1 12 21.818z"/>
              </svg>
              Cotizar por WhatsApp
            </a>
            <Link href="/catalogo" className="btn-outline text-base px-8 py-4">
              Ver catálogo completo
            </Link>
          </div>
        </div>
      </section>

    </>
  )
}
