import i18next, { Callback, InitOptions } from "i18next";

import locales from "./locales";

const parrotI18n = i18next.createInstance({
  lng: "zh-CN",
  fallbackLng: "en-US",
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

export const initParrotI18n = (
  options: InitOptions,
  callback?: Callback | undefined
) => {
  parrotI18n.init(options, callback);
};
