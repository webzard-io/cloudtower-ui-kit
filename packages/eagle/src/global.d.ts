import "i18next";
import "antd";

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

declare module "antd/lib/modal" {
  export interface ModalProps {
    focusTriggerAfterClose?: boolean;
  }
}
