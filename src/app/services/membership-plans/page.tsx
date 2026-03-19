import type { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Monthly Detailing Membership Utah | Utah Detail Co.',
  description: 'Save up to 30% with a monthly mobile car detailing membership in Utah. Priority scheduling, member discounts, no contracts.',
}

const plans = [
  {
    name: 'Basic Member',
    price: 59,
    interval: 'month',
    description: 'Monthly exterior wash — keep your car consistently clean',
    features: [
      'Monthly Basic Wash (exterior)',
      'Priority scheduling',
      '10% off add-ons',
      'No contracts — cancel anytime',
      'SMS reminders',
    ],
    highlight: false,
  },
  {
    name: 'Detail Member',
    price: 129,
    interval: 'month',
    description: 'Monthly full detail — always looking showroom-fresh',
    features: [
      'Monthly Full Detail (interior + exterior)',
      'Priority scheduling',
      '15% off additional services',
      'Free odor treatment (quarterly)',
      'No contracts — cancel anytime',
      'Dedicated account contact',
    ],
    highlight: true,
  },
  {
    name: 'Premium Member',
    price: 219,
    interval: 'month',
    description: 'Full detail + ceramic maintenance — ultimate protection',
    features: [
      'Monthly Full Detail',
      'Quarterly ceramic spray top-up',
      'Priority same-day scheduling',
      '20% off all add-ons',
      'Free annual deep interior steam',
      'No contracts — cancel anytime',
    ],
    highlight: false,
  },
]

export default function MembershipPlansPage() {
  return (
    <div className="bg-[#0f172a] text-white min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] py-20 px-4 text-center">
        <div className="text-6xl mb-4">⭐</div>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Membership Plans</h1>
        <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-6">
          Save up to 30% with a monthly detailing membership. Priority scheduling, exclusive member pricing, and no contracts.
        </p>
        <p className="text-slate-400 text-sm">Cancel anytime. No minimum commitment.</p>
      </section>

      {/* Plans */}
      <section className="py-16 px-4 bg-slate-900">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-2xl p-8 border ${
                  plan.highlight ? 'bg-amber-400 border-amber-400 text-[#0f172a]' : 'bg-slate-800 border-slate-700 text-white'
                }`}
              >
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#0f172a] text-amber-400 text-xs font-bold px-3 py-1 rounded-full border border-amber-400">
                    Most Popular
                  </div>
                )}
                <h2 className="text-xl font-bold mb-1">{plan.name}</h2>
                <p className={`text-sm mb-4 ${plan.highlight ? 'text-slate-700' : 'text-slate-400'}`}>{plan.description}</p>
                <div className="mb-6">
                  <span className="text-4xl font-extrabold">${plan.price}</span>
                  <span className={`text-sm ${plan.highlight ? 'text-slate-700' : 'text-slate-400'}`}>/{plan.interval}</span>
                </div>
                <ul className="space-y-2.5 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <CheckCircle className={`w-4 h-4 mt-0.5 flex-shrink-0 ${plan.highlight ? 'text-[#0f172a]' : 'text-amber-400'}`} />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/book"
                  className={`block text-center py-3 rounded-xl font-semibold text-sm transition-colors ${
                    plan.highlight
                      ? 'bg-[#0f172a] text-amber-400 hover:bg-slate-800'
                      : 'bg-amber-400 text-[#0f172a] hover:bg-amber-500'
                  }`}
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 bg-[#0f172a]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">Membership FAQ</h2>
          <div className="space-y-4">
            {[
              { q: 'Can I cancel my membership at any time?', a: 'Yes. There are no contracts or minimum commitments. You can cancel anytime from your account dashboard or by contacting us directly.' },
              { q: 'How do I schedule my monthly detail?', a: 'After signing up, you receive access to our priority booking calendar. You can schedule your monthly appointment online or we can auto-schedule you on your preferred recurring day.' },
              { q: 'Can I skip a month?', a: 'Yes, members can pause their membership for up to 2 months per year. Contact us at least 5 days before your billing date to pause.' },
              { q: 'Is there a discount if I pay annually?', a: 'Yes! Save an additional 10% by paying annually upfront. Contact us for annual membership pricing.' },
            ].map((faq) => (
              <div key={faq.q} className="bg-slate-800 rounded-xl p-5 border border-slate-700">
                <h3 className="font-semibold text-white mb-2">{faq.q}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-amber-400">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-[#0f172a] mb-3">Join Today</h2>
          <p className="text-slate-700 mb-6">Start your membership and save up to 30% on every detail.</p>
          <Link href="/book" className="inline-flex px-8 py-4 bg-[#0f172a] hover:bg-slate-800 text-amber-400 font-bold rounded-xl transition-colors">
            Start Your Membership
          </Link>
        </div>
      </section>
    </div>
  )
}
