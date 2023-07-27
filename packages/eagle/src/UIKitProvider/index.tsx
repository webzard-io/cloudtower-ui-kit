import { parrotI18n, ParrotI18nSupportLng } from "@cloudtower/parrot";
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

import { BatchHelper, createBatchMessageMethods } from "../components";
import { antdKit } from "../components/antd";
import { Kit } from "../spec";

interface IProps {
  kit?: Kit;
  message?: {
    batch?: BatchHelper;
    config?: {
      maxCount?: number;
    };
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
    if (message?.batch != null || message?.config) {
      const newMessage = createBatchMessageMethods(message.batch);
      newMessage.config(message?.config || {});
      return {
        ...kit,
        message: {
          ...newMessage,
        },
      };
    }
    const newMessage = createBatchMessageMethods();
    newMessage.config(message?.config || {});
    return {
      ...kit,
      message: {
        ...newMessage,
      },
    };
  }, [kit, message?.batch, message?.config]);

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
