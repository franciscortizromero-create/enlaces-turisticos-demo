import { SectionPage } from '@/components/SectionPage'

export const metadata = {
  title: 'Visit México | Enlaces Turísticos Marroquí',
  description: 'Los mejores destinos nacionales: Cancún, CDMX, Los Cabos, Oaxaca y más.',
}

export default function MexicoPage() {
  return (
    <SectionPage
      section="mexico"
      title="Visit México"
      subtitle="Explora lo mejor de nuestro país. Cancún, Ciudad de México, Los Cabos, Oaxaca y muchos destinos más."
      heroImg="https://images.unsplash.com/photo-1518638150340-f706e86654de?w=1600&q=80"
      tag="🇲🇽 Destinos nacionales"
      emptyIcon="🌵"
    />
  )
}
