import type { Metadata } from 'next'
import ServicePage from '@/components/ServicePage'

export const metadata: Metadata = {
  title: 'Interior Detailing Utah | Mobile Car Detailing | Utah Detail Co.',
  description: 'Professional mobile interior car detailing in Utah. Deep clean, steam, leather conditioning, and odor treatment. We come to you.',
}

export default function InteriorDetailingPage() {
  return (
    <ServicePage
      title="Interior Detailing"
      emoji="🪑"
      description="Deep interior cleaning that restores your car's cabin to like-new condition."
      longDescription="Our interior detailing service is a comprehensive deep-clean of every surface inside your vehicle. We use professional-grade steamers, extractors, and conditioners to remove dirt, grime, and stains from carpets, upholstery, leather, and hard surfaces. This isn't a quick wipe-down — it's a thorough restoration that leaves your car smelling fresh and looking immaculate."
      price={99}
      included={[
        'Full vacuum of all surfaces (seats, carpet, trunk)',
        'Steam cleaning of carpets and floor mats',
        'Upholstery spot treatment and extraction',
        'Leather cleaning and conditioning',
        'Dashboard, console, and door panel wipe-down',
        'Interior window and mirror cleaning',
        'Air vent brushing and deodorizing',
        'Headliner wipe (where accessible)',
        'Odor neutralizer application',
      ]}
      whyChoose={[
        'Professional-grade steam cleaner removes embedded dirt',
        'pH-balanced cleaners safe for all interior surfaces',
        'Leather conditioner prevents cracking and fading',
        'Odor neutralizer eliminates, not just masks, smells',
      ]}
      faqs={[
        { q: 'How long does interior detailing take?', a: 'Most vehicles take 2–3 hours. Heavily soiled vehicles or larger trucks/SUVs may take up to 4 hours.' },
        { q: 'Will you remove pet hair?', a: 'We remove light to moderate pet hair as part of our standard interior detail. For heavy pet hair accumulation, we recommend adding our Pet Hair Removal add-on for an extra-thorough treatment.' },
        { q: 'Is steam cleaning safe for all surfaces?', a: 'Yes. Our technicians are trained to use steam cleaning appropriately on all interior materials, including leather, suede, plastic, and fabric.' },
        { q: 'Do I need to empty my car first?', a: 'Please remove personal belongings and valuables before your appointment. We will move and work around items in your car, but it helps to have surfaces clear for the best results.' },
      ]}
    />
  )
}
