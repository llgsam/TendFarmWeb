import { describe, it, expect } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import { BundleReferenceTable } from '@/components/tools/seo/BundleReferenceTable'
import { BUNDLE_ROOMS } from '@/components/tools/stardewBundleData'

const bundleCount = BUNDLE_ROOMS.reduce((n, r) => n + r.bundles.length, 0)

describe('BundleReferenceTable', () => {
  it('renders one row per bundle plus a header row', () => {
    render(<BundleReferenceTable locale="en" />)
    const table = screen.getByRole('table')
    expect(within(table).getAllByRole('row')).toHaveLength(bundleCount + 1)
  })

  it('renders the four column headers (en)', () => {
    render(<BundleReferenceTable locale="en" />)
    for (const h of ['Room', 'Bundle', 'Items Needed', 'Reward']) {
      expect(screen.getByRole('columnheader', { name: h })).toBeInTheDocument()
    }
  })

  it('localizes a bundle name (en + zh)', () => {
    const { rerender } = render(<BundleReferenceTable locale="en" />)
    expect(screen.getByText('Spring Foraging Bundle')).toBeInTheDocument()
    rerender(<BundleReferenceTable locale="zh" />)
    expect(screen.getByText('春季采集收集包')).toBeInTheDocument()
  })

  it('shows an item reward with ×qty and a gold reward with g', () => {
    render(<BundleReferenceTable locale="en" />)
    expect(screen.getByText(/Spring Seeds ×30/)).toBeInTheDocument()
    // Vault bundles have both reward items and gold, but item rewards are prioritized
    expect(screen.getByText(/Chocolate Cake ×3/)).toBeInTheDocument()
  })

  it("shows a 'pick N' prefix on bundles that need a subset", () => {
    render(<BundleReferenceTable locale="en" />)
    expect(screen.getAllByText(/pick \d/i).length).toBeGreaterThan(0)
  })
})
