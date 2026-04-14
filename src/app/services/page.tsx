import type { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle, ChevronRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Mobile Detailing Services in Utah | Utah Detail Co.',
  description: 'Browse our full range of mobile car detailing services in Utah. Interior, exterior, ceramic coating, fleet, and more.',
}

const services = [
  {
    name: 'Interior Detailing',
    slug: 'interior-detailing',
    description: 'Deep interior cleaning including vacuum, steam, leather conditioning, and odor treatment.',
    price: 99,
    features: ['Deep vacuum all surfaces', 'Steam clean carpets & seats', 'Leather conditioning', 'Dashboard & console wipe', 'Window interior clean', 'Odor treatment'],
  },
  {
    name: 'Exterior Wash & Wax',
    slug: 'exterior-wash-wax',
    description: 'Hand wash, clay bar treatment, and carnauba wax protection for a brilliant shine.',
    price: 89,
    features: ['Hand wash & rinse', 'Clay bar decontamination', 'Carnauba wax application', 'Tire shine', 'Window clean', 'Door jamb wipe'],
  },
  {
    name: 'Full Detail',
    slug: 'full-detail',
    description: 'Complete interior and exterior detailing — our most popular package.',
    price: 179,
    features: ['Full exterior wash & wax', 'Complete interior detail', 'Engine bay wipe', 'Leather conditioning', 'Odor treatment', 'All glass cleaned'],
    popular: true,
  },
  {
    name: 'Pet Hair Removal',
    slug: 'pet-hair-removal',
    description: 'Specialized extraction of stubborn pet hair from all interior surfaces.',
    price: 49,
    features: ['Rubber brush treatment', 'High-power vacuum', 'Seat seam extraction', 'Carpet treatment', 'Floor mat cleaning'],
  },
  {
    name: 'Odor Removal',
    slug: 'odor-removal',
    description: 'Ozone and enzyme treatment to permanently eliminate odors from smoke, pets, and more.',
    price: 39,
    features: ['Ozone treatment', 'Enzyme spray application', 'Vent deodorizing', 'Carpet & upholstery treatment'],
  },
  {
    name: 'Fleet Vehicles',
    slug: 'fleet-vehicles',
    description: 'Bulk detailing for business fleets. Volume pricing available for 3+ vehicles.',
    price: 65,
    features: ['Volume discounts', 'Flexible scheduling', 'On-site service', 'Invoice billing available', 'Dedicated account manager'],
  },
  {
    name: 'Membership Plans',
    slug: 'membership-plans',
    description: 'Monthly recurring detail subscription. Save up to 30% compared to one-time bookings.',
    price: 59,
    features: ['Monthly basic wash', 'Priority scheduling', 'Member pricing on upgrades', 'No contracts', 'Cancel anytime'],
  },
]

export default function ServicesPage() {
  return (
    <div className="bg-[#0f172a] text-white min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] py-20 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Our Services</h1>
        <p className="text-xl text-slate-300 max-w-2xl mx-auto">
          Professional mobile detailing services delivered to your door across Utah. We bring the shop to you.
        </p>
      </section>

      {/* Services Grid */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service) => (
              <div
                key={service.slug}
                className={`relative bg-slate-800 rounded-2xl p-6 border transition-all hover:border-amber-400/50 ${
                  service.popular ? 'border-amber-400' : 'border-slate-700'
                }`}
              >
                {service.popular && (
                  <div className="absolute top-4 right-4 bg-amber-400 text-[#0f172a] text-xs font-bold px-3 py-1 rounded-full">
                    Most Popular
                  </div>
                )}
                <div className="mb-2">
                  <h2 className="text-xl font-bold">{service.name}</h2>
                  <span className="text-amber-400 font-bold text-xl">From ${service.price}</span>
                </div>
                <p className="text-slate-400 text-sm mb-4 leading-relaxed">{service.description}</p>
                <ul className="grid grid-cols-2 gap-1.5 mb-5">
                  {service.features.map((f) => (
                    <li key={f} className="flex items-center gap-1.5 text-xs text-slate-300">
                      <CheckCircle className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="flex gap-3">
                  <Link
                    href="/book"
                    className="flex-1 text-center py-2.5 bg-amber-400 hover:bg-amber-500 text-[#0f172a] font-semibold rounded-xl text-sm transition-colors"
                  >
                    Book Now
                  </Link>
                  <Link
                    href={`/services/${service.slug}`}
                    className="flex items-center gap-1 px-4 py-2.5 bg-slate-700 hover:bg-slate-600 text-white rounded-xl text-sm transition-colors"
                  >
                    Details <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-amber-400">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-[#0f172a] mb-3">Not Sure Which Service?</h2>
          <p className="text-slate-700 mb-6">Book a full detail and we will assess your vehicle on arrival and recommend the best options.</p>
          <Link
            href="/book"
            className="inline-flex px-8 py-4 bg-[#0f172a] hover:bg-slate-800 text-amber-400 font-bold rounded-xl transition-colors"
          >
            Book Now
          </Link>
        </div>
      </section>
    </div>
  )
}
