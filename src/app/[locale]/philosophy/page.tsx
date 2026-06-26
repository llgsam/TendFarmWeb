import { redirect } from 'next/navigation'

export default async function PhilosophyRedirectPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  redirect(`/${locale}/tendfarm`)
}
