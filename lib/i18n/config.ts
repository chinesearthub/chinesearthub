import { createInstance } from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '@/public/locales/en/common.json';
import zh from '@/public/locales/zh/common.json';

export const i18n = createInstance({
  lng: 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
  resources: {
    en: { common: en },
    zh: { common: zh },
  },
}).use(initReactI18next);
