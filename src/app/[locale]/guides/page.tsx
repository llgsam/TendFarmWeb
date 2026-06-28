import { redirect } from 'next/navigation'

// The top-level "Best Games" entry IS the comparison/reviews hub.
// Per-game guides are reached from each game's page (/games/[slug] → its guides).
export default async function GuidesIndexRedirect({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  redirect(`/${locale}/guides/best-games`)
}
