import enUS from "./en-US";
import jaJP from "./ja-JP";
import zhCN from "./zh-CN";

const locales = {
  "en-US": enUS,
  "ja-JP": jaJP,
  "zh-CN": zhCN,
};

export default locales;

export type ParrotI18nSupportLng = keyof typeof locales;
