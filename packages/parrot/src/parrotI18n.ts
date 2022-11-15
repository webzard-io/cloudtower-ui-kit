import i18next from "i18next";

import locales from "./locales";

const parrotI18n = i18next.createInstance({
  fallbackLng: "en",
  debug: true,
});

parrotI18n.init({
  resources: locales,
});

export default parrotI18n;
