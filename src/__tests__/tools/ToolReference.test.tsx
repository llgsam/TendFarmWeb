import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ToolReference } from '@/components/tools/seo/ToolReference'

const faqs = [
  { q: 'Most valuable fish?', a: 'The Lava Eel at 700g.' },
  { q: 'Rainy fish?', a: 'Catfish and others.' },
]

describe('ToolReference', () => {
  it('renders the table title, summary, and children', () => {
    render(
      <ToolReference locale="en" tableTitle="Complete Fish List" summary="48 fish total." faqs={[]}>
        <table><tbody><tr><td>row</td></tr></tbody></table>
      </ToolReference>,
    )
    expect(screen.getByRole('heading', { name: 'Complete Fish List' })).toBeInTheDocument()
    expect(screen.getByText('48 fish total.')).toBeInTheDocument()
    expect(screen.getByText('row')).toBeInTheDocument()
  })

  it('renders FAQ questions/answers and injects FAQPage JSON-LD when faqs provided', () => {
    const { container } = render(
      <ToolReference locale="en" tableTitle="T" summary="S" faqs={faqs}>
        <div>child</div>
      </ToolReference>,
    )
    expect(screen.getByText('Most valuable fish?')).toBeInTheDocument()
    expect(screen.getByText('The Lava Eel at 700g.')).toBeInTheDocument()
    const script = container.querySelector('script[type="application/ld+json"]')
    expect(script).not.toBeNull()
    const json = JSON.parse(script!.textContent!)
    expect(json['@type']).toBe('FAQPage')
    expect(JSON.stringify(json)).toContain('Most valuable fish?')
  })

  it('renders no FAQ section and no JSON-LD when faqs is empty', () => {
    const { container } = render(
      <ToolReference locale="en" tableTitle="T" summary="S" faqs={[]}>
        <div>child</div>
      </ToolReference>,
    )
    expect(screen.queryByText(/frequently asked questions/i)).toBeNull()
    expect(container.querySelector('script[type="application/ld+json"]')).toBeNull()
    expect(screen.getByText('child')).toBeInTheDocument()
  })
})
