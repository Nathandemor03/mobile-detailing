'use client'

import { useState, useEffect, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { createClient } from '@/lib/supabase/client'
import type { ServicePackage, AddOn } from '@/types'
import { CheckCircle, ChevronRight, Car, Truck, MapPin, Calendar, User, CreditCard } from 'lucide-react'
import { format, addDays, startOfDay } from 'date-fns'
import { useRouter } from 'next/navigation'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
})

type ContactForm = z.infer<typeof contactSchema>

const STEPS = [
  { id: 1, label: 'Address', icon: <MapPin className="w-4 h-4" /> },
  { id: 2, label: 'Vehicle', icon: <Car className="w-4 h-4" /> },
  { id: 3, label: 'Package', icon: <CheckCircle className="w-4 h-4" /> },
  { id: 4, label: 'Add-ons', icon: <ChevronRight className="w-4 h-4" /> },
  { id: 5, label: 'Date & Time', icon: <Calendar className="w-4 h-4" /> },
  { id: 6, label: 'Contact', icon: <User className="w-4 h-4" /> },
  { id: 7, label: 'Payment', icon: <CreditCard className="w-4 h-4" /> },
]

const VEHICLE_TYPES = [
  { value: 'sedan', label: 'Sedan', icon: '🚗' },
  { value: 'suv', label: 'SUV', icon: '🚙' },
  { value: 'truck', label: 'Truck', icon: '🛻' },
  { value: 'van', label: 'Van', icon: '🚐' },
]

function generateTimeSlots() {
  const slots = []
  for (let hour = 8; hour <= 17; hour++) {
    const display = hour < 12
      ? `${hour}:00 AM`
      : hour === 12
        ? '12:00 PM'
        : `${hour - 12}:00 PM`
    slots.push({ value: `${hour.toString().padStart(2, '0')}:00`, display })
  }
  return slots
}

interface AddressValidationResult {
  serviced: boolean
  city_id: string | null
  travel_fee: number
  city_name: string
  message: string
}

interface PaymentStepProps {
  clientSecret: string
  bookingId: string
  totalPrice: number
  travelFee: number
  selectedPackage: ServicePackage | null
  selectedAddOns: AddOn[]
  onSuccess: () => void
}

function PaymentStep({ clientSecret, bookingId, totalPrice, travelFee, selectedPackage, selectedAddOns, onSuccess }: PaymentStepProps) {
  const stripe = useStripe()
  const elements = useElements()
  const [paying, setPaying] = useState(false)
  const [payError, setPayError] = useState('')
  const router = useRouter()

  async function handlePay() {
    if (!stripe || !elements) return
    setPaying(true)
    setPayError('')

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/book/confirmation?booking_id=${bookingId}`,
      },
    })

    if (error) {
      setPayError(error.message ?? 'Payment failed')
      setPaying(false)
    } else {
      onSuccess()
      router.push(`/book/confirmation?booking_id=${bookingId}`)
    }
  }

  const addOnsTotal = selectedAddOns.reduce((sum, a) => sum + a.price, 0)

  return (
    <div className="space-y-6">
      <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
        <h3 className="font-semibold text-white mb-4">Order Summary</h3>
        {selectedPackage && (
          <div className="flex justify-between text-sm mb-2">
            <span className="text-slate-300">{selectedPackage.name}</span>
            <span className="text-white font-medium">${selectedPackage.price}</span>
          </div>
        )}
        {selectedAddOns.map((addon) => (
          <div key={addon.id} className="flex justify-between text-sm mb-2">
            <span className="text-slate-300">{addon.name}</span>
            <span className="text-white font-medium">${addon.price}</span>
          </div>
        ))}
        {travelFee > 0 && (
          <div className="flex justify-between text-sm mb-2">
            <span className="text-slate-300">Travel fee</span>
            <span className="text-white font-medium">${travelFee}</span>
          </div>
        )}
        <div className="border-t border-slate-700 pt-3 mt-3 flex justify-between font-bold">
          <span className="text-white">Total</span>
          <span className="text-amber-400 text-lg">${totalPrice}</span>
        </div>
      </div>

      <PaymentElement />

      {payError && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg px-4 py-3 text-sm">
          {payError}
        </div>
      )}

      <button
        onClick={handlePay}
        disabled={paying || !stripe || !elements}
        className="w-full py-4 bg-amber-400 hover:bg-amber-500 disabled:opacity-50 text-[#0f172a] font-bold rounded-xl transition-colors text-lg"
      >
        {paying ? 'Processing...' : `Pay $${totalPrice}`}
      </button>
    </div>
  )
}

export default function BookPage() {
  const [step, setStep] = useState(1)
  const [address, setAddress] = useState('')
  const [zipCode, setZipCode] = useState('')
  const [addressValidation, setAddressValidation] = useState<AddressValidationResult | null>(null)
  const [validatingAddress, setValidatingAddress] = useState(false)
  const [vehicleType, setVehicleType] = useState('')
  const [packages, setPackages] = useState<ServicePackage[]>([])
  const [addOns, setAddOns] = useState<AddOn[]>([])
  const [selectedPackage, setSelectedPackage] = useState<ServicePackage | null>(null)
  const [selectedAddOnIds, setSelectedAddOnIds] = useState<string[]>([])
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState('')
  const [clientSecret, setClientSecret] = useState('')
  const [bookingId, setBookingId] = useState('')
  const [creatingBooking, setCreatingBooking] = useState(false)
  const [bookingError, setBookingError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactForm>({ resolver: zodResolver(contactSchema) })

  const loadPackagesAndAddons = useCallback(async () => {
    const supabase = createClient()
    const [pkgRes, addOnRes] = await Promise.all([
      supabase.from('service_packages').select('*').order('price'),
      supabase.from('add_ons').select('*').order('name'),
    ])
    if (pkgRes.data) setPackages(pkgRes.data)
    if (addOnRes.data) setAddOns(addOnRes.data)
  }, [])

  useEffect(() => {
    loadPackagesAndAddons()
  }, [loadPackagesAndAddons])

  async function validateAddress() {
    if (!zipCode.trim()) return
    setValidatingAddress(true)
    try {
      const res = await fetch('/api/validate-address', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address, zip_code: zipCode }),
      })
      const data = await res.json() as AddressValidationResult
      setAddressValidation(data)
    } catch {
      setAddressValidation({ serviced: false, city_id: null, travel_fee: 0, city_name: '', message: 'Error validating address.' })
    }
    setValidatingAddress(false)
  }

  function toggleAddOn(id: string) {
    setSelectedAddOnIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }

  const selectedAddOns = addOns.filter((a) => selectedAddOnIds.includes(a.id))
  const addOnsTotal = selectedAddOns.reduce((sum, a) => sum + a.price, 0)
  const travelFee = addressValidation?.travel_fee ?? 0
  const totalPrice = (selectedPackage?.price ?? 0) + addOnsTotal + travelFee

  const dateOptions = Array.from({ length: 14 }, (_, i) => addDays(startOfDay(new Date()), i + 1))
  const timeSlots = generateTimeSlots()

  async function handleContactSubmit(data: ContactForm) {
    setCreatingBooking(true)
    setBookingError('')

    const scheduledAt = selectedDate && selectedTime
      ? new Date(`${format(selectedDate, 'yyyy-MM-dd')}T${selectedTime}:00`).toISOString()
      : null

    try {
      const res = await fetch('/api/create-booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone,
          address,
          city_id: addressValidation?.city_id ?? null,
          vehicle_type: vehicleType,
          service_package_id: selectedPackage!.id,
          add_on_ids: selectedAddOnIds,
          scheduled_at: scheduledAt,
          total_price: totalPrice,
          travel_fee: travelFee,
        }),
      })
      const result = await res.json() as { booking_id?: string; client_secret?: string; error?: string }
      if (result.booking_id && result.client_secret) {
        setBookingId(result.booking_id)
        setClientSecret(result.client_secret)
        setStep(7)
      } else {
        setBookingError(result.error ?? 'Failed to create booking')
      }
    } catch {
      setBookingError('Network error. Please try again.')
    }
    setCreatingBooking(false)
  }

  function canProceed() {
    if (step === 1) return !!addressValidation?.serviced
    if (step === 2) return !!vehicleType
    if (step === 3) return !!selectedPackage
    if (step === 5) return !!selectedDate && !!selectedTime
    return true
  }

  return (
    <div className="min-h-screen bg-[#0f172a] py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Book Your Detail</h1>
          <p className="text-slate-400">Fast, easy online booking. We come to you.</p>
        </div>

        {/* Step Progress */}
        <div className="flex items-center justify-between mb-8 overflow-x-auto pb-2">
          {STEPS.map((s, idx) => (
            <div key={s.id} className="flex items-center">
              <div className={`flex flex-col items-center gap-1 ${step >= s.id ? 'opacity-100' : 'opacity-40'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                  step > s.id ? 'bg-green-500 text-white' : step === s.id ? 'bg-amber-400 text-[#0f172a]' : 'bg-slate-700 text-slate-400'
                }`}>
                  {step > s.id ? <CheckCircle className="w-4 h-4" /> : s.id}
                </div>
                <span className="text-xs text-slate-400 hidden sm:block whitespace-nowrap">{s.label}</span>
              </div>
              {idx < STEPS.length - 1 && (
                <div className={`h-px w-6 sm:w-10 mx-1 transition-colors ${step > s.id ? 'bg-green-500' : 'bg-slate-700'}`} />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">

          {/* Step 1: Address */}
          {step === 1 && (
            <div>
              <h2 className="text-xl font-bold text-white mb-1">Enter Your Address</h2>
              <p className="text-slate-400 text-sm mb-6">We need to confirm we service your area</p>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1.5">Street Address</label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="123 Main St, Provo, UT"
                    className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1.5">ZIP Code</label>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
                      placeholder="84601"
                      maxLength={5}
                      className="flex-1 bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
                    />
                    <button
                      onClick={validateAddress}
                      disabled={validatingAddress || zipCode.length < 5}
                      className="px-6 py-3 bg-amber-400 hover:bg-amber-500 disabled:opacity-50 text-[#0f172a] font-semibold rounded-lg transition-colors"
                    >
                      {validatingAddress ? 'Checking...' : 'Check'}
                    </button>
                  </div>
                </div>

                {addressValidation && (
                  <div className={`rounded-lg px-4 py-3 text-sm font-medium ${
                    addressValidation.serviced
                      ? 'bg-green-500/10 border border-green-500/30 text-green-400'
                      : 'bg-red-500/10 border border-red-500/30 text-red-400'
                  }`}>
                    {addressValidation.serviced ? '✓ ' : '✗ '}{addressValidation.message}
                    {addressValidation.serviced && addressValidation.travel_fee > 0 && (
                      <span className="ml-2 text-slate-400">(${addressValidation.travel_fee} travel fee applies)</span>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 2: Vehicle Type */}
          {step === 2 && (
            <div>
              <h2 className="text-xl font-bold text-white mb-1">Select Vehicle Type</h2>
              <p className="text-slate-400 text-sm mb-6">Vehicle size may affect service time</p>
              <div className="grid grid-cols-2 gap-4">
                {VEHICLE_TYPES.map((v) => (
                  <button
                    key={v.value}
                    onClick={() => setVehicleType(v.value)}
                    className={`p-6 rounded-xl border-2 text-center transition-all ${
                      vehicleType === v.value
                        ? 'border-amber-400 bg-amber-400/10'
                        : 'border-slate-600 bg-slate-900 hover:border-slate-500'
                    }`}
                  >
                    <div className="text-4xl mb-2">{v.icon}</div>
                    <div className={`font-semibold ${vehicleType === v.value ? 'text-amber-400' : 'text-white'}`}>{v.label}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Service Package */}
          {step === 3 && (
            <div>
              <h2 className="text-xl font-bold text-white mb-1">Choose a Package</h2>
              <p className="text-slate-400 text-sm mb-6">Select the service that best fits your needs</p>
              <div className="space-y-4">
                {packages.map((pkg) => (
                  <button
                    key={pkg.id}
                    onClick={() => setSelectedPackage(pkg)}
                    className={`w-full text-left p-5 rounded-xl border-2 transition-all ${
                      selectedPackage?.id === pkg.id
                        ? 'border-amber-400 bg-amber-400/10'
                        : 'border-slate-600 bg-slate-900 hover:border-slate-500'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className={`font-bold text-lg ${selectedPackage?.id === pkg.id ? 'text-amber-400' : 'text-white'}`}>
                        {pkg.name}
                      </span>
                      <span className="text-amber-400 font-bold text-xl">${pkg.price}</span>
                    </div>
                    <p className="text-slate-400 text-sm mb-3">{pkg.description}</p>
                    <ul className="space-y-1">
                      {pkg.included_services.map((s) => (
                        <li key={s} className="flex items-center gap-2 text-xs text-slate-300">
                          <CheckCircle className="w-3 h-3 text-green-400 flex-shrink-0" />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Add-ons */}
          {step === 4 && (
            <div>
              <h2 className="text-xl font-bold text-white mb-1">Add-ons</h2>
              <p className="text-slate-400 text-sm mb-6">Enhance your detail with these optional services</p>
              <div className="space-y-3">
                {addOns.map((addon) => {
                  const selected = selectedAddOnIds.includes(addon.id)
                  return (
                    <button
                      key={addon.id}
                      onClick={() => toggleAddOn(addon.id)}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center gap-4 ${
                        selected
                          ? 'border-amber-400 bg-amber-400/10'
                          : 'border-slate-600 bg-slate-900 hover:border-slate-500'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded border-2 flex-shrink-0 flex items-center justify-center transition-colors ${
                        selected ? 'border-amber-400 bg-amber-400' : 'border-slate-500'
                      }`}>
                        {selected && <CheckCircle className="w-3 h-3 text-[#0f172a]" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <span className={`font-semibold ${selected ? 'text-amber-400' : 'text-white'}`}>{addon.name}</span>
                          <span className="text-amber-400 font-semibold">+${addon.price}</span>
                        </div>
                        {addon.description && (
                          <p className="text-slate-400 text-xs mt-0.5">{addon.description}</p>
                        )}
                      </div>
                    </button>
                  )
                })}
              </div>
              {selectedAddOns.length > 0 && (
                <div className="mt-4 text-right text-sm text-slate-400">
                  Add-ons total: <span className="text-amber-400 font-semibold">${addOnsTotal}</span>
                </div>
              )}
            </div>
          )}

          {/* Step 5: Date & Time */}
          {step === 5 && (
            <div>
              <h2 className="text-xl font-bold text-white mb-1">Choose Date &amp; Time</h2>
              <p className="text-slate-400 text-sm mb-6">Select your preferred appointment slot</p>

              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-300 mb-3">Select Date</label>
                <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                  {dateOptions.map((date) => {
                    const isSelected = selectedDate && format(date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')
                    return (
                      <button
                        key={date.toISOString()}
                        onClick={() => setSelectedDate(date)}
                        className={`p-2 rounded-lg text-center text-xs transition-all ${
                          isSelected
                            ? 'bg-amber-400 text-[#0f172a] font-bold'
                            : 'bg-slate-900 border border-slate-600 text-slate-300 hover:border-amber-400'
                        }`}
                      >
                        <div className="font-semibold">{format(date, 'EEE')}</div>
                        <div>{format(date, 'M/d')}</div>
                      </button>
                    )
                  })}
                </div>
              </div>

              {selectedDate && (
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-3">Select Time</label>
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                    {timeSlots.map((slot) => (
                      <button
                        key={slot.value}
                        onClick={() => setSelectedTime(slot.value)}
                        className={`py-2.5 px-2 rounded-lg text-xs text-center transition-all ${
                          selectedTime === slot.value
                            ? 'bg-amber-400 text-[#0f172a] font-bold'
                            : 'bg-slate-900 border border-slate-600 text-slate-300 hover:border-amber-400'
                        }`}
                      >
                        {slot.display}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 6: Contact Info */}
          {step === 6 && (
            <div>
              <h2 className="text-xl font-bold text-white mb-1">Your Contact Info</h2>
              <p className="text-slate-400 text-sm mb-6">We&apos;ll send your confirmation here</p>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1.5">Full Name</label>
                  <input
                    {...register('name')}
                    type="text"
                    placeholder="John Smith"
                    className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
                  />
                  {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1.5">Email Address</label>
                  <input
                    {...register('email')}
                    type="email"
                    placeholder="john@example.com"
                    className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
                  />
                  {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1.5">Phone Number</label>
                  <input
                    {...register('phone')}
                    type="tel"
                    placeholder="(801) 555-0100"
                    className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
                  />
                  {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>}
                </div>
              </form>
              {bookingError && (
                <div className="mt-4 bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg px-4 py-3 text-sm">
                  {bookingError}
                </div>
              )}
            </div>
          )}

          {/* Step 7: Payment */}
          {step === 7 && clientSecret && (
            <div>
              <h2 className="text-xl font-bold text-white mb-1">Payment</h2>
              <p className="text-slate-400 text-sm mb-6">Secure payment powered by Stripe</p>
              <Elements stripe={stripePromise} options={{ clientSecret, appearance: { theme: 'night' } }}>
                <PaymentStep
                  clientSecret={clientSecret}
                  bookingId={bookingId}
                  totalPrice={totalPrice}
                  travelFee={travelFee}
                  selectedPackage={selectedPackage}
                  selectedAddOns={selectedAddOns}
                  onSuccess={() => {}}
                />
              </Elements>
            </div>
          )}

          {/* Navigation Buttons */}
          {step < 7 && (
            <div className="flex justify-between mt-8">
              {step > 1 ? (
                <button
                  onClick={() => setStep(step - 1)}
                  className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-xl font-medium transition-colors"
                >
                  Back
                </button>
              ) : (
                <div />
              )}

              {step === 6 ? (
                <button
                  onClick={handleSubmit(handleContactSubmit)}
                  disabled={creatingBooking}
                  className="px-8 py-3 bg-amber-400 hover:bg-amber-500 disabled:opacity-50 text-[#0f172a] font-bold rounded-xl transition-colors"
                >
                  {creatingBooking ? 'Creating booking...' : 'Continue to Payment'}
                </button>
              ) : (
                <button
                  onClick={() => setStep(step + 1)}
                  disabled={!canProceed()}
                  className="px-8 py-3 bg-amber-400 hover:bg-amber-500 disabled:opacity-50 text-[#0f172a] font-bold rounded-xl transition-colors"
                >
                  Continue
                </button>
              )}
            </div>
          )}
        </div>

        {/* Price Summary (steps 3-7) */}
        {step >= 3 && step < 7 && (
          <div className="mt-4 bg-slate-800 rounded-xl p-4 border border-slate-700 flex items-center justify-between">
            <div className="text-sm text-slate-400">
              {selectedPackage && <span className="text-white font-medium">{selectedPackage.name}</span>}
              {selectedAddOns.length > 0 && <span className="ml-2 text-slate-500">+ {selectedAddOns.length} add-on{selectedAddOns.length > 1 ? 's' : ''}</span>}
            </div>
            <div className="text-amber-400 font-bold text-lg">
              ${totalPrice}
              {travelFee > 0 && <span className="text-xs text-slate-400 ml-1">(incl. travel)</span>}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
