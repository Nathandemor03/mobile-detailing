import Link from 'next/link'
import { Sparkles, Phone, Mail, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-[#0f172a] border-t border-[#1e2d45] text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 text-white font-bold text-xl mb-3">
              <Sparkles className="text-amber-400 w-5 h-5" />
              <span><span className="text-amber-400">Utah</span> Detail Co.</span>
            </Link>
            <p className="text-sm leading-relaxed">
              Professional mobile car detailing across Utah. We come to your home, office, or anywhere you need us.
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-3">Services</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/services/interior-detailing" className="hover:text-amber-400 transition-colors">Interior Detailing</Link></li>
              <li><Link href="/services/exterior-wash-wax" className="hover:text-amber-400 transition-colors">Exterior Wash & Wax</Link></li>
              <li><Link href="/services/full-detail" className="hover:text-amber-400 transition-colors">Full Detail</Link></li>
              <li><Link href="/services/ceramic-coating" className="hover:text-amber-400 transition-colors">Ceramic Coating</Link></li>
              <li><Link href="/services/fleet-vehicles" className="hover:text-amber-400 transition-colors">Fleet Vehicles</Link></li>
              <li><Link href="/services/membership-plans" className="hover:text-amber-400 transition-colors">Membership Plans</Link></li>
            </ul>
          </div>

          {/* Locations */}
          <div>
            <h3 className="text-white font-semibold mb-3">Service Areas</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/mobile-detailing-provo" className="hover:text-amber-400 transition-colors">Provo</Link></li>
              <li><Link href="/mobile-detailing-orem" className="hover:text-amber-400 transition-colors">Orem</Link></li>
              <li><Link href="/mobile-detailing-lehi" className="hover:text-amber-400 transition-colors">Lehi</Link></li>
              <li><Link href="/mobile-detailing-salt-lake-city" className="hover:text-amber-400 transition-colors">Salt Lake City</Link></li>
              <li><Link href="/mobile-detailing-draper" className="hover:text-amber-400 transition-colors">Draper</Link></li>
              <li><Link href="/mobile-detailing-sandy" className="hover:text-amber-400 transition-colors">Sandy</Link></li>
              <li><Link href="/mobile-detailing-st-george" className="hover:text-amber-400 transition-colors">St. George</Link></li>
              <li><Link href="/mobile-detailing-layton" className="hover:text-amber-400 transition-colors">Layton</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-3">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <a href="tel:+18015550100" className="hover:text-amber-400 transition-colors">(801) 555-0100</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <a href="mailto:hello@utahdetailco.com" className="hover:text-amber-400 transition-colors">hello@utahdetailco.com</a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <span>Serving Utah County, Salt Lake County & Southern Utah</span>
              </li>
            </ul>
            <div className="mt-4">
              <Link
                href="/book"
                className="inline-flex items-center px-4 py-2 bg-amber-400 hover:bg-amber-500 text-[#0f172a] font-semibold rounded-lg text-sm transition-colors"
              >
                Book Now
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-[#1e2d45] mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-sm">
          <p>&copy; {new Date().getFullYear()} Utah Detail Co. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/pricing" className="hover:text-amber-400 transition-colors">Pricing</Link>
            <Link href="/about" className="hover:text-amber-400 transition-colors">About</Link>
            <Link href="/contact" className="hover:text-amber-400 transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
