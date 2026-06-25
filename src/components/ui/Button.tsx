import { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost'
  loading?: boolean
}

export function Button({ variant = 'primary', loading, children, className = '', ...props }: ButtonProps) {
  const base = 'inline-flex items-center justify-center rounded-lg px-5 py-2.5 text-sm font-semibold transition-all disabled:opacity-60'
  const variants = {
    primary: 'bg-[#f0a832] text-[#0f1a0f] hover:bg-[#f5bc5a]',
    ghost: 'border border-[#2d3d2d] text-[#e8dcc8] hover:border-[#f0a832]',
  }
  return (
    <button className={`${base} ${variants[variant]} ${className}`} disabled={loading || props.disabled} {...props}>
      {loading ? '...' : children}
    </button>
  )
}
