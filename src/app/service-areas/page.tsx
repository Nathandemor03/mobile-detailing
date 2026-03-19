import type { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, CheckCircle } from 'lucide-react'
import ServiceAreaMap from '@/components/ServiceAreaMap'

export const metadata: Metadata = {
  title: 'Mobile Detailing Service Areas in Utah | Utah Detail Co.',
  description: 'Utah Detail Co. serves Provo, Orem, Lehi, Salt Lake City, Draper, Sandy, St. George, and Layton with professional mobile car detailing.',
}

const cities = [
  {
    name: 'Provo',
    slug: 'provo',
    county: 'Utah County',
    zipCodes: ['84601', '84602', '84603', '84604'],
    travelFee: 0,
    description: 'Our home base. No travel fee for all of Provo. Same-day appointments often available.',
    highlights: ['Downtown Provo', 'BYU Campus', 'East Bay', 'Joaquin'],
  },
  {
    name: 'Orem',
    slug: 'orem',
    county: 'Utah County',
    zipCodes: ['84057', '84058', '84059', '84097'],
    travelFee: 0,
    description: 'No travel fee. Serving all of Orem including University Mall area and North Orem.',
    highlights: ['North Orem', 'University Parkway', 'Geneva Road', 'Center Street'],
  },
  {
    name: 'Lehi',
    slug: 'lehi',
    county: 'Utah County',
    zipCodes: ['84043', '84045'],
    travelFee: 15,
    description: 'Serving Silicon Slopes and all of Lehi. Perfect for getting your car detailed at the office.',
    highlights: ['Silicon Slopes', 'Thanksgiving Point', 'North Point', 'Traverse Mountain'],
  },
  {
    name: 'Salt Lake City',
    slug: 'salt-lake-city',
    county: 'Salt Lake County',
    zipCodes: ['84101', '84103', '84105', '84107', '84108', '84109', '84116', '84118', '84120'],
    travelFee: 20,
    description: 'Full SLC coverage including downtown, Sugar House, Avenues, and West Side.',
    highlights: ['Downtown SLC', 'Sugar House', 'The Avenues', 'West Valley'],
  },
  {
    name: 'Draper',
    slug: 'draper',
    county: 'Salt Lake County',
    zipCodes: ['84020', '84065'],
    travelFee: 15,
    description: 'Serving Draper, South Jordan, and Riverton corridor.',
    highlights: ['South Draper', 'Corner Canyon', 'Draper City Center', 'Suncrest'],
  },
  {
    name: 'Sandy',
    slug: 'sandy',
    county: 'Salt Lake County',
    zipCodes: ['84070', '84092', '84093', '84094'],
    travelFee: 15,
    description: 'All of Sandy including Dimple Dell, Alta Canyon, and the 9400 South corridor.',
    highlights: ['Alta Canyon', 'Dimple Dell', 'East Sandy', 'Midvale border'],
  },
  {
    name: 'Layton',
    slug: 'layton',
    county: 'Davis County',
    zipCodes: ['84040', '84041'],
    travelFee: 20,
    description: 'Serving Layton and surrounding Davis County communities.',
    highlights: ['East Layton', 'Layton Hills', 'Kaysville border', 'Clearfield border'],
  },
  {
    name: 'St. George',
    slug: 'st-george',
    county: 'Washington County',
    zipCodes: ['84770', '84771', '84790', '84791'],
    travelFee: 25,
    description: 'Southern Utah coverage. Perfect for snowbirds and full-time residents alike.',
    highlights: ['Downtown St. George', 'Washington City', 'Santa Clara', 'Ivins'],
  },
]

export default function ServiceAreasPage() {
  return (
    <div className="bg-[#0f172a] text-white min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] py-20 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Service Areas</h1>
        <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-6">
          We serve 8 cities across Utah with professional mobile detailing. Find your city below.
        </p>
        <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 text-green-400 px-4 py-2 rounded-full text-sm">
          <CheckCircle className="w-4 h-4" />
          Provo and Orem have no travel fee!
        </div>
      </section>

      {/* Interactive Map */}
      <section className="py-8 px-4 bg-slate-900">
        <div className="max-w-5xl mx-auto">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden" style={{ height: '400px' }}>
            <ServiceAreaMap />
          </div>
          <div className="flex gap-6 justify-center mt-4 text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-green-400 inline-block" />
              No travel fee
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-amber-400 inline-block" />
              Travel fee applies
            </div>
          </div>
        </div>
      </section>

      {/* City Cards */}
      <section className="py-16 px-4 bg-[#0f172a]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cities.map((city) => (
              <div key={city.slug} className="bg-slate-800 rounded-2xl p-6 border border-slate-700 hover:border-amber-400/50 transition-all">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <MapPin className="w-4 h-4 text-amber-400" />
                      <h2 className="font-bold text-xl">{city.name}</h2>
                    </div>
                    <div className="text-slate-400 text-sm">{city.county}</div>
                  </div>
                  <div className="text-right">
                    <div className={`text-lg font-bold ${city.travelFee === 0 ? 'text-green-400' : 'text-amber-400'}`}>
                      {city.travelFee === 0 ? 'Free' : `$${city.travelFee}`}
                    </div>
                    <div className="text-slate-500 text-xs">travel fee</div>
                  </div>
                </div>

                <p className="text-slate-300 text-sm mb-4">{city.description}</p>

                <div className="mb-4">
                  <div className="text-slate-500 text-xs mb-2">ZIP CODES SERVED</div>
                  <div className="flex flex-wrap gap-1.5">
                    {city.zipCodes.map((zip) => (
                      <span key={zip} className="bg-slate-700 text-slate-300 text-xs px-2 py-1 rounded">{zip}</span>
                    ))}
                    {city.zipCodes.length > 5 && <span className="text-slate-500 text-xs px-2 py-1">+more</span>}
                  </div>
                </div>

                <div className="flex gap-3">
                  <Link
                    href={`/mobile-detailing-${city.slug}`}
                    className="flex-1 text-center py-2.5 bg-slate-700 hover:bg-slate-600 text-white rounded-xl text-sm font-medium transition-colors"
                  >
                    View {city.name} Page
                  </Link>
                  <Link
                    href={`/book?city=${city.slug}`}
                    className="flex-1 text-center py-2.5 bg-amber-400 hover:bg-amber-500 text-[#0f172a] font-semibold rounded-xl text-sm transition-colors"
                  >
                    Book in {city.name}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Not Listed? */}
      <section className="py-16 px-4 bg-slate-900">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Don&apos;t See Your City?</h2>
          <p className="text-slate-400 mb-6 leading-relaxed">
            We are constantly expanding our service area across Utah. If your city is not listed, contact us — we may still be able to service you with an adjusted travel fee.
          </p>
          <Link
            href="/contact"
            className="inline-flex px-8 py-4 bg-amber-400 hover:bg-amber-500 text-[#0f172a] font-bold rounded-xl transition-colors"
          >
            Contact Us About Your Area
          </Link>
        </div>
      </section>
    </div>
  )
}
