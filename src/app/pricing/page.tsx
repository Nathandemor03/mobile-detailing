import type { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Mobile Car Detailing Pricing Utah | Utah Detail Co.',
  description: 'Transparent pricing for mobile car detailing in Utah. Packages from $79. View all packages, add-ons, and membership plans.',
}

const packages = [
  {
    name: 'Basic Wash',
    price: 79,
    description: 'Exterior hand wash, tire shine, window clean',
    features: ['Exterior hand wash', 'Tire shine', 'Window cleaning', 'Door jamb wipe down'],
    highlight: false,
  },
  {
    name: 'Full Detail',
    price: 179,
    description: 'Complete interior and exterior detailing',
    features: ['Everything in Basic Wash', 'Interior vacuum', 'Dashboard & console wipe', 'Leather conditioning', 'Odor treatment', 'Engine bay wipe'],
    highlight: true,
  },
  {
    name: 'Premium Ceramic',
    price: 399,
    description: 'Full detail plus ceramic coating protection',
    features: ['Everything in Full Detail', 'Paint decontamination', 'Ceramic coating application', '6-month protection warranty'],
    highlight: false,
  },
]

const addOns = [
  { name: 'Pet Hair Removal', price: 49, desc: 'Thorough pet hair extraction from seats and carpet' },
  { name: 'Engine Bay Detail', price: 59, desc: 'Clean and degrease engine bay' },
  { name: 'Odor Elimination', price: 39, desc: 'Ozone treatment or enzyme spray' },
  { name: 'Headlight Restoration', price: 49, desc: 'Restore cloudy headlights to clear' },
  { name: 'Ceramic Spray Coating', price: 99, desc: 'Single-layer spray ceramic for added protection' },
]

const travelFees = [
  { city: 'Provo', fee: 0 },
  { city: 'Orem', fee: 0 },
  { city: 'Lehi', fee: 15 },
  { city: 'Draper', fee: 15 },
  { city: 'Sandy', fee: 15 },
  { city: 'Salt Lake City', fee: 20 },
  { city: 'Layton', fee: 20 },
  { city: 'St. George', fee: 25 },
]

export default function PricingPage() {
  return (
    <div className="bg-[#0f172a] text-white min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] py-20 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Simple, Transparent Pricing</h1>
        <p className="text-xl text-slate-300 max-w-2xl mx-auto">
          No hidden fees. No surprises. Every price listed is what you pay — plus any applicable travel fee.
        </p>
      </section>

      {/* Packages */}
      <section className="py-16 px-4 bg-slate-900">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">Service Packages</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {packages.map((pkg) => (
              <div
                key={pkg.name}
                className={`relative rounded-2xl p-8 border ${
                  pkg.highlight ? 'bg-amber-400 border-amber-400 text-[#0f172a]' : 'bg-slate-800 border-slate-700 text-white'
                }`}
              >
                {pkg.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#0f172a] text-amber-400 text-xs font-bold px-3 py-1 rounded-full border border-amber-400">
                    Most Popular
                  </div>
                )}
                <h3 className="text-xl font-bold mb-2">{pkg.name}</h3>
                <p className={`text-sm mb-4 ${pkg.highlight ? 'text-slate-700' : 'text-slate-400'}`}>{pkg.description}</p>
                <div className="text-4xl font-extrabold mb-6">${pkg.price}</div>
                <ul className="space-y-2.5 mb-8">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      <CheckCircle className={`w-4 h-4 flex-shrink-0 ${pkg.highlight ? 'text-[#0f172a]' : 'text-amber-400'}`} />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/book"
                  className={`block text-center py-3 rounded-xl font-semibold text-sm transition-colors ${
                    pkg.highlight
                      ? 'bg-[#0f172a] text-amber-400 hover:bg-slate-800'
                      : 'bg-amber-400 text-[#0f172a] hover:bg-amber-500'
                  }`}
                >
                  Book Now
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Add-ons */}
      <section className="py-16 px-4 bg-[#0f172a]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">Add-On Services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {addOns.map((addon) => (
              <div key={addon.name} className="flex items-center justify-between bg-slate-800 rounded-xl p-5 border border-slate-700">
                <div>
                  <div className="font-semibold text-white">{addon.name}</div>
                  <div className="text-slate-400 text-sm">{addon.desc}</div>
                </div>
                <div className="text-amber-400 font-bold text-lg ml-4">+${addon.price}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Travel Fees */}
      <section className="py-16 px-4 bg-slate-900">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-center">Travel Fees by City</h2>
          <p className="text-slate-400 text-center text-sm mb-8">
            Travel fees are added to the total at checkout based on your location.
          </p>
          <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700 text-slate-400">
                  <th className="text-left px-5 py-3">City</th>
                  <th className="text-right px-5 py-3">Travel Fee</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                {travelFees.map((row) => (
                  <tr key={row.city} className="text-slate-300">
                    <td className="px-5 py-3 font-medium text-white">{row.city}</td>
                    <td className="px-5 py-3 text-right">
                      {row.fee === 0 ? (
                        <span className="text-green-400 font-semibold">Free</span>
                      ) : (
                        <span className="text-amber-400 font-semibold">${row.fee}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Membership */}
      <section className="py-16 px-4 bg-[#0f172a]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Save with a Monthly Membership</h2>
          <p className="text-slate-400 mb-8">
            Join our membership and save up to 30% on every detail. Priority scheduling, member discounts, no contracts.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {[
              { name: 'Basic Member', price: 59, saves: 'Save $20/mo' },
              { name: 'Detail Member', price: 129, saves: 'Save $50/mo' },
              { name: 'Premium Member', price: 219, saves: 'Save $80/mo' },
            ].map((plan) => (
              <div key={plan.name} className="bg-slate-800 rounded-xl p-5 border border-slate-700 text-center">
                <div className="font-semibold mb-1">{plan.name}</div>
                <div className="text-2xl font-extrabold text-amber-400">${plan.price}<span className="text-sm text-slate-400">/mo</span></div>
                <div className="text-green-400 text-xs mt-1">{plan.saves}</div>
              </div>
            ))}
          </div>
          <Link href="/services/membership-plans" className="text-amber-400 hover:text-amber-300 underline underline-offset-4 text-sm">
            Learn more about memberships
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-amber-400">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-[#0f172a] mb-3">Ready to Book?</h2>
          <p className="text-slate-700 mb-6">Enter your address at checkout to confirm your travel fee.</p>
          <Link href="/book" className="inline-flex px-8 py-4 bg-[#0f172a] hover:bg-slate-800 text-amber-400 font-bold rounded-xl transition-colors">
            Book Now
          </Link>
        </div>
      </section>
    </div>
  )
}
