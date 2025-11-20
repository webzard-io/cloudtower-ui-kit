import { parrotI18n, ParrotI18nSupportLng } from "@cloudtower/parrot";
import {
  BatchHelper,
  createBatchMessageMethods,
  MessageContext,
} from "@src/core";
import _message, {
  ConfigOptions as MessageConfigOptions,
} from "@src/core/message/message";
import { antdKit } from "@src/legacy-antd";
import { omit } from "lodash";
import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
} from "react";

import { ConfigProps, ConfigProvider } from "../core/ConfigProvider";
import { Kit } from "../spec";

type MessageConfigOptionsType = MessageConfigOptions;
export interface IProps {
  kit?: Kit;
  message?: MessageConfigOptionsType & {
    batch?: BatchHelper;
  };
  lng?: ParrotI18nSupportLng;
  config?: ConfigProps;
}

export const kitContext = createContext<Kit>(antdKit);

const UIKitProvider = (props: PropsWithChildren<IProps>) => {
  const { children, kit = antdKit, message, lng = "en-US", config } = props;

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
      ...omit(message, "batch"),
      configProviderProps: config,
    });
  }, [message, config]);

  useEffect(() => {
    if (parrotI18n.language !== lng) {
      parrotI18n.changeLanguage(lng);
    }
  }, [lng]);

  return (
    <kitContext.Provider value={_kit}>
      <ConfigProvider {...config}>
        <MessageContext.Provider value={batchMessage ?? _message}>
          {children}
        </MessageContext.Provider>
      </ConfigProvider>
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
