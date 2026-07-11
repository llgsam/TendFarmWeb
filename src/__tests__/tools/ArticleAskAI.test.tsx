import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { ArticleAskAI } from '@/components/tools/ArticleAskAI'

const prompt = 'Help me decide which farming game fits me.'

describe('ArticleAskAI', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('opens ChatGPT with the encoded prompt', () => {
    const open = vi.spyOn(window, 'open').mockImplementation(() => null)
    render(<ArticleAskAI prompt={prompt} tools={[]} locale="en" />)
    fireEvent.click(screen.getByRole('button', { name: /chatgpt/i }))
    expect(open).toHaveBeenCalledWith(
      `https://chatgpt.com/?q=${encodeURIComponent(prompt)}`,
      '_blank',
      'noopener',
    )
  })

  it('opens Claude with the encoded prompt', () => {
    const open = vi.spyOn(window, 'open').mockImplementation(() => null)
    render(<ArticleAskAI prompt={prompt} tools={[]} locale="en" />)
    fireEvent.click(screen.getByRole('button', { name: /claude/i }))
    expect(open).toHaveBeenCalledWith(
      `https://claude.ai/new?q=${encodeURIComponent(prompt)}`,
      '_blank',
      'noopener',
    )
  })

  it('copies the prompt to clipboard', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined)
    Object.assign(navigator, { clipboard: { writeText } })
    render(<ArticleAskAI prompt={prompt} tools={[]} locale="en" />)
    fireEvent.click(screen.getByRole('button', { name: /copy|复制/i }))
    expect(writeText).toHaveBeenCalledWith(prompt)
  })

  it('renders related-tool links when tools provided', () => {
    render(
      <ArticleAskAI
        prompt={prompt}
        tools={[{ label: 'Gift Finder', href: 'tools/stardew-gifts' }]}
        locale="en"
      />,
    )
    const link = screen.getByRole('link', { name: /gift finder/i })
    expect(link).toHaveAttribute('href', '/en/tools/stardew-gifts')
  })

  it('renders no tools section when tools is empty', () => {
    render(<ArticleAskAI prompt={prompt} tools={[]} locale="en" />)
    expect(screen.queryByRole('link')).toBeNull()
  })
})
