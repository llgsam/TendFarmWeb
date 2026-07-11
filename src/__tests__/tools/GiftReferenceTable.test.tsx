import { describe, it, expect } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import { GiftReferenceTable } from '@/components/tools/seo/GiftReferenceTable'
import { GIFT_VILLAGERS } from '@/components/tools/stardewGiftData'

describe('GiftReferenceTable', () => {
  it('renders one row per villager plus a header row', () => {
    render(<GiftReferenceTable locale="en" />)
    const table = screen.getByRole('table')
    expect(within(table).getAllByRole('row')).toHaveLength(GIFT_VILLAGERS.length + 1)
  })

  it('renders the three column headers (en)', () => {
    render(<GiftReferenceTable locale="en" />)
    for (const h of ['Villager', 'Birthday', 'Loved Gifts']) {
      expect(screen.getByRole('columnheader', { name: h })).toBeInTheDocument()
    }
  })

  it('localizes a villager name (zh Abigail)', () => {
    render(<GiftReferenceTable locale="zh" />)
    expect(screen.getByText('阿比盖尔')).toBeInTheDocument()
  })

  it('lists universal loves in the callout', () => {
    render(<GiftReferenceTable locale="en" />)
    expect(screen.getAllByText(/Prismatic Shard/).length).toBeGreaterThan(0)
  })
})
