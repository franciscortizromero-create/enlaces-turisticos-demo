import { SectionPage } from '@/components/SectionPage'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Europa | Enlaces Turísticos Marroquí',
  description: 'Paquetes a Europa: París, Roma, Barcelona, Ámsterdam y más.',
}

export default function EuropaPage() {
  return (
    <SectionPage
      section="europa"
      title="Europa"
      subtitle="Descubre los destinos más icónicos del viejo continente. París, Roma, Barcelona, Ámsterdam y más."
      heroImg="https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=1600&q=80"
      tag="🗼 Destinos europeos"
      emptyIcon="🗼"
    />
  )
}
