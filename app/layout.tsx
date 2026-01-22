import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Enlaces Turísticos Marroquí",
  description: "Viajes organizados fácil y sin estrés",
};

const WHATSAPP_NUMBER = "524491131242"; // <- pon aquí el real

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const waText = "Hola, quiero cotizar un viaje. ¿Me puedes ayudar?";
  const waLink = `https://wa.me/524491131242?text=${encodeURIComponent(
    waText
  )}`;

  return (
    <html lang="es">
      <body className="min-h-screen antialiased bg-etm-bg text-etm-text">
        {/* NAVBAR */}
        <header className="sticky top-0 z-50 border-b border-etm-line bg-white/85 backdrop-blur">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
            {/* LOGO + HOME */}
            <Link href="/" className="group flex items-center gap-3">
              <div className="h-10 w-10 rounded-full overflow-hidden border border-etm-line bg-white flex items-center justify-center shadow-soft transition group-hover:shadow-md">
                <Image
                  src="/logo-etm.png"
                  alt="Enlaces Turísticos Marroquí"
                  width={40}
                  height={40}
                  priority
                />
              </div>

              <div className="hidden sm:block leading-tight">
                <div className="font-extrabold tracking-tight text-etm-text">
                  Enlaces Turísticos
                </div>
                <div className="text-xs text-etm-muted -mt-0.5">Marroquí</div>
              </div>
            </Link>

            {/* MENU */}
            <nav className="hidden md:flex items-center gap-6 text-sm font-semibold">
              <Link className="navlink" href="/ofertas">
                Ofertas
              </Link>
              <Link className="navlink" href="/catalogo">
                Catálogo
              </Link>
              {/* Home + anchor */}
              <Link className="navlink" href="/#contacto">
                Contacto
              </Link>
            </nav>

            {/* CTA WhatsApp */}
            <a
              href={waLink}
              target="_blank"
              rel="noreferrer"
              className="btn-whatsapp"
            >
              Cotizar por WhatsApp
            </a>
          </div>

          {/* Sub-bar mobile */}
          <div className="md:hidden border-t border-etm-line bg-white/90">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 py-2 flex gap-2">
              <Link href="/ofertas" className="btn-ghost flex-1 text-center">
                Ofertas
              </Link>
              <Link href="/catalogo" className="btn-ghost flex-1 text-center">
                Catálogo
              </Link>
              <Link href="/#contacto" className="btn-ghost flex-1 text-center">
                Contacto
              </Link>
            </div>
          </div>
        </header>

        {/* CONTENIDO */}
        {children}

        {/* FOOTER */}
        <footer className="mt-16 border-t border-etm-line bg-white">
          <div className="mx-auto max-w-7xl px-6 py-10 text-sm text-etm-muted">
            <div className="flex flex-col md:flex-row gap-6 md:items-center md:justify-between">
              <div>
                <div className="font-bold text-etm-text">
                  Enlaces Turísticos Marroquí
                </div>
                <div>Atención y cotización por WhatsApp</div>
              </div>

              <a
                href={waLink}
                target="_blank"
                rel="noreferrer"
                className="btn-whatsapp px-5 py-3"
              >
                Cotizar ahora
              </a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
