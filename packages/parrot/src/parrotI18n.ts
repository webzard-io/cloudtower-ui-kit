import i18next, { Callback, InitOptions } from "i18next";
import merge from "lodash.merge";

import locales from "./locales";

const defaultOptions = {
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
  react: {
    useSuspense: false,
  },
};

const parrotI18n = i18next.createInstance(defaultOptions);

export default parrotI18n;

export const initParrotI18n = (
  options?: InitOptions,
  callback?: Callback | undefined
) => {
  if (!parrotI18n.isInitialized) {
    parrotI18n.init(merge(defaultOptions, options), callback);
  }
};
