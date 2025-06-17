import { HTMLAttributes } from "react";

import { ButtonProps } from "../Button";

/**
 * Banner组件的属性
 * @property {('error' | 'info' | 'warning')} type - Banner的类型，决定背景色和样式
 * @property {string} message - Banner显示的消息内容
 * @property {object} [btnProps] - 按钮相关配置，包含文本、点击事件和显示控制
 * @property {function} [btnProps.onClick] - 按钮点击事件的回调函数
 * @property {string} btnProps.text - 按钮显示的文本
 * @property {boolean} [btnProps.hide] - 是否隐藏按钮，默认为false
 * @example
 * {
 *   type: "warning",
 *   message: "系统将在30分钟后进行维护",
 *   btnProps: {
 *     text: "了解详情",
 *     onClick: () => { console.log("查看详情") }
 *   }
 * }
 */
export type BannerProps = HTMLAttributes<"DIV"> & {
  type: "error" | "info" | "warning";
  message: string;
  btnProps?: Pick<ButtonProps, "onClick"> & {
    text: string;
    hide?: boolean;
  };
};
