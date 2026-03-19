import Link from 'next/link'
import { CheckCircle, Calendar, MapPin, Phone } from 'lucide-react'

export default async function BookingConfirmationPage({
  searchParams,
}: {
  searchParams: Promise<{ booking_id?: string }>
}) {
  const { booking_id: bookingId } = await searchParams

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center px-4 py-16">
      <div className="max-w-lg w-full text-center">
        <div className="mb-6 flex justify-center">
          <div className="w-20 h-20 bg-green-500/10 border-2 border-green-500 rounded-full flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-green-400" />
          </div>
        </div>

        <h1 className="text-3xl font-extrabold text-white mb-3">Booking Confirmed!</h1>
        <p className="text-slate-400 text-lg mb-8">
          Your mobile detail is booked. We&apos;ll send a confirmation text with your appointment details.
        </p>

        {bookingId && (
          <div className="bg-slate-800 rounded-xl p-4 border border-slate-700 mb-8 text-left">
            <p className="text-slate-400 text-sm">Booking Reference</p>
            <p className="text-white font-mono font-semibold text-lg">{bookingId.slice(0, 8).toUpperCase()}</p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
            <CheckCircle className="w-6 h-6 text-green-400 mx-auto mb-2" />
            <p className="text-sm text-slate-300 font-medium">Payment Received</p>
          </div>
          <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
            <Phone className="w-6 h-6 text-amber-400 mx-auto mb-2" />
            <p className="text-sm text-slate-300 font-medium">SMS Sent</p>
          </div>
          <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
            <Calendar className="w-6 h-6 text-blue-400 mx-auto mb-2" />
            <p className="text-sm text-slate-300 font-medium">Slot Reserved</p>
          </div>
        </div>

        <div className="bg-amber-400/10 border border-amber-400/30 rounded-xl p-5 mb-8 text-left">
          <h3 className="text-amber-400 font-semibold mb-2">What happens next?</h3>
          <ul className="space-y-2 text-slate-300 text-sm">
            <li className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
              Your detailer will arrive at your specified location at the scheduled time.
            </li>
            <li className="flex items-start gap-2">
              <Phone className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
              You&apos;ll receive a reminder text 24 hours before your appointment.
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
              After the detail is complete, you&apos;ll receive a satisfaction survey.
            </li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl transition-colors border border-slate-600"
          >
            Back to Home
          </Link>
          <Link
            href="/book"
            className="px-6 py-3 bg-amber-400 hover:bg-amber-500 text-[#0f172a] font-bold rounded-xl transition-colors"
          >
            Book Another Vehicle
          </Link>
        </div>
      </div>
    </div>
  )
}
