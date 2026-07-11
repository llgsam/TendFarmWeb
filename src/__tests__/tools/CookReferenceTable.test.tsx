import { describe, it, expect } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import { CookReferenceTable } from '@/components/tools/seo/CookReferenceTable'
import { COOK_RECIPES } from '@/components/tools/stardewCookingData'

describe('CookReferenceTable', () => {
  it('renders one row per recipe plus a header row', () => {
    render(<CookReferenceTable locale="en" />)
    const table = screen.getByRole('table')
    expect(within(table).getAllByRole('row')).toHaveLength(COOK_RECIPES.length + 1)
  })

  it('renders the six column headers (en)', () => {
    render(<CookReferenceTable locale="en" />)
    for (const h of ['Recipe', 'Ingredients', 'Buffs', 'Energy', 'Sell (g)', 'How to Unlock']) {
      expect(screen.getByRole('columnheader', { name: h })).toBeInTheDocument()
    }
  })

  it('localizes a recipe name (en + zh)', () => {
    const { rerender } = render(<CookReferenceTable locale="en" />)
    expect(screen.getByText("Autumn's Bounty")).toBeInTheDocument()
    rerender(<CookReferenceTable locale="zh" />)
    expect(screen.getByText('秋日恩赐')).toBeInTheDocument()
  })

  it('formats ingredient quantities with × and shows localized buff labels', () => {
    render(<CookReferenceTable locale="en" />)
    expect(screen.getAllByText(/×/).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Foraging/).length).toBeGreaterThan(0)
  })

  it('shows an em dash for recipes with no buff', () => {
    render(<CookReferenceTable locale="en" />)
    expect(screen.getAllByText('—').length).toBeGreaterThan(0)
  })
})
