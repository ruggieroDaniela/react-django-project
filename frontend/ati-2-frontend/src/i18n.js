import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import navbar_en from './locales/en/Navbar.json';
import registrar_en from "./locales/en/Registrar.json";
import multiform_en from "./locales/en/Multiform.json";
import general_en from "./locales/en/General.json";
import login_en from "./locales/en/IniciarSesion.json"
import servicios_en from "./locales/en/NuestrosServicios.json"
import buscar_personal_domestico_en from "./locales/en/BuscarPersonalDomestico.json"
import reset_password_en from "./locales/en/RestablecerContraseña.json"
import forgot_password_en from "./locales/en/ForgotPassword.json"
import OfrecermeNiñera_en from "./locales/en/OfrecermeNiñera.json"
import SolicitarNiñera_en  from './locales/en/SolicitarNiñera.json';
import OfrecermeCuidador_en from "./locales/en/OfrecermeCuidador.json"
import listar_publicaciones_en from "./locales/en/ListarPublicaciones.json"

import navbar_es from './locales/es/Navbar.json';
import registrar_es from "./locales/es/Registrar.json";
import multiform_es from "./locales/es/Multiform.json";
import general_es from "./locales/es/General.json";
import login_es from "./locales/es/IniciarSesion.json"
import servicios_es from "./locales/es/NuestrosServicios.json"
import buscar_personal_domestico_es from "./locales/es/BuscarPersonalDomestico.json"
import reset_password_es from "./locales/es/RestablecerContraseña.json"
import forgot_password_es from "./locales/es/ForgotPassword.json"
import OfrecermeNiñera_es from "./locales/es/OfrecermeNiñera.json"
import SolicitarNiñera_es  from './locales/es/SolicitarNiñera.json';
import OfrecermeCuidador_es from "./locales/es/OfrecermeCuidador.json"
import listar_publicaciones_es from "./locales/es/ListarPublicaciones.json"

const en = Object.assign(
  {},
  navbar_en,
  registrar_en,
  multiform_en,
  general_en,
  login_en,
  servicios_en,
  buscar_personal_domestico_en,
  OfrecermeNiñera_en,
  SolicitarNiñera_en,
  reset_password_en,
  forgot_password_en,
  OfrecermeNiñera_en,
  OfrecermeCuidador_en,
  listar_publicaciones_en

);

const es = Object.assign(
  {},
  navbar_es,
  registrar_es,
  multiform_es,
  general_es,
  login_es,
  servicios_es,
  buscar_personal_domestico_es,
  OfrecermeNiñera_es,
  SolicitarNiñera_es,
  reset_password_es,
  forgot_password_en,
  OfrecermeNiñera_es,
  OfrecermeCuidador_es,
  listar_publicaciones_es
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
