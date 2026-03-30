async function hashAdminToken(): Promise<string> {
  const password = process.env.ADMIN_PASSWORD ?? ''
  const encoder = new TextEncoder()
  const data = encoder.encode(password + 'admin_session_v1')
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

export async function makeAdminToken(): Promise<string> {
  return hashAdminToken()
}

export async function verifyAdminCookie(cookieValue: string | undefined): Promise<boolean> {
  if (!cookieValue) return false
  const expected = await hashAdminToken()
  return cookieValue === expected
}
