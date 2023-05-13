import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import navbar_en from './locales/en/Navbar.json';
import registrar_en from "./locales/en/Registrar.json";
import multiform_en from "./locales/en/Multiform.json";
import general_en from "./locales/en/General.json";
import login_en from "./locales/en/IniciarSesion.json"

import navbar_es from './locales/es/Navbar.json';
import registrar_es from "./locales/es/Registrar.json";
import multiform_es from "./locales/es/Multiform.json";
import general_es from "./locales/es/General.json";
import login_es from "./locales/es/IniciarSesion.json"

const en = Object.assign(
  {},
  navbar_en,
  registrar_en,
  multiform_en,
  general_en,
  login_en
);

const es = Object.assign(
  {},
  navbar_es,
  registrar_es,
  multiform_es,
  general_es,
  login_es
);

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en: {
        translation: en
      },
      es: {
        translation: es
      }
    }
  });

export default i18n;
