import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { TileGrid } from '@/components/tools/TileGrid'

const base = () => ({ emoji: undefined, watered: false, protectedTile: false, warn: false })

describe('TileGrid', () => {
  it('renders w*h cells', () => {
    render(<TileGrid dims={{ w: 4, h: 3 }} cellContent={base} onCellClick={() => {}} />)
    expect(screen.getAllByRole('button')).toHaveLength(12)
  })
  it('calls onCellClick with the cell coords', () => {
    const onCellClick = vi.fn()
    render(<TileGrid dims={{ w: 3, h: 3 }} cellContent={base} onCellClick={onCellClick} />)
    // cells rendered row-major; index 4 = (x1,y1)
    fireEvent.click(screen.getAllByRole('button')[4])
    expect(onCellClick).toHaveBeenCalledWith(1, 1)
  })
  it('marks watered cells via data attribute', () => {
    render(
      <TileGrid dims={{ w: 2, h: 1 }} onCellClick={() => {}}
        cellContent={(x) => ({ ...base(), watered: x === 0 })} />,
    )
    const cells = screen.getAllByRole('button')
    expect(cells[0].getAttribute('data-watered')).toBe('true')
    expect(cells[1].getAttribute('data-watered')).toBe('false')
  })
})
