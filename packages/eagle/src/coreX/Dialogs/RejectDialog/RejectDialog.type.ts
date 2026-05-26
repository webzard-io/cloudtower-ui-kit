import type { ButtonProps } from "@src/core/Button";
import { SafeReactNode } from "@src/spec";

/** 拒绝原因，字符串类型 */
export type RejectReason = string;

/** 多个对象的拒绝原因映射，key 为对象名称，value 为原因列表 */
export type RejectContent = Record<string, RejectReason[]>;

/**
 * RejectDialog 的类型枚举，决定对话框的展示模式
 */
export enum RejectDialogType {
  /** 单个对象被拒绝，展示拒绝原因列表 */
  Single = "RejectSingle",
  /** 批量操作中全部对象被拒绝，展示每个对象的拒绝原因 */
  All = "RejectAll",
  /** 批量操作中部分对象被拒绝，可选择继续操作未被拒绝的部分 */
  Part = "RejectPart",
  /** 自定义内容模式，完全自定义对话框内容 */
  Custom = "RejectCustom",
}

/**
 * RejectDialog 基础属性，所有类型共享
 */
interface BaseRejectDialogProps {
  /** 弹窗标题 */
  title: SafeReactNode;
  /** 在描述文本之前的自定义内容区域，用于展示背景信息 */
  beforeDescription?: SafeReactNode;
  /** 补充描述文本，显示在 beforeDescription 之后、拒绝内容之前 */
  description?: SafeReactNode;
  /**
   * 取消按钮文案
   * @default "取消"（i18n: common.cancel）
   */
  cancelText?: string;
  /** 点击取消按钮或关闭弹窗回调。参数 popModal 用于关闭弹窗。 */
  onCancel?: (popModal: () => void) => void;
  /** 确认按钮的额外属性，可用于覆盖按钮样式（如 danger: false） */
  okButtonProps?: ButtonProps;
  /** 弹窗宽度，覆盖 SmallDialog 默认的 492px */
  width?: number;
  /** 自定义类名 */
  className?: string;
  /** 自定义 footer 类名 */
  footerClassName?: string;
}

/**
 * 单个对象拒绝模式。
 * 展示一个对象被拒绝的原因，支持单条文本或多条原因列表。
 */
interface SingleRejectDialogProps extends BaseRejectDialogProps {
  type: RejectDialogType.Single;
  /** 拒绝原因。单条原因传字符串，多条原因传字符串数组。 */
  content: string | string[];
  /**
   * 列表类型，仅当 content 为数组时生效
   * - "ordered": 有序编号列表
   * - "unordered": 无序圆点列表
   * - "resource": 资源列表样式（带背景色和可选图标）
   * @default "ordered"
   */
  listType?: "ordered" | "unordered" | "resource";
  /** 灰色的进一步描述，显示在拒绝原因上方 */
  secondaryDesc?: SafeReactNode;
  /** 资源图标，仅当 listType 为 "resource" 时显示在每项前面 */
  resourceIcon?: SafeReactNode;
}

/**
 * 批量全部拒绝模式。
 * 所有选中对象均被拒绝，展示每个对象名称及其拒绝原因。
 * 该模式不显示确认按钮，仅提供关闭操作。
 */
interface MultiAllRejectDialogProps extends BaseRejectDialogProps {
  type: RejectDialogType.All;
  /** 灰色的进一步描述 */
  secondaryDesc?: SafeReactNode;
  /** 多个对象的拒绝原因，格式为 { [对象名]: [原因1, 原因2, ...] } */
  content: RejectContent;
  /** 资源图标，显示在每个对象名称前面 */
  resourceIcon?: SafeReactNode;
}

/**
 * 批量部分拒绝模式。
 * 部分选中对象被拒绝，用户可选择继续操作未被拒绝的对象。
 * 该模式显示确认按钮（默认 danger 样式），点击后执行部分操作。
 */
interface MultiPartialRejectDialogProps extends BaseRejectDialogProps {
  type: RejectDialogType.Part;
  /** 灰色的进一步描述 */
  secondaryDesc?: SafeReactNode;
  /** 多个对象的拒绝原因，格式为 { [对象名]: [原因1, 原因2, ...] } */
  content: Record<string, string[]>;
  /** 资源图标，显示在每个对象名称前面 */
  resourceIcon?: SafeReactNode;
  /** 部分拒绝时的额外说明，展示在分割线下方，说明将跳过被拒绝的对象 */
  partialDescription: SafeReactNode;
  /** 确认按钮文案，如"部分升级" */
  okText?: string;
  /**
   * 点击确认按钮回调。参数 popModal 用于关闭弹窗。
   * 仅在 Part 模式下有效。
   */
  onOk?: (popModal: () => void) => void;
}

/**
 * 自定义内容模式。
 * 完全自定义对话框内容，适用于标准模式无法满足的特殊拒绝场景。
 * 该模式不显示确认按钮。
 */
interface CustomRejectDialogProps extends BaseRejectDialogProps {
  type: RejectDialogType.Custom;
  /** 自定义内容区域，替代标准的拒绝原因列表 */
  customContent: SafeReactNode;
  /** 确认按钮文案 */
  okText?: string;
}

/**
 * RejectDialog 是操作拒绝反馈对话框，基于 SmallDialog 封装。
 * 用于告知用户某个操作无法执行及其原因，支持四种模式：
 * - Single: 单个对象被拒绝
 * - All: 批量操作全部被拒绝
 * - Part: 批量操作部分被拒绝（可继续操作未被拒绝的部分）
 * - Custom: 自定义内容
 *
 * 通过 type 属性（RejectDialogType 枚举）区分不同模式，使用 TypeScript 可辨识联合类型。
 *
 * @example
 * ```tsx
 * // 单个对象拒绝
 * import React from "react";
 * import { RejectDialog, RejectDialogType, Button } from "@cloudtower/eagle";
 * import { usePushModal } from "@cloudtower/eagle";
 *
 * const App = () => {
 *   const pushModal = usePushModal();
 *   return (
 *     <Button
 *       onClick={() =>
 *         pushModal({
 *           component: () => (
 *             <RejectDialog
 *               type={RejectDialogType.Single}
 *               title="无法删除虚拟机"
 *               content="虚拟机正在运行中，请先关机再执行删除操作"
 *               description="请解决以上问题后重试"
 *             />
 *           ),
 *           props: {},
 *         })
 *       }
 *     >
 *       删除虚拟机
 *     </Button>
 *   );
 * };
 * ```
 *
 * @example
 * ```tsx
 * // 批量部分拒绝
 * import React from "react";
 * import { RejectDialog, RejectDialogType } from "@cloudtower/eagle";
 *
 * <RejectDialog
 *   type={RejectDialogType.Part}
 *   title="升级虚拟机工具"
 *   description="选中的 3 个虚拟机中，有 1 个可以升级。"
 *   content={{ vm1: ["无需升级"], vm2: ["未安装虚拟机工具"] }}
 *   partialDescription="2 个虚拟机无法升级，继续操作将跳过这些虚拟机。"
 *   okText="部分升级"
 *   onOk={(popModal) => {
 *     console.log("执行部分升级");
 *     popModal();
 *   }}
 * />
 * ```
 *
 * @see SmallDialog 底层对话框组件
 * @see DeleteDialog 删除确认对话框，用于需要用户确认的删除操作
 */
export type RejectDialogProps =
  | SingleRejectDialogProps
  | MultiAllRejectDialogProps
  | MultiPartialRejectDialogProps
  | CustomRejectDialogProps;
