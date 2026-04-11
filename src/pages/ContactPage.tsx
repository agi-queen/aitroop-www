import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Container } from '@radix-ui/themes'
import './ContactPage.css'

type Status = 'idle' | 'submitting' | 'success'

export default function ContactPage() {
  const { t } = useTranslation()
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [validationError, setValidationError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setValidationError('')

    if (!phone.trim() && !email.trim()) {
      setValidationError(t('contact.required'))
      return
    }

    setStatus('submitting')
    const subject = encodeURIComponent(`[AITroop Contact] ${name}`)
    const body = encodeURIComponent(`Name: ${name}\nPhone: ${phone}\nEmail: ${email}\n\n${message}`)
    window.location.href = `mailto:contact@aitroop.net?subject=${subject}&body=${body}`
    setStatus('success')
  }

  return (
    <div className="ct-root">
      <div className="ct-hero">
        <Container size="4">
          <div className="ct-eyebrow">{t('contact.eyebrow')}</div>
          <h1 className="ct-title">{t('contact.title')}</h1>
          <p className="ct-sub">{t('contact.sub')}</p>
        </Container>
      </div>

      <div className="ct-body">
        <Container size="4">
          <div className="ct-card">
            {status === 'success' ? (
              <div className="ct-success">
                <div className="ct-success-icon">✓</div>
                <div className="ct-success-title">{t('contact.success_title')}</div>
                <div className="ct-success-body">{t('contact.success_body')}</div>
              </div>
            ) : (
              <form className="ct-form" onSubmit={handleSubmit} noValidate>
                <div className="ct-field">
                  <label className="ct-label">{t('contact.name_label')}</label>
                  <input
                    className="ct-input"
                    type="text"
                    placeholder={t('contact.name_placeholder')}
                    value={name}
                    onChange={e => setName(e.target.value)}
                  />
                </div>

                <div className="ct-row">
                  <div className="ct-field">
                    <label className="ct-label">{t('contact.phone_label')}</label>
                    <input
                      className="ct-input"
                      type="tel"
                      placeholder={t('contact.phone_placeholder')}
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                    />
                  </div>
                  <div className="ct-field">
                    <label className="ct-label">{t('contact.email_label')}</label>
                    <input
                      className="ct-input"
                      type="email"
                      placeholder={t('contact.email_placeholder')}
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="ct-field">
                  <label className="ct-label">{t('contact.message_label')}</label>
                  <textarea
                    className="ct-textarea"
                    placeholder={t('contact.message_placeholder')}
                    rows={5}
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                  />
                </div>

                {validationError && (
                  <p className="ct-error">{validationError}</p>
                )}
                <button
                  className="ct-submit"
                  type="submit"
                  disabled={status === 'submitting'}
                >
                  {status === 'submitting' ? t('contact.submitting') : t('contact.submit')}
                </button>
              </form>
            )}
          </div>
        </Container>
      </div>
    </div>
  )
}
