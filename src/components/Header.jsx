import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ChevronDown, Menu, X } from './icons'
import { btnGhost, btnPrimary, Wrap } from './ui'

const NAV = [
  { label: 'Tentang', to: '/' },
  { label: 'Struktur', to: '/struktur' },
  { label: 'Keanggotaan', to: '/keanggotaan' },
  { label: 'Berita', to: '/berita' },
]

const CONTACTS = [
  { label: 'sekretariat@pakki.id', href: 'mailto:sekretariat@pakki.id' },
  {
    label: 'Instagram @pakki_pusat',
    href: 'https://www.instagram.com/pakki_pusat/',
    external: true,
  },
  {
    label: 'YouTube @pakkigroup7712',
    href: 'https://youtube.com/@pakkigroup7712',
    external: true,
  },
]

function NavUnderline({ active }) {
  return (
    <span
      className={`absolute bottom-[5px] left-[11px] right-[11px] h-px origin-left transition-transform duration-[180ms] ${
        active ? 'scale-x-100 bg-green' : 'scale-x-0 bg-current group-hover:scale-x-100'
      }`}
    />
  )
}

export default function Header() {
  const { pathname } = useLocation()
  const [contactOpen, setContactOpen] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [drawerContact, setDrawerContact] = useState(false)
  const contactRef = useRef(null)

  useEffect(() => {
    setContactOpen(false)
    setDrawerOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!contactOpen) return
    function onPointer(event) {
      if (contactRef.current && !contactRef.current.contains(event.target)) {
        setContactOpen(false)
      }
    }
    function onKey(event) {
      if (event.key === 'Escape') setContactOpen(false)
    }
    document.addEventListener('mousedown', onPointer)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onPointer)
      document.removeEventListener('keydown', onKey)
    }
  }, [contactOpen])

  useEffect(() => {
    function onKey(event) {
      if (event.key === 'Escape') setDrawerOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [drawerOpen])

  const navLinkClass =
    'group relative inline-flex items-center gap-[5px] whitespace-nowrap px-[11px] py-2.5 text-sm font-medium text-ink-2 transition-colors hover:text-ink max-[1080px]:px-2 max-[1080px]:py-[9px] max-[1080px]:text-[13px]'

  return (
    <>
      <header className="sticky top-0 z-[60] border-b border-rule bg-[rgba(251,251,249,.94)] backdrop-blur-[10px] backdrop-saturate-[1.4]">
        <Wrap className="flex min-h-[76px] items-center gap-6 max-[960px]:min-h-[68px]">
          <Link to="/" className="flex min-w-0 shrink-0 items-center gap-3" aria-label="PAKKI - Halaman utama">
            <img src="/assets/logo-pakki.png" alt="" className="h-[46px] w-auto shrink-0 max-[960px]:h-10" />
            <span className="grid leading-[1.15]">
              <b className="text-[17px] font-bold tracking-[-0.01em] text-ink">PAKKI</b>
              <small className="mt-[3px] max-w-[186px] font-sans text-[8px] font-normal uppercase leading-[1.5] tracking-[.1em] text-ink-3 max-[1080px]:max-w-[160px] max-[760px]:hidden">
                Perhimpunan Ahli Kesehatan Kerja Indonesia
              </small>
            </span>
          </Link>

          <nav className="ml-auto flex items-center max-[960px]:hidden" aria-label="Navigasi utama">
            {NAV.map((item) => {
              const active = item.to === '/' ? pathname === '/' : pathname.startsWith(item.to)
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  aria-current={active ? 'page' : undefined}
                  className={`${navLinkClass} ${active ? 'text-ink' : ''}`}
                >
                  {item.label}
                  <NavUnderline active={active} />
                </Link>
              )
            })}

            <div className="relative" ref={contactRef}>
              <button
                type="button"
                className={navLinkClass}
                aria-expanded={contactOpen}
                aria-haspopup="true"
                onClick={() => setContactOpen((open) => !open)}
              >
                Kontak
                <ChevronDown
                  size={12}
                  strokeWidth={2}
                  className={`transition-transform duration-[180ms] ${contactOpen ? 'rotate-180' : ''}`}
                />
                <span
                  className={`absolute bottom-[5px] left-[11px] right-[11px] h-px origin-left bg-current transition-transform duration-[180ms] ${
                    contactOpen ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}
                />
              </button>

              {contactOpen ? (
                <div className="absolute right-0 top-[calc(100%+8px)] z-[65] grid min-w-[272px] gap-0.5 rounded-lg border border-rule-2 bg-surface p-2 shadow-soft">
                  <div className="px-[11px] pb-1.5 pt-2 text-[9px] uppercase tracking-[.15em] text-ink-3">
                    Kontak Kami
                  </div>
                  {CONTACTS.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      {...(item.external ? { target: '_blank', rel: 'noopener' } : {})}
                      onClick={() => setContactOpen(false)}
                      className="rounded-sm px-3 py-2.5 text-[13px] text-ink-2 transition-colors hover:bg-wash hover:text-green-ink"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              ) : null}
            </div>
          </nav>

          <button
            type="button"
            className="ml-auto hidden h-11 w-11 items-center justify-center rounded-full border border-rule-2 hover:bg-wash max-[960px]:flex"
            aria-label="Buka menu"
            aria-expanded={drawerOpen}
            aria-controls="mobile-drawer"
            onClick={() => setDrawerOpen(true)}
          >
            <Menu size={20} />
          </button>
        </Wrap>
      </header>

      <div
        className={`fixed inset-0 z-[70] bg-green-ink/45 transition-opacity duration-[220ms] ${
          drawerOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={() => setDrawerOpen(false)}
        aria-hidden="true"
      />

      <aside
        id="mobile-drawer"
        aria-label="Menu navigasi"
        aria-hidden={!drawerOpen}
        inert={!drawerOpen}
        className={`fixed inset-y-0 right-0 z-[80] flex w-[min(360px,88vw)] flex-col border-l border-rule-2 bg-surface shadow-[-18px_0_48px_-28px_rgba(6,61,33,.4)] transition-transform duration-[260ms] ease-[cubic-bezier(.2,.7,.2,1)] ${
          drawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-rule px-5 py-3.5">
          <span className="flex items-center gap-3">
            <img src="/assets/logo-pakki.png" alt="PAKKI" className="h-9 w-auto" />
            <span className="grid leading-[1.15]">
              <b className="text-[17px] font-bold tracking-[-0.01em]">PAKKI</b>
            </span>
          </span>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-full border border-rule-2 hover:bg-wash"
            aria-label="Tutup menu"
            onClick={() => setDrawerOpen(false)}
          >
            <X size={18} />
          </button>
        </div>

        <nav className="grid gap-px overflow-y-auto p-2.5" aria-label="Navigasi seluler">
          {NAV.map((item) => {
            const active = item.to === '/' ? pathname === '/' : pathname.startsWith(item.to)
            return (
              <Link
                key={item.to}
                to={item.to}
                aria-current={active ? 'page' : undefined}
                className={`flex items-center justify-between rounded-md px-3 py-[13px] text-[15px] font-medium transition-colors hover:bg-wash ${
                  active ? 'bg-wash text-green-ink' : 'text-ink'
                }`}
              >
                {item.label}
              </Link>
            )
          })}

          <div>
            <button
              type="button"
              className="flex w-full items-center justify-between rounded-md px-3 py-[13px] text-[15px] font-medium transition-colors hover:bg-wash"
              aria-expanded={drawerContact}
              onClick={() => setDrawerContact((open) => !open)}
            >
              Kontak
              <ChevronDown
                size={13}
                className={`text-ink-3 transition-transform duration-[180ms] ${
                  drawerContact ? 'rotate-180' : ''
                }`}
              />
            </button>
            {drawerContact ? (
              <div className="grid gap-px pb-2 pl-3">
                {CONTACTS.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    {...(item.external ? { target: '_blank', rel: 'noopener' } : {})}
                    onClick={() => setDrawerOpen(false)}
                    className="min-h-[44px] rounded-md px-3 py-2.5 text-[11px] tracking-[.04em] text-ink-2 hover:bg-wash"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            ) : null}
          </div>
        </nav>

        <div className="mt-auto grid gap-2 border-t border-rule px-5 py-4">
          <Link to="/keanggotaan#verifikasi" className={`${btnPrimary} w-full`} onClick={() => setDrawerOpen(false)}>
            Cek Status Anggota
          </Link>
          <Link to="/keanggotaan#registrasi" className={`${btnGhost} w-full`} onClick={() => setDrawerOpen(false)}>
            Registrasi Anggota
          </Link>
        </div>
      </aside>
    </>
  )
}
