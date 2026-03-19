import type { Metadata } from 'next'
import ServicePage from '@/components/ServicePage'

export const metadata: Metadata = {
  title: 'Car Odor Removal Utah | Mobile Detailing | Utah Detail Co.',
  description: 'Eliminate odors from smoke, pets, food, and mildew with our mobile ozone and enzyme treatment in Utah.',
}

export default function OdorRemovalPage() {
  return (
    <ServicePage
      title="Odor Removal"
      emoji="🌬️"
      description="Permanently eliminate smoke, pet, food, and mildew odors with ozone and enzyme treatment."
      longDescription="Air fresheners mask odors temporarily. Our odor removal service eliminates them permanently. We use a combination of enzyme spray (which biologically breaks down the odor-causing compounds) and ozone treatment (which oxidizes and neutralizes odor molecules throughout your entire cabin). This is the same professional-grade process used by restoration companies and car rental fleets."
      price={39}
      priceLabel="as an add-on or standalone"
      included={[
        'Initial interior wipe-down and prep',
        'Enzyme spray application to all surfaces',
        'Air vent treatment and deodorizing',
        'Ozone generator treatment (30–60 min)',
        'Carpet and upholstery enzyme soak',
        'Post-treatment ventilation and inspection',
      ]}
      whyChoose={[
        'Ozone treatment reaches areas spray cleaners cannot',
        'Enzyme treatment biologically neutralizes odor compounds',
        'Effective against smoke, pets, mildew, food, and more',
        'Safe for all interior materials when applied correctly',
      ]}
      faqs={[
        { q: 'Will the odor come back?', a: 'If the source of the odor is removed, no. If there is a persistent leak causing mildew, or ongoing pet presence, we recommend regular odor treatments as part of a maintenance plan.' },
        { q: 'Is ozone treatment safe for my car?', a: 'Yes, when done correctly by a trained technician. The vehicle is unoccupied during treatment and ventilated thoroughly before you return.' },
        { q: 'Can this remove heavy smoke smell?', a: 'Yes. Smoke is one of the most challenging odors, and ozone treatment is one of the few methods that truly works. Heavy smoke cases may require 2 treatments.' },
        { q: 'How long does the treatment take?', a: 'The full process takes 1–2 hours, including prep, enzyme application, ozone treatment, and ventilation. It can be combined with any detailing service.' },
      ]}
    />
  )
}
