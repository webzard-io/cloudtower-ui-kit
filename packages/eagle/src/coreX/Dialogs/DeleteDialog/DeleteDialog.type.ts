/**
 * DeleteDialog 是一个预设了删除确认样式的对话框组件，基于 SmallDialog 封装。
 * 确认按钮默认使用危险（红色）样式，适用于需要用户二次确认的删除操作。
 * 支持异步删除（confirmLoading）和错误信息展示。
 *
 * @example
 * ```tsx
 * import React from "react";
 * import { DeleteDialog, Button } from "@cloudtower/eagle";
 * import { usePushModal } from "@cloudtower/eagle";
 *
 * const App = () => {
 *   const pushModal = usePushModal();
 *   return (
 *     <Button
 *       danger
 *       onClick={() =>
 *         pushModal({
 *           component: () => (
 *             <DeleteDialog
 *               title="删除虚拟机"
 *               description="确定要删除虚拟机 vm-prod-01 吗？"
 *               secondaryDesc="删除后数据将无法恢复。"
 *               onOk={(popModal) => {
 *                 console.log("confirmed");
 *                 popModal();
 *               }}
 *             />
 *           ),
 *           props: {},
 *         })
 *       }
 *     >
 *       删除
 *     </Button>
 *   );
 * };
 * ```
 *
 * @example
 * ```tsx
 * // 异步删除 + 错误处理
 * import React, { useState } from "react";
 * import { DeleteDialog } from "@cloudtower/eagle";
 *
 * const AsyncDeleteDialog = () => {
 *   const [loading, setLoading] = useState(false);
 *   const [error, setError] = useState<string>();
 *
 *   return (
 *     <DeleteDialog
 *       title="删除集群"
 *       description="确定要删除集群 cluster-01 吗？"
 *       confirmLoading={loading}
 *       error={error}
 *       onOk={async () => {
 *         setLoading(true);
 *         setError(undefined);
 *         try {
 *           await deleteCluster("cluster-01");
 *         } catch {
 *           setError("删除失败，请重试");
 *         } finally {
 *           setLoading(false);
 *         }
 *       }}
 *     />
 *   );
 * };
 * ```
 *
 * @see SmallDialog 底层对话框组件，DeleteDialog 基于其封装
 * @see RejectDialog 操作被拒绝/不可执行时的反馈对话框
 */
export interface DeleteDialogProps {
  /** 弹窗标题 */
  title: React.ReactNode;
  /** 主要描述文本，说明删除操作的影响 */
  description?: React.ReactNode;
  /** 辅助说明文本，显示在 description 下方，使用次要颜色 */
  secondaryDesc?: React.ReactNode;
  /**
   * 取消按钮文案
   * @default "取消"（i18n: common.cancel）
   */
  cancelText?: string;
  /**
   * 确认按钮文案
   * @default "删除"（i18n: common.delete）
   */
  okText?: string;
  /**
   * 点击确认按钮回调。参数 popModal 用于关闭弹窗。
   * 异步场景下可配合 confirmLoading 使用，操作完成后手动调用 popModal() 关闭。
   */
  onOk?: (popModal: () => void) => void;
  /**
   * 点击取消按钮或关闭弹窗回调。参数 popModal 用于关闭弹窗。
   */
  onCancel?: (popModal: () => void) => void;
  /** 自定义类名 */
  className?: string;
  /**
   * 确认按钮加载状态。设为 true 后按钮显示 loading 且不可点击。
   * @default false
   */
  confirmLoading?: boolean;
  /** 展示在 modal footer 的错误文案，用于显示删除操作失败信息 */
  error?: React.ReactNode;
  /**
   * 是否展示 modal footer 的错误图标
   * @default true
   */
  showFooterErrorIcon?: boolean;
}
