import { AlertProps } from "@src/core/Alert";
import { TagProps } from "@src/core/Tag";
import React from "react";

/**
 * 检查点项的属性
 * @property {React.ReactNode} description - 检查点项的描述文本，用于展示检查内容，支持传入 React 节点
 * @property {'success' | 'failed' | 'loading' | 'warning'} status - 检查点状态，success 表示通过，failed 表示失败，loading 表示加载中，warning 表示警告
 * @property {TagProps} [tagProps] - 标签的自定义属性，可以自定义标签的颜色、图标等
 * @property {AlertProps} [alertProps] - 警告组件的自定义属性，用于展示失败信息及其样式
 * @example
 * {
 *   description: "存储空间检查",
 *   status: "success",
 *   tagProps: {
 *     color: "green",
 *     children: "通过"
 *   }
 * }
 * @example
 * {
 *   description: <span>网络连接检查 <b>(重要)</b></span>,
 *   status: "failed",
 *   tagProps: {
 *     color: "red",
 *     children: "失败"
 *   },
 *   alertProps: {
 *     message: "网络连接失败",
 *     type: "error"
 *   }
 * }
 */
export interface CheckPointItem {
  description: React.ReactNode;
  status: "success" | "failed" | "loading" | "warning";
  tagProps?: TagProps;
  alertProps?: AlertProps;
}

/**
 * 检查点列表的属性
 * @property {CheckPointItem[]} items - 检查点列表的项，包含检查项的描述、状态等信息
 * @property {boolean} [showSwitchControl=true] - 是否显示切换控制来过滤未通过的项
 * @property {(checked: boolean) => void} [onClickSwitch] - 切换开关时的回调函数
 * @property {string | React.ReactNode} title - 自定义检查点列表的标题
 * @property {string} [switchText] - 自定义开关按钮的文本描述
 * @property {string | React.ReactNode} [emptyText] - 列表为空时显示的文本
 * @property {string} [emptyTextClassName] - 空状态文本的自定义类名
 * @property {(emptyText: string | React.ReactNode) => React.ReactNode} [emptyRender] - 自定义渲染空状态的函数
 * @property {boolean} [defaultChecked] - 开关的默认选中状态，决定是否默认只显示未通过的检查项
 * @example
 * {
 *   title: "系统检查项",
 *   items: [
 *     {
 *       description: "存储空间检查",
 *       status: "success",
 *       tagProps: { color: "green", children: "通过" }
 *     },
 *     {
 *       description: "权限检查",
 *       status: "failed",
 *       tagProps: { color: "red", children: "失败" },
 *       alertProps: { message: "当前用户没有管理员权限", type: "error" }
 *     }
 *   ],
 *   showSwitchControl: true,
 *   switchText: "只显示失败项",
 *   defaultChecked: true
 * }
 * @example
 * {
 *   title: "系统检查项",
 *   items: [],
 *   emptyText: "暂无检查项",
 *   emptyTextClassName: "custom-empty-class"
 * }
 */
export interface CheckPointListProps {
  items: CheckPointItem[];
  emptyText?: string | React.ReactNode;
  emptyTextClassName?: string;
  emptyRender?: (emptyText: string | React.ReactNode) => React.ReactNode;
  showSwitchControl?: boolean;
  defaultChecked?: boolean;
  onClickSwitch?: (checked: boolean) => void;
  title: string | React.ReactNode;
  switchText?: string;
  className?: string;
}

/**
 * CheckPointItem 组件的属性
 * @extends CheckPointItem
 * @property {string} [key] - React 列表项的唯一标识符
 */
export interface CheckPointItemProps extends CheckPointItem {
  key?: string;
}
