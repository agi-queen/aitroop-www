import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import zh from './locales/zh.json'
import zhTW from './locales/zh-TW.json'
import en from './locales/en.json'

const savedLang = localStorage.getItem('lang') || 'zh'

i18n
  .use(initReactI18next)
  .init({
    resources: {
      zh:    { translation: zh },
      'zh-TW': { translation: zhTW },
      en:    { translation: en },
    },
    lng: savedLang,
    fallbackLng: 'zh',
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n
