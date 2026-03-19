import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-02-25.clover',
})

interface BookingRequestBody {
  name: string
  email: string
  phone: string
  address: string
  city_id: string | null
  vehicle_type: string
  service_package_id: string
  add_on_ids: string[]
  scheduled_at: string | null
  total_price: number
  travel_fee: number
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as BookingRequestBody
    const {
      name,
      email,
      phone,
      address,
      city_id,
      vehicle_type,
      service_package_id,
      add_on_ids,
      scheduled_at,
      total_price,
    } = body

    if (!name || !email || !address || !service_package_id) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const supabase = await createClient()

    // Upsert customer by email
    const { data: customer, error: customerError } = await supabase
      .from('customers')
      .upsert(
        { name, email, phone, address },
        { onConflict: 'email', ignoreDuplicates: false }
      )
      .select()
      .single()

    if (customerError || !customer) {
      console.error('Customer upsert error:', customerError)
      return NextResponse.json({ error: 'Failed to create customer' }, { status: 500 })
    }

    // Create Stripe PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(total_price * 100),
      currency: 'usd',
      metadata: {
        customer_email: email,
        customer_name: name,
        service_package_id,
        address,
      },
    })

    // Create booking record
    const { data: booking, error: bookingError } = await supabase
      .from('bookings')
      .insert({
        customer_id: customer.id,
        city_id: city_id ?? null,
        service_package_id,
        add_ons: add_on_ids,
        address,
        scheduled_at: scheduled_at ?? null,
        status: 'pending',
        total_price,
        stripe_payment_intent_id: paymentIntent.id,
        vehicle_type,
      })
      .select()
      .single()

    if (bookingError || !booking) {
      console.error('Booking creation error:', bookingError)
      return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 })
    }

    return NextResponse.json({
      booking_id: booking.id,
      client_secret: paymentIntent.client_secret,
    })
  } catch (err) {
    console.error('create-booking error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
