import type { Metadata } from 'next'
import ServicePage from '@/components/ServicePage'

export const metadata: Metadata = {
  title: 'Pet Hair Removal Utah | Mobile Car Detailing | Utah Detail Co.',
  description: 'Professional pet hair removal from car interiors in Utah. We extract stubborn pet hair from seats, carpet, and everywhere in between.',
}

export default function PetHairRemovalPage() {
  return (
    <ServicePage
      title="Pet Hair Removal"
      emoji="🐾"
      description="Thorough pet hair extraction from seats, carpet, and every surface in your vehicle."
      longDescription="Pet hair is notoriously difficult to remove from car interiors. Standard vacuums just push it around. Our specialized pet hair removal service uses a combination of rubber brush tools, high-powered extraction, and meticulous hand-work to remove embedded hair from every seam, fold, and surface in your vehicle. Whether it's a Golden Retriever or a shedding cat, we'll get it out."
      price={49}
      priceLabel="as an add-on or standalone"
      included={[
        'Rubber brush agitation treatment',
        'High-powered vacuum extraction',
        'Seat seam and crevice hair removal',
        'Carpet and floor mat treatment',
        'Trunk and cargo area treatment',
        'Headrest and seat back cleaning',
        'Lint-roll finish on upholstery',
      ]}
      whyChoose={[
        'Specialized rubber tools remove hair standard vacuums miss',
        'Trained technicians know where hair hides (seams, vents, etc.)',
        'Can be combined with full interior detail for best results',
        'Allergy-friendly — removes dander along with hair',
      ]}
      faqs={[
        { q: 'Can you get all the pet hair out?', a: 'In most cases, yes. Very heavily embedded hair in worn fabric may not come out 100%, but we achieve dramatically better results than standard vacuuming.' },
        { q: 'Should I combine this with an interior detail?', a: 'Yes, we highly recommend pairing pet hair removal with our interior detail. The steam cleaning and extraction work together for the best result and freshest-smelling cabin.' },
        { q: 'How long does it take?', a: 'A standalone pet hair removal service takes 45–90 minutes depending on the severity. As an add-on to a full detail, it adds approximately 30 minutes.' },
        { q: 'Will this help with the pet odor too?', a: 'Removing pet hair significantly reduces odor. For complete odor elimination, add our Odor Removal service which uses ozone and enzyme treatments to neutralize the source.' },
      ]}
    />
  )
}
