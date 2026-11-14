import { Link } from 'react-router-dom'
import { ArrowRight, Info } from './icons'

export const btn =
  'inline-flex items-center justify-center gap-2 min-h-[44px] px-5 rounded-full text-sm font-semibold tracking-[-0.005em] border transition-all duration-[160ms] ease-[cubic-bezier(.2,.7,.2,1)] active:translate-y-px disabled:opacity-40 disabled:cursor-not-allowed'

export const btnPrimary = `${btn} border-green-ink bg-green-ink text-white shadow-btn hover:border-[#0A5230] hover:bg-[#0A5230] hover:shadow-[0_14px_26px_-14px_rgba(6,61,33,.62)]`

export const btnGhost = `${btn} border-rule-2 bg-transparent text-ink hover:border-ink-3 hover:bg-wash`

export const btnMint = `${btn} border-rule-2 bg-wash text-green-ink hover:border-ink-3 hover:bg-[#E3EAE4]`

export const btnLg = 'min-h-[50px] px-6 text-[15px]'

export const heroBtnPrimary =
  'inline-flex items-center justify-center gap-2 min-h-[50px] px-6 rounded-full text-[15px] font-semibold tracking-[-0.005em] border border-white bg-white text-green-ink shadow-[0_14px_30px_-20px_rgba(0,0,0,.7)] transition-all duration-[160ms] active:translate-y-px hover:border-[#EDF2ED] hover:bg-[#EDF2ED]'

export const heroBtnGhost =
  'inline-flex items-center justify-center gap-2 min-h-[50px] px-6 rounded-full text-[15px] font-semibold tracking-[-0.005em] border border-white/50 bg-transparent text-white transition-all duration-[160ms] active:translate-y-px hover:border-white/80 hover:bg-white/15'

export function Wrap({ className = '', children }) {
  return <div className={`mx-auto w-full max-w-[1180px] px-8 max-[600px]:px-5 ${className}`}>{children}</div>
}

export function Section({ id, tight = false, className = '', children }) {
  return (
    <section
      id={id}
      className={`${tight ? 'pb-[88px] pt-0 max-[760px]:pb-[60px]' : 'py-[88px] max-[760px]:py-[60px]'} ${className}`}
    >
      {children}
    </section>
  )
}

export function SectionHead({ title, lede, action, className = '' }) {
  return (
    <div
      className={`mb-10 grid grid-cols-[1fr_auto] items-end gap-8 border-t border-rule pt-5 max-[760px]:grid-cols-1 max-[760px]:items-start max-[760px]:gap-4 ${className}`}
    >
      <div>
        <h2 className="max-w-[26ch] text-[clamp(1.6rem,2.9vw,2.25rem)] tracking-[-0.03em]">{title}</h2>
        {lede ? <p className="mt-3 max-w-[60ch] text-[15px] text-ink-2">{lede}</p> : null}
      </div>
      {action}
    </div>
  )
}

export function LinkMore({ to, children }) {
  return (
    <Link
      to={to}
      className="group inline-flex items-center gap-2 whitespace-nowrap border-b border-rule-2 pb-1 text-[11px] uppercase tracking-[.1em] text-ink-2 transition-colors hover:border-green hover:text-green max-[760px]:py-3"
    >
      {children}
      <ArrowRight size={14} className="transition-transform duration-[180ms] group-hover:translate-x-[3px]" />
    </Link>
  )
}

export function Steps({ items, className = '' }) {
  return (
    <ol className={`mt-7 border-t border-rule max-[760px]:mt-6 ${className}`}>
      {items.map((item, i) => (
        <li key={item.title} className="grid grid-cols-[2.25rem_1fr] gap-3.5 border-b border-rule py-4">
          <span className="pt-[3px] text-[10px] tracking-[.06em] text-green">
            {String(i + 1).padStart(2, '0')}
          </span>
          <div>
            <b className="block text-sm font-semibold text-ink">{item.title}</b>
            <span className="mt-0.5 block text-[13px] leading-[1.55] text-ink-3">{item.body}</span>
          </div>
        </li>
      ))}
    </ol>
  )
}

export function Activities({ items }) {
  return (
    <div className="border-t border-rule-2">
      {items.map((item) => (
        <div
          key={item.title}
          className="grid grid-cols-[11rem_1fr] items-baseline gap-6 border-b border-rule py-[18px] max-[960px]:grid-cols-1 max-[960px]:gap-1"
        >
          <span className="text-[9px] uppercase tracking-[.14em] text-green">{item.tag}</span>
          <div>
            <h4 className="text-[15px] tracking-[-0.012em]">{item.title}</h4>
            <p className="mt-[3px] text-[13px] leading-[1.55] text-ink-3">{item.body}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export function Callout({ children, className = '' }) {
  return (
    <div
      className={`flex gap-3 rounded-md border border-rule-2 border-l-[3px] border-l-warn bg-surface px-5 py-4 text-[13px] leading-[1.6] text-ink-2 ${className}`}
    >
      <Info size={15} className="mt-0.5 shrink-0 text-warn" />
      <span>{children}</span>
    </div>
  )
}

export function PageHero({ crumb, title, lede }) {
  return (
    <section className="border-b border-rule bg-surface py-9 pb-[42px] max-[760px]:py-[26px] max-[760px]:pb-[30px]">
      <Wrap>
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-[9px] uppercase tracking-[.13em] text-ink-3">
          <Link to="/" className="transition-colors hover:text-green">
            Beranda
          </Link>
          <span className="text-rule-2">/</span>
          <span aria-current="page">{crumb}</span>
        </nav>
        <h1 className="mt-4 max-w-[26ch] text-[clamp(1.85rem,3.4vw,2.75rem)] leading-[1.08] tracking-[-0.028em]">
          {title}
        </h1>
        <p className="mt-3 max-w-[64ch] text-base leading-[1.7] text-ink-2">{lede}</p>
      </Wrap>
    </section>
  )
}

export function PageCta({ title, body, children, className = '' }) {
  return (
    <div
      className={`flex flex-wrap items-center justify-between gap-6 rounded-xl border border-rule-2 bg-surface px-9 py-8 shadow-soft max-[760px]:rounded-lg max-[760px]:px-[22px] max-[760px]:py-6 ${className}`}
    >
      <div>
        <h2 className="text-lg tracking-[-0.02em]">{title}</h2>
        <p className="mt-1 max-w-[52ch] text-[13px] text-ink-3">{body}</p>
      </div>
      {children}
    </div>
  )
}
