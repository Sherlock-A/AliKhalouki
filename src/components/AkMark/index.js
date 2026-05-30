/**
 * AK Apex Ligature — reusable SVG monogram
 * Design system: AK Identity v1 · 2026
 *
 * Props:
 *   size        — pixel size (default 48)
 *   variant     — 'dark' | 'light' | 'blue' (default 'dark')
 *   className   — extra CSS class
 *
 * Variants:
 *   dark   → white strokes + cyan accent  (on dark bg)
 *   light  → ink strokes + electric-blue accent (on white bg)
 *   blue   → white strokes + white accent (on accent bg)
 */

const ACCENT = {
  dark:  '#06B6D4',   // cyan
  light: '#2563EB',   // electric blue
  blue:  '#FFFFFF',
}

const MAIN = {
  dark:  '#FFFFFF',
  light: '#0E1116',
  blue:  '#FFFFFF',
}

const AkMark = ({ size = 48, variant = 'dark', className = '', style = {} }) => {
  const main   = MAIN[variant]   || MAIN.dark
  const accent = ACCENT[variant] || ACCENT.dark

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 116 124"
      fill="none"
      aria-label="AK monogram"
      className={className}
      style={style}
    >
      <g strokeWidth="10.5" strokeLinecap="round" strokeLinejoin="round">
        {/* A left diagonal */}
        <path stroke={main}   d="M16 108 L58 16" />
        {/* Shared spine */}
        <path stroke={main}   d="M58 16 L58 108" />
        {/* A crossbar */}
        <path stroke={main}   d="M33.5 70 L58 70" />
        {/* K upper arm — accent colour */}
        <path stroke={accent} d="M58 62 L100 16" />
        {/* K lower leg */}
        <path stroke={main}   d="M58 62 L100 108" />
      </g>
    </svg>
  )
}

export default AkMark
