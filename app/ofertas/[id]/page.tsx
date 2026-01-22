import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { offers } from "@/data/offers";

const WHATSAPP_NUMBER = "524491131242"; // <-- cambia al real

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function OfertaDetallePage({ params }: PageProps) {
  const { id } = await params; // ✅ Next 16: params puede ser Promise

  const oferta = offers.find((o) => o.slug === id);
  if (!oferta) return notFound();

  const waText = `Hola, me interesa la oferta: ${oferta.title} (${oferta.dates}). ¿Me das más información y me apoyas a cotizar?`;
  const waLink = `https://wa.me/524491131242?text=${encodeURIComponent(
    waText
  )}`;

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      {/* Top actions */}
      <div className="sticky top-[64px] z-40 -mx-4 px-4 py-3 bg-black/20 backdrop-blur border-y border-white/10 sm:static sm:mx-0 sm:px-0 sm:py-0 sm:bg-transparent sm:border-0">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Link
              href="/ofertas"
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/15"
            >
              ← Volver
            </Link>

            <Link
              href="/catalogo"
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/15"
            >
              Catálogo
            </Link>
          </div>

          <a
            href={waLink}
            target="_blank"
            rel="noreferrer"
            className="rounded-xl bg-green-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-green-700"
          >
            Cotizar por WhatsApp
          </a>
        </div>
      </div>

      <div className="mt-6 grid gap-8 lg:grid-cols-2">
        {/* Imagen */}
        <section className="overflow-hidden rounded-3xl border border-white/10 bg-white/95 shadow-sm">
          <div className="relative aspect-[4/5] w-full bg-slate-100">
            <Image
              src={oferta.image}
              alt={oferta.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>

          {oferta.notes && (
            <div className="p-4">
              <p className="text-xs text-slate-500">{oferta.notes}</p>
            </div>
          )}
        </section>

        {/* Info */}
        <section>
          <h1 className="text-3xl font-extrabold tracking-tight text-white">
            {oferta.title}
          </h1>

          <p className="mt-2 text-slate-300">
            📍 {oferta.city}, {oferta.country}
          </p>

          {/* Chips */}
          <div className="mt-4 flex flex-wrap gap-2 text-sm">
            <span className="rounded-full bg-white/10 px-3 py-1 text-white/90">
              🏨 {oferta.hotelCategory}
            </span>
            <span className="rounded-full bg-white/10 px-3 py-1 text-white/90">
              ⏱ {oferta.duration}
            </span>
            <span className="rounded-full bg-white/10 px-3 py-1 text-white/90">
              📅 {oferta.dates}
            </span>
            {oferta.category && (
              <span className="rounded-full bg-white/10 px-3 py-1 text-white/90">
                🧭 {oferta.category}
              </span>
            )}
          </div>

          {/* Precio + CTA */}
          <div className="mt-6 rounded-2xl border border-white/10 bg-white/95 p-5 shadow-sm">
            <div className="text-sm font-semibold text-slate-600">
              Precio desde
            </div>

            <div className="mt-1 text-3xl font-extrabold text-slate-900">
              ${oferta.price.toLocaleString("es-MX")} {oferta.currency}
            </div>

            <div className="mt-2 text-sm text-slate-600">{oferta.summary}</div>

            <div className="mt-4 flex flex-wrap gap-3">
              <a
                href={waLink}
                target="_blank"
                rel="noreferrer"
                className="rounded-xl bg-green-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-green-700"
              >
                Cotizar por WhatsApp
              </a>

              <Link
                href="/catalogo"
                className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 shadow-sm transition hover:bg-slate-50"
              >
                Ver catálogo con filtros
              </Link>
            </div>
          </div>

          {/* Incluye */}
          {Array.isArray(oferta.includes) && oferta.includes.length > 0 && (
            <div className="mt-6 rounded-2xl border border-white/10 bg-white/95 p-5 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900">Incluye</h2>

              <ul className="mt-4 grid gap-2">
                {oferta.includes.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700"
                  >
                    <span className="mt-0.5">✅</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
