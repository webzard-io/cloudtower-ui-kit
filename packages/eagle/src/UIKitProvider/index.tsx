import { parrotI18n, ParrotI18nSupportLng } from "@cloudtower/parrot";
import { antdKit } from "@src/antd";
import { BatchHelper, createBatchMessageMethods } from "@src/core";
import _message from "@src/core/message";
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

const UIKitProvider = (props: PropsWithChildren<IProps>) => {
  const {
    children,
    kit = antdKit,
    message,
    lng = "en-US",
    getPopupContainer,
  } = props;

  const _kit = useMemo(() => {
    if (message?.batch != null) {
      return {
        ...kit,
        message: createBatchMessageMethods(_message, message.batch),
      };
    }
    return kit;
  }, [kit, message?.batch]);

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
      <ConfigProvider
        autoInsertSpaceInButton={false}
        locale={lng === "zh-CN" ? zhCN : enUS}
        getPopupContainer={getPopupContainer}
      >
        {children}
      </ConfigProvider>
    </kitContext.Provider>
  );
};

export default UIKitProvider;

export const useUIKit = () => {
  return useContext(kitContext);
};
