import { createContext, useContext, useState } from 'react'

import translations from './translations'

const I18nContext = createContext()

export const LANGS = ['fr', 'en', 'es', 'de']

export const I18nProvider = ({ children }) => {
  const [lang, setLang] = useState(
    () => localStorage.getItem('ak-lang') || 'fr'
  )

  const changeLang = (l) => {
    setLang(l)
    localStorage.setItem('ak-lang', l)
  }

  // t('home.job') → string
  // t('services.items') → array
  const t = (key) => {
    const keys = key.split('.')
    let val = translations[lang]
    for (const k of keys) {
      if (val == null) return key
      val = val[k]
    }
    return val ?? key
  }

  return (
    <I18nContext.Provider value={{ lang, changeLang, t }}>
      {children}
    </I18nContext.Provider>
  )
}

export const useI18n = () => useContext(I18nContext)
