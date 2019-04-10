import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { useTranslation } from 'react-i18next';
import en from './en'
import zh from './zh'
// the translations
// (tip move them in a JSON file and import them)
const resources = {
    en,
    zh,
};

i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        lng: "zh",
        keySeparator: false, // we do not use keys in form messages.welcome

        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });

export default i18n;