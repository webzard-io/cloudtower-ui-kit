import "antd";

import { i18n, Resource } from "i18next";

declare module "i18next" {
  interface i18n {
    reportNamespaces: ReportNamespaces;
    td: TFunction;
  }
}

declare module "antd/lib/modal" {
  export interface ModalProps {
    focusTriggerAfterClose?: boolean;
  }
}

declare global {
  interface Window {
    i18nBatchHelper: Record<
      string,
      {
        patterns: RegExp[];
        batchKey: string;
      }
    >;
    __cloudtower_i18n__?: {
      resources?: Resource;
      i18next?: i18n;
    };
  }
}
