export type Offer = {
  slug: string;
  title: string;
  image: string;
  country: string;
  city: string;
  hotel: string;
  hotelCategory: "3★" | "4★" | "5★";
  duration: string;
  price: number;
  currency: "MXN" | "USD";
  dates: string;       // texto para mostrar
  startDate: string;   // YYYY-MM-DD para filtrar
  category: "Playa" | "Todo incluido" | "Familiar" | "Solo adultos" | "Lujo";
  summary: string;
  includes: string[];
  notes?: string;
};

export const offers: Offer[] = [
  {
    slug: "hard-rock-riviera-maya-5-estrellas",
    title: "Hard Rock Riviera Maya 5★",
    image: "/ofertas/hard-rock.jpg",
    country: "México",
    city: "Riviera Maya",
    hotel: "Hard Rock Riviera Maya",
    hotelCategory: "5★",
    duration: "4 días / 3 noches",
    price: 15599,
    currency: "MXN",
    dates: "Octubre 2026",
    startDate: "2026-10-01",
    category: "Familiar",
    summary: "Hotel 5 estrellas en Riviera Maya. 2 menores gratis.",
    includes: ["Vuelos redondos", "Hospedaje todo incluido", "2 menores gratis"],
    notes:
      "Precios por adulto en habitación doble. Pago en efectivo. Sujeto a disponibilidad y cambios sin previo aviso hasta el momento de la reserva.",
  },
  {
    slug: "emporio-cancun-5-estrellas",
    title: "Emporio Cancún 5★",
    image: "/ofertas/emporio.jpg",
    country: "México",
    city: "Cancún",
    hotel: "Emporio Cancún",
    hotelCategory: "5★",
    duration: "4 días / 3 noches",
    price: 9599,
    currency: "MXN",
    dates: "Octubre 2026",
    startDate: "2026-10-01",
    category: "Familiar",
    summary: "Excelente opción familiar en Cancún. 2 menores gratis.",
    includes: ["Vuelos redondos", "Hospedaje todo incluido", "2 menores gratis"],
    notes:
      "Precios por adulto en habitación doble. Pago en efectivo. Sujeto a disponibilidad y cambios sin previo aviso hasta el momento de la reserva.",
  },
  {
    slug: "xcaret-arte-riviera-maya-solo-adultos",
    title: "Xcaret Arte Riviera Maya 5★",
    image: "/ofertas/xcaret-arte.jpg",
    country: "México",
    city: "Riviera Maya",
    hotel: "Xcaret Arte",
    hotelCategory: "5★",
    duration: "4 días / 3 noches",
    price: 23699,
    currency: "MXN",
    dates: "Octubre 2026",
    startDate: "2026-10-01",
    category: "Solo adultos",
    summary: "Resort de lujo solo adultos en Riviera Maya.",
    includes: ["Vuelos redondos", "Hospedaje todo incluido", "Solo adultos"],
    notes:
      "Precios por adulto en habitación doble. Pago en efectivo. Sujeto a disponibilidad y cambios sin previo aviso hasta el momento de la reserva.",
  },
];
