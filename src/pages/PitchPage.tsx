import React, { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import './PitchPage.css'

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
interface BeforeAfterItem { scenario: string; human: string; ai: string; boost: string }
interface ArchLayer { num: string; name: string; sub: string; body: string; star: boolean }
interface StepItem { n: string; title: string; body: string; star: boolean }
interface CaseItem { tag: string; title: string; subtitle: string; desc: string; metrics: { value: string; label: string }[] }
interface FaqItem { q: string; a: string }
// ── Shared components ─────────────────────────────────────────────────

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

// ── Sections ──────────────────────────────────────────────────────────

function Industry() {
  const { t } = useTranslation()
  const sec = t('pitch.sections.industry', { returnObjects: true }) as Record<string, string>
  return (
    <Section id="industry" className="p-section--industry">
      <SectionHeader eyebrow={sec.eyebrow} title={sec.title} />
      <div className="p-industry-layout">
        <div className="p-industry-text">
          <p dangerouslySetInnerHTML={{ __html: sec.body1 }} />
          <p dangerouslySetInnerHTML={{ __html: sec.body2 }} />
        </div>
        <div className="p-industry-callout">
          <img src="/ai-worker-2.png" alt="AI digital worker" className="p-industry-img" />
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

function Research() {
  const { t } = useTranslation()
  const sec = t('pitch.sections.research', { returnObjects: true }) as Record<string, unknown>
  const mckinseyStats = sec.mckinsey_stats as { value: string; label: string }[]
  const gartnerStats = sec.gartner_stats as { value: string; label: string }[]
  return (
    <Section id="research">
      <SectionHeader
        eyebrow={sec.eyebrow as string}
        title={sec.title as string}
        sub={sec.sub as string}
      />
      <div className="p-research-grid">
        <div className="p-research-card">
          <div className="p-research-source">{sec.mckinsey_source as string}</div>
          <div className="p-research-stats">
            {mckinseyStats.map((item, i) => (
              <div key={i} className="p-rs-item">
                <span className="p-rs-value">{item.value}</span>
                <span className="p-rs-label">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="p-research-card">
          <div className="p-research-source">{sec.gartner_source as string}</div>
          <div className="p-research-stats">
            {gartnerStats.map((item, i) => (
              <div key={i} className="p-rs-item">
                <span className="p-rs-value">{item.value}</span>
                <span className="p-rs-label">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="p-anthropic-card">
        <div className="p-anthropic-text">
          <div className="p-research-source">{sec.anthropic_source as string}</div>
          <p dangerouslySetInnerHTML={{ __html: sec.anthropic_body as string }} />
        </div>
        <img
          className="p-anthropic-img"
          src="https://www.anthropic.com/_next/image?url=https%3A%2F%2Fwww-cdn.anthropic.com%2Fimages%2F4zrzovbb%2Fwebsite%2Fc1952c81bca02a7c8cc05ef7801e67ca60831c55-4096x4096.png&w=1200&q=75"
          alt={sec.anthropic_img_alt as string}
        />
      </div>
    </Section>
  )
}

function PainPoints() {
  const { t } = useTranslation()
  const sec = t('pitch.sections.pain_points', { returnObjects: true }) as Record<string, string>
  const items = t('pitch.pain_points', { returnObjects: true }) as CardItem[]
  return (
    <Section id="pain-points" className="p-section--alt">
      <SectionHeader eyebrow={sec.eyebrow} title={sec.title} />
      <div className="p-card-grid p-card-grid--3">
        {items.map((p, i) => (
          <div key={i} className="p-card">
            <div className="p-card-icon">{p.icon}</div>
            <div className="p-card-title">{p.title}</div>
            <div className="p-card-body">{p.body}</div>
          </div>
        ))}
      </div>
    </Section>
  )
}

function Solution() {
  const { t } = useTranslation()
  const sec = t('pitch.sections.solution', { returnObjects: true }) as Record<string, string>
  const features = t('pitch.solution_features', { returnObjects: true }) as CardItem[]
  const beforeAfter = t('pitch.before_after', { returnObjects: true }) as BeforeAfterItem[]
  return (
    <Section id="solution">
      <SectionHeader eyebrow={sec.eyebrow} title={sec.title} sub={sec.sub} />
      <div className="p-card-grid p-card-grid--4">
        {features.map((f, i) => (
          <div key={i} className="p-card">
            <div className="p-card-icon">{f.icon}</div>
            <div className="p-card-title">{f.title}</div>
            <div className="p-card-body">{f.body}</div>
          </div>
        ))}
      </div>
      <div className="p-before-after">
        <div className="p-ba-header">
          <div className="p-eyebrow">{sec.ba_eyebrow}</div>
          <h3 className="p-ba-title">{sec.ba_title}</h3>
        </div>
        <div className="p-ba-table-wrap">
          <table className="p-ba-table">
            <thead>
              <tr>
                <th>{sec.ba_col_scenario}</th>
                <th>{sec.ba_col_human}</th>
                <th>{sec.ba_col_ai}</th>
                <th>{sec.ba_col_boost}</th>
              </tr>
            </thead>
            <tbody>
              {beforeAfter.map((row, i) => (
                <tr key={i}>
                  <td className="p-ba-scenario">{row.scenario}</td>
                  <td className="p-ba-human">{row.human}</td>
                  <td className="p-ba-ai">{row.ai}</td>
                  <td className="p-ba-boost"><span className="p-boost-badge">{row.boost}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Section>
  )
}

function Architecture() {
  const { t } = useTranslation()
  const sec = t('pitch.sections.architecture', { returnObjects: true }) as Record<string, string>
  const layers = t('pitch.arch_layers', { returnObjects: true }) as ArchLayer[]
  return (
    <Section id="architecture" className="p-section--alt">
      <SectionHeader eyebrow={sec.eyebrow} title={sec.title} sub={sec.sub} />
      <div className="p-arch-layers">
        {layers.map((l, i) => (
          <div key={i} className={`p-arch-layer ${l.star ? 'p-arch-layer--star' : ''}`}>
            <div className="p-arch-num">{l.num}</div>
            <div className="p-arch-content">
              <div className="p-arch-name">
                {l.name}
                {l.star && <span className="p-star-badge">{sec.star_badge}</span>}
              </div>
              <div className="p-arch-sub">{l.sub}</div>
              <div className="p-arch-body">{l.body}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="p-workflow-compare">
        <div className="p-wf-card">
          <div className="p-wf-tag">{sec.wf_tag}</div>
          <div className="p-wf-title">{sec.wf_title}</div>
          <div className="p-wf-body">{sec.wf_body}</div>
        </div>
        <div className="p-wf-divider">vs</div>
        <div className="p-wf-card p-wf-card--dark">
          <div className="p-wf-tag">{sec.agent_tag}</div>
          <div className="p-wf-title">{sec.agent_title}</div>
          <div className="p-wf-body">{sec.agent_body}</div>
        </div>
      </div>
    </Section>
  )
}

function Methodology() {
  const { t } = useTranslation()
  const sec = t('pitch.sections.methodology', { returnObjects: true }) as Record<string, string>
  const steps = t('pitch.steps', { returnObjects: true }) as StepItem[]
  return (
    <Section id="methodology">
      <SectionHeader eyebrow={sec.eyebrow} title={sec.title} sub={sec.sub} />
      <div className="p-steps-grid">
        {steps.map((s, i) => (
          <div key={i} className={`p-step-card ${s.star ? 'p-step-card--star' : ''}`}>
            <div className="p-step-num">{s.n}</div>
            <div className="p-step-title">
              {s.title}
              {s.star && <span className="p-star-badge">★</span>}
            </div>
            <div className="p-step-body">{s.body}</div>
          </div>
        ))}
      </div>
    </Section>
  )
}

function CostROI() {
  const { t } = useTranslation()
  const sec = t('pitch.sections.cost_roi', { returnObjects: true }) as Record<string, unknown>
  const costItems = sec.cost_items as { name: string; note: string }[]
  const roiItems = sec.roi_items as string[]
  return (
    <Section id="cost-roi" className="p-section--alt">
      <SectionHeader eyebrow={sec.eyebrow as string} title={sec.title as string} />
      <div className="p-cost-layout">
        <div className="p-cost-col">
          <div className="p-cost-label">{sec.input_label as string}</div>
          {costItems.map((item, i) => (
            <div key={i} className="p-cost-item">
              <span className="p-cost-name">{item.name}</span>
              <span className="p-cost-note">{item.note}</span>
            </div>
          ))}
        </div>
        <div className="p-roi-col">
          <div className="p-roi-number">{sec.roi_number as string}</div>
          <div className="p-roi-label">{sec.roi_label as string}</div>
          <div className="p-roi-items">
            {roiItems.map((item, i) => (
              <div key={i} className="p-roi-item">{item}</div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}

function Security() {
  const { t } = useTranslation()
  const sec = t('pitch.sections.security', { returnObjects: true }) as Record<string, string>
  const items = t('pitch.security', { returnObjects: true }) as CardItem[]
  return (
    <Section id="security">
      <SectionHeader eyebrow={sec.eyebrow} title={sec.title} />
      <div className="p-card-grid p-card-grid--4">
        {items.map((s, i) => (
          <div key={i} className="p-card">
            <div className="p-card-icon">{s.icon}</div>
            <div className="p-card-title">{s.title}</div>
            <div className="p-card-body">{s.body}</div>
          </div>
        ))}
      </div>
    </Section>
  )
}

function Services() {
  const { t } = useTranslation()
  const sec = t('pitch.sections.services', { returnObjects: true }) as Record<string, string>
  const items = t('pitch.services', { returnObjects: true }) as CardItem[]
  return (
    <Section id="services" className="p-section--alt">
      <SectionHeader eyebrow={sec.eyebrow} title={sec.title} />
      <div className="p-card-grid p-card-grid--4">
        {items.map((s, i) => (
          <div key={i} className="p-card">
            <div className="p-card-icon">{s.icon}</div>
            <div className="p-card-title">{s.title}</div>
            <div className="p-card-body">{s.body}</div>
          </div>
        ))}
      </div>
    </Section>
  )
}

function CaseStudies() {
  const { t } = useTranslation()
  const sec = t('pitch.sections.cases', { returnObjects: true }) as Record<string, string>
  const cases = t('pitch.cases', { returnObjects: true }) as CaseItem[]
  return (
    <Section id="cases">
      <SectionHeader eyebrow={sec.eyebrow} title={sec.title} />
      <div className="p-cases-grid">
        {cases.map((c, i) => (
          <div key={i} className="p-case-card">
            <div className="p-case-tag">{c.tag}</div>
            <div className="p-case-title">{c.title}</div>
            <div className="p-case-subtitle">{c.subtitle}</div>
            <div className="p-case-desc">{c.desc}</div>
            <div className="p-case-metrics">
              {c.metrics.map((m, j) => (
                <div key={j} className="p-case-metric">
                  <div className="p-metric-value">{m.value}</div>
                  <div className="p-metric-label">{m.label}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}

function About() {
  const { t } = useTranslation()
  const sec = t('pitch.sections.about', { returnObjects: true }) as Record<string, unknown>
  const principles = sec.principles as { icon: string; title: string; body: string }[]
  return (
    <Section id="about" className="p-section--alt">
      <div className="p-about-layout">
        <div className="p-about-left">
          <div className="p-eyebrow">{sec.eyebrow as string}</div>
          <h2 className="p-section-title">{sec.title as string}</h2>
          <p className="p-about-text">{sec.text as string}</p>
        </div>
        <div className="p-about-principles">
          {principles.map((p, i) => (
            <div key={i} className="p-principle">
              <div className="p-principle-icon">{p.icon}</div>
              <div>
                <div className="p-principle-title">{p.title}</div>
                <div className="p-principle-body">{p.body}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}

function FAQ() {
  const { t } = useTranslation()
  const sec = t('pitch.sections.faq', { returnObjects: true }) as Record<string, string>
  const faqs = t('pitch.faqs', { returnObjects: true }) as FaqItem[]
  const [open, setOpen] = useState<number | null>(null)
  return (
    <Section id="faq">
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
  const sec = t('pitch.sections.ending', { returnObjects: true }) as Record<string, string>
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

// ── Page ──────────────────────────────────────────────────────────────

export default function PitchPage() {
  return (
    <div className="pitch-root">
      <Industry />
      <Research />
      <PainPoints />
      <Solution />
      <Architecture />
      <Methodology />
      <CostROI />
      <Security />
      <Services />
      <CaseStudies />
      <About />
      <FAQ />
      <Ending />
    </div>
  )
}
