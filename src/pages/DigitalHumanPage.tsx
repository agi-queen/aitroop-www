import React, { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import './PitchPage.css'
import './DigitalHumanPage.css'

function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('is-revealed'); obs.disconnect() } },
      { threshold: 0.08 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return ref
}

// ── Types ──────────────────────────────────────────────────────────────

interface CardItem { icon: string; title: string; body: string }
interface StepItem { n: string; title: string; body: string; star: boolean }
interface FaqItem { q: string; a: string }
interface MilestoneItem { year: string; era: string; title: string; body: string }

// ── Shared components ──────────────────────────────────────────────────

function Section({ id, children, className = '' }: { id?: string; children: React.ReactNode; className?: string }) {
  const ref = useReveal()
  return (
    <section id={id} ref={ref} className={`p-section reveal-block ${className}`}>
      <div className="p-container">{children}</div>
    </section>
  )
}

function SectionHeader({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <div className="p-section-header">
      <div className="p-eyebrow">{eyebrow}</div>
      <h2 className="p-section-title">{title}</h2>
      {sub && <p className="p-section-sub">{sub}</p>}
    </div>
  )
}

// ── Sections ───────────────────────────────────────────────────────────

function Hero() {
  const { t } = useTranslation()
  const sec = t('digitalHuman.sections.hero', { returnObjects: true }) as Record<string, string>
  return (
    <Section id="dh-hero" className="p-section--alt dh-section--hero">
      <SectionHeader eyebrow={sec.eyebrow} title={sec.title} />
      <div className="p-industry-layout">
        <div className="p-industry-text">
          <p dangerouslySetInnerHTML={{ __html: sec.body1 }} />
          <p dangerouslySetInnerHTML={{ __html: sec.body2 }} />
        </div>
        <div className="p-industry-callout">
          <div className="p-callout-box">
            <div className="p-callout-icon">{sec.callout1_icon}</div>
            <div className="p-callout-text">
              <div className="p-callout-title">{sec.callout1_title}</div>
              <div className="p-callout-body">{sec.callout1_body}</div>
            </div>
          </div>
          <div className="p-callout-box">
            <div className="p-callout-icon">{sec.callout2_icon}</div>
            <div className="p-callout-text">
              <div className="p-callout-title">{sec.callout2_title}</div>
              <div className="p-callout-body">{sec.callout2_body}</div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}

function History() {
  const { t } = useTranslation()
  const sec = t('digitalHuman.sections.history', { returnObjects: true }) as Record<string, string>
  const milestones = t('digitalHuman.history_milestones', { returnObjects: true }) as MilestoneItem[]
  return (
    <Section id="dh-history">
      <SectionHeader eyebrow={sec.eyebrow} title={sec.title} sub={sec.sub} />
      <div className="dh-timeline-grid">
        {milestones.map((m, i) => (
          <div key={i} className="dh-milestone-card">
            <div className="dh-milestone-year">{m.year}</div>
            <div className="dh-milestone-era">{m.era}</div>
            <div className="dh-milestone-title">{m.title}</div>
            <div className="dh-milestone-body">{m.body}</div>
          </div>
        ))}
      </div>
    </Section>
  )
}

function WhyNeed() {
  const { t } = useTranslation()
  const sec = t('digitalHuman.sections.why_need', { returnObjects: true }) as Record<string, string>
  const items = t('digitalHuman.why_items', { returnObjects: true }) as CardItem[]
  return (
    <Section id="dh-why-need" className="p-section--alt">
      <SectionHeader eyebrow={sec.eyebrow} title={sec.title} />
      <div className="p-card-grid p-card-grid--3">
        {items.map((item, i) => (
          <div key={i} className="p-card">
            <div className="p-card-icon">{item.icon}</div>
            <div className="p-card-title">{item.title}</div>
            <div className="p-card-body">{item.body}</div>
          </div>
        ))}
      </div>
    </Section>
  )
}

function Capabilities() {
  const { t } = useTranslation()
  const sec = t('digitalHuman.sections.capabilities', { returnObjects: true }) as Record<string, string>
  const items = t('digitalHuman.capability_items', { returnObjects: true }) as CardItem[]
  const limitations = t('digitalHuman.limitation_items', { returnObjects: true }) as CardItem[]
  return (
    <Section id="dh-capabilities">
      <SectionHeader eyebrow={sec.eyebrow} title={sec.title} sub={sec.sub} />
      <div className="p-card-grid p-card-grid--4">
        {items.map((item, i) => (
          <div key={i} className="p-card">
            <div className="p-card-icon">{item.icon}</div>
            <div className="p-card-title">{item.title}</div>
            <div className="p-card-body">{item.body}</div>
          </div>
        ))}
      </div>
      <div className="dh-limitations">
        <div className="dh-limitations-header">
          <div className="p-eyebrow">{sec.limitations_eyebrow}</div>
          <h3 className="dh-limitations-title">{sec.limitations_title}</h3>
        </div>
        <div className="dh-limitations-grid">
          {limitations.map((item, i) => (
            <div key={i} className="dh-limitation-item">
              <span className="dh-limitation-icon">{item.icon}</span>
              <div>
                <div className="dh-limitation-title">{item.title}</div>
                <div className="dh-limitation-body">{item.body}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}

function Implementation() {
  const { t } = useTranslation()
  const sec = t('digitalHuman.sections.implementation', { returnObjects: true }) as Record<string, string>
  const steps = t('digitalHuman.implementation_steps', { returnObjects: true }) as StepItem[]
  return (
    <Section id="dh-implementation" className="p-section--alt">
      <SectionHeader eyebrow={sec.eyebrow} title={sec.title} sub={sec.sub} />
      <div className="dh-steps-grid">
        {steps.map((s, i) => (
          <div key={i} className={`p-step-card ${s.star ? 'p-step-card--star' : ''}`}>
            <div className="p-step-num">{s.n}</div>
            <div className="p-step-title">
              {s.title}
              {s.star && <span className="p-star-badge">{sec.star_badge}</span>}
            </div>
            <div className="p-step-body">{s.body}</div>
          </div>
        ))}
      </div>
    </Section>
  )
}

function KeyPoints() {
  const { t } = useTranslation()
  const sec = t('digitalHuman.sections.key_points', { returnObjects: true }) as Record<string, string>
  const items = t('digitalHuman.key_point_items', { returnObjects: true }) as CardItem[]
  return (
    <Section id="dh-key-points">
      <SectionHeader eyebrow={sec.eyebrow} title={sec.title} sub={sec.sub} />
      <div className="p-card-grid dh-key-points-grid">
        {items.map((item, i) => (
          <div key={i} className="p-card">
            <div className="p-card-icon">{item.icon}</div>
            <div className="p-card-title">{item.title}</div>
            <div className="p-card-body">{item.body}</div>
          </div>
        ))}
      </div>
    </Section>
  )
}

function FAQ() {
  const { t } = useTranslation()
  const sec = t('digitalHuman.sections.faq', { returnObjects: true }) as Record<string, string>
  const faqs = t('digitalHuman.faqs', { returnObjects: true }) as FaqItem[]
  const [open, setOpen] = useState<number | null>(null)
  return (
    <Section id="dh-faq" className="p-section--alt">
      <SectionHeader eyebrow={sec.eyebrow} title={sec.title} />
      <div className="p-faq-list">
        {faqs.map((f, i) => (
          <div key={i} className={`p-faq-item ${open === i ? 'is-open' : ''}`}>
            <button className="p-faq-q" onClick={() => setOpen(open === i ? null : i)}>
              <span>{f.q}</span>
              <span className="p-faq-chevron">{open === i ? '−' : '+'}</span>
            </button>
            {open === i && <div className="p-faq-a">{f.a}</div>}
          </div>
        ))}
      </div>
    </Section>
  )
}

function Ending() {
  const { t } = useTranslation()
  const sec = t('digitalHuman.sections.ending', { returnObjects: true }) as Record<string, string>
  return (
    <div className="p-ending">
      <div className="p-ending-inner">
        <div className="p-eyebrow p-eyebrow--light">{sec.eyebrow}</div>
        <h2 className="p-ending-title">{sec.title}</h2>
        <div className="p-ending-actions">
          <a href="/contact" className="p-btn-primary">{sec.cta_primary}</a>
          <a href="/" className="p-btn-ghost">{sec.cta_ghost}</a>
        </div>
        <p className="p-ending-contact">{sec.contact}</p>
      </div>
    </div>
  )
}

// ── Page ───────────────────────────────────────────────────────────────

export default function DigitalHumanPage() {
  return (
    <div className="pitch-root">
      <Hero />
      <History />
      <WhyNeed />
      <Capabilities />
      <Implementation />
      <KeyPoints />
      <FAQ />
      <Ending />
    </div>
  )
}
