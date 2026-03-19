export interface City {
  id: string
  name: string
  slug: string
  active: boolean
  headline: string | null
  seo_title: string | null
  seo_description: string | null
  travel_fee: number
}

export interface ServiceArea {
  id: string
  city_id: string
  zip_codes: string[]
  booking_radius_miles: number
}

export interface Service {
  id: string
  name: string
  slug: string
  description: string | null
  base_price: number
}

export interface ServicePackage {
  id: string
  name: string
  description: string | null
  price: number
  included_services: string[]
}

export interface AddOn {
  id: string
  name: string
  price: number
  description: string | null
}

export interface Customer {
  id: string
  name: string
  email: string
  phone: string | null
  address: string | null
}

export interface Detailer {
  id: string
  name: string
  city_id: string
  phone: string | null
  active: boolean
}

export interface AvailabilitySlot {
  id: string
  detailer_id: string
  city_id: string
  datetime: string
  is_booked: boolean
}

export interface Booking {
  id: string
  customer_id: string
  detailer_id: string | null
  city_id: string | null
  service_package_id: string
  add_ons: string[]
  address: string
  scheduled_at: string | null
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled'
  total_price: number | null
  stripe_payment_intent_id: string | null
  vehicle_type: string | null
  created_at: string
}

export interface Review {
  id: string
  customer_id: string
  city_id: string | null
  rating: number
  body: string | null
  is_published: boolean
  created_at: string
}

export interface Membership {
  id: string
  customer_id: string
  plan_type: string
  billing_interval: 'monthly' | 'yearly'
  status: string
  stripe_subscription_id: string | null
}
