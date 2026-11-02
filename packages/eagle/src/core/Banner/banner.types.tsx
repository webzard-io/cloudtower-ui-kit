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
export type BannerProps = HTMLAttributes<HTMLDivElement> & {
  /** 提示类型：info 为蓝色，warning 为橙色，error 为红色且不显示移除按钮。 */
  type: "error" | "info" | "warning";
  /** 提示文案，宽度随内容变化，以距两侧操作区或容器边距 12px 为限；超出后省略，悬停展示完整内容。 */
  message: string;
  /** 根节点测试标识；操作按钮的标识为 `${data-testid}-action`。 */
  "data-testid"?: string;
  /** 受控分页配置；不传或 total <= 1 时不显示分页。 */
  pagination?: {
    /** 当前页码，从 1 开始，取值应在 1 到 total 之间。 */
    current: number;
    /** 提示总条数。 */
    total: number;
    /** 切页回调，首尾循环；调用方需同步更新页码及对应的文案、类型和按钮。 */
    onChange: (page: number) => void;
  };
  /**
   * 移除当前提示的回调；不传时不显示移除按钮，error 类型始终不显示。
   * 组件不自行删除数据；调用方负责更新提示列表和页码，刷新页面后可恢复提示，无需绑定登录态。
   */
  onClose?: () => void;
  /** 操作按钮配置；不传时不显示按钮。 */
  btnProps?: Pick<ButtonProps, "onClick"> & {
    /** 操作按钮文案。点击回调通过 btnProps.onClick 配置。 */
    text: string;
    /**
     * 是否隐藏操作按钮。
     * @default false
     */
    hide?: boolean;
  };
};
