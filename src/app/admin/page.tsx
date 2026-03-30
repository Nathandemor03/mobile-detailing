'use client'

export const dynamic = 'force-dynamic'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { DollarSign, Users, Calendar, MapPin, Star, Clock, ToggleLeft, ToggleRight } from 'lucide-react'

type TabType = 'bookings' | 'customers' | 'revenue' | 'cities' | 'reviews' | 'availability'

interface BookingRow {
  id: string
  address: string
  scheduled_at: string | null
  status: string
  total_price: number | null
  vehicle_type: string | null
  created_at: string
  customers: { name: string; email: string } | null
  service_packages: { name: string } | null
  cities: { name: string } | null
}

interface CustomerRow {
  id: string
  name: string
  email: string
  phone: string | null
  created_at: string
}

interface CityRow {
  id: string
  name: string
  slug: string
  active: boolean
  headline: string | null
  travel_fee: number
}

interface ReviewRow {
  id: string
  rating: number
  body: string | null
  is_published: boolean
  created_at: string
  customers: { name: string } | null
  cities: { name: string } | null
}

interface DetailerRow {
  id: string
  name: string
}

const STATUS_COLORS: Record<string, string> = {
  pending: 'bg-yellow-400/10 text-yellow-400 border-yellow-400/30',
  confirmed: 'bg-blue-400/10 text-blue-400 border-blue-400/30',
  in_progress: 'bg-purple-400/10 text-purple-400 border-purple-400/30',
  completed: 'bg-green-400/10 text-green-400 border-green-400/30',
  cancelled: 'bg-red-400/10 text-red-400 border-red-400/30',
}

export default function AdminDashboard() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<TabType>('bookings')
  const [bookings, setBookings] = useState<BookingRow[]>([])
  const [customers, setCustomers] = useState<CustomerRow[]>([])
  const [cities, setCities] = useState<CityRow[]>([])
  const [reviews, setReviews] = useState<ReviewRow[]>([])
  const [detailers, setDetailers] = useState<DetailerRow[]>([])
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [customerSearch, setCustomerSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [totalRevenue, setTotalRevenue] = useState(0)
  const [monthRevenue, setMonthRevenue] = useState(0)
  const [avgBooking, setAvgBooking] = useState(0)

  // Availability form state
  const [availDate, setAvailDate] = useState('')
  const [availTime, setAvailTime] = useState('')
  const [availDetailer, setAvailDetailer] = useState('')
  const [availCity, setAvailCity] = useState('')
  const [savingSlot, setSavingSlot] = useState(false)


  const loadData = useCallback(async () => {
    const supabase = createClient()
    setLoading(true)
    const [bookingRes, customerRes, cityRes, reviewRes, detailerRes] = await Promise.all([
      supabase
        .from('bookings')
        .select('*, customers(name, email), service_packages(name), cities(name)')
        .order('created_at', { ascending: false })
        .limit(100),
      supabase.from('customers').select('*').order('created_at', { ascending: false }),
      supabase.from('cities').select('*').order('name'),
      supabase.from('reviews').select('*, customers(name), cities(name)').order('created_at', { ascending: false }),
      supabase.from('detailers').select('id, name').eq('active', true),
    ])

    if (bookingRes.data) {
      setBookings(bookingRes.data as unknown as BookingRow[])
      const completed = bookingRes.data.filter((b) => b.status === 'completed' && b.total_price)
      const total = completed.reduce((sum, b) => sum + (b.total_price ?? 0), 0)
      setTotalRevenue(total)
      const now = new Date()
      const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)
      const monthCompleted = completed.filter((b) => new Date(b.created_at) >= monthStart)
      setMonthRevenue(monthCompleted.reduce((sum, b) => sum + (b.total_price ?? 0), 0))
      setAvgBooking(completed.length > 0 ? Math.round(total / completed.length) : 0)
    }
    if (customerRes.data) setCustomers(customerRes.data)
    if (cityRes.data) setCities(cityRes.data as CityRow[])
    if (reviewRes.data) setReviews(reviewRes.data as unknown as ReviewRow[])
    if (detailerRes.data) setDetailers(detailerRes.data)
    setLoading(false)
  }, [])

  useEffect(() => {
    loadData()
  }, [loadData])

  async function toggleCityActive(cityId: string, current: boolean) {
    await fetch('/api/admin/cities', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: cityId, active: !current }),
    })
    setCities((prev) => prev.map((c) => c.id === cityId ? { ...c, active: !current } : c))
  }

  async function toggleReviewPublished(reviewId: string, current: boolean) {
    await fetch('/api/admin/reviews', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: reviewId, is_published: !current }),
    })
    setReviews((prev) => prev.map((r) => r.id === reviewId ? { ...r, is_published: !current } : r))
  }

  async function saveAvailabilitySlot() {
    if (!availDate || !availTime || !availDetailer || !availCity) return
    setSavingSlot(true)
    await fetch('/api/admin/availability', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ detailer_id: availDetailer, city_id: availCity, date: availDate, time: availTime }),
    })
    setAvailDate('')
    setAvailTime('')
    setSavingSlot(false)
  }

  const filteredBookings = bookings.filter((b) => statusFilter === 'all' || b.status === statusFilter)
  const filteredCustomers = customers.filter((c) =>
    customerSearch === '' ||
    c.name.toLowerCase().includes(customerSearch.toLowerCase()) ||
    c.email.toLowerCase().includes(customerSearch.toLowerCase())
  )

  const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: 'bookings', label: 'Bookings', icon: <Calendar className="w-4 h-4" /> },
    { id: 'customers', label: 'Customers', icon: <Users className="w-4 h-4" /> },
    { id: 'revenue', label: 'Revenue', icon: <DollarSign className="w-4 h-4" /> },
    { id: 'cities', label: 'Cities', icon: <MapPin className="w-4 h-4" /> },
    { id: 'reviews', label: 'Reviews', icon: <Star className="w-4 h-4" /> },
    { id: 'availability', label: 'Availability', icon: <Clock className="w-4 h-4" /> },
  ]

  return (
    <div className="min-h-screen bg-[#0f172a] text-white">
      {/* Header */}
      <div className="bg-slate-900 border-b border-slate-700 px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-white">Admin Dashboard</h1>
        <button
          onClick={async () => { await fetch('/api/admin/logout', { method: 'POST' }); router.push('/admin/login') }}
          className="text-sm text-slate-400 hover:text-white"
        >
          Logout
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Tabs */}
        <div className="flex gap-1 bg-slate-800 p-1 rounded-xl mb-6 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === tab.id ? 'bg-amber-400 text-[#0f172a]' : 'text-slate-400 hover:text-white'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-20 text-slate-400">Loading...</div>
        ) : (
          <>
            {/* Bookings Tab */}
            {activeTab === 'bookings' && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold">Bookings ({filteredBookings.length})</h2>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none"
                  >
                    <option value="all">All Statuses</option>
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-700 text-slate-400 text-left">
                        <th className="pb-3 pr-4">Customer</th>
                        <th className="pb-3 pr-4">Service</th>
                        <th className="pb-3 pr-4">City</th>
                        <th className="pb-3 pr-4">Date</th>
                        <th className="pb-3 pr-4">Status</th>
                        <th className="pb-3">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {filteredBookings.map((booking) => (
                        <tr key={booking.id} className="text-slate-300">
                          <td className="py-3 pr-4">
                            <div className="font-medium text-white">{booking.customers?.name ?? '—'}</div>
                            <div className="text-xs text-slate-500">{booking.customers?.email}</div>
                          </td>
                          <td className="py-3 pr-4">{booking.service_packages?.name ?? '—'}</td>
                          <td className="py-3 pr-4">{booking.cities?.name ?? '—'}</td>
                          <td className="py-3 pr-4 text-slate-400">
                            {booking.scheduled_at
                              ? new Date(booking.scheduled_at).toLocaleDateString()
                              : '—'}
                          </td>
                          <td className="py-3 pr-4">
                            <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${STATUS_COLORS[booking.status] ?? ''}`}>
                              {booking.status}
                            </span>
                          </td>
                          <td className="py-3 font-semibold text-amber-400">
                            {booking.total_price ? `$${booking.total_price}` : '—'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {filteredBookings.length === 0 && (
                    <p className="text-center py-10 text-slate-500">No bookings found</p>
                  )}
                </div>
              </div>
            )}

            {/* Customers Tab */}
            {activeTab === 'customers' && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold">Customers ({filteredCustomers.length})</h2>
                  <input
                    type="text"
                    placeholder="Search by name or email..."
                    value={customerSearch}
                    onChange={(e) => setCustomerSearch(e.target.value)}
                    className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-amber-400 w-64"
                  />
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-700 text-slate-400 text-left">
                        <th className="pb-3 pr-4">Name</th>
                        <th className="pb-3 pr-4">Email</th>
                        <th className="pb-3 pr-4">Phone</th>
                        <th className="pb-3">Joined</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {filteredCustomers.map((customer) => (
                        <tr key={customer.id} className="text-slate-300">
                          <td className="py-3 pr-4 font-medium text-white">{customer.name}</td>
                          <td className="py-3 pr-4">{customer.email}</td>
                          <td className="py-3 pr-4">{customer.phone ?? '—'}</td>
                          <td className="py-3 text-slate-400">
                            {new Date(customer.created_at).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {filteredCustomers.length === 0 && (
                    <p className="text-center py-10 text-slate-500">No customers found</p>
                  )}
                </div>
              </div>
            )}

            {/* Revenue Tab */}
            {activeTab === 'revenue' && (
              <div>
                <h2 className="text-lg font-bold mb-6">Revenue Overview</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                  <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
                    <div className="text-slate-400 text-sm mb-1">Total Revenue</div>
                    <div className="text-3xl font-extrabold text-amber-400">${totalRevenue.toLocaleString()}</div>
                    <div className="text-xs text-slate-500 mt-1">All completed bookings</div>
                  </div>
                  <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
                    <div className="text-slate-400 text-sm mb-1">This Month</div>
                    <div className="text-3xl font-extrabold text-green-400">${monthRevenue.toLocaleString()}</div>
                    <div className="text-xs text-slate-500 mt-1">Completed this month</div>
                  </div>
                  <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
                    <div className="text-slate-400 text-sm mb-1">Avg Booking Value</div>
                    <div className="text-3xl font-extrabold text-blue-400">${avgBooking}</div>
                    <div className="text-xs text-slate-500 mt-1">Per completed booking</div>
                  </div>
                </div>
                <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
                  <h3 className="font-semibold mb-4">Booking Status Breakdown</h3>
                  {(['pending', 'confirmed', 'in_progress', 'completed', 'cancelled'] as const).map((status) => {
                    const count = bookings.filter((b) => b.status === status).length
                    const pct = bookings.length > 0 ? Math.round((count / bookings.length) * 100) : 0
                    return (
                      <div key={status} className="flex items-center gap-4 mb-3">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium border w-24 text-center ${STATUS_COLORS[status]}`}>
                          {status}
                        </span>
                        <div className="flex-1 bg-slate-700 rounded-full h-2">
                          <div className="bg-amber-400 h-2 rounded-full" style={{ width: `${pct}%` }} />
                        </div>
                        <span className="text-slate-400 text-sm w-16 text-right">{count} ({pct}%)</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Cities Tab */}
            {activeTab === 'cities' && (
              <div>
                <h2 className="text-lg font-bold mb-4">Cities ({cities.length})</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-700 text-slate-400 text-left">
                        <th className="pb-3 pr-4">City</th>
                        <th className="pb-3 pr-4">Travel Fee</th>
                        <th className="pb-3 pr-4">Headline</th>
                        <th className="pb-3">Active</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {cities.map((city) => (
                        <tr key={city.id} className="text-slate-300">
                          <td className="py-3 pr-4 font-medium text-white">{city.name}</td>
                          <td className="py-3 pr-4">${city.travel_fee}</td>
                          <td className="py-3 pr-4 text-slate-400 max-w-xs truncate">{city.headline ?? '—'}</td>
                          <td className="py-3">
                            <button
                              onClick={() => toggleCityActive(city.id, city.active)}
                              className="flex items-center gap-1.5"
                            >
                              {city.active ? (
                                <ToggleRight className="w-6 h-6 text-green-400" />
                              ) : (
                                <ToggleLeft className="w-6 h-6 text-slate-500" />
                              )}
                              <span className={`text-xs ${city.active ? 'text-green-400' : 'text-slate-500'}`}>
                                {city.active ? 'Active' : 'Inactive'}
                              </span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === 'reviews' && (
              <div>
                <h2 className="text-lg font-bold mb-4">Reviews ({reviews.length})</h2>
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <div key={review.id} className="bg-slate-800 rounded-xl p-5 border border-slate-700">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="flex items-center gap-1">
                              {[...Array(review.rating)].map((_, i) => (
                                <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                              ))}
                            </div>
                            <span className="text-sm text-slate-400">
                              {review.customers?.name ?? 'Anonymous'} — {review.cities?.name ?? 'Unknown city'}
                            </span>
                          </div>
                          <p className="text-slate-300 text-sm">{review.body ?? '(No body)'}</p>
                        </div>
                        <button
                          onClick={() => toggleReviewPublished(review.id, review.is_published)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex-shrink-0 ${
                            review.is_published
                              ? 'bg-green-500/10 border border-green-500/30 text-green-400 hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-400'
                              : 'bg-slate-700 border border-slate-600 text-slate-400 hover:bg-green-500/10 hover:text-green-400'
                          }`}
                        >
                          {review.is_published ? 'Published' : 'Unpublished'}
                        </button>
                      </div>
                    </div>
                  ))}
                  {reviews.length === 0 && (
                    <p className="text-center py-10 text-slate-500">No reviews yet</p>
                  )}
                </div>
              </div>
            )}

            {/* Availability Tab */}
            {activeTab === 'availability' && (
              <div>
                <h2 className="text-lg font-bold mb-6">Add Availability Slot</h2>
                <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 max-w-lg">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-1.5">Detailer</label>
                      <select
                        value={availDetailer}
                        onChange={(e) => setAvailDetailer(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-amber-400"
                      >
                        <option value="">Select detailer...</option>
                        {detailers.map((d) => (
                          <option key={d.id} value={d.id}>{d.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-1.5">City</label>
                      <select
                        value={availCity}
                        onChange={(e) => setAvailCity(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-amber-400"
                      >
                        <option value="">Select city...</option>
                        {cities.filter((c) => c.active).map((c) => (
                          <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-1.5">Date</label>
                      <input
                        type="date"
                        value={availDate}
                        onChange={(e) => setAvailDate(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-1.5">Time</label>
                      <input
                        type="time"
                        value={availTime}
                        onChange={(e) => setAvailTime(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>
                    <button
                      onClick={saveAvailabilitySlot}
                      disabled={savingSlot || !availDate || !availTime || !availDetailer || !availCity}
                      className="w-full py-3 bg-amber-400 hover:bg-amber-500 disabled:opacity-50 text-[#0f172a] font-bold rounded-xl transition-colors"
                    >
                      {savingSlot ? 'Saving...' : 'Add Slot'}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
