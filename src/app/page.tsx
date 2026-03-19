'use client'

import Link from 'next/link'
import { useState } from 'react'
import { CheckCircle, ChevronDown, ChevronUp, Star, MapPin, Clock, Shield, Sparkles, Car, Zap } from 'lucide-react'

const cities = [
  { name: 'Provo', slug: 'provo', desc: 'Utah County hub' },
  { name: 'Orem', slug: 'orem', desc: 'Same-day available' },
  { name: 'Lehi', slug: 'lehi', desc: 'Silicon Slopes' },
  { name: 'Salt Lake City', slug: 'salt-lake-city', desc: 'Capital city' },
  { name: 'Draper', slug: 'draper', desc: 'South Valley' },
  { name: 'Sandy', slug: 'sandy', desc: 'Salt Lake County' },
  { name: 'St. George', slug: 'st-george', desc: 'Southern Utah' },
  { name: 'Layton', slug: 'layton', desc: 'Davis County' },
]

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

const reviews = [
  {
    name: 'Tyler M.',
    city: 'Provo',
    rating: 5,
    text: 'Absolutely incredible service. They showed up on time, worked on my truck in my driveway, and it looked brand new when they finished. The ceramic coating is worth every penny.',
  },
  {
    name: 'Jessica R.',
    city: 'Salt Lake City',
    rating: 5,
    text: 'I booked online in under 5 minutes. The detailer came to my apartment parking lot and did the full interior detail while I worked from home. Highly recommend!',
  },
  {
    name: 'Brandon K.',
    city: 'Lehi',
    rating: 5,
    text: 'Best detail I have ever gotten. They removed 2 years of dog hair from my SUV. The odor treatment completely eliminated the smell. Worth every dollar.',
  },
]

const faqs = [
  {
    q: 'Do you need access to water and electricity?',
    a: 'Yes, we ask that you provide access to an outdoor water spigot and a standard 110V outlet within 100 feet of your vehicle. We bring all our own equipment, supplies, and hoses.',
  },
  {
    q: 'How long does a detail take?',
    a: 'A Basic Wash takes 1–1.5 hours. A Full Detail typically takes 3–4 hours. A Premium Ceramic package can take 5–7 hours depending on the vehicle size and paint condition.',
  },
  {
    q: 'What areas in Utah do you serve?',
    a: 'We currently serve Provo, Orem, Lehi, Salt Lake City, Draper, Sandy, St. George, and Layton — plus surrounding areas. Enter your address at booking to confirm coverage.',
  },
  {
    q: 'Can I book same-day service?',
    a: 'Same-day bookings are available based on technician availability. We recommend booking at least 24 hours in advance to guarantee your preferred time slot.',
  },
  {
    q: 'What is your cancellation policy?',
    a: 'You can cancel or reschedule for free up to 24 hours before your appointment. Cancellations within 24 hours may incur a $25 fee.',
  },
]

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-slate-700 rounded-lg overflow-hidden">
      <button
        className="w-full flex items-center justify-between px-5 py-4 text-left bg-slate-800 hover:bg-slate-700 transition-colors"
        onClick={() => setOpen(!open)}
      >
        <span className="font-medium text-white">{q}</span>
        {open ? <ChevronUp className="w-5 h-5 text-amber-400 flex-shrink-0" /> : <ChevronDown className="w-5 h-5 text-amber-400 flex-shrink-0" />}
      </button>
      {open && (
        <div className="px-5 py-4 bg-slate-900 text-slate-300 text-sm leading-relaxed">
          {a}
        </div>
      )}
    </div>
  )
}

export default function HomePage() {
  return (
    <div className="bg-[#0f172a] text-white min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden py-24 md:py-36 px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a]" />
        <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(circle at 30% 50%, #f59e0b 0%, transparent 50%), radial-gradient(circle at 70% 20%, #3b82f6 0%, transparent 40%)'}} />
        <div className="relative max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-amber-400/10 border border-amber-400/30 rounded-full px-4 py-1.5 text-amber-400 text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            Utah&apos;s #1 Mobile Detailing Service
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
            Mobile Car Detailing in Utah —{' '}
            <span className="text-amber-400">We Come to You</span>
          </h1>
          <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            Professional detailing at your home, office, or apartment. No more driving to a shop — book online in minutes and we handle the rest.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/book"
              className="px-8 py-4 bg-amber-400 hover:bg-amber-500 text-[#0f172a] font-bold rounded-xl text-lg transition-colors shadow-lg shadow-amber-400/20"
            >
              Book Now
            </Link>
            <Link
              href="/pricing"
              className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-lg transition-colors border border-slate-600"
            >
              Get a Quote
            </Link>
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm text-slate-400">
            <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-green-400" /> Fully insured</span>
            <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-green-400" /> Online booking</span>
            <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-green-400" /> 5-star rated</span>
            <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-green-400" /> Same-day available</span>
          </div>
        </div>
      </section>

      {/* Cities Grid */}
      <section className="py-16 px-4 bg-slate-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-3">Serving All of Utah</h2>
            <p className="text-slate-400">Select your city to see local availability and pricing</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {cities.map((city) => (
              <Link
                key={city.slug}
                href={`/mobile-detailing-${city.slug}`}
                className="group bg-slate-800 hover:bg-amber-400 border border-slate-700 hover:border-amber-400 rounded-xl p-5 text-center transition-all duration-200"
              >
                <MapPin className="w-6 h-6 text-amber-400 group-hover:text-[#0f172a] mx-auto mb-2 transition-colors" />
                <div className="font-semibold text-white group-hover:text-[#0f172a] transition-colors">{city.name}</div>
                <div className="text-xs text-slate-400 group-hover:text-slate-700 mt-1 transition-colors">{city.desc}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 bg-[#0f172a]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">How It Works</h2>
            <p className="text-slate-400">Three simple steps to a spotless vehicle</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap className="w-8 h-8 text-amber-400" />,
                step: '01',
                title: 'Book Online',
                desc: 'Choose your service, pick a date and time, and enter your location. Takes less than 5 minutes.',
              },
              {
                icon: <Car className="w-8 h-8 text-amber-400" />,
                step: '02',
                title: 'We Come to You',
                desc: 'Our certified detailer arrives at your home, office, or anywhere convenient with all equipment.',
              },
              {
                icon: <Sparkles className="w-8 h-8 text-amber-400" />,
                step: '03',
                title: 'Drive Away Clean',
                desc: "Sit back and relax while we work. Your vehicle will look showroom-ready when we're done.",
              },
            ].map((step) => (
              <div key={step.step} className="relative bg-slate-800 rounded-2xl p-8 text-center border border-slate-700">
                <div className="absolute top-4 right-4 text-5xl font-extrabold text-slate-700/50 select-none">{step.step}</div>
                <div className="mb-4 flex justify-center">{step.icon}</div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-16 px-4 bg-slate-900">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Simple, Transparent Pricing</h2>
            <p className="text-slate-400">No hidden fees. No surprises. Just a clean car.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {packages.map((pkg) => (
              <div
                key={pkg.name}
                className={`relative rounded-2xl p-8 border transition-all ${
                  pkg.highlight
                    ? 'bg-amber-400 border-amber-400 text-[#0f172a]'
                    : 'bg-slate-800 border-slate-700 text-white'
                }`}
              >
                {pkg.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#0f172a] text-amber-400 text-xs font-bold px-3 py-1 rounded-full border border-amber-400">
                    Most Popular
                  </div>
                )}
                <div className="mb-4">
                  <h3 className="text-xl font-bold">{pkg.name}</h3>
                  <p className={`text-sm mt-1 ${pkg.highlight ? 'text-slate-700' : 'text-slate-400'}`}>{pkg.description}</p>
                </div>
                <div className="text-4xl font-extrabold mb-6">
                  ${pkg.price}
                  <span className={`text-base font-normal ${pkg.highlight ? 'text-slate-700' : 'text-slate-400'}`}> starting</span>
                </div>
                <ul className="space-y-2.5 mb-8">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <CheckCircle className={`w-4 h-4 mt-0.5 flex-shrink-0 ${pkg.highlight ? 'text-[#0f172a]' : 'text-amber-400'}`} />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/book"
                  className={`block text-center px-6 py-3 rounded-xl font-semibold text-sm transition-colors ${
                    pkg.highlight
                      ? 'bg-[#0f172a] text-amber-400 hover:bg-slate-800'
                      : 'bg-amber-400 text-[#0f172a] hover:bg-amber-500'
                  }`}
                >
                  Book This Package
                </Link>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/pricing" className="text-amber-400 hover:text-amber-300 text-sm font-medium underline underline-offset-4">
              View full pricing including add-ons
            </Link>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-16 px-4 bg-[#0f172a]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">What Our Customers Say</h2>
            <div className="flex items-center justify-center gap-1 mt-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
              ))}
              <span className="ml-2 text-slate-400 text-sm">4.9 out of 5 (200+ reviews)</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((review) => (
              <div key={review.name} className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-slate-300 text-sm leading-relaxed mb-4">&ldquo;{review.text}&rdquo;</p>
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
          <div className="text-center mt-8">
            <Link href="/reviews" className="text-amber-400 hover:text-amber-300 text-sm font-medium underline underline-offset-4">
              Read all reviews
            </Link>
          </div>
        </div>
      </section>

      {/* Before/After */}
      <section className="py-16 px-4 bg-slate-900">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">See the Difference</h2>
            <p className="text-slate-400">Real results from real customers across Utah</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative rounded-2xl overflow-hidden h-64 bg-gradient-to-br from-slate-700 to-slate-800 border border-slate-600 flex items-center justify-center">
              <div className="absolute top-4 left-4 bg-red-500/80 text-white text-xs font-bold px-3 py-1 rounded-full">BEFORE</div>
              <div className="text-center text-slate-500">
                <Car className="w-16 h-16 mx-auto mb-2 opacity-30" />
                <p className="text-sm">Dirty, oxidized exterior</p>
                <p className="text-xs mt-1 opacity-60">Interior covered in pet hair &amp; grime</p>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden h-64 bg-gradient-to-br from-amber-900/30 to-slate-800 border border-amber-400/30 flex items-center justify-center">
              <div className="absolute top-4 left-4 bg-green-500/80 text-white text-xs font-bold px-3 py-1 rounded-full">AFTER</div>
              <div className="text-center text-slate-300">
                <Sparkles className="w-16 h-16 mx-auto mb-2 text-amber-400 opacity-60" />
                <p className="text-sm">Showroom-clean finish</p>
                <p className="text-xs mt-1 opacity-60">Ceramic coated &amp; protected</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="py-16 px-4 bg-[#0f172a]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Why Utah Chooses Us</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { icon: <Shield className="w-6 h-6 text-amber-400" />, title: 'Fully Insured', desc: 'Every detailer is background-checked and insured for your peace of mind.' },
              { icon: <Clock className="w-6 h-6 text-amber-400" />, title: 'On-Time Guarantee', desc: 'We show up when we say we will, or your next service is discounted.' },
              { icon: <CheckCircle className="w-6 h-6 text-amber-400" />, title: 'Satisfaction Guarantee', desc: 'Not happy? We come back and fix it for free. No questions asked.' },
              { icon: <Zap className="w-6 h-6 text-amber-400" />, title: 'Easy Online Booking', desc: 'Book in under 5 minutes. Get a confirmation text instantly.' },
              { icon: <MapPin className="w-6 h-6 text-amber-400" />, title: 'We Come to You', desc: 'Your home, office, gym — anywhere your car is parked works for us.' },
              { icon: <Star className="w-6 h-6 text-amber-400" />, title: 'Pro-Grade Products', desc: 'We use only professional-grade chemicals and tools. No shortcuts.' },
            ].map((item) => (
              <div key={item.title} className="flex gap-4 bg-slate-800 rounded-xl p-5 border border-slate-700">
                <div className="flex-shrink-0 mt-0.5">{item.icon}</div>
                <div>
                  <h3 className="font-semibold mb-1">{item.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 bg-slate-900">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-3">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq) => (
              <FAQItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 bg-amber-400">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0f172a] mb-4">
            Ready for a Clean Car?
          </h2>
          <p className="text-slate-700 text-lg mb-8">
            Book your mobile detail in under 5 minutes. We&apos;ll handle the rest.
          </p>
          <Link
            href="/book"
            className="inline-flex items-center px-10 py-4 bg-[#0f172a] hover:bg-slate-800 text-amber-400 font-bold rounded-xl text-lg transition-colors shadow-xl"
          >
            Book Now — It&apos;s Fast &amp; Easy
          </Link>
        </div>
      </section>
    </div>
  )
}
