// Isolates the Document Picture-in-Picture API. When unsupported, falls back
// to a normal popup window; returns null if that is blocked too. The caller
// renders React into the returned window via createPortal.

export function supportsDocumentPiP(): boolean {
  return typeof window !== 'undefined' && 'documentPictureInPicture' in window
}

function copyStyles(target: Window) {
  for (const sheet of Array.from(document.styleSheets)) {
    try {
      const css = Array.from(sheet.cssRules).map((r) => r.cssText).join('')
      const style = target.document.createElement('style')
      style.textContent = css
      target.document.head.appendChild(style)
    } catch {
      // cross-origin sheet: re-link it instead
      const link = target.document.createElement('link')
      if (sheet.href) { link.rel = 'stylesheet'; link.href = sheet.href; target.document.head.appendChild(link) }
    }
  }
}

export async function openPiPWindow(opts?: { width?: number; height?: number }): Promise<Window | null> {
  const width = opts?.width ?? 360
  const height = opts?.height ?? 560
  if (supportsDocumentPiP()) {
    // @ts-expect-error documentPictureInPicture is not yet in TS lib DOM
    const win: Window = await window.documentPictureInPicture.requestWindow({ width, height })
    copyStyles(win)
    return win
  }
  const popup = window.open('', 'stardew-companion', `width=${width},height=${height}`)
  if (popup) copyStyles(popup)
  return popup
}
