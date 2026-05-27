import Image from 'next/image'
import { createClient } from '@supabase/supabase-js'
import type { Service } from '@/lib/supabase'

export const metadata = {
  title: 'Transportes | Enlaces Turísticos Marroquí',
  description: 'Renta de autobuses, sprinters ejecutivas, traslados aeropuerto y helicópteros en Aguascalientes.',
}

const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '524491131242'

const TYPE_INFO: Record<string, { icon: string; color: string; img: string }> = {
  autobus:    { icon: '🚌', color: 'from-blue-800 to-blue-900', img: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&q=80' },
  sprinter:   { icon: '🚐', color: 'from-navy-700 to-navy-900', img: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800&q=80' },
  traslado:   { icon: '🚗', color: 'from-slate-700 to-slate-900', img: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&q=80' },
  helicoptero:{ icon: '🚁', color: 'from-gray-800 to-gray-950', img: 'https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?w=800&q=80' },
}

async function getServices(): Promise<Service[]> {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
  const { data } = await supabase
    .from('services')
    .select('*')
    .eq('active', true)
    .order('created_at')
  return data || []
}

// Servicios fallback si Supabase no está configurado aún
const FALLBACK: Service[] = [
  { id: '1', type: 'autobus',     name: 'Autobús de turismo',    description: 'Autobús equipado con A/C, reclinable, ideal para grupos grandes y viajes largos.', capacity: 'Hasta 50 personas', price_from: 8500,  currency: 'MXN', active: true, created_at: '', image_url: undefined },
  { id: '2', type: 'sprinter',    name: 'Sprinter ejecutiva',    description: 'Van Mercedes-Benz perfecta para grupos medianos. Cómoda y puntual.', capacity: 'Hasta 19 personas', price_from: 3500,  currency: 'MXN', active: true, created_at: '', image_url: undefined },
  { id: '3', type: 'traslado',    name: 'Traslado aeropuerto',   description: 'Servicio puerta a puerta desde/hacia aeropuerto. Puntual y seguro.', capacity: 'Hasta 8 personas',  price_from: 650,   currency: 'MXN', active: true, created_at: '', image_url: undefined },
  { id: '4', type: 'helicoptero', name: 'Helicóptero turístico', description: 'Vuelos panorámicos y traslados exclusivos. Una experiencia única.', capacity: 'Hasta 5 personas',  price_from: 12000, currency: 'MXN', active: true, created_at: '', image_url: undefined },
]

export default async function TransportesPage() {
  let services = await getServices()
  if (services.length === 0) services = FALLBACK

  const WA_TEXT = encodeURIComponent('Hola, me interesa cotizar un servicio de transporte. ¿Me pueden ayudar?')
  const WA_LINK = `https://wa.me/${WA_NUMBER}?text=${WA_TEXT}`

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero */}
      <div className="relative h-72 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1600&q=80"
          alt="Transportes"
          fill className="object-cover" sizes="100vw" priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/80" />
        <div className="absolute inset-0 flex items-center justify-center text-center px-6">
          <div>
            <span className="inline-block rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs font-semibold text-white backdrop-blur mb-4">🚌 Movilidad total</span>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-3">Servicios de transporte</h1>
            <p className="text-white/70 max-w-lg mx-auto">Desde traslados al aeropuerto hasta helicópteros. Nos adaptamos a tu grupo y presupuesto.</p>
          </div>
        </div>
      </div>

      {/* Servicios */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-14">
        <div className="grid sm:grid-cols-2 gap-6 mb-14">
          {services.map(svc => {
            const info = TYPE_INFO[svc.type] || TYPE_INFO['traslado']
            const svcWaText = encodeURIComponent(`Hola, me interesa cotizar: ${svc.name}. ¿Me pueden dar información?`)
            const svcWaLink = `https://wa.me/${WA_NUMBER}?text=${svcWaText}`
            return (
              <div key={svc.id} className="card overflow-hidden">
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={svc.image_url || info.img}
                    alt={svc.name}
                    fill className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${info.color} opacity-60`} />
                  <div className="absolute bottom-4 left-5">
                    <div className="text-3xl mb-1">{info.icon}</div>
                    <div className="font-display text-xl font-bold text-white">{svc.name}</div>
                    <div className="text-xs text-white/70">{svc.capacity}</div>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-sm text-slate-600 mb-4 leading-relaxed">{svc.description}</p>
                  <div className="flex items-center justify-between">
                    {svc.price_from && (
                      <div>
                        <span className="text-xs text-slate-400">Desde </span>
                        <span className="text-xl font-bold text-navy-900">${svc.price_from.toLocaleString()}</span>
                        <span className="text-xs text-slate-400"> {svc.currency}</span>
                      </div>
                    )}
                    <a href={svcWaLink} target="_blank" rel="noreferrer" className="btn-whatsapp text-sm px-4 py-2.5 ml-auto">
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.124 1.532 5.855L.054 23.454a.5.5 0 0 0 .492.546h.038l5.8-1.519A11.934 11.934 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.007-1.374l-.36-.214-3.724.976.994-3.62-.234-.373A9.818 9.818 0 1 1 12 21.818z"/>
                      </svg>
                      Cotizar
                    </a>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* CTA final */}
        <div className="rounded-3xl bg-navy-800 p-10 text-center text-white">
          <h2 className="font-display text-2xl sm:text-3xl font-bold mb-3">¿Necesitas algo especial?</h2>
          <p className="text-white/60 mb-7 max-w-lg mx-auto">
            Grupos grandes, eventos corporativos, bodas o cualquier necesidad de transporte. Nos adaptamos.
          </p>
          <a href={WA_LINK} target="_blank" rel="noreferrer" className="btn-whatsapp text-base px-8 py-4 inline-flex">
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.124 1.532 5.855L.054 23.454a.5.5 0 0 0 .492.546h.038l5.8-1.519A11.934 11.934 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.007-1.374l-.36-.214-3.724.976.994-3.62-.234-.373A9.818 9.818 0 1 1 12 21.818z"/>
            </svg>
            Contactar por WhatsApp
          </a>
        </div>
      </div>
    </main>
  )
}
