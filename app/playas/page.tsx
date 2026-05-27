import { SectionPage } from '@/components/SectionPage'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Playas | Enlaces Turísticos Marroquí',
  description: 'Paquetes de playa todo incluido: Riviera Maya, Huatulco, Los Cabos y más.',
}

export default function PlayasPage() {
  return (
    <SectionPage
      section="playas"
      title="Playas"
      subtitle="Sol, arena y mar. Riviera Maya, Huatulco, Los Cabos, Ixtapa... los mejores resorts todo incluido."
      heroImg="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&q=80"
      tag="🌴 Paquetes de playa"
      emptyIcon="🏖️"
    />
  )
}
