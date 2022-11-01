import { i18next, initI18n } from "@tower/i18n";
/* eslint-disable-next-line */
// @ts-ignore
import * as resources from "@tower/i18n/lib/locales";
import { initReactI18next } from "react-i18next";

type WindowWithI18n = Window & {
  __cloudtower_i18n__: {
    resources: typeof resources;
    i18next: typeof i18next;
  };
};

initI18n(
  {
    resources,
    debug: process.env.NODE_ENV === "development",
    interpolation: {
      prefix: "{",
      suffix: "}",
      escapeValue: false,
    },
    react: {
      bindI18n: "languageChanged addResource",
    },
  },
  [initReactI18next]
);

(window as unknown as WindowWithI18n).__cloudtower_i18n__ = {
  resources,
  i18next,
};

export default i18next;
