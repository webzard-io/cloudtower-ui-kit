import i18n from "./i18next";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  i18n,
  locale: "zh-CN",
  locales: {
    en: "English",
    "zh-CN": "简体中文",
  },
};
