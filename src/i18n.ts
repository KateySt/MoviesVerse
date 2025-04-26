// src/i18n.ts
import { createI18n } from 'vue-i18n'

const messages = {
  en: {
    message: {
      Home: 'Home',
      Movie: 'Movie',
      Back: 'Back',
      Next: 'Next',
      Original: 'Original',
      VideoAvailable: 'Video Available',
      NoVideo: 'No Video',
      notFound: 'No movies found. Try a different search keyword.',
      Search: 'Search by keyword...',
    },
  },
  it: {
    message: {
      Home: 'Home',
      Movie: 'Film',
      Back: 'Indietro',
      Next: 'Avanti',
      Original: 'Originale',
      VideoAvailable: 'Video disponibile',
      NoVideo: 'Nessun video',
      notFound: 'Nessun film trovato. Prova con una parola chiave diversa.',
      Search: 'Cerca per parola chiave...',
    },
  },
}

const i18n = createI18n({
  legacy: false,
  locale: ['en', 'it'].includes(navigator.language.split('-')[0])
    ? navigator.language.split('-')[0]
    : 'en',
  messages,
})

export default i18n
