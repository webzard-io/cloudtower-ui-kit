import i18next, { Callback, InitOptions } from "i18next";
import merge from "lodash.merge";

import locales from "./locales";

export enum ParrotLngs {
  zh = "zh-CN",
  en = "en-US",
  ja = "ja-JP",
}

const defaultOptions: InitOptions = {
  lng: ParrotLngs.zh,
  compatibilityJSON: "v3",
  fallbackLng: {
    [ParrotLngs.ja]: [ParrotLngs.en, ParrotLngs.zh],
    default: [ParrotLngs.zh, ParrotLngs.en],
  },
  interpolation: {
    prefix: "{",
    suffix: "}",
    escapeValue: false,
  },
  resources: {
    [ParrotLngs.en]: locales["en-US"],
    [ParrotLngs.ja]: locales["ja-JP"],
    [ParrotLngs.zh]: locales["zh-CN"],
  },
  nsSeparator: ".",
  ns: Object.keys(locales["zh-CN"]),
  react: {
    useSuspense: false,
  },
};

const parrotI18n = i18next.createInstance(defaultOptions);

export default parrotI18n;

export const initParrotI18n = (
  options?: InitOptions,
  callback?: Callback | undefined,
) => {
  const finalResources =
    merge(defaultOptions.resources, options?.resources) || {};
  const finalNameSpaces = Object.keys(finalResources[ParrotLngs.zh]);
  if (!parrotI18n.isInitialized) {
    parrotI18n.init(
      {
        ...merge(defaultOptions, options),
        resources: finalResources,
        ns: finalNameSpaces,
      },
      callback,
    );
  }
};
