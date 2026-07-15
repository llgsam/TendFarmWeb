import { describe, it, expect } from 'vitest'
import { supportsDocumentPiP } from '@/lib/tools/pipOverlay'

describe('pipOverlay', () => {
  it('reports no Document PiP support in jsdom', () => {
    expect(supportsDocumentPiP()).toBe(false)
  })
})
