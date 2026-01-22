import Image from "next/image";
import Link from "next/link";
import { offers } from "@/data/offers";

const WHATSAPP_NUMBER = 524491131242; // <-- cambia al real

export default function OfertasPage() {
  const waText = "Hola, quiero cotizar un viaje. ¿Me puedes ayudar?";
  const waLinkGlobal = `https://wa.me/524491131242?text=${encodeURIComponent(
    waText
  )}`;

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
      {/* HERO / Header visual */}
      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/10 backdrop-blur shadow-sm">
        <div className="absolute inset-0">
          <Image
            src="/hero-playa.jpg"
            alt="Fondo playa"
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1024px) 100vw, 1200px"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/75" />
        </div>

        <div className="relative px-6 py-10 sm:py-12">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                ✈️ Ofertas disponibles
                <span className="text-white/60">•</span>
                <span className="text-white/90">{offers.length} opciones</span>
              </div>

              <h1 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                Ofertas destacadas
              </h1>

              <p className="mt-2 max-w-2xl text-sm sm:text-base text-slate-200">
                Selecciona una oferta, revisa detalles y cotiza por WhatsApp en un
                clic.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/catalogo"
                className="rounded-xl border border-white/15 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/15"
              >
                Ver catálogo con filtros
              </Link>

              <a
                href={waLinkGlobal}
                target="_blank"
                rel="noreferrer"
                className="rounded-xl bg-green-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-green-700"
              >
                Cotizar por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {offers.map((o) => {
          const waTextOffer = `Hola, me interesa la oferta: ${o.title} (${o.dates}). ¿Me apoyas a cotizar?`;
          const waLinkOffer = `https://wa.me/524491131242?text=${encodeURIComponent(
            waTextOffer
          )}`;

          return (
            <article
              key={o.slug}
              className="group overflow-hidden rounded-3xl border border-white/10 bg-white/95 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              {/* Imagen */}
              <div className="relative aspect-[4/5] w-full bg-slate-100">
                <Image
                  src={o.image}
                  alt={o.title}
                  fill
                  className="object-cover transition duration-300 group-hover:scale-[1.02]"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  priority
                />

                {/* Badge arriba */}
                <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-black/45 px-3 py-1 text-xs font-bold text-white backdrop-blur">
                  📍 {o.city}
                </div>
              </div>

              {/* Contenido */}
              <div className="p-5">
                <h2 className="text-lg font-extrabold text-slate-900 leading-snug">
                  {o.title}
                </h2>

                <p className="mt-1 text-sm text-slate-600">{o.summary}</p>

                {/* Chips */}
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                    🏨 {o.hotelCategory}
                  </span>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                    ⏱ {o.duration}
                  </span>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                    📅 {o.dates}
                  </span>
                  {o.category && (
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                      🧭 {o.category}
                    </span>
                  )}
                </div>

                {/* Precio */}
                <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-4">
                  <div className="text-xs font-semibold text-slate-600">
                    Precio desde
                  </div>
                  <div className="mt-1 text-2xl font-extrabold text-slate-900">
                    ${o.price.toLocaleString("es-MX")} {o.currency}
                  </div>
                  <div className="mt-1 text-xs text-slate-500">
                    {o.city}, {o.country}
                  </div>
                </div>

                {/* CTAs */}
                <div className="mt-4 flex gap-3">
                  <Link
                    href={`/ofertas/${o.slug}`}
                    className="flex-1 rounded-xl bg-slate-900 px-4 py-2.5 text-center text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
                  >
                    Ver detalles
                  </Link>

                  <a
                    href={waLinkOffer}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 shadow-sm transition hover:bg-slate-50"
                  >
                    WhatsApp
                  </a>
                </div>

                {/* Nota */}
                {o.notes && (
                  <p className="mt-3 text-xs text-slate-500 line-clamp-2">
                    {o.notes}
                  </p>
                )}
              </div>
            </article>
          );
        })}
      </section>

      {/* CTA Sticky Mobile */}
      <div className="fixed bottom-4 left-0 right-0 z-50 px-4 sm:hidden">
        <div className="mx-auto max-w-md rounded-2xl border border-white/15 bg-black/35 backdrop-blur p-3 shadow-xl">
          <a
            href={waLinkGlobal}
            target="_blank"
            rel="noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-3 text-sm font-extrabold text-white transition hover:bg-green-700"
          >
            💬 Cotizar por WhatsApp
          </a>
        </div>
      </div>
    </main>
  );
}
