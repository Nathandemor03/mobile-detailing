import type { Metadata } from 'next'
import ServicePage from '@/components/ServicePage'

export const metadata: Metadata = {
  title: 'Ceramic Coating Utah | Mobile Car Protection | Utah Detail Co.',
  description: 'Professional ceramic coating applied mobile in Utah. 6-month protection warranty. We come to your home or office.',
}

export default function CeramicCoatingPage() {
  return (
    <ServicePage
      title="Ceramic Coating"
      emoji="💎"
      description="Professional-grade ceramic coating for long-term paint protection and a hydrophobic mirror finish."
      longDescription="Ceramic coating is the most advanced paint protection available. Our professional-grade nano-ceramic formula bonds to your paint's clear coat, creating a hard, hydrophobic layer that repels water, dirt, UV rays, and minor scratches. Unlike wax that wears off in weeks, ceramic coating lasts 6–24 months with proper maintenance. It is the last line of defense for your vehicle's paint in Utah's harsh sun and weather."
      price={299}
      priceLabel="ceramic only (full package $399)"
      included={[
        'Full exterior hand wash and dry',
        'Iron decontamination spray',
        'Clay bar paint surface prep',
        'Paint inspection under lighting',
        'Light paint correction (swirl removal)',
        'Panel wipe with IPA (isopropyl alcohol)',
        'Professional ceramic coating application',
        'Infrared cure (where applicable)',
        '6-month protection warranty',
        'Aftercare instructions provided',
      ]}
      whyChoose={[
        '6-month protection warranty — we re-coat if it fails',
        'Hydrophobic effect makes future washing effortless',
        'UV protection prevents paint fading in Utah\'s intense sun',
        'Professional-grade coating, not DIY consumer product',
      ]}
      faqs={[
        { q: 'How is ceramic coating different from wax?', a: 'Wax sits on top of the paint and lasts 4–8 weeks. Ceramic coating chemically bonds to the paint and can last 6–24+ months. It is also significantly harder and more scratch-resistant than wax.' },
        { q: 'Can you apply ceramic coating at my home?', a: 'Yes! We bring all necessary equipment. Ideally, we prefer a shaded or covered area to apply the coating, but we can work with any conditions.' },
        { q: 'How long does the coating last?', a: 'Our standard coating lasts approximately 6 months with proper maintenance. We offer extended coatings with longer warranties — ask about upgrading at booking.' },
        { q: 'Do I need to maintain it differently?', a: 'After coating, we recommend washing with a pH-neutral soap and avoiding automatic car washes with brushes. We provide a full aftercare guide with every ceramic service.' },
      ]}
    />
  )
}
