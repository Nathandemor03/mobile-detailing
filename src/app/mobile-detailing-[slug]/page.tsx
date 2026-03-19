import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, CheckCircle, Star, ChevronRight } from 'lucide-react'
import type { City, Review } from '@/types'

interface CityPageProps {
  params: { slug: string }
}

export async function generateStaticParams() {
  try {
    const supabase = await createClient()
    const { data: cities } = await supabase
      .from('cities')
      .select('slug')
      .eq('active', true)
    return (cities ?? []).map((c) => ({ slug: c.slug as string }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: CityPageProps): Promise<Metadata> {
  try {
    const supabase = await createClient()
    const { data: city } = await supabase
      .from('cities')
      .select('seo_title, seo_description')
      .eq('slug', params.slug)
      .single()

    if (!city) return { title: 'Mobile Detailing Utah' }

    return {
      title: city.seo_title ?? 'Mobile Car Detailing Utah',
      description: city.seo_description ?? 'Professional mobile car detailing in Utah.',
    }
  } catch {
    return { title: 'Mobile Detailing Utah' }
  }
}

const services = [
  { name: 'Interior Detailing', slug: 'interior-detailing', price: 99 },
  { name: 'Exterior Wash & Wax', slug: 'exterior-wash-wax', price: 89 },
  { name: 'Full Detail', slug: 'full-detail', price: 179 },
  { name: 'Ceramic Coating', slug: 'ceramic-coating', price: 299 },
  { name: 'Pet Hair Removal', slug: 'pet-hair-removal', price: 49 },
  { name: 'Odor Removal', slug: 'odor-removal', price: 39 },
]

const packages = [
  { name: 'Basic Wash', price: 79, features: ['Exterior hand wash', 'Tire shine', 'Window cleaning', 'Door jamb wipe'] },
  { name: 'Full Detail', price: 179, features: ['Everything in Basic', 'Interior vacuum', 'Leather conditioning', 'Odor treatment'], popular: true },
  { name: 'Premium Ceramic', price: 399, features: ['Everything in Full', 'Paint decontamination', 'Ceramic coating', '6-month warranty'] },
]

const nearbyMap: Record<string, string[]> = {
  provo: ['Orem', 'Springville', 'Spanish Fork', 'Mapleton'],
  orem: ['Provo', 'Lindon', 'Vineyard', 'American Fork'],
  lehi: ['American Fork', 'Saratoga Springs', 'Cedar Hills', 'Highland'],
  'salt-lake-city': ['Murray', 'Holladay', 'Millcreek', 'South Salt Lake'],
  draper: ['Sandy', 'South Jordan', 'Riverton', 'Herriman'],
  sandy: ['Draper', 'Midvale', 'Murray', 'South Jordan'],
  'st-george': ['Washington', 'Hurricane', 'Ivins', 'Santa Clara'],
  layton: ['Kaysville', 'Clearfield', 'Syracuse', 'Bountiful'],
}

export default async function CityPage({ params }: CityPageProps) {
  const supabase = await createClient()

  const { data: city } = await supabase
    .from('cities')
    .select('*')
    .eq('slug', params.slug)
    .eq('active', true)
    .single() as { data: City | null }

  if (!city) notFound()

  const { data: reviews } = await supabase
    .from('reviews')
    .select('*')
    .eq('city_id', city.id)
    .eq('is_published', true)
    .limit(3) as { data: Review[] | null }

  const nearby = nearbyMap[params.slug] ?? []

  const faqs = [
    { q: `How does mobile detailing work in ${city.name}?`, a: `We drive our fully-equipped detailing van to your home or office in ${city.name}. Just provide access to water and electricity, and we take care of the rest.` },
    { q: `What is the service area in ${city.name}?`, a: `We cover all of ${city.name} and surrounding zip codes. Enter your address at booking to confirm coverage.` },
    { q: `How far in advance should I book in ${city.name}?`, a: `We recommend booking 24–48 hours in advance for ${city.name}, especially on weekends. Same-day slots are sometimes available.` },
    { q: `Do you offer ceramic coating in ${city.name}?`, a: `Yes! Our Premium Ceramic package is available in ${city.name}. It includes a full detail plus professional ceramic coating with a 6-month protection warranty.` },
    { q: `Is there a travel fee for ${city.name}?`, a: city.travel_fee > 0 ? `Yes, there is a $${city.travel_fee} travel fee for ${city.name} appointments.` : `Great news — there is no travel fee for ${city.name}! We service this area at no extra charge.` },
  ]

  return (
    <div className="bg-[#0f172a] text-white min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 text-amber-400 text-sm font-medium mb-4">
            <MapPin className="w-4 h-4" />
            {city.name}, Utah
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Mobile Detailing in {city.name}, UT
          </h1>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            {city.headline ?? `Professional mobile car detailing in ${city.name}, Utah. We come to your home, office, or anywhere convenient.`}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/book?city=${params.slug}`}
              className="px-8 py-4 bg-amber-400 hover:bg-amber-500 text-[#0f172a] font-bold rounded-xl text-lg transition-colors"
            >
              Book in {city.name}
            </Link>
            <Link
              href="/pricing"
              className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-lg transition-colors border border-slate-600"
            >
              View Pricing
            </Link>
          </div>
          {city.travel_fee > 0 && (
            <p className="mt-4 text-slate-500 text-sm">
              ${city.travel_fee} travel fee applies for {city.name} appointments
            </p>
          )}
        </div>
      </section>

      {/* Services */}
      <section className="py-16 px-4 bg-slate-900">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">Our Services in {city.name}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group bg-slate-800 hover:bg-slate-750 border border-slate-700 hover:border-amber-400 rounded-xl p-5 transition-all"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold group-hover:text-amber-400 transition-colors">{service.name}</h3>
                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 transition-colors" />
                </div>
                <p className="text-amber-400 font-bold">From ${service.price}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 px-4 bg-[#0f172a]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">Pricing in {city.name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {packages.map((pkg) => (
              <div
                key={pkg.name}
                className={`rounded-2xl p-6 border ${
                  pkg.popular
                    ? 'bg-amber-400 border-amber-400 text-[#0f172a]'
                    : 'bg-slate-800 border-slate-700 text-white'
                }`}
              >
                {pkg.popular && (
                  <div className="text-xs font-bold bg-[#0f172a] text-amber-400 px-3 py-1 rounded-full inline-block mb-3">Most Popular</div>
                )}
                <h3 className="text-xl font-bold mb-1">{pkg.name}</h3>
                <div className="text-3xl font-extrabold mb-4">
                  ${pkg.price}
                  {city.travel_fee > 0 && <span className={`text-sm font-normal ${pkg.popular ? 'text-slate-700' : 'text-slate-400'}`}> + ${city.travel_fee} travel</span>}
                </div>
                <ul className="space-y-2 mb-6">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      <CheckCircle className={`w-4 h-4 flex-shrink-0 ${pkg.popular ? 'text-[#0f172a]' : 'text-amber-400'}`} />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/book?city=${params.slug}`}
                  className={`block text-center py-3 rounded-xl font-semibold text-sm transition-colors ${
                    pkg.popular
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

      {/* Reviews */}
      {reviews && reviews.length > 0 && (
        <section className="py-16 px-4 bg-slate-900">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center">Customer Reviews in {city.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {reviews.map((review) => (
                <div key={review.id} className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed">{review.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQs */}
      <section className="py-16 px-4 bg-[#0f172a]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">FAQs for {city.name}</h2>
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

      {/* Nearby Areas */}
      {nearby.length > 0 && (
        <section className="py-16 px-4 bg-slate-900">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Also Serving Nearby Areas</h2>
            <p className="text-slate-400 mb-8">Our {city.name} team services these surrounding communities</p>
            <div className="flex flex-wrap justify-center gap-3">
              {nearby.map((area) => (
                <span key={area} className="bg-slate-800 border border-slate-700 text-slate-300 px-4 py-2 rounded-full text-sm">
                  <MapPin className="inline w-3.5 h-3.5 text-amber-400 mr-1" />
                  {area}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 px-4 bg-amber-400">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-[#0f172a] mb-3">Ready to Book in {city.name}?</h2>
          <p className="text-slate-700 mb-6">Book your detail in under 5 minutes. We come to you.</p>
          <Link
            href={`/book?city=${params.slug}`}
            className="inline-flex items-center px-8 py-4 bg-[#0f172a] hover:bg-slate-800 text-amber-400 font-bold rounded-xl transition-colors"
          >
            Book Now in {city.name}
          </Link>
        </div>
      </section>
    </div>
  )
}
