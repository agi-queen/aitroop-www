import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Container } from '@radix-ui/themes'
import { useTranslation } from 'react-i18next'

interface ArticleBase {
  id: string
  image: string
  url?: string
}

// Full shape after merging with i18n translations
interface Article extends ArticleBase {
  date: string
  category: string
  title: string
  excerpt: string
}

const STATIC_ARTICLES: ArticleBase[] = [
  {
    id: 'digital-human-2026',
    image: '/digital-human.png',
    url: '/digital-human',
  },
  {
    id: 'pitch-2026',
    image: '/ai-worker-2.png',
    url: '/pitch',
  },
]

function SearchIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 17 17" fill="none" aria-hidden="true">
      <circle cx="7.5" cy="7.5" r="5.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 12L15.5 15.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

function ArticleCard({ article }: { article: Article }) {
  const { t } = useTranslation()
  const body = (
    <div className="nr-card">
      <div className="nr-card-img" style={{ backgroundImage: `url(${article.image})` }} />
      <div className="nr-card-body">
        <div className="nr-card-meta">
          <span className="nr-card-cat">{article.category}</span>
          <span className="nr-card-sep">·</span>
          <span className="nr-card-date">{article.date}</span>
        </div>
        <h3 className="nr-card-title">{article.title}</h3>
        <p className="nr-card-excerpt">{article.excerpt}</p>
        <span className="nr-card-read">{t('newsroom.read_more')}</span>
      </div>
    </div>
  )
  return article.url
    ? <Link to={article.url} className="nr-card-link">{body}</Link>
    : <div className="nr-card-link">{body}</div>
}

export default function NewsroomPage() {
  const { t, i18n } = useTranslation()
  const allCategory = t('newsroom.all_category')

  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState(allCategory)

  // Re-merge translations whenever language changes
  const articles = useMemo<Article[]>(() =>
    STATIC_ARTICLES.map(b => ({
      ...b,
      ...(t(`newsroom.articles.${b.id}`, { returnObjects: true }) as {
        date: string; category: string; title: string; excerpt: string
      }),
    })),
    [i18n.language, t]
  )

  const categories = useMemo(
    () => [allCategory, ...Array.from(new Set(articles.map(a => a.category)))],
    [articles, allCategory]
  )

  // Reset active category when language changes to avoid stale filter
  useEffect(() => {
    setActiveCategory(allCategory)
  }, [allCategory])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return articles.filter(a => {
      const matchCat = activeCategory === allCategory || a.category === activeCategory
      const matchQ = !q || a.title.toLowerCase().includes(q) || a.excerpt.toLowerCase().includes(q)
      return matchCat && matchQ
    })
  }, [articles, query, activeCategory, allCategory])

  return (
    <div className="nr-root">

      {/* ── Hero ─────────────────────────────────────────── */}
      <div className="nr-hero">
        <Container size="4">
          <h1 className="nr-heading">{t('newsroom.heading')}</h1>
        </Container>
      </div>

      {/* ── Toolbar ──────────────────────────────────────── */}
      <div className="nr-toolbar">
        <Container size="4">
          <label className="nr-search-wrap">
            <span className="nr-search-icon"><SearchIcon /></span>
            <input
              className="nr-search"
              type="search"
              placeholder={t('newsroom.search_placeholder')}
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
            {query && (
              <button className="nr-clear" onClick={() => setQuery('')} aria-label={t('newsroom.clear_search')}>✕</button>
            )}
          </label>
          {categories.length > 1 && (
            <div className="nr-filters">
              {categories.map(c => (
                <button
                  key={c}
                  className={`nr-filter${activeCategory === c ? ' is-active' : ''}`}
                  onClick={() => setActiveCategory(c)}
                >
                  {c}
                </button>
              ))}
            </div>
          )}
        </Container>
      </div>

      {/* ── Articles ─────────────────────────────────────── */}
      <div className="nr-articles">
        <Container size="4">
          {filtered.length === 0 ? (
            <p className="nr-status">{t('newsroom.no_results')}</p>
          ) : (
            <div className="nr-grid">
              {filtered.map(a => <ArticleCard key={a.id} article={a} />)}
            </div>
          )}
        </Container>
      </div>

    </div>
  )
}
