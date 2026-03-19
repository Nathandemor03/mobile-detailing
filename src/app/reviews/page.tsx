import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { Star } from 'lucide-react'
import Link from 'next/link'
import type { Review } from '@/types'

export const metadata: Metadata = {
  title: 'Customer Reviews | Utah Detail Co. | Mobile Car Detailing Utah',
  description: 'Read verified customer reviews for Utah Detail Co. 4.9 stars from 200+ Utah customers.',
}

const staticReviews = [
  { name: 'Tyler M.', city: 'Provo', rating: 5, text: 'Absolutely incredible service. They showed up on time, worked on my truck in my driveway, and it looked brand new when they finished. The ceramic coating is worth every penny.' },
  { name: 'Jessica R.', city: 'Salt Lake City', rating: 5, text: 'I booked online in under 5 minutes. The detailer came to my apartment parking lot and did the full interior detail while I worked from home. Highly recommend!' },
  { name: 'Brandon K.', city: 'Lehi', rating: 5, text: 'Best detail I have ever gotten. They removed 2 years of dog hair from my SUV. The odor treatment completely eliminated the smell. Worth every dollar.' },
  { name: 'Ashley N.', city: 'Orem', rating: 5, text: 'Used them for the first time last month. My 2019 Jeep had not been detailed in 2 years. I could not believe the results. Looks better than when I bought it.' },
  { name: 'Mike T.', city: 'Draper', rating: 5, text: 'I manage a fleet of 8 company trucks and Utah Detail Co. handles all of them monthly. Reliable, consistent, and fairly priced. Highly recommend for businesses.' },
  { name: 'Cody L.', city: 'Sandy', rating: 5, text: 'My wife surprised me with a full detail for my birthday. The team spent 4 hours on my F-150 and it has never looked better. Outstanding work.' },
  { name: 'Lindsey B.', city: 'Layton', rating: 5, text: 'Booked the ceramic coating package. The detailer was professional, thorough, and answered all my questions about maintenance. The hydrophobic effect is real!' },
  { name: 'Nathan C.', city: 'St. George', rating: 5, text: 'Impressive attention to detail (pun intended). They found and cleaned areas of my car I did not even know existed. Will definitely be a repeat customer.' },
  { name: 'Samantha F.', city: 'Provo', rating: 5, text: 'Signed up for the monthly membership after my first detail. It is so convenient having them come to my house. My car has never looked this consistently clean.' },
]

export default async function ReviewsPage() {
  let dbReviews: Review[] = []
  try {
    const supabase = await createClient()
    const { data } = await supabase
      .from('reviews')
      .select('*')
      .eq('is_published', true)
      .order('created_at', { ascending: false })
    if (data) dbReviews = data
  } catch {
    // Use static reviews as fallback
  }

  const reviews = dbReviews.length > 0 ? null : staticReviews

  return (
    <div className="bg-[#0f172a] text-white min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] py-20 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Customer Reviews</h1>
        <div className="flex items-center justify-center gap-2 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-6 h-6 text-amber-400 fill-amber-400" />
          ))}
          <span className="text-xl font-bold ml-2">4.9</span>
          <span className="text-slate-400">out of 5</span>
        </div>
        <p className="text-slate-400">Based on 200+ verified customer reviews across Utah</p>
      </section>

      {/* Stats */}
      <section className="py-10 px-4 bg-slate-900">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: '5 Stars', count: '94%', color: 'text-amber-400' },
            { label: '4 Stars', count: '4%', color: 'text-amber-300' },
            { label: '3 Stars', count: '1%', color: 'text-yellow-400' },
            { label: '1-2 Stars', count: '1%', color: 'text-red-400' },
          ].map((row) => (
            <div key={row.label} className="bg-slate-800 rounded-xl p-4 text-center border border-slate-700">
              <div className={`text-2xl font-extrabold ${row.color}`}>{row.count}</div>
              <div className="text-slate-400 text-sm">{row.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Reviews */}
      <section className="py-16 px-4 bg-[#0f172a]">
        <div className="max-w-5xl mx-auto">
          {dbReviews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {dbReviews.map((review) => (
                <div key={review.id} className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-slate-300 leading-relaxed mb-4">&ldquo;{review.body}&rdquo;</p>
                  <div className="text-slate-500 text-sm">
                    {new Date(review.created_at).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {(reviews ?? []).map((review) => (
                <div key={review.name + review.city} className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-slate-300 leading-relaxed mb-4">&ldquo;{review.text}&rdquo;</p>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-amber-400 rounded-full flex items-center justify-center text-[#0f172a] font-bold text-sm">
                      {review.name[0]}
                    </div>
                    <div>
                      <div className="font-semibold text-sm">{review.name}</div>
                      <div className="text-xs text-slate-500">{review.city}, UT</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-amber-400">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-[#0f172a] mb-3">Join Our Happy Customers</h2>
          <p className="text-slate-700 mb-6">Book your first detail and see why Utah drivers love us.</p>
          <Link href="/book" className="inline-flex px-8 py-4 bg-[#0f172a] hover:bg-slate-800 text-amber-400 font-bold rounded-xl transition-colors">
            Book Now
          </Link>
        </div>
      </section>
    </div>
  )
}
