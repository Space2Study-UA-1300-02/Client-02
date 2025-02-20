import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import resources from '~/constants/translations'

export const supportedLngs = {
  en: 'English',
  ua: 'Українська'
}

const savedLanguage = localStorage.getItem('language') || 'en'

void i18n.use(initReactI18next).init({
  resources,
  lng: savedLanguage,
  ns: ['translations'],
  supportedLngs: Object.keys(supportedLngs),
  fallbackLng: 'en'
})

i18n.languages = ['en', 'ua']

export const changeLanguage = (lng: string) => {
  i18n.changeLanguage(lng).then(() => {
    localStorage.setItem('language', lng)
  })
}

export default i18n
