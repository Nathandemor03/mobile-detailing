import type { Metadata } from 'next'
import ServicePage from '@/components/ServicePage'

export const metadata: Metadata = {
  title: 'Exterior Wash & Wax Utah | Mobile Detailing | Utah Detail Co.',
  description: 'Professional hand wash, clay bar, and carnauba wax mobile service in Utah. We come to your home or office.',
}

export default function ExteriorWashWaxPage() {
  return (
    <ServicePage
      title="Exterior Wash & Wax"
      emoji="✨"
      description="A brilliant exterior hand wash, clay bar treatment, and protective carnauba wax finish."
      longDescription="Utah's harsh sun, road salt, and dust take a toll on your car's paint. Our exterior wash and wax service restores your paint's shine and protects it from the elements. We hand-wash every panel, use a clay bar to remove embedded contaminants, and finish with a genuine carnauba wax that provides a deep, glossy shine and months of protection."
      price={89}
      included={[
        'Two-bucket hand wash method',
        'Wheel and tire scrub',
        'Tire shine application',
        'Clay bar paint decontamination',
        'Carnauba wax application and buff',
        'Exterior window cleaning',
        'Door jamb wipe-down',
        'Trim dressing',
      ]}
      whyChoose={[
        'Two-bucket method prevents swirl marks and paint scratches',
        'Clay bar removes iron particles, tar, and industrial fallout',
        'Real carnauba wax — not a synthetic spray — for lasting shine',
        'All products are pH-neutral and paint-safe',
      ]}
      faqs={[
        { q: 'How often should I wax my car in Utah?', a: 'We recommend waxing every 3–4 months given Utah\'s intense UV exposure. The ceramic coating upgrade is a great option for longer-term protection.' },
        { q: 'How long does the wax last?', a: 'Carnauba wax typically lasts 4–8 weeks depending on weather and washing frequency. For longer-lasting protection, consider our ceramic coating service.' },
        { q: 'Can you wash my car in a parking garage?', a: 'Yes! As long as there is access to water and electricity nearby, we can work in covered parking structures, carports, or garages.' },
        { q: 'Does the clay bar scratch my paint?', a: 'No. When used correctly with clay lubricant, clay bars are completely safe and actually improve paint smoothness by removing contaminants that cause microscopic scratching over time.' },
      ]}
    />
  )
}
