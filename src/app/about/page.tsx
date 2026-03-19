import type { Metadata } from 'next'
import Link from 'next/link'
import { Shield, Star, Clock, Heart } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About Utah Detail Co. | Utah Mobile Car Detailing',
  description: 'Learn about Utah Detail Co. — Utah\'s premier mobile car detailing company. Our story, team, and values.',
}

const values = [
  {
    icon: <Star className="w-7 h-7 text-amber-400" />,
    title: 'Excellence in Every Detail',
    desc: 'We treat every vehicle as if it were our own. No shortcuts, no rushing, no cutting corners.',
  },
  {
    icon: <Clock className="w-7 h-7 text-amber-400" />,
    title: 'Respect for Your Time',
    desc: 'We show up when we say we will. Your schedule is valuable, and we honor it.',
  },
  {
    icon: <Shield className="w-7 h-7 text-amber-400" />,
    title: 'Accountability',
    desc: 'If something is not right, we make it right. Our satisfaction guarantee is unconditional.',
  },
  {
    icon: <Heart className="w-7 h-7 text-amber-400" />,
    title: 'Community First',
    desc: 'We are Utah people serving Utah people. We give back to the communities that support us.',
  },
]

const team = [
  { name: 'Jake Thompson', role: 'Founder & Lead Detailer', city: 'Provo', bio: 'Started Utah Detail Co. in 2018 with a single van and a passion for clean cars. Jake has personally detailed over 2,000 vehicles.' },
  { name: 'Maria Santos', role: 'Operations Manager', city: 'Orem', bio: 'Maria oversees scheduling, customer experience, and technician training. She ensures every job meets our quality standard.' },
  { name: 'Derek Olsen', role: 'Senior Detailer', city: 'Salt Lake City', bio: 'Certified ceramic coating specialist with 6 years of professional detailing experience. Derek handles our most complex jobs.' },
  { name: 'Tyler Buxton', role: 'Fleet Account Manager', city: 'Lehi', bio: 'Tyler manages our commercial fleet accounts and helps businesses keep their vehicles professionally maintained.' },
]

export default function AboutPage() {
  return (
    <div className="bg-[#0f172a] text-white min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] py-20 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">About Utah Detail Co.</h1>
        <p className="text-xl text-slate-300 max-w-2xl mx-auto">
          Utah&apos;s premier mobile car detailing company. Born in Provo, serving the whole state.
        </p>
      </section>

      {/* Our Story */}
      <section className="py-16 px-4 bg-slate-900">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl font-bold mb-4">Our Story</h2>
              <div className="space-y-4 text-slate-300 leading-relaxed">
                <p>
                  Utah Detail Co. was founded in 2018 by Jake Thompson, a Provo native who was tired of driving his car to a shop, waiting around for hours, and getting mediocre results. He believed there had to be a better way.
                </p>
                <p>
                  With a used van, a pressure washer, and a genuine passion for clean cars, Jake started offering mobile detailing to his neighbors in Provo. Word spread fast. Within a year, he had expanded to Orem and hired his first employee.
                </p>
                <p>
                  Today, Utah Detail Co. serves 8 cities across Utah with a team of 12 certified technicians, a fleet of fully-equipped vans, and thousands of happy customers. We have completed over 10,000 details and maintained a 4.9-star rating throughout.
                </p>
                <p>
                  Our mission has never changed: bring professional-quality detailing directly to Utah drivers, with transparency, accountability, and respect for your time.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { number: '10,000+', label: 'Vehicles Detailed' },
                { number: '4.9★', label: 'Average Rating' },
                { number: '8', label: 'Cities Served' },
                { number: '2018', label: 'Founded' },
              ].map((stat) => (
                <div key={stat.label} className="bg-slate-800 rounded-2xl p-6 text-center border border-slate-700">
                  <div className="text-3xl font-extrabold text-amber-400">{stat.number}</div>
                  <div className="text-slate-400 text-sm mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 px-4 bg-[#0f172a]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold mb-10 text-center">Our Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map((value) => (
              <div key={value.title} className="flex gap-4 bg-slate-800 rounded-xl p-6 border border-slate-700">
                <div className="flex-shrink-0">{value.icon}</div>
                <div>
                  <h3 className="font-bold text-lg mb-2">{value.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{value.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 px-4 bg-slate-900">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold mb-10 text-center">Meet the Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {team.map((member) => (
              <div key={member.name} className="bg-slate-800 rounded-2xl p-6 border border-slate-700 text-center">
                <div className="w-16 h-16 bg-amber-400 rounded-full flex items-center justify-center text-[#0f172a] font-extrabold text-2xl mx-auto mb-4">
                  {member.name[0]}
                </div>
                <h3 className="font-bold text-white">{member.name}</h3>
                <div className="text-amber-400 text-sm font-medium mb-1">{member.role}</div>
                <div className="text-slate-500 text-xs mb-3">{member.city}, UT</div>
                <p className="text-slate-400 text-xs leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 px-4 bg-[#0f172a]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-6">Why Utahns Choose Us</h2>
          <div className="space-y-3 text-left">
            {[
              'Every technician is background-checked, trained, and certified',
              'We carry full liability insurance on every job',
              'We use only professional-grade, paint-safe products',
              'Transparent pricing — what you see is what you pay',
              'Unconditional satisfaction guarantee',
              'We give back to Utah communities through our local charity program',
            ].map((point) => (
              <div key={point} className="flex items-center gap-3 bg-slate-800 rounded-xl px-5 py-3.5 border border-slate-700">
                <div className="w-2 h-2 rounded-full bg-amber-400 flex-shrink-0" />
                <span className="text-slate-300">{point}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-amber-400">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-[#0f172a] mb-3">Experience the Difference</h2>
          <p className="text-slate-700 mb-6">Join thousands of satisfied Utah drivers who trust us with their vehicles.</p>
          <Link href="/book" className="inline-flex px-8 py-4 bg-[#0f172a] hover:bg-slate-800 text-amber-400 font-bold rounded-xl transition-colors">
            Book Your First Detail
          </Link>
        </div>
      </section>
    </div>
  )
}
