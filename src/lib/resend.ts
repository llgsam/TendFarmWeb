import { Resend } from 'resend'

// Use placeholder at module load time; real key is required at runtime.
const client = new Resend(process.env.RESEND_API_KEY ?? 're_placeholder')

export async function sendConfirmationEmail(email: string, locale: string) {
  const subject = locale === 'zh' ? 'Tend Farm 候补名单确认' : 'Tend Farm Waitlist Confirmation'
  const text =
    locale === 'zh'
      ? '感谢加入 Tend Farm 候补名单！我们会在 TestFlight 内测开始时第一时间通知你。'
      : "Thanks for joining the Tend Farm waitlist! We'll notify you when the TestFlight beta opens."

  await client.emails.send({
    from: 'Tend Farm <noreply@tendfarm.app>',
    to: email,
    subject,
    text,
  })
}
