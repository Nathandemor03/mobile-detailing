import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { verifyAdminCookie } from '@/lib/admin-auth'
import { createAdminClient } from '@/lib/supabase/admin'

export async function POST(request: Request) {
  const cookieStore = await cookies()
  const token = cookieStore.get('admin_session')?.value
  if (!(await verifyAdminCookie(token))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { detailer_id, city_id, date, time } = await request.json()
  if (!detailer_id || !city_id || !date || !time) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const datetime = new Date(`${date}T${time}:00`).toISOString()
  const supabase = createAdminClient()
  const { error } = await supabase.from('availability_slots').insert({
    detailer_id,
    city_id,
    datetime,
    is_booked: false,
  })
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}
