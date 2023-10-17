import CheckCircleFilled from "@ant-design/icons/CheckCircleFilled";
import CloseCircleFilled from "@ant-design/icons/CloseCircleFilled";
import ExclamationCircleFilled from "@ant-design/icons/ExclamationCircleFilled";
import InfoCircleFilled from "@ant-design/icons/InfoCircleFilled";
import LoadingOutlined from "@ant-design/icons/LoadingOutlined";
import RCNotification from "@cloudtower/rc-notification";
import ConfigProvider, { globalConfig } from "antd/lib/config-provider";
import { MessageApi, MessageType } from "antd/lib/message";
import createUseMessage from "antd/lib/message/hooks/useMessage";
import classNames from "classnames";
import {
  NoticeContent,
  NotificationInstance as RCNotificationInstance,
} from "rc-notification/lib/Notification";
import * as React from "react";
export type {
  MessageApi,
  MessageInstance,
  MessageType,
} from "antd/lib/message";

type NoticeType = "info" | "success" | "error" | "warning" | "loading";

let messageInstance: RCNotificationInstance | null;
let defaultDuration = 3;
let defaultTop: number;
let key = 1;
let localPrefixCls = "ant-message";
let transitionName = "move-up";
let hasTransitionName = false;
let getContainer: () => HTMLElement;
let maxCount: number;
let rtl = false;

export function getKeyThenIncreaseKey() {
  return key++;
}

export interface ConfigOptions {
  top?: number;
  duration?: number;
  prefixCls?: string;
  getContainer?: () => HTMLElement;
  transitionName?: string;
  maxCount?: number;
  rtl?: boolean;
}

function setMessageConfig(options: ConfigOptions) {
  if (options.top !== undefined) {
    defaultTop = options.top;
    messageInstance = null; // delete messageInstance for new defaultTop
  }
  if (options.duration !== undefined) {
    defaultDuration = options.duration;
  }
  if (options.prefixCls !== undefined) {
    localPrefixCls = options.prefixCls;
  }
  if (options.getContainer !== undefined) {
    getContainer = options.getContainer;
  }
  if (options.transitionName !== undefined) {
    transitionName = options.transitionName;
    messageInstance = null; // delete messageInstance for new transitionName
    hasTransitionName = true;
  }
  if (options.maxCount !== undefined) {
    maxCount = options.maxCount;
    messageInstance = null;
  }
  if (options.rtl !== undefined) {
    rtl = options.rtl;
  }
}

function getRCNotificationInstance(
  args: ArgsProps,
  callback: (info: {
    prefixCls: string;
    rootPrefixCls: string;
    iconPrefixCls: string;
    instance: RCNotificationInstance;
  }) => void,
) {
  const {
    prefixCls: customizePrefixCls,
    getPopupContainer: getContextPopupContainer,
  } = args;
  const { getPrefixCls, getRootPrefixCls, getIconPrefixCls } = globalConfig();
  const prefixCls = getPrefixCls(
    "message",
    customizePrefixCls || localPrefixCls,
  );
  const rootPrefixCls = getRootPrefixCls(args.rootPrefixCls, prefixCls);
  const iconPrefixCls = getIconPrefixCls();
  if (messageInstance) {
    callback({
      prefixCls,
      instance: messageInstance,
      rootPrefixCls,
      iconPrefixCls,
    });
    return;
  }

  const instanceConfig = {
    prefixCls,
    transitionName: hasTransitionName
      ? transitionName
      : `${rootPrefixCls}-${transitionName}`,
    style: { top: defaultTop }, // 覆盖原来的样式
    getContainer: getContainer || getContextPopupContainer,
    maxCount,
  };

  RCNotification.newInstance(instanceConfig, (instance: any) => {
    if (messageInstance) {
      callback({
        prefixCls,
        instance: messageInstance,
        rootPrefixCls,
        iconPrefixCls,
      });
      return;
    }
    messageInstance = instance;
    callback({
      prefixCls,
      instance,
      iconPrefixCls,
      rootPrefixCls,
    });
  });
}

export interface ThenableArgument {
  (val: any): void;
}

const typeToIcon = {
  info: InfoCircleFilled,
  success: CheckCircleFilled,
  error: CloseCircleFilled,
  warning: ExclamationCircleFilled,
  loading: LoadingOutlined,
};

export const typeList = Object.keys(typeToIcon) as NoticeType[];
export interface ArgsProps {
  content: any;
  duration?: number | null;
  type?: NoticeType;
  prefixCls?: string;
  rootPrefixCls?: string;
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
  onClose?: () => void;
  icon?: React.ReactNode;
  key?: string | number;
  style?: React.CSSProperties;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

function getRCNoticeProps(
  args: ArgsProps,
  prefixCls: string,
  iconPrefixCls?: string,
): NoticeContent {
  const duration =
    args.duration !== undefined ? args.duration : defaultDuration;
  const IconComponent = typeToIcon[args.type!];
  const messageClass = classNames(`${prefixCls}-custom-content`, {
    [`${prefixCls}-${args.type}`]: args.type,
    [`${prefixCls}-rtl`]: rtl === true,
  });
  return {
    key: args.key,
    duration,
    style: args.style || {},
    className: args.className,
    content: (
      <ConfigProvider iconPrefixCls={iconPrefixCls}>
        <div className={messageClass}>
          {args.icon || (IconComponent && <IconComponent />)}
          <span>{args.content}</span>
        </div>
      </ConfigProvider>
    ),
    onClose: args.onClose,
    onClick: args.onClick,
  };
}

function notice(args: ArgsProps): MessageType {
  const target = args.key || getKeyThenIncreaseKey();
  const closePromise = new Promise((resolve) => {
    const callback = () => {
      if (typeof args.onClose === "function") {
        args.onClose();
      }
      return resolve(true);
    };

    if (document.hidden) {
      return;
    }

    getRCNotificationInstance(
      args,
      ({ prefixCls, instance, iconPrefixCls }) => {
        instance.notice(
          getRCNoticeProps(
            { ...args, key: target, onClose: callback },
            prefixCls,
            iconPrefixCls,
          ),
        );
      },
    );
  });
  const result: any = () => {
    if (messageInstance) {
      messageInstance.removeNotice(target);
      args.onClose?.();
    }
  };
  result.then = (filled: ThenableArgument, rejected: ThenableArgument) =>
    closePromise.then(filled, rejected);
  result.promise = closePromise;
  return result;
}

type ConfigContent = React.ReactNode | string;
type ConfigDuration = number | (() => void);
type JointContent = ConfigContent | ArgsProps;
export type ConfigOnClose = () => void;

function isArgsProps(content: JointContent): content is ArgsProps {
  return (
    Object.prototype.toString.call(content) === "[object Object]" &&
    !!(content as ArgsProps).content
  );
}

const api: any = {
  open: notice,
  config: setMessageConfig,
  destroy(messageKey?: React.Key) {
    if (messageInstance) {
      if (messageKey) {
        const { removeNotice } = messageInstance;
        removeNotice(messageKey);
      } else {
        const { destroy } = messageInstance;
        destroy();
        messageInstance = null;
      }
    }
  },
};

export function attachTypeApi(originalApi: any, type: NoticeType) {
  originalApi[type] = (
    content: JointContent,
    duration?: ConfigDuration,
    onClose?: ConfigOnClose,
  ) => {
    if (isArgsProps(content)) {
      return originalApi.open({ ...content, type });
    }

    if (typeof duration === "function") {
      onClose = duration;
      duration = undefined;
    }

    return originalApi.open({ content, duration, type, onClose });
  };
}

typeList.forEach((type) => attachTypeApi(api, type));

api.warn = api.warning;
api.useMessage = createUseMessage(getRCNotificationInstance, getRCNoticeProps);

export default api as MessageApi;
