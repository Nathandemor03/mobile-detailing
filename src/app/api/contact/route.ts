import { NextResponse } from 'next/server'
import twilio from 'twilio'

export async function POST(request: Request) {
  const { name, email, phone, message } = await request.json()

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json({ error: 'Name, email, and message are required' }, { status: 400 })
  }

  const notifyPhone = process.env.CONTACT_NOTIFY_PHONE
  const twilioSid = process.env.TWILIO_ACCOUNT_SID
  const twilioToken = process.env.TWILIO_AUTH_TOKEN
  const twilioFrom = process.env.TWILIO_PHONE_NUMBER

  if (notifyPhone && twilioSid && twilioToken && twilioFrom) {
    try {
      const client = twilio(twilioSid, twilioToken)
      const body = [
        `New contact message from Utah Detail Co. website`,
        `Name: ${name}`,
        `Email: ${email}`,
        phone ? `Phone: ${phone}` : null,
        `Message: ${message}`,
      ]
        .filter(Boolean)
        .join('\n')

      await client.messages.create({ body, from: twilioFrom, to: notifyPhone })
    } catch (err) {
      console.error('Contact SMS error:', err)
      // Don't fail the request if SMS fails — message was still received
    }
  }

  return NextResponse.json({ ok: true })
}
