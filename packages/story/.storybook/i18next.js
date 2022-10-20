import { initReactI18next } from "react-i18next";
import i18n from "i18next";
import { zhCN, enUS } from "@cloudtower/parrot";

const resources = {
  en: {
    translation: {
      ...enUS.basic,
    },
  },
  "zh-CN": {
    translation: {
      // hello_world: "你好 世界",
      ...zhCN.basic,
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
