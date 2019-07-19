import i18n from 'i18next';
import Backend from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { reactI18nextModule } from 'react-i18next';
import ElectronBackend from './electron-i18n-backend';

i18n.use(LanguageDetector).use(reactI18nextModule);

if (process.env.NODE_ENV === 'production') {
  const electron = window.require('electron');
  i18n.use(ElectronBackend).init({
    backend: {
      loadPath: `${electron.remote.app.getAppPath()}${__dirname}build/locales/{{lng}}/{{ns}}.json`
    },
    fallbackLng: 'en',
    ns: ['translations'],
    defaultNS: 'translations',
    debug: true,
    interpolation: {
      escapeValue: false // not needed for react
    }
  });
} else {
  i18n.use(Backend).init({
    fallbackLng: 'en',

    // have a common namespace used around the full app
    ns: ['translations'],
    defaultNS: 'translations',

    debug: true,

    interpolation: {
      escapeValue: false // not needed for react!!
    },

    react: {
      wait: true
    }
  });
}

export default i18n;
