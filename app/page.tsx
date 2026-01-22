import Image from "next/image";
import Link from "next/link";

const WHATSAPP_NUMBER = "524491131242"; // <-- cámbialo al real

export default function HomePage() {
  const waText = "Hola, quiero cotizar un viaje. ¿Me puedes ayudar?";
  const waLink = `https://wa.me/524491131242?text=${encodeURIComponent(
    waText
  )}`;

  return (
    <main className="bg-etm-bg text-etm-text">
      {/* HERO */}
      <section className="relative overflow-hidden">
        {/* Fondo imagen */}
        <div className="absolute inset-0">
          <Image
            src="/hero-playa.jpg"
            alt="Playa tropical"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          {/* Overlay degradado para que el texto se lea */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/45 to-black/75" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-20 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            {/* Copy */}
            <div className="text-white">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold backdrop-blur">
                ✈️ Viajes organizados • Atención por WhatsApp
              </div>

              <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
                Tu próximo viaje,
                <br />
                <span className="text-white/95">organizado fácil</span>{" "}
                <span className="text-white/80">y sin estrés</span>.
              </h1>

              <p className="mt-5 max-w-xl text-base sm:text-lg text-white/90">
                Descubre ofertas reales, filtra por destino y fecha, y cotiza en
                minutos. Te atendemos directo, sin bots raros.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/catalogo"
                  className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-extrabold text-slate-900 shadow-sm transition hover:bg-white/90"
                >
                  Ver catálogo con filtros
                </Link>

                <Link
                  href="/ofertas"
                  className="inline-flex items-center justify-center rounded-xl border border-white/25 bg-white/10 px-5 py-3 text-sm font-extrabold text-white backdrop-blur transition hover:bg-white/15"
                >
                  Ver ofertas destacadas
                </Link>

                <a
                  href={waLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-xl bg-green-600 px-5 py-3 text-sm font-extrabold text-white shadow-sm transition hover:bg-green-700"
                >
                  Cotizar por WhatsApp
                </a>
              </div>

              {/* mini stats */}
              <div className="mt-10 grid max-w-xl grid-cols-3 gap-3 text-center">
                <div className="rounded-2xl border border-white/15 bg-white/10 px-3 py-4 backdrop-blur">
                  <div className="text-lg font-extrabold">+Opciones</div>
                  <div className="mt-1 text-xs text-white/80">según tu plan</div>
                </div>
                <div className="rounded-2xl border border-white/15 bg-white/10 px-3 py-4 backdrop-blur">
                  <div className="text-lg font-extrabold">Rápido</div>
                  <div className="mt-1 text-xs text-white/80">cotiza en minutos</div>
                </div>
                <div className="rounded-2xl border border-white/15 bg-white/10 px-3 py-4 backdrop-blur">
                  <div className="text-lg font-extrabold">Seguro</div>
                  <div className="mt-1 text-xs text-white/80">sin letras raras</div>
                </div>
              </div>
            </div>

            {/* Tarjeta destacada / “mock” */}
            <div className="lg:justify-self-end">
              <div className="w-full max-w-md overflow-hidden rounded-3xl border border-white/15 bg-white/10 shadow-xl backdrop-blur">
                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <div className="text-white">
                      <div className="text-xs text-white/70">Recomendado</div>
                      <div className="text-lg font-extrabold">
                        Riviera Maya • 5★
                      </div>
                    </div>
                    <div className="rounded-full bg-white/15 px-3 py-1 text-xs font-bold text-white">
                      Todo incluido
                    </div>
                  </div>

                  <div className="mt-4 overflow-hidden rounded-2xl bg-black/20">
                    <div className="relative aspect-[16/10] w-full">
                      <Image
                        src="/ofertas/hard-rock.jpg"
                        alt="Oferta destacada"
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 420px"
                      />
                    </div>
                  </div>

                  <div className="mt-4 text-white">
                    <div className="text-sm text-white/80">
                      4 días / 3 noches • Octubre 2026
                    </div>
                    <div className="mt-2 text-2xl font-extrabold">
                      Desde $15,599 MXN
                    </div>

                    <div className="mt-4 flex gap-3">
                      <Link
                        href="/ofertas/hard-rock-riviera-maya-5-estrellas"
                        className="flex-1 rounded-xl bg-white px-4 py-2.5 text-center text-sm font-extrabold text-slate-900 transition hover:bg-white/90"
                      >
                        Ver detalles
                      </Link>

                      <a
                        href={waLink}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-xl bg-green-600 px-4 py-2.5 text-sm font-extrabold text-white transition hover:bg-green-700"
                      >
                        WhatsApp
                      </a>
                    </div>
                  </div>
                </div>

                <div className="border-t border-white/10 px-5 py-4 text-xs text-white/70">
                  * Precios por adulto en habitación doble. Sujeto a disponibilidad.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* wave-ish divider */}
        <div className="relative h-10 bg-etm-bg" />
      </section>

      {/* BENEFICIOS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-14">
        <div className="grid gap-8 lg:grid-cols-3 lg:items-start">
          <div className="lg:col-span-1">
            <h2 className="text-3xl font-extrabold tracking-tight">
              Viaja con claridad,
              <br /> sin complicaciones
            </h2>
            <p className="mt-3 text-etm-muted">
              Un flujo simple: eliges, filtras, preguntas por WhatsApp y cierras.
              Todo con información clara.
            </p>

            <div className="mt-6 flex gap-3">
              <Link
                href="/catalogo"
                className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-extrabold text-white shadow-sm transition hover:bg-blue-700"
              >
                Ir al catálogo
              </Link>
              <Link
                href="/#contacto"
                className="rounded-xl border border-etm-line bg-white px-5 py-3 text-sm font-extrabold text-slate-900 shadow-sm transition hover:bg-slate-50"
              >
                Contacto
              </Link>
            </div>
          </div>

          <div className="lg:col-span-2 grid gap-5 md:grid-cols-3">
            <div className="rounded-3xl border border-etm-line bg-white p-6 shadow-sm">
              <div className="text-2xl">💬</div>
              <h3 className="mt-3 font-extrabold">Atención directa</h3>
              <p className="mt-2 text-sm text-etm-muted">
                Te atendemos personalmente por WhatsApp para resolver dudas y
                opciones.
              </p>
            </div>

            <div className="rounded-3xl border border-etm-line bg-white p-6 shadow-sm">
              <div className="text-2xl">🧾</div>
              <h3 className="mt-3 font-extrabold">Precios claros</h3>
              <p className="mt-2 text-sm text-etm-muted">
                Información simple, sin letras escondidas ni “sorpresas”.
              </p>
            </div>

            <div className="rounded-3xl border border-etm-line bg-white p-6 shadow-sm">
              <div className="text-2xl">🧭</div>
              <h3 className="mt-3 font-extrabold">Opciones a tu estilo</h3>
              <p className="mt-2 text-sm text-etm-muted">
                Familiar, solo adultos, lujo, playa… filtra rápido y decide mejor.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section className="border-t border-etm-line bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-14">
          <h2 className="text-2xl sm:text-3xl font-extrabold">
            ¿Cómo funciona?
          </h2>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl border border-etm-line bg-white p-6 shadow-sm">
              <div className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-white font-extrabold">
                1
              </div>
              <h3 className="mt-3 font-extrabold">Explora</h3>
              <p className="mt-2 text-sm text-etm-muted">
                Ve a <b>Catálogo</b>, filtra por destino, fecha y tipo de hotel.
              </p>
            </div>

            <div className="rounded-3xl border border-etm-line bg-white p-6 shadow-sm">
              <div className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-white font-extrabold">
                2
              </div>
              <h3 className="mt-3 font-extrabold">Elige</h3>
              <p className="mt-2 text-sm text-etm-muted">
                Abre una oferta y revisa lo que incluye: noches, categoría,
                fechas y notas.
              </p>
            </div>

            <div className="rounded-3xl border border-etm-line bg-white p-6 shadow-sm">
              <div className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-white font-extrabold">
                3
              </div>
              <h3 className="mt-3 font-extrabold">Cotiza</h3>
              <p className="mt-2 text-sm text-etm-muted">
                Toca <b>Cotizar por WhatsApp</b> y te atendemos para cerrar la mejor
                opción.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIOS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-14">
        <div className="rounded-3xl border border-etm-line bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold">
                Clientes felices, viajes sin estrés
              </h2>
              <p className="mt-2 text-etm-muted">
                Esto es demo, pero ya tienes la sección lista para cuando el cliente
                te dé testimonios reales.
              </p>
            </div>

            <Link
              href="/catalogo"
              className="mt-4 sm:mt-0 inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-extrabold text-white transition hover:bg-blue-700"
            >
              Ver catálogo
            </Link>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-etm-line bg-slate-50 p-6">
              <div className="text-sm font-extrabold">“Todo claro”</div>
              <p className="mt-2 text-sm text-etm-muted">
                Me atendieron rápido y me dieron opciones sin complicarme.
              </p>
              <div className="mt-4 text-xs text-etm-muted">— Cliente Demo</div>
            </div>

            <div className="rounded-2xl border border-etm-line bg-slate-50 p-6">
              <div className="text-sm font-extrabold">“Muy rápido”</div>
              <p className="mt-2 text-sm text-etm-muted">
                Filtré por destino y en WhatsApp resolví todo en minutos.
              </p>
              <div className="mt-4 text-xs text-etm-muted">— Cliente Demo</div>
            </div>

            <div className="rounded-2xl border border-etm-line bg-slate-50 p-6">
              <div className="text-sm font-extrabold">“Sin estrés”</div>
              <p className="mt-2 text-sm text-etm-muted">
                Solo elegí la oferta y me ayudaron con los detalles.
              </p>
              <div className="mt-4 text-xs text-etm-muted">— Cliente Demo</div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACTO */}
      <section id="contacto" className="border-t border-etm-line bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-14">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight">
                ¿Listo para cotizar?
              </h2>
              <p className="mt-3 text-etm-muted">
                Envíanos un WhatsApp con tu destino ideal, fechas aproximadas,
                número de personas y presupuesto, y te mandamos opciones.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={waLink}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl bg-green-600 px-6 py-3 text-sm font-extrabold text-white shadow-sm transition hover:bg-green-700"
                >
                  Cotizar por WhatsApp
                </a>

                <Link
                  href="/catalogo"
                  className="rounded-xl border border-etm-line bg-white px-6 py-3 text-sm font-extrabold text-slate-900 shadow-sm transition hover:bg-slate-50"
                >
                  Ver catálogo
                </Link>
              </div>

              <div className="mt-6 text-sm text-etm-muted">
                Sugerencia de mensaje:{" "}
                <span className="font-semibold text-slate-900">
                  “Hola, busco viaje a Riviera Maya para 2 adultos en octubre,
                  presupuesto $X. ¿Qué opciones tienes?”
                </span>
              </div>
            </div>

            <div className="rounded-3xl border border-etm-line bg-slate-50 p-6 shadow-sm">
              <div className="font-extrabold">Checklist rápido</div>
              <ul className="mt-4 space-y-3 text-sm text-etm-muted">
                <li>✅ Destino</li>
                <li>✅ Fechas aproximadas</li>
                <li>✅ Número de viajeros</li>
                <li>✅ Tipo de hotel (3★/4★/5★)</li>
                <li>✅ Presupuesto</li>
              </ul>

              <div className="mt-6 rounded-2xl bg-white p-5 border border-etm-line">
                <div className="text-sm font-extrabold">Respuesta rápida</div>
                <p className="mt-2 text-sm text-etm-muted">
                  Te mandamos opciones por WhatsApp y ajustamos según tu gusto.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Botón flotante WhatsApp (solo UX extra) */}
      <a
        href={waLink}
        target="_blank"
        rel="noreferrer"
        aria-label="Cotizar por WhatsApp"
        className="fixed bottom-5 right-5 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-green-600 text-white shadow-xl transition hover:bg-green-700"
      >
        💬
      </a>
    </main>
  );
}
