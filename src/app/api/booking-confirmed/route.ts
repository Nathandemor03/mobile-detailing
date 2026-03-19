import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import Stripe from 'stripe'
import twilio from 'twilio'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-02-25.clover',
})

export async function POST(request: NextRequest) {
  const body = await request.text()
  const sig = request.headers.get('stripe-signature')

  if (!sig) {
    return NextResponse.json({ error: 'No signature' }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET ?? ''
    )
  } catch (err) {
    console.error('Webhook signature error:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object as Stripe.PaymentIntent

    // Create a service-role Supabase client for webhook
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { cookies: { getAll: () => [], setAll: () => {} } }
    )

    // Update booking status to confirmed
    const { data: booking, error: updateError } = await supabase
      .from('bookings')
      .update({ status: 'confirmed' })
      .eq('stripe_payment_intent_id', paymentIntent.id)
      .select('*, customers(*)')
      .single()

    if (updateError) {
      console.error('Booking update error:', updateError)
      return NextResponse.json({ error: 'Failed to update booking' }, { status: 500 })
    }

    // Send Twilio SMS confirmation
    if (booking) {
      const customer = booking.customers as { name: string; phone: string | null } | null
      const customerPhone = customer?.phone

      if (customerPhone && process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) {
        try {
          const twilioClient = twilio(
            process.env.TWILIO_ACCOUNT_SID,
            process.env.TWILIO_AUTH_TOKEN
          )

          const scheduledDate = booking.scheduled_at
            ? new Date(booking.scheduled_at).toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
              })
            : 'TBD'

          await twilioClient.messages.create({
            body: `Hi ${customer?.name ?? 'there'}! Your Utah Detail Co. booking is confirmed for ${scheduledDate} at ${booking.address}. Booking ID: ${booking.id.slice(0, 8)}. Questions? Call (801) 555-0100.`,
            from: process.env.TWILIO_PHONE_NUMBER!,
            to: customerPhone,
          })
        } catch (smsError) {
          console.error('SMS send error:', smsError)
          // Don't fail the webhook on SMS error
        }
      }
    }
  }

  return NextResponse.json({ received: true })
}
