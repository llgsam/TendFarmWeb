import { describe, it, expect } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import { FishReferenceTable } from '@/components/tools/seo/FishReferenceTable'
import { FISH } from '@/components/tools/stardewFishData'

describe('FishReferenceTable', () => {
  it('renders one row per fish plus a header row', () => {
    render(<FishReferenceTable locale="en" />)
    const table = screen.getByRole('table')
    // header row + data rows
    expect(within(table).getAllByRole('row')).toHaveLength(FISH.length + 1)
  })

  it('shows the localized fish name and price (en)', () => {
    render(<FishReferenceTable locale="en" />)
    expect(screen.getByText('Lava Eel')).toBeInTheDocument()
    expect(screen.getAllByText('700').length).toBeGreaterThan(0)
  })

  it('localizes the fish name for zh', () => {
    render(<FishReferenceTable locale="zh" />)
    expect(screen.getByText('岩浆鳗鱼')).toBeInTheDocument()
  })

  it('renders column headers', () => {
    render(<FishReferenceTable locale="en" />)
    for (const h of ['Fish', 'Seasons', 'Location', 'Time', 'Weather', 'Price (g)']) {
      expect(screen.getByRole('columnheader', { name: h })).toBeInTheDocument()
    }
  })
})
