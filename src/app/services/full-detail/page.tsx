import type { Metadata } from 'next'
import ServicePage from '@/components/ServicePage'

export const metadata: Metadata = {
  title: 'Full Car Detail Utah | Mobile Detailing | Utah Detail Co.',
  description: 'Complete interior and exterior mobile car detailing in Utah. Our most popular package. Book online today.',
}

export default function FullDetailPage() {
  return (
    <ServicePage
      title="Full Detail"
      emoji="🚗"
      description="Our most popular package — complete interior and exterior detailing from top to bottom."
      longDescription="The Full Detail is our best-value package, combining both our interior and exterior services into one comprehensive treatment. Your car gets a complete hand wash, clay bar, and wax on the outside, plus a thorough vacuum, steam clean, leather conditioning, and odor treatment on the inside. When we're done, your vehicle looks and smells brand new."
      price={179}
      included={[
        'Exterior hand wash (two-bucket method)',
        'Clay bar paint decontamination',
        'Carnauba wax application',
        'Tire and wheel scrub + shine',
        'All exterior glass cleaned',
        'Full interior vacuum',
        'Steam clean carpets and upholstery',
        'Leather clean and condition',
        'Dashboard, console, and door panels wiped',
        'Interior glass cleaned',
        'Odor neutralizer treatment',
        'Engine bay wipe-down',
      ]}
      whyChoose={[
        'Best value — save vs. booking interior and exterior separately',
        'Single 3–4 hour appointment covers everything',
        'Professional-grade products for both interior and exterior',
        'Our most popular and highest-rated service',
      ]}
      faqs={[
        { q: 'How long does a full detail take?', a: 'Most vehicles take 3–4 hours. Larger SUVs and trucks, or heavily soiled vehicles, may take up to 5 hours.' },
        { q: 'Is this the same as what a dealership offers?', a: 'Our full detail is typically more thorough than dealership detailing. We use better products and spend significantly more time on each vehicle.' },
        { q: 'Do I need to be home during the service?', a: 'No! As long as we have access to water, electricity, and your vehicle, you can go about your day. We text you when we arrive and when we\'re done.' },
        { q: 'What if I have stains that won\'t come out?', a: 'We always do our best to remove all stains. If a stain is set and cannot be fully removed, we will let you know before finishing and recommend next steps.' },
      ]}
    />
  )
}
