'use client'

import type { ReactNode } from 'react'

export interface TileGridProps {
  dims: { w: number; h: number }
  cellContent: (x: number, y: number) => { emoji?: string; watered: boolean; protectedTile: boolean; warn: boolean }
  onCellClick: (x: number, y: number) => void
}

export function TileGrid({ dims, cellContent, onCellClick }: TileGridProps) {
  const cells: ReactNode[] = []
  for (let y = 0; y < dims.h; y++) {
    for (let x = 0; x < dims.w; x++) {
      const c = cellContent(x, y)
      const bg = c.watered && c.protectedTile
        ? 'bg-gradient-to-br from-[#3b82f6]/40 to-[#22c55e]/40'
        : c.watered ? 'bg-[#3b82f6]/30' : c.protectedTile ? 'bg-[#22c55e]/25' : 'bg-[#0f1a0f]'
      cells.push(
        <button
          key={`${x},${y}`}
          type="button"
          aria-label={`${x},${y}`}
          data-watered={c.watered}
          data-protected={c.protectedTile}
          onClick={() => onCellClick(x, y)}
          className={`flex aspect-square items-center justify-center border border-[#2d3d2d] text-xs leading-none ${bg} ${c.warn ? 'ring-1 ring-inset ring-red-500' : ''}`}
        >
          <span aria-hidden>{c.emoji ?? ''}</span>
        </button>,
      )
    }
  }
  return (
    <div
      className="grid w-full select-none gap-0 overflow-x-auto"
      style={{ gridTemplateColumns: `repeat(${dims.w}, minmax(0, 1fr))` }}
    >
      {cells}
    </div>
  )
}
