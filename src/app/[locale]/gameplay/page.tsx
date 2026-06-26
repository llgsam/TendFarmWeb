import { redirect } from 'next/navigation'

export default async function GameplayRedirectPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  redirect(`/${locale}/tendfarm`)
}
