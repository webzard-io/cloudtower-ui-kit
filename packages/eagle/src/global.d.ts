import "i18next";

declare module "i18next" {
  interface i18n {
    reportNamespaces: ReportNamespaces;
    td: TFunction;
  }
}

declare global {
  interface Window {
    i18nBatchHelper: any;
    i18n: any;
  }
}
