import "i18next";
import "antd";

import * as resources from "@tower/i18n/lib/locales";

declare module "i18next" {
  interface i18n {
    reportNamespaces: ReportNamespaces;
    td: TFunction;
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
    __cloudtower_i18n__: {
      resources: typeof resources;
      i18next: typeof i18next;
    };
  }
}

declare module "antd/lib/modal" {
  export interface ModalProps {
    focusTriggerAfterClose?: boolean;
  }
}

declare module "antd/lib/modal" {
  export interface ModalProps {
    focusTriggerAfterClose?: boolean;
  }
}

declare module "antd/lib/modal" {
  export interface ModalProps {
    focusTriggerAfterClose?: boolean;
  }
}

declare module "antd/lib/modal" {
  export interface ModalProps {
    focusTriggerAfterClose?: boolean;
  }
}

declare module "antd/lib/modal" {
  export interface ModalProps {
    focusTriggerAfterClose?: boolean;
  }
}
