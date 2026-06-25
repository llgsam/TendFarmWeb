'use client'
import { useState } from 'react'
import { Button } from './Button'

interface WaitlistFormProps {
  locale: string
  sourcePage: string
  successMessage: string
  duplicateMessage: string
  errorMessage: string
  buttonText: string
  placeholder: string
}

type Status = 'idle' | 'loading' | 'success' | 'duplicate' | 'error'

export function WaitlistForm({ locale, sourcePage, successMessage, duplicateMessage, errorMessage, buttonText, placeholder }: WaitlistFormProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<Status>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setStatus('loading')
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, locale, source_page: sourcePage }),
      })
      const data = await res.json()
      if (res.ok) {
        setStatus('success')
      } else if (data.error === 'duplicate') {
        setStatus('duplicate')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return <p className="text-[#f0a832] text-sm">{successMessage}</p>
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
      <input
        type="email"
        aria-label="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={placeholder}
        required
        className="flex-1 rounded-lg border border-[#2d3d2d] bg-[#1a2e1a] px-4 py-2.5 text-sm text-[#e8dcc8] placeholder-[#4a5a4a] focus:border-[#f0a832] focus:outline-none"
      />
      <Button type="submit" loading={status === 'loading'}>{buttonText}</Button>
      {(status === 'duplicate' || status === 'error') && (
        <p className="w-full text-xs text-red-400">
          {status === 'duplicate' ? duplicateMessage : errorMessage}
        </p>
      )}
    </form>
  )
}
