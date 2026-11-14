function Svg({ size = 16, className = '', strokeWidth = 2, children }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {children}
    </svg>
  )
}

export const ArrowRight = (p) => (
  <Svg {...p} strokeWidth={p.strokeWidth ?? 2.2}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Svg>
)

export const ShieldCheck = (p) => (
  <Svg {...p} strokeWidth={p.strokeWidth ?? 2.2}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="m9 12 2 2 4-4" />
  </Svg>
)

export const Instagram = ({ size = 16, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
  </svg>
)

export const YouTube = ({ size = 16, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <rect x="2" y="5" width="20" height="14" rx="4" />
    <path d="m10 9 5 3-5 3z" fill="currentColor" stroke="none" />
  </svg>
)

export const Mail = (p) => (
  <Svg {...p}>
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-10 6L2 7" />
  </Svg>
)

export const MapPin = (p) => (
  <Svg {...p}>
    <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0z" />
    <circle cx="12" cy="10" r="2.6" />
  </Svg>
)

export const ChevronDown = (p) => (
  <Svg {...p} strokeWidth={p.strokeWidth ?? 2.4}>
    <path d="m6 9 6 6 6-6" />
  </Svg>
)

export const Menu = (p) => (
  <Svg {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </Svg>
)

export const X = (p) => (
  <Svg {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </Svg>
)

export const Search = (p) => (
  <Svg {...p} strokeWidth={p.strokeWidth ?? 2.2}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.2-3.2" />
  </Svg>
)

export const Info = (p) => (
  <Svg {...p} strokeWidth={p.strokeWidth ?? 2.2}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 8h.01M11 12h1v4h1" />
  </Svg>
)

export const Check = (p) => (
  <Svg {...p} strokeWidth={p.strokeWidth ?? 2.6}>
    <path d="m5 12 4 4 10-10" />
  </Svg>
)

export const User = (p) => (
  <Svg {...p} strokeWidth={p.strokeWidth ?? 1.4}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21c0-4 3.6-7 8-7s8 3 8 7" />
  </Svg>
)
