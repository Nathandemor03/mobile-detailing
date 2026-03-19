'use client'

import { useEffect, useRef } from 'react'

const CITY_MARKERS = [
  { name: 'Provo', lat: 40.2338, lng: -111.6585, travelFee: 0 },
  { name: 'Orem', lat: 40.2969, lng: -111.6946, travelFee: 0 },
  { name: 'Lehi', lat: 40.3916, lng: -111.8508, travelFee: 15 },
  { name: 'Salt Lake City', lat: 40.7608, lng: -111.8910, travelFee: 20 },
  { name: 'Draper', lat: 40.5246, lng: -111.8638, travelFee: 15 },
  { name: 'Sandy', lat: 40.5649, lng: -111.8389, travelFee: 15 },
  { name: 'Layton', lat: 41.0602, lng: -111.9711, travelFee: 20 },
  { name: 'St. George', lat: 37.0965, lng: -113.5684, travelFee: 25 },
]

export default function ServiceAreaMap() {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<google.maps.Map | null>(null)

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
    if (!apiKey || !mapRef.current) return

    // Load Google Maps script if not already loaded
    const existingScript = document.querySelector('script[src*="maps.googleapis.com/maps/api/js"]')
    if (!existingScript) {
      const script = document.createElement('script')
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`
      script.async = true
      script.onload = initMap
      document.head.appendChild(script)
    } else if (window.google?.maps) {
      initMap()
    } else {
      existingScript.addEventListener('load', initMap)
    }

    function initMap() {
      if (!mapRef.current) return

      const map = new google.maps.Map(mapRef.current, {
        center: { lat: 40.5, lng: -111.9 },
        zoom: 8,
        styles: [
          { elementType: 'geometry', stylers: [{ color: '#1e293b' }] },
          { elementType: 'labels.text.stroke', stylers: [{ color: '#0f172a' }] },
          { elementType: 'labels.text.fill', stylers: [{ color: '#94a3b8' }] },
          { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#334155' }] },
          { featureType: 'road', elementType: 'labels.text.fill', stylers: [{ color: '#64748b' }] },
          { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#0f172a' }] },
          { featureType: 'water', elementType: 'labels.text.fill', stylers: [{ color: '#475569' }] },
          { featureType: 'poi', stylers: [{ visibility: 'off' }] },
          { featureType: 'transit', stylers: [{ visibility: 'off' }] },
          { featureType: 'administrative', elementType: 'geometry', stylers: [{ color: '#334155' }] },
          { featureType: 'landscape', elementType: 'geometry', stylers: [{ color: '#1e293b' }] },
        ],
      })

      mapInstanceRef.current = map

      CITY_MARKERS.forEach((city) => {
        const marker = new google.maps.Marker({
          position: { lat: city.lat, lng: city.lng },
          map,
          title: city.name,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 10,
            fillColor: city.travelFee === 0 ? '#4ade80' : '#f59e0b',
            fillOpacity: 1,
            strokeColor: '#0f172a',
            strokeWeight: 2,
          },
        })

        const infoWindow = new google.maps.InfoWindow({
          content: `
            <div style="background:#1e293b;color:#fff;padding:10px 14px;border-radius:8px;font-family:sans-serif;min-width:140px">
              <div style="font-weight:700;font-size:15px;margin-bottom:4px">${city.name}</div>
              <div style="color:${city.travelFee === 0 ? '#4ade80' : '#f59e0b'};font-size:13px">
                ${city.travelFee === 0 ? 'No travel fee' : `$${city.travelFee} travel fee`}
              </div>
            </div>
          `,
        })

        marker.addListener('click', () => {
          infoWindow.open(map, marker)
        })
      })
    }
  }, [])

  return (
    <div
      ref={mapRef}
      className="w-full h-full rounded-2xl"
      style={{ minHeight: '280px' }}
    />
  )
}
