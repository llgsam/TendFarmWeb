// Original flat-style game icons (own artwork — deliberately NOT the games'
// official logos/app icons, which are copyrighted/trademarked assets).
// Each icon is an evocative motif on the site's dark-green palette.

const PALETTE = {
  greenDark: '#35592f',
  green: '#4a7a3d',
  greenLight: '#7ab55c',
  amber: '#f0a832',
  amberDark: '#c9862a',
  cream: '#e8dcc8',
  terracotta: '#c9684a',
  blue: '#6aa9c9',
  brown: '#8a6a4a',
  brownDark: '#5f4a33',
  gray: '#9aa5a5',
  purple: '#9a7ac9',
}

const P = PALETTE

const ICONS: Record<string, React.ReactNode> = {
  // Hay bale under a small sun — production farming.
  'hay-day': (
    <>
      <circle cx="24.5" cy="7.5" r="4" fill={P.amber} />
      <rect x="4" y="14" width="18" height="12" rx="2.5" fill={P.amberDark} />
      <rect x="4" y="14" width="18" height="12" rx="2.5" fill="none" stroke={P.brownDark} strokeWidth="1" opacity="0.35" />
      <rect x="8.5" y="14" width="2.2" height="12" fill={P.brownDark} opacity="0.45" />
      <rect x="15.5" y="14" width="2.2" height="12" fill={P.brownDark} opacity="0.45" />
      <ellipse cx="16" cy="27.5" rx="13" ry="2" fill={P.greenDark} />
    </>
  ),
  // Sprout growing out of a valley between two hills.
  'stardew-valley': (
    <>
      <circle cx="26" cy="7" r="3.5" fill={P.amber} />
      <path d="M-2 32 Q6 16 14 26 L14 32 Z" fill={P.green} />
      <path d="M34 32 Q26 14 18 26 L18 32 Z" fill={P.greenDark} />
      <rect x="15.2" y="16" width="1.8" height="9" rx="0.9" fill={P.greenLight} />
      <path d="M16 17 Q11 16 10.5 11.5 Q15.5 12 16 17 Z" fill={P.greenLight} />
      <path d="M16.2 15 Q21 14 21.8 9.5 Q16.8 10 16.2 15 Z" fill={P.greenLight} />
    </>
  ),
  // Tiny island with a leafy tree — island life.
  'animal-crossing': (
    <>
      <path d="M3 26 Q16 20 29 26 L29 29 Q16 32 3 29 Z" fill={P.blue} />
      <ellipse cx="16" cy="25" rx="9" ry="3.2" fill={P.amberDark} opacity="0.85" />
      <rect x="15" y="16" width="2" height="8" rx="1" fill={P.brown} />
      <circle cx="16" cy="12" r="5.5" fill={P.green} />
      <circle cx="11.5" cy="14.5" r="3.5" fill={P.greenLight} />
      <circle cx="20.5" cy="14.5" r="3.5" fill={P.greenDark} />
    </>
  ),
  // Generic tractor silhouette (terracotta — deliberately not any brand's colors).
  'farming-simulator': (
    <>
      <rect x="5" y="12" width="10" height="8" rx="1.5" fill={P.terracotta} />
      <rect x="14" y="8" width="8" height="12" rx="1.5" fill={P.terracotta} />
      <rect x="16" y="10" width="4" height="4.5" rx="1" fill={P.cream} />
      <rect x="3" y="18" width="26" height="3" rx="1.5" fill={P.brownDark} />
      <circle cx="9" cy="24" r="4.5" fill={P.brownDark} />
      <circle cx="9" cy="24" r="2" fill={P.gray} />
      <circle cx="23" cy="25" r="3.2" fill={P.brownDark} />
      <circle cx="23" cy="25" r="1.4" fill={P.gray} />
    </>
  ),
  // Coral branch rising from a reef shelf.
  'coral-island': (
    <>
      <path d="M2 27 Q16 22 30 27 L30 32 L2 32 Z" fill={P.blue} opacity="0.75" />
      <path d="M16 26 L16 14 M16 18 Q11 17 10 11 M16 20 Q21 19 22.5 12.5 M10 11 Q9.5 9 11 8 M22.5 12.5 Q23.5 10 22 8.5" stroke={P.terracotta} strokeWidth="2.6" strokeLinecap="round" fill="none" />
      <circle cx="7" cy="24" r="1.4" fill={P.cream} opacity="0.8" />
      <circle cx="25" cy="23" r="1.1" fill={P.cream} opacity="0.6" />
    </>
  ),
  // Standing stone with a carved spiral — ancient roots.
  'roots-of-pacha': (
    <>
      <path d="M9 28 L10 10 Q10.5 6 16 6 Q21.5 6 22 10 L23 28 Z" fill={P.gray} />
      <path d="M9 28 L10 10 Q10.5 6 16 6 L16 28 Z" fill={P.brownDark} opacity="0.35" />
      <path d="M16 13 a4 4 0 1 1 -4 4 a2.6 2.6 0 1 0 2.6 -2.6 a1.4 1.4 0 1 1 -1.4 1.4" stroke={P.cream} strokeWidth="1.6" fill="none" strokeLinecap="round" />
      <ellipse cx="16" cy="28.5" rx="10" ry="1.8" fill={P.greenDark} />
    </>
  ),
  // Rustic barn behind a rail fence.
  'ranch-simulator': (
    <>
      <path d="M8 14 L17 8 L26 14 L26 24 L8 24 Z" fill={P.brown} />
      <path d="M6.5 14.5 L17 7 L27.5 14.5 L26 16 L17 9.5 L8 16 Z" fill={P.brownDark} />
      <rect x="14.6" y="17" width="5" height="7" rx="0.8" fill={P.brownDark} />
      <path d="M3 21 L3 28 M10 21 L10 28 M2 23 L11 23 M2 26 L11 26" stroke={P.cream} strokeWidth="1.6" strokeLinecap="round" opacity="0.9" />
      <ellipse cx="17" cy="27.5" rx="13" ry="1.8" fill={P.greenDark} />
    </>
  ),
  // Tiny cabin with an oversized friendly tree — cozy town-building.
  littlewood: (
    <>
      <circle cx="22" cy="12" r="7" fill={P.green} />
      <circle cx="18" cy="15" r="4.5" fill={P.greenLight} opacity="0.7" />
      <rect x="20.8" y="17" width="2.4" height="8" fill={P.brown} />
      <path d="M4 18 L10 13 L16 18 L16 26 L4 26 Z" fill={P.cream} />
      <path d="M2.8 18.6 L10 12 L17.2 18.6 L16 20 L10 14.6 L4 20 Z" fill={P.terracotta} />
      <rect x="8.4" y="20.5" width="3.2" height="5.5" rx="0.6" fill={P.brownDark} />
      <ellipse cx="14" cy="27.3" rx="12" ry="1.7" fill={P.greenDark} />
    </>
  ),
  // Gear + wrench — the workshop life.
  'my-time-at-portia': (
    <>
      <g fill={P.amber}>
        <circle cx="14" cy="15" r="6.5" />
        <rect x="12.6" y="5.5" width="2.8" height="4" rx="1" />
        <rect x="12.6" y="20.5" width="2.8" height="4" rx="1" />
        <rect x="4.5" y="13.6" width="4" height="2.8" rx="1" />
        <rect x="19.5" y="13.6" width="4" height="2.8" rx="1" />
        <rect x="6.2" y="7.2" width="3.6" height="2.8" rx="1" transform="rotate(45 8 8.6)" />
        <rect x="18.2" y="19.2" width="3.6" height="2.8" rx="1" transform="rotate(45 20 20.6)" />
        <rect x="18.2" y="7.2" width="3.6" height="2.8" rx="1" transform="rotate(-45 20 8.6)" />
        <rect x="6.2" y="19.2" width="3.6" height="2.8" rx="1" transform="rotate(-45 8 20.6)" />
      </g>
      <circle cx="14" cy="15" r="2.8" fill={P.greenDark} />
      <path d="M20 26 L26 20 M26.5 16.5 a3.5 3.5 0 1 1 -3 -3" stroke={P.gray} strokeWidth="2.4" strokeLinecap="round" fill="none" />
    </>
  ),
  // Desert mesa, cactus and sun — dry frontier workshop.
  'my-time-at-sandrock': (
    <>
      <circle cx="7" cy="7.5" r="3.2" fill={P.amber} />
      <path d="M18 26 L18 12 Q18 10 20 10 L28 10 Q30 10 30 12 L30 26 Z" fill={P.terracotta} />
      <rect x="18" y="15" width="12" height="1.6" fill={P.brownDark} opacity="0.4" />
      <rect x="18" y="20" width="12" height="1.6" fill={P.brownDark} opacity="0.4" />
      <path d="M8 26 L8 17 M8 20 Q5 20 5 16.5 M8 21.5 Q11 21.5 11 18.5" stroke={P.green} strokeWidth="2.6" strokeLinecap="round" fill="none" />
      <ellipse cx="16" cy="27.3" rx="13" ry="1.8" fill={P.amberDark} opacity="0.8" />
    </>
  ),
  // Radiant sun over a planted furrow — sun magic farming.
  'sun-haven': (
    <>
      <circle cx="16" cy="13" r="6" fill={P.amber} />
      <g stroke={P.amber} strokeWidth="2" strokeLinecap="round">
        <path d="M16 3 L16 5.6" />
        <path d="M16 20.4 L16 23" />
        <path d="M6 13 L8.6 13" />
        <path d="M23.4 13 L26 13" />
        <path d="M8.9 5.9 L10.7 7.7" />
        <path d="M21.3 18.3 L23.1 20.1" />
        <path d="M23.1 5.9 L21.3 7.7" />
        <path d="M10.7 18.3 L8.9 20.1" />
      </g>
      <path d="M4 27 Q10 24.5 16 27 Q22 29.5 28 27" stroke={P.greenDark} strokeWidth="2.6" fill="none" strokeLinecap="round" />
      <circle cx="10" cy="25.6" r="1.3" fill={P.greenLight} />
      <circle cx="22" cy="28.2" r="1.3" fill={P.greenLight} />
    </>
  ),
  // Friendly cow face — casual animal farming.
  'farmville-3': (
    <>
      <ellipse cx="16" cy="17" rx="9.5" ry="8.5" fill={P.cream} />
      <path d="M6 10 Q3 8 3.5 5 Q7 5.5 8 8.5 Z" fill={P.brown} />
      <path d="M26 10 Q29 8 28.5 5 Q25 5.5 24 8.5 Z" fill={P.brown} />
      <path d="M9 12 Q13 9 17 13 Q13 16 9 12 Z" fill={P.brownDark} opacity="0.85" />
      <circle cx="12" cy="14.5" r="1.4" fill={P.brownDark} />
      <circle cx="20.5" cy="14.5" r="1.4" fill={P.brownDark} />
      <ellipse cx="16" cy="21.5" rx="5.5" ry="3.8" fill={P.terracotta} opacity="0.9" />
      <circle cx="14" cy="21.5" r="1" fill={P.brownDark} />
      <circle cx="18" cy="21.5" r="1" fill={P.brownDark} />
    </>
  ),
  // Paw print with a sprouting flower — gardening with animal friends.
  'garden-paws': (
    <>
      <ellipse cx="14" cy="20" rx="6.5" ry="5.5" fill={P.brown} />
      <circle cx="7.5" cy="13.5" r="2.6" fill={P.brown} />
      <circle cx="13" cy="10.5" r="2.6" fill={P.brown} />
      <circle cx="19" cy="12" r="2.6" fill={P.brown} />
      <path d="M25 22 L25 13 M25 16 Q22 15.5 21.5 12" stroke={P.green} strokeWidth="1.8" strokeLinecap="round" fill="none" />
      <circle cx="25" cy="10.5" r="2" fill={P.amber} />
      <circle cx="25" cy="10.5" r="0.9" fill={P.terracotta} />
    </>
  ),
  // Round potion flask, mid-brew.
  'potion-permit': (
    <>
      <rect x="13.6" y="5" width="4.8" height="4" rx="1" fill={P.brown} />
      <path d="M14 8.5 L14 12 Q7 15 7 21 Q7 27.5 16 27.5 Q25 27.5 25 21 Q25 15 18 12 L18 8.5 Z" fill={P.purple} opacity="0.9" />
      <path d="M8.2 22 Q9 26 16 26 Q23 26 23.8 22 Q22 18.5 16 18.5 Q10 18.5 8.2 22 Z" fill={P.greenLight} opacity="0.85" />
      <circle cx="13" cy="16" r="1.1" fill={P.cream} opacity="0.8" />
      <circle cx="18.5" cy="14.5" r="0.8" fill={P.cream} opacity="0.6" />
    </>
  ),
  // Teapot with a wisp of spirit-steam.
  spirittea: (
    <>
      <path d="M9 16 Q9 13 12 13 L20 13 Q23 13 23 16 L23 22 Q23 26 16 26 Q9 26 9 22 Z" fill={P.terracotta} />
      <path d="M23 16 Q27 16 27 20 Q27 22.5 24.5 23 L23 21 Z" fill={P.terracotta} />
      <path d="M9.5 15 Q5.5 14 6 10.5" stroke={P.terracotta} strokeWidth="2.4" strokeLinecap="round" fill="none" />
      <rect x="14" y="10.6" width="4" height="2.6" rx="1.2" fill={P.brownDark} />
      <path d="M16 9 Q13.5 6.5 16 4.5 Q18.5 2.8 17 1" stroke={P.cream} strokeWidth="1.6" strokeLinecap="round" fill="none" opacity="0.85" />
      <circle cx="20.5" cy="5" r="1.3" fill={P.cream} opacity="0.6" />
    </>
  ),
  // One tree, two seasons — half in leaf, half in autumn.
  'story-of-seasons': (
    <>
      <rect x="14.8" y="17" width="2.4" height="9" rx="1.2" fill={P.brown} />
      <path d="M16 4 A8.5 8.5 0 0 0 16 21 Z" fill={P.green} />
      <path d="M16 4 A8.5 8.5 0 0 1 16 21 Z" fill={P.amber} />
      <circle cx="11.5" cy="11" r="1.2" fill={P.greenLight} opacity="0.9" />
      <circle cx="20.5" cy="9.5" r="1.2" fill={P.terracotta} opacity="0.9" />
      <path d="M23 24 Q24.5 22.5 24 20.5" stroke={P.amber} strokeWidth="1.4" strokeLinecap="round" fill="none" opacity="0.8" />
      <ellipse cx="16" cy="27.3" rx="11" ry="1.7" fill={P.greenDark} />
    </>
  ),
  // Sword planted in soil, sprouting a leaf — farm by day, fight by night.
  'rune-factory': (
    <>
      <path d="M15 4 L17 4 L16.8 18 L15.2 18 Z" fill={P.gray} />
      <path d="M16 2.2 L17.2 4.4 L14.8 4.4 Z" fill={P.gray} />
      <rect x="11.5" y="17.6" width="9" height="2.4" rx="1.2" fill={P.amber} />
      <rect x="14.9" y="20" width="2.2" height="5" rx="1.1" fill={P.brown} />
      <path d="M17 21.5 Q21 21 21.8 17.2 Q17.5 17.8 17 21.5 Z" fill={P.greenLight} />
      <ellipse cx="16" cy="26.8" rx="9" ry="1.8" fill={P.greenDark} />
      <circle cx="16" cy="18.8" r="0.9" fill={P.terracotta} />
    </>
  ),
}

// Fallback for any slug without a bespoke icon: a simple sprout.
const FALLBACK = (
  <>
    <rect x="15.2" y="14" width="1.8" height="11" rx="0.9" fill={P.greenLight} />
    <path d="M16 16 Q10.5 15 10 9.5 Q15.5 10.5 16 16 Z" fill={P.green} />
    <path d="M16.2 14 Q21.5 13 22 7.5 Q16.7 8.5 16.2 14 Z" fill={P.greenLight} />
    <ellipse cx="16" cy="26.5" rx="9" ry="1.8" fill={P.greenDark} />
  </>
)

export function GameIcon({
  slug,
  size = 32,
  className,
}: {
  slug: string
  size?: number
  className?: string
}) {
  return (
    <svg
      viewBox="0 0 32 32"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
      role="img"
    >
      {ICONS[slug] ?? FALLBACK}
    </svg>
  )
}
