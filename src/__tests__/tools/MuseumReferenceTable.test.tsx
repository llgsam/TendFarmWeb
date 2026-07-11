import { describe, it, expect } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import { MuseumReferenceTable } from '@/components/tools/seo/MuseumReferenceTable'
import { MUSEUM_ITEMS } from '@/components/tools/stardewMuseumData'

describe('MuseumReferenceTable', () => {
  it('renders one row per item plus a header row', () => {
    render(<MuseumReferenceTable locale="en" />)
    const table = screen.getByRole('table')
    expect(within(table).getAllByRole('row')).toHaveLength(MUSEUM_ITEMS.length + 1)
  })

  it('renders the three column headers (en)', () => {
    render(<MuseumReferenceTable locale="en" />)
    for (const h of ['Item', 'Category', 'Where to Find']) {
      expect(screen.getByRole('columnheader', { name: h })).toBeInTheDocument()
    }
  })

  it('localizes an item name (en + zh)', () => {
    const { rerender } = render(<MuseumReferenceTable locale="en" />)
    expect(screen.getByText('Dwarf Scroll I')).toBeInTheDocument()
    rerender(<MuseumReferenceTable locale="zh" />)
    expect(screen.getByText('矮人卷轴 I')).toBeInTheDocument()
  })

  it('renders the donation milestones with a reward', () => {
    render(<MuseumReferenceTable locale="en" />)
    expect(screen.getAllByText(/→/).length).toBeGreaterThan(0)
    expect(screen.getByText(/Rusty Key/)).toBeInTheDocument()
  })
})
