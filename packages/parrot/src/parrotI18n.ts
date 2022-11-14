import i18next from "i18next";

import { enUS, zhCN } from "./locales";

const parrotI18n = i18next
  .createInstance({
    fallbackLng: "en",
    debug: true,
  })
  .init({
    resources: {
      en: {
        translation: {
          ...enUS.basic,
        },
      },
      "zh-CN": {
        translation: {
          ...zhCN.basic,
        },
      },
    },
  });

export default parrotI18n;
