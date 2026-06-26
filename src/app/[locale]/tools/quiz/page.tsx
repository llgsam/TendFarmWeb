import { redirect } from 'next/navigation'

export default async function QuizRedirectPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  redirect(`/${locale}/quizzes/farm-personality`)
}
