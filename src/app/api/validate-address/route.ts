import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as { address?: string; zip_code?: string }
    const { zip_code } = body

    if (!zip_code) {
      return NextResponse.json({ error: 'zip_code is required' }, { status: 400 })
    }

    const supabase = await createClient()

    const { data: serviceAreas, error } = await supabase
      .from('service_areas')
      .select('*, cities(*)')
      .contains('zip_codes', [zip_code])

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: 'Database error' }, { status: 500 })
    }

    if (!serviceAreas || serviceAreas.length === 0) {
      return NextResponse.json({
        serviced: false,
        city_id: null,
        travel_fee: 0,
        message: 'Sorry, we do not currently service your area. Check back soon as we are expanding!',
      })
    }

    const area = serviceAreas[0]
    const city = area.cities as { id: string; name: string; travel_fee: number } | null

    return NextResponse.json({
      serviced: true,
      city_id: area.city_id,
      travel_fee: city?.travel_fee ?? 0,
      city_name: city?.name ?? '',
      message: `Great news! We service your area${city ? ` in ${city.name}` : ''}.`,
    })
  } catch (err) {
    console.error('validate-address error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
