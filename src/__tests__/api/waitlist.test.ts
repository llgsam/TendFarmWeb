import { POST } from '@/app/api/waitlist/route'

// mock supabase
vi.mock('@/lib/supabase', () => ({
  supabase: {
    from: vi.fn(() => ({
      insert: vi.fn(() => ({ error: null })),
    })),
  },
}))

vi.mock('@/lib/resend', () => ({
  sendConfirmationEmail: vi.fn().mockResolvedValue(undefined),
}))

describe('POST /api/waitlist', () => {
  it('returns 200 on valid email', async () => {
    const req = new Request('http://localhost/api/waitlist', {
      method: 'POST',
      body: JSON.stringify({ email: 'test@example.com', locale: 'zh', source_page: 'home' }),
      headers: { 'Content-Type': 'application/json' },
    })
    const res = await POST(req)
    const data = await res.json()
    expect(res.status).toBe(200)
    expect(data.success).toBe(true)
  })

  it('returns 400 on invalid email', async () => {
    const req = new Request('http://localhost/api/waitlist', {
      method: 'POST',
      body: JSON.stringify({ email: 'not-an-email', locale: 'zh', source_page: 'home' }),
      headers: { 'Content-Type': 'application/json' },
    })
    const res = await POST(req)
    const data = await res.json()
    expect(res.status).toBe(400)
    expect(data.error).toBe('invalid')
  })

  it('returns 409 on duplicate email', async () => {
    const { supabase } = await import('@/lib/supabase')
    vi.mocked(supabase.from).mockReturnValueOnce({
      insert: vi.fn().mockResolvedValue({ error: { code: '23505', message: 'duplicate key' } }),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any)

    const req = new Request('http://localhost/api/waitlist', {
      method: 'POST',
      body: JSON.stringify({ email: 'existing@example.com', locale: 'en', source_page: 'home' }),
      headers: { 'Content-Type': 'application/json' },
    })
    const res = await POST(req)
    const data = await res.json()
    expect(res.status).toBe(409)
    expect(data.error).toBe('duplicate')
  })

  it('returns 400 on invalid locale', async () => {
    const req = new Request('http://localhost/api/waitlist', {
      method: 'POST',
      body: JSON.stringify({ email: 'test@example.com', locale: 'fr', source_page: 'home' }),
      headers: { 'Content-Type': 'application/json' },
    })
    const res = await POST(req)
    const data = await res.json()
    expect(res.status).toBe(400)
    expect(data.error).toBe('invalid')
  })
})
