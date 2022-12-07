import i18next from "i18next";

import locales from "./locales";

const parrotI18n = i18next.createInstance({
  lng: "zh-CN",
  fallbackLng: "en-US",
  debug: true,
  interpolation: {
    prefix: "{",
    suffix: "}",
  },
  resources: {
    "en-US": {
      translation: {
        ...locales["en-US"],
      },
    },
    "zh-CN": {
      translation: {
        ...locales["zh-CN"],
      },
    },
  },
});

export default parrotI18n;

export const initParrotI18n = () => {
  parrotI18n.init({});
};
