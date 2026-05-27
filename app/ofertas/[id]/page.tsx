import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { offers } from "@/data/offers";

export const dynamic = 'force-dynamic'

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "524491131242";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function OfertaDetallePage({ params }: PageProps) {
  const { id } = await params;

  const oferta = offers.find((o) => o.slug === id);
  if (!oferta) return notFound();

  const waText = `Hola, me interesa la oferta: ${oferta.title} (${oferta.dates}). ¿Me das más información y me apoyas a cotizar?`;
  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waText)}`;

  return (
    <div className="min-h-screen bg-background">
      <div className="container-page py-8 sm:py-10">
        {/* Top actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-2">
            <Link href="/ofertas" className="btn-secondary btn-sm" aria-label="Volver a ofertas">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"/>
              </svg>
              Volver
            </Link>
            <Link href="/catalogo" className="btn-secondary btn-sm">
              Catálogo
            </Link>
          </div>

          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp btn-sm"
            aria-label="Cotizar oferta por WhatsApp"
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.124 1.532 5.855L.054 23.454a.5.5 0 0 0 .492.546h.038l5.8-1.519A11.934 11.934 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.007-1.374l-.36-.214-3.724.976.994-3.62-.234-.373A9.818 9.818 0 1 1 12 21.818z"/>
            </svg>
            Cotizar
          </a>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Imagen */}
          <section className="card overflow-hidden">
            <div className="relative aspect-[4/5] w-full bg-muted">
              <Image
                src={oferta.image}
                alt={`${oferta.title} - ${oferta.city}`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
            {oferta.notes && (
              <div className="p-4 border-t border-border">
                <p className="text-caption text-muted-foreground">{oferta.notes}</p>
              </div>
            )}
          </section>

          {/* Info */}
          <section>
            <h1 className="font-display text-display-md sm:text-display-lg font-bold text-foreground tracking-tight">
              {oferta.title}
            </h1>

            <p className="mt-3 flex items-center gap-2 text-body-md text-muted-foreground">
              <svg className="h-5 w-5 text-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"/>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/>
              </svg>
              {oferta.city}, {oferta.country}
            </p>

            {/* Chips */}
            <div className="mt-5 flex flex-wrap gap-2">
              <span className="badge-primary">{oferta.hotelCategory}</span>
              <span className="badge-primary">{oferta.duration}</span>
              <span className="badge-primary">{oferta.dates}</span>
              {oferta.category && <span className="badge-accent">{oferta.category}</span>}
            </div>

            {/* Precio + CTA */}
            <div className="mt-6 card p-6">
              <div className="text-caption font-semibold text-muted-foreground uppercase tracking-wider">
                Precio desde
              </div>
              <div className="mt-1 text-display-md font-bold text-foreground tabular-nums">
                ${oferta.price.toLocaleString("es-MX")} {oferta.currency}
              </div>
              <p className="mt-2 text-body-sm text-muted-foreground">{oferta.summary}</p>

              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp"
                  aria-label="Cotizar por WhatsApp"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.124 1.532 5.855L.054 23.454a.5.5 0 0 0 .492.546h.038l5.8-1.519A11.934 11.934 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.007-1.374l-.36-.214-3.724.976.994-3.62-.234-.373A9.818 9.818 0 1 1 12 21.818z"/>
                  </svg>
                  Cotizar por WhatsApp
                </a>
                <Link href="/catalogo" className="btn-outline">
                  Ver catálogo
                </Link>
              </div>
            </div>

            {/* Incluye */}
            {Array.isArray(oferta.includes) && oferta.includes.length > 0 && (
              <div className="mt-6 card p-6">
                <h2 className="text-heading-lg font-bold text-foreground mb-4">Incluye</h2>
                <ul className="grid gap-2">
                  {oferta.includes.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 rounded-lg border border-border bg-background px-4 py-3 text-body-sm text-foreground"
                    >
                      <svg className="h-5 w-5 text-success shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"/>
                      </svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
