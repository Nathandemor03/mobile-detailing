import type { Metadata } from 'next'
import ServicePage from '@/components/ServicePage'

export const metadata: Metadata = {
  title: 'Fleet Vehicle Detailing Utah | Mobile Business Detailing | Utah Detail Co.',
  description: 'Mobile fleet detailing for Utah businesses. Volume discounts for 3+ vehicles. On-site service at your facility.',
}

export default function FleetVehiclesPage() {
  return (
    <ServicePage
      title="Fleet Vehicle Detailing"
      emoji="🚛"
      description="Professional mobile detailing for business fleets across Utah. Volume pricing for 3+ vehicles."
      longDescription="Your fleet vehicles represent your brand. Dirty, unkempt company vehicles send the wrong message to clients and make employees feel unvalued. Our fleet detailing service comes directly to your facility, business park, or lot and details multiple vehicles in a single visit. We offer volume discounts for 3 or more vehicles and can set up a recurring maintenance schedule to keep your fleet looking professional year-round."
      price={65}
      priceLabel="per vehicle (volume discounts available)"
      included={[
        'On-site service at your location',
        'Exterior hand wash and wax',
        'Interior vacuum and wipe-down',
        'Window cleaning (interior and exterior)',
        'Tire and wheel cleaning',
        'Volume discount for 3+ vehicles',
        'Flexible scheduling (early morning, evenings)',
        'Invoice billing available for businesses',
        'Dedicated account manager for fleets of 10+',
      ]}
      whyChoose={[
        'No need to drive vehicles to a shop — we come to you',
        'Volume discounts make fleet detailing cost-effective',
        'Recurring service keeps your fleet consistently clean',
        'We can accommodate large fleets with multiple technicians',
      ]}
      faqs={[
        { q: 'How many vehicles can you do in one visit?', a: 'A single technician can detail 3–6 vehicles per visit depending on service level. For larger fleets, we send multiple technicians to complete the job in one session.' },
        { q: 'Do you offer recurring fleet contracts?', a: 'Yes! We offer monthly, bi-monthly, and quarterly fleet maintenance contracts with locked-in pricing. Contact us for a custom fleet quote.' },
        { q: 'Can you detail branded or wrapped vehicles?', a: 'Yes. We are experienced with vinyl wraps and branded fleet vehicles and use appropriate cleaning products that will not damage the wrap or graphics.' },
        { q: 'Do you offer invoicing for businesses?', a: 'Yes, we can set up net-30 invoice billing for established business accounts. Contact us to get set up as a commercial client.' },
      ]}
    />
  )
}
