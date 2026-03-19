import Link from 'next/link'
import { CheckCircle } from 'lucide-react'

interface ServicePageProps {
  title: string
  emoji: string
  description: string
  longDescription: string
  price: number
  priceLabel?: string
  included: string[]
  whyChoose: string[]
  faqs: { q: string; a: string }[]
}

export default function ServicePage({
  title,
  emoji,
  description,
  longDescription,
  price,
  priceLabel = 'starting',
  included,
  whyChoose,
  faqs,
}: ServicePageProps) {
  return (
    <div className="bg-[#0f172a] text-white min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-6xl mb-4">{emoji}</div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">{title}</h1>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">{description}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <div className="text-center">
              <div className="text-4xl font-extrabold text-amber-400">${price}</div>
              <div className="text-slate-400 text-sm">{priceLabel}</div>
            </div>
            <Link
              href="/book"
              className="px-8 py-4 bg-amber-400 hover:bg-amber-500 text-[#0f172a] font-bold rounded-xl text-lg transition-colors"
            >
              Book This Service
            </Link>
          </div>
        </div>
      </section>

      {/* Description + What's Included */}
      <section className="py-16 px-4 bg-slate-900">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-2xl font-bold mb-4">About This Service</h2>
            <p className="text-slate-300 leading-relaxed">{longDescription}</p>
            <div className="mt-6 space-y-3">
              {whyChoose.map((point) => (
                <div key={point} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-300 text-sm">{point}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">What&apos;s Included</h2>
            <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
              <ul className="space-y-3">
                {included.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-amber-400 flex-shrink-0" />
                    <span className="text-slate-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 bg-[#0f172a]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
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
          <h2 className="text-3xl font-bold text-[#0f172a] mb-3">Ready to Book?</h2>
          <p className="text-slate-700 mb-6">We come to your home, office, or anywhere in Utah.</p>
          <Link
            href="/book"
            className="inline-flex px-8 py-4 bg-[#0f172a] hover:bg-slate-800 text-amber-400 font-bold rounded-xl transition-colors"
          >
            Book {title} Now
          </Link>
        </div>
      </section>
    </div>
  )
}
