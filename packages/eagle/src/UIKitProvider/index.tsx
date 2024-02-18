import { parrotI18n, ParrotI18nSupportLng } from "@cloudtower/parrot";
import { BatchHelper, createBatchMessageMethods } from "@src/core";
import _message, { MessageApi } from "@src/core/message";
import { antdKit } from "@src/legacy-antd";
import { ConfigProvider } from "antd";
import enUS from "antd/lib/locale/en_US";
import zhCN from "antd/lib/locale/zh_CN";
import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
} from "react";

import { Kit } from "../spec";

export interface IProps {
  kit?: Kit;
  message?: {
    batch?: BatchHelper;
    maxCount?: number;
  };
  lng?: ParrotI18nSupportLng;
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
}

export const kitContext = createContext<Kit>(antdKit);

export const MessageContext = createContext<MessageApi>(_message);

const UIKitProvider = (props: PropsWithChildren<IProps>) => {
  const {
    children,
    kit = antdKit,
    message,
    lng = "en-US",
    getPopupContainer,
  } = props;

  const batchMessage = useMemo(() => {
    if (message?.batch != null) {
      return createBatchMessageMethods(_message, message.batch);
    }
  }, [message?.batch]);

  const _kit = useMemo(() => {
    return {
      ...kit,
      message: batchMessage ?? _message,
    };
  }, [batchMessage, kit]);

  useEffect(() => {
    _message.config({
      maxCount: message?.maxCount,
    });
  }, [message?.maxCount]);

  useEffect(() => {
    if (parrotI18n.language !== lng) {
      parrotI18n.changeLanguage(lng);
    }
  }, [lng]);

  return (
    <kitContext.Provider value={_kit}>
      <MessageContext.Provider value={batchMessage ?? _message}>
        <ConfigProvider
          autoInsertSpaceInButton={false}
          locale={lng === "zh-CN" ? zhCN : enUS}
          getPopupContainer={getPopupContainer}
        >
          {children}
        </ConfigProvider>
      </MessageContext.Provider>
    </kitContext.Provider>
  );
};

export default UIKitProvider;

/**
 * @deprecated 由于 useUIKit 会使 Treeshake 失效。不再推荐使用
 */
export const useUIKit = () => {
  return useContext(kitContext);
};

export const useMessage = () => {
  return useContext(MessageContext);
};
