import "antd";

declare module "antd/lib/modal" {
  export interface ModalProps {
    focusTriggerAfterClose?: boolean;
  }
}

declare global {
  interface Window {
    i18nBatchHelper?: Record<
      string,
      {
        patterns: RegExp[];
        batchKey: string;
      }
    >;
  }
}
