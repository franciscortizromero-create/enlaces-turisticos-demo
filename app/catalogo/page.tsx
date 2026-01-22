"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { offers, Offer } from "@/data/offers";

function uniqueSorted(values: string[]) {
  return Array.from(new Set(values)).sort((a, b) => a.localeCompare(b));
}

function monthKey(dateStr: string) {
  return dateStr.slice(0, 7); // YYYY-MM-DD -> YYYY-MM
}

function monthLabel(key: string) {
  const [y, m] = key.split("-");
  const monthNames = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  return `${monthNames[Number(m) - 1]} ${y}`;
}

const labelBase = "text-xs font-semibold tracking-wide text-slate-500";

const fieldBase =
  "mt-2 w-full rounded-xl border border-slate-200 bg-white/90 px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition " +
  "focus:border-sky-400 focus:ring-4 focus:ring-sky-200/40 disabled:opacity-60";

const buttonGhost =
  "rounded-xl border border-white/15 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/15";

export default function CatalogoPage() {
  const [q, setQ] = useState("");
  const [country, setCountry] = useState("Todos");
  const [city, setCity] = useState("Todas");
  const [hotelCategory, setHotelCategory] = useState("Todas");
  const [category, setCategory] = useState("Todas");
  const [month, setMonth] = useState("Todos");
  const [sort, setSort] = useState<"price-asc" | "price-desc" | "date-asc">(
    "date-asc"
  );

  const countries = useMemo(
    () => ["Todos", ...uniqueSorted(offers.map((o) => o.country))],
    []
  );

  const cities = useMemo(() => {
    const base = offers
      .filter((o) => (country === "Todos" ? true : o.country === country))
      .map((o) => o.city);
    return ["Todas", ...uniqueSorted(base)];
  }, [country]);

  const hotelCats = useMemo(
    () => ["Todas", ...uniqueSorted(offers.map((o) => o.hotelCategory))],
    []
  );

  const categories = useMemo(
    () => ["Todas", ...uniqueSorted(offers.map((o) => o.category))],
    []
  );

  const months = useMemo(() => {
    const keys = offers.map((o) => monthKey(o.startDate));
    const list = uniqueSorted(keys);
    return ["Todos", ...list];
  }, []);

  const filtered = useMemo(() => {
    let list: Offer[] = [...offers];

    if (country !== "Todos") list = list.filter((o) => o.country === country);
    if (city !== "Todas") list = list.filter((o) => o.city === city);
    if (hotelCategory !== "Todas")
      list = list.filter((o) => o.hotelCategory === hotelCategory);
    if (category !== "Todas") list = list.filter((o) => o.category === category);
    if (month !== "Todos")
      list = list.filter((o) => monthKey(o.startDate) === month);

    const query = q.trim().toLowerCase();
    if (query) {
      list = list.filter((o) => {
        const hay =
          `${o.title} ${o.hotel} ${o.city} ${o.country} ${o.summary} ${o.category}`.toLowerCase();
        return hay.includes(query);
      });
    }

    if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
    if (sort === "date-asc")
      list.sort((a, b) => a.startDate.localeCompare(b.startDate));

    return list;
  }, [q, country, city, hotelCategory, category, month, sort]);

  const clear = () => {
    setQ("");
    setCountry("Todos");
    setCity("Todas");
    setHotelCategory("Todas");
    setCategory("Todas");
    setMonth("Todos");
    setSort("date-asc");
  };

  const quickCategories = useMemo(() => {
    // chips: excluye "Todas"
    return categories.filter((c) => c !== "Todas");
  }, [categories]);

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white">
            Catálogo
          </h1>
          <p className="mt-2 text-slate-300">
            Filtra por país, ciudad, fecha, tipo y categoría de hotel.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-sm text-slate-300">
            Resultados:{" "}
            <span className="font-semibold text-white">{filtered.length}</span>
          </div>

          <button onClick={clear} className={buttonGhost}>
            Limpiar
          </button>
        </div>
      </div>

      {/* Filtros */}
      <section className="mt-6 overflow-hidden rounded-3xl border border-white/10 bg-white/90 shadow-sm backdrop-blur">
        <div className="px-5 pt-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="text-sm font-extrabold text-slate-900">
                Filtros
              </div>
              <div className="text-xs text-slate-600">
                Tip: prueba “Riviera”, “Cancún”, “5★”, “Solo adultos”.
              </div>
            </div>

            <div className="text-xs text-slate-600">
              Mostrando{" "}
              <span className="font-bold text-slate-900">
                {filtered.length}
              </span>{" "}
              resultado(s)
            </div>
          </div>

          {/* Chips rápidos de tipo (opcional, no rompe el select) */}
          {quickCategories.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setCategory("Todas")}
                className={
                  "rounded-full px-3 py-1 text-xs font-semibold transition " +
                  (category === "Todas"
                    ? "bg-slate-900 text-white"
                    : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50")
                }
              >
                Todos
              </button>

              {quickCategories.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCategory(c)}
                  className={
                    "rounded-full px-3 py-1 text-xs font-semibold transition " +
                    (category === c
                      ? "bg-slate-900 text-white"
                      : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50")
                  }
                >
                  {c}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="p-5">
          <div className="grid gap-4 md:grid-cols-6">
            {/* Búsqueda con icono */}
            <div className="md:col-span-2">
              <label className={labelBase}>Búsqueda</label>
              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  🔎
                </span>
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Ej: Cancún, Hard Rock, 5★..."
                  className={fieldBase + " pl-10"}
                />
              </div>
            </div>

            <div>
              <label className={labelBase}>País</label>
              <select
                value={country}
                onChange={(e) => {
                  setCountry(e.target.value);
                  setCity("Todas");
                }}
                className={fieldBase}
              >
                {countries.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className={labelBase}>Ciudad</label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className={fieldBase}
              >
                {cities.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className={labelBase}>Hotel</label>
              <select
                value={hotelCategory}
                onChange={(e) => setHotelCategory(e.target.value)}
                className={fieldBase}
              >
                {hotelCats.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className={labelBase}>Fecha</label>
              <select
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                className={fieldBase}
              >
                {months.map((m) => (
                  <option key={m} value={m}>
                    {m === "Todos" ? "Todos" : monthLabel(m)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className={labelBase}>Tipo</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={fieldBase}
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className={labelBase}>Ordenar</label>
              <select
                value={sort}
                onChange={(e) =>
                  setSort(e.target.value as "price-asc" | "price-desc" | "date-asc")
                }
                className={fieldBase}
              >
                <option value="date-asc">Fecha (próximos primero)</option>
                <option value="price-asc">Precio (menor a mayor)</option>
                <option value="price-desc">Precio (mayor a menor)</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <button
                onClick={clear}
                className="mt-6 w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 shadow-sm transition hover:bg-slate-50"
              >
                Limpiar filtros
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="mt-10 rounded-3xl border border-white/10 bg-white/10 p-8 text-white backdrop-blur">
          <div className="text-lg font-extrabold">Sin resultados</div>
          <div className="mt-2 text-sm text-white/80">
            Prueba quitando filtros o buscando por ciudad/hotel.
          </div>
          <button
            onClick={clear}
            className="mt-4 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 shadow-sm hover:bg-slate-50 transition"
          >
            Limpiar filtros
          </button>
        </div>
      )}

      {/* Listado */}
      <section className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((o) => (
          <div
            key={o.slug}
            className="overflow-hidden rounded-3xl border border-white/10 bg-white/95 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="relative aspect-[4/5] w-full bg-slate-100">
              <Image
                src={o.image}
                alt={o.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 33vw"
                priority
              />

              {/* Badges */}
              <div className="absolute left-3 top-3 flex flex-wrap gap-2">
                <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-900 shadow-sm">
                  {o.hotelCategory}
                </span>
                <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-900 shadow-sm">
                  {o.category}
                </span>
              </div>
            </div>

            <div className="p-5">
              <div className="text-lg font-extrabold text-slate-900">
                {o.title}
              </div>
              <div className="mt-1 text-sm text-slate-600">{o.summary}</div>

              <div className="mt-3 text-sm text-slate-600">
                📍 {o.city}, {o.country}
              </div>
              <div className="mt-1 text-sm text-slate-600">
                🏨 {o.hotel} • ⏱ {o.duration}
              </div>
              <div className="mt-1 text-sm text-slate-600">📅 {o.dates}</div>

              <div className="mt-4 text-xl font-extrabold text-slate-900">
                Desde ${o.price.toLocaleString("es-MX")} {o.currency}
              </div>

              <div className="mt-4 flex gap-3">
                <Link
                  href={`/ofertas/${o.slug}`}
                  className="flex-1 rounded-xl bg-slate-900 px-4 py-2.5 text-center text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
                >
                  Ver detalles
                </Link>

                <a
                  href={`https://wa.me/5210000000000?text=${encodeURIComponent(
                    `Hola, me interesa la oferta: ${o.title} (${o.dates}). ¿Me apoyas a cotizar?`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 shadow-sm transition hover:bg-slate-50"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
