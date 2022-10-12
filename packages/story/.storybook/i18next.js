import { initReactI18next } from "react-i18next";
import i18n from "i18next";
import { basic, business } from "@cloudtower/ui-i18n";

const resources = {
  en: {
    translation: {
      ...basic["en"].translation,
      ...business["en"].translation,
    },
  },
  "zh-CN": {
    translation: {
      ...basic["zh-CN"].translation,
      ...business["zh-CN"].translation,
    },
  },
};

i18n.use(initReactI18next).init({
  debug: true,
  lng: "zh-CN",
  fallbackLng: "en",
  resources,
});

export default i18n;
