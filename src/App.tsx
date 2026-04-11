import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import { Box, Container, Flex, Separator } from '@radix-ui/themes'
import { useTranslation } from 'react-i18next'
import i18n from './i18n'
import NewsroomPage from './pages/NewsroomPage'
import PitchPage from './pages/PitchPage'
import DigitalHumanPage from './pages/DigitalHumanPage'
import ContactPage from './pages/ContactPage'

const LANGS = [
  { code: 'zh',    label: '简' },
  { code: 'zh-TW', label: '繁' },
  { code: 'en',    label: 'EN' },
]

function LangSwitcher() {
  const { i18n: i18nInstance } = useTranslation()
  const current = i18nInstance.language

  function switchLang(code: string) {
    i18n.changeLanguage(code)
    localStorage.setItem('lang', code)
  }

  return (
    <div className="lang-switcher">
      {LANGS.map((l, idx) => (
        <span key={l.code} className="lang-switcher__item">
          {idx > 0 && <span className="lang-sep">·</span>}
          <button
            className={`lang-btn${current === l.code ? ' is-active' : ''}`}
            onClick={() => switchLang(l.code)}
          >
            {l.label}
          </button>
        </span>
      ))}
    </div>
  )
}

function Nav() {
  const { t } = useTranslation()
  return (
    <Box className="nav">
      <Container size="4">
        <Flex align="center" justify="between" className="nav-inner">
          <Link to="/" className="wordmark">
            <img src="/favicon.svg" alt="" className="nav-logo" />
            {t('common.brand')}
          </Link>
          <Flex align="center" gap="4">
            <LangSwitcher />
            <Link to="/contact" className="nav-contact-link">{t('nav.contact')}</Link>
          </Flex>
        </Flex>
      </Container>
    </Box>
  )
}

function Footer() {
  const { t } = useTranslation()
  return (
    <>
      <Separator size="4" />
      <Box className="footer">
        <Container size="4">
          <Flex align="center" justify="between" py="5">
            <span className="wordmark" style={{ fontSize: 14 }}>{t('common.brand')}</span>
            <span className="footer-copy">{t('common.footer_copy')}</span>
          </Flex>
        </Container>
      </Box>
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Box style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Nav />
        <Box style={{ flex: 1 }}>
          <Routes>
            <Route path="/"        element={<NewsroomPage />} />
            <Route path="/pitch"          element={<PitchPage />} />
            <Route path="/digital-human" element={<DigitalHumanPage />} />
            <Route path="/contact"       element={<ContactPage />} />
          </Routes>
        </Box>
        <Footer />
      </Box>
    </BrowserRouter>
  )
}
