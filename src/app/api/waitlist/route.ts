import { NextResponse } from 'next/server'
import { z } from 'zod'
import { supabase } from '@/lib/supabase'
import { sendConfirmationEmail } from '@/lib/resend'

const schema = z.object({
  email: z.string().email(),
  locale: z.enum(['zh', 'en']),
  source_page: z.string().optional(),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const parsed = schema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'invalid' }, { status: 400 })
    }

    const { email, locale, source_page } = parsed.data
    const { error } = await supabase
      .from('waitlist')
      .insert({ email, locale, source_page })

    if (error) {
      if (error.code === '23505') {
        return NextResponse.json({ error: 'duplicate' }, { status: 409 })
      }
      return NextResponse.json({ error: 'server_error' }, { status: 500 })
    }

    // 非阻塞发送确认邮件，失败不影响响应
    sendConfirmationEmail(email, locale).catch(() => {})

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'server_error' }, { status: 500 })
  }
}
