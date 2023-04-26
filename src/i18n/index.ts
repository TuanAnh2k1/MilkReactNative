import {initReactI18next} from 'react-i18next';
import i18next from 'i18next';

import en from './locates/en';
import jp from './locates/ja';
import {getLanguage} from '../utils/store';
const DEFAULT_LANG = 'jp';

// export const getLanguage = (): string => {
//   const lan = getLocales();
//   try {
//     const primaryLocate = lan[0];
//     return primaryLocate.languageCode;
//   } catch (error) {
//     return DEFAULT_LANG;
//   }
// };

i18next.use(initReactI18next).init({
  interpolation: {
    // React already does escaping
    escapeValue: false,
  },
  compatibilityJSON: 'v3',
  lng: getLanguage(),
  debug: true,
  fallbackLng: DEFAULT_LANG,
  // Using simple hardcoded resources for simple example
  resources: {
    en: {
      translation: en,
    },
    jp: {
      translation: jp,
    },
  },
});

export default i18next;
