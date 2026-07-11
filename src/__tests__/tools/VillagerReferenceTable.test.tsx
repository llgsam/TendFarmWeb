import { describe, it, expect } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import { VillagerReferenceTable } from '@/components/tools/seo/VillagerReferenceTable'
import { VILLAGERS } from '@/components/tools/stardewVillagerData'

describe('VillagerReferenceTable', () => {
  it('renders one row per villager plus a header row', () => {
    render(<VillagerReferenceTable locale="en" />)
    const table = screen.getByRole('table')
    expect(within(table).getAllByRole('row')).toHaveLength(VILLAGERS.length + 1)
  })

  it('renders the five column headers (en)', () => {
    render(<VillagerReferenceTable locale="en" />)
    for (const h of ['Villager', 'Birthday', 'Region', 'Marriageable', 'Loved Gifts']) {
      expect(screen.getByRole('columnheader', { name: h })).toBeInTheDocument()
    }
  })

  it('localizes a villager name (en + zh)', () => {
    const { rerender } = render(<VillagerReferenceTable locale="en" />)
    expect(screen.getByText('Alex')).toBeInTheDocument()
    rerender(<VillagerReferenceTable locale="zh" />)
    expect(screen.getByText('亚历克斯')).toBeInTheDocument()
  })

  it('marks marriageable villagers with a localized Yes', () => {
    render(<VillagerReferenceTable locale="en" />)
    const yesCount = VILLAGERS.filter((v) => v.marriageable).length
    expect(screen.getAllByText('Yes')).toHaveLength(yesCount)
  })
})
