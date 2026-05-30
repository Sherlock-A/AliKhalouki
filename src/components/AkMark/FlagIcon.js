/* Tiny SVG country flags — 22×15 px */

export const FlagFR = () => (
  <svg width="28" height="19" viewBox="0 0 3 2" aria-label="Français">
    <rect width="1" height="2" fill="#0055A4" />
    <rect x="1" width="1" height="2" fill="#FFFFFF" />
    <rect x="2" width="1" height="2" fill="#EF4135" />
  </svg>
)

export const FlagGB = () => (
  <svg width="28" height="19" viewBox="0 0 60 40" aria-label="English">
    <rect width="60" height="40" fill="#00247D" />
    {/* White diagonals */}
    <path d="M0,0 L60,40 M60,0 L0,40" stroke="#fff" strokeWidth="8" />
    {/* Red diagonals */}
    <path d="M0,0 L60,40" stroke="#CF142B" strokeWidth="5" />
    <path d="M60,0 L0,40" stroke="#CF142B" strokeWidth="5" />
    {/* White cross */}
    <rect x="25" width="10" height="40" fill="#fff" />
    <rect y="15" width="60" height="10" fill="#fff" />
    {/* Red cross */}
    <rect x="27" width="6" height="40" fill="#CF142B" />
    <rect y="17" width="60" height="6" fill="#CF142B" />
  </svg>
)

export const FlagES = () => (
  <svg width="28" height="19" viewBox="0 0 3 2" aria-label="Español">
    <rect width="3" height="2" fill="#AA151B" />
    <rect y="0.5" width="3" height="1" fill="#F1BF00" />
  </svg>
)

export const FlagDE = () => (
  <svg width="28" height="19" viewBox="0 0 5 3" aria-label="Deutsch">
    <rect width="5" height="1" fill="#000000" />
    <rect y="1" width="5" height="1" fill="#DD0000" />
    <rect y="2" width="5" height="1" fill="#FFCE00" />
  </svg>
)
