import { ButtonProps } from "@src/core/Button";
import React from "react";

/**
 * @description 小尺寸弹窗组件，固定宽度 492px，适用于确认操作、简短表单、信息提示等场景。
 * 通过 `usePushModal` 打开弹窗，在 `onOk`/`onCancel` 回调中调用 `popModal()` 关闭弹窗。
 * 弹窗基于 Redux 模态栈管理（KitStoreProvider），支持多层弹窗嵌套。
 *
 * @example 基础确认弹窗
 * ```tsx
 * import { SmallDialog } from "@cloudtower/eagle";
 * import { usePushModal } from "@cloudtower/eagle/lib/core/KitStoreProvider";
 *
 * const MyComponent = () => {
 *   const pushModal = usePushModal();
 *
 *   const openDialog = () => {
 *     pushModal(
 *       <SmallDialog
 *         title="确认操作"
 *         onOk={(popModal) => {
 *           // 执行确认逻辑
 *           popModal();
 *         }}
 *         onCancel={(popModal) => {
 *           popModal();
 *         }}
 *       >
 *         确定要执行此操作吗？
 *       </SmallDialog>
 *     );
 *   };
 *
 *   return <Button onClick={openDialog}>打开弹窗</Button>;
 * };
 * ```
 *
 * @example 异步提交弹窗（含 confirmLoading）
 * ```tsx
 * const [loading, setLoading] = useState(false);
 *
 * pushModal(
 *   <SmallDialog
 *     title="删除确认"
 *     confirmLoading={loading}
 *     onOk={async (popModal) => {
 *       setLoading(true);
 *       try {
 *         await deleteResource();
 *         popModal();
 *       } catch (e) {
 *         // 处理错误，弹窗保持打开
 *       } finally {
 *         setLoading(false);
 *       }
 *     }}
 *     onCancel={(popModal) => popModal()}
 *   >
 *     删除后数据将无法恢复，是否继续？
 *   </SmallDialog>
 * );
 * ```
 *
 * @see MediumDialog 中等尺寸弹窗（720px），适用于复杂表单
 * @see ImmersiveDialog 沉浸式全屏弹窗，适用于复杂表单和详情编辑
 * @see WizardDialog 向导式弹窗，适用于分步操作
 * @see DeleteDialog 删除确认弹窗，基于 SmallDialog 的业务封装，位于 coreX/Dialogs/
 * @see RejectDialog 操作拒绝反馈弹窗，基于 SmallDialog 的业务封装，位于 coreX/Dialogs/
 */
export interface SmallDialogProps {
  /**
   * 弹窗宽度
   * @default 492
   */
  width?: number | string;
  /** 弹窗标题，支持 ReactNode 自定义渲染 */
  title: React.ReactNode;
  /**
   * 自定义标题渲染组件，替换默认的标题渲染逻辑。
   * 默认标题使用 `Typo.Display.d2_bold_title` 样式。
   */
  TitleRender?: React.FC<{ title?: React.ReactNode }>;
  /** 取消按钮文案，默认根据 `showOk` 决定：showOk=true 时为"取消"，showOk=false 时为"关闭" */
  cancelText?: string;
  /** 确认按钮文案，默认为"确认"；当 `initializingError` 有值时默认为"重试" */
  okText?: string;
  /**
   * 是否显示确认按钮。设为 false 时仅显示取消按钮，
   * 且取消按钮样式从 `quiet` 变为 `ordinary`，文案默认从"取消"变为"关闭"。
   * @default true
   */
  showOk?: boolean;
  /**
   * 点击确认按钮的回调。
   * @param popModal - 关闭当前弹窗的函数，调用后将弹窗从模态栈中移除。
   * 在异步操作中，可先执行业务逻辑，成功后再调用 popModal() 关闭弹窗；
   * 若未提供 onOk，点击确认按钮将直接调用 popModal() 关闭弹窗。
   *
   * @example
   * ```tsx
   * onOk={async (popModal) => {
   *   await submitData();
   *   popModal();
   * }}
   * ```
   */
  onOk?: (popModal: () => void) => void;
  /**
   * 点击取消按钮、右上角关闭按钮或遮罩层时的回调。
   * @param popModal - 关闭当前弹窗的函数，调用后将弹窗从模态栈中移除。
   * 若未提供 onCancel，上述关闭操作将直接调用 popModal() 关闭弹窗。
   *
   * @example
   * ```tsx
   * onCancel={(popModal) => {
   *   // 可在关闭前执行清理逻辑
   *   popModal();
   * }}
   * ```
   */
  onCancel?: (popModal: () => void) => void;
  /**
   * 是否可点击遮罩层关闭弹窗，点击遮罩层会触发 onCancel 回调
   * @default true
   */
  maskClosable?: boolean;
  /**
   * 是否显示右上角关闭按钮，点击关闭按钮会触发 onCancel 回调
   * @default true
   */
  closable?: boolean;
  /** 自定义弹窗容器类名 */
  className?: string;
  /** 自定义 footer 区域类名 */
  footerClassName?: string;
  /** 确认按钮的额外属性，会透传给 Button 组件。若同时设置了 okText，okText 优先 */
  okButtonProps?: ButtonProps;
  /** 取消按钮的额外属性，会透传给 Button 组件。若同时设置了 cancelText，cancelText 优先 */
  cancelButtonProps?: ButtonProps;
  /** 弹窗主体内容，当 `initializing` 为 true 时显示骨架屏，当 `initializingError` 有值时显示错误状态 */
  children?: React.ReactNode;
  /** 展示在 footer 区域的错误文案，支持 ReactNode。最多显示 3 行，超出后 tooltip 展示完整内容 */
  error?: React.ReactNode;
  /**
   * 是否隐藏 footer 区域（包括确认/取消按钮和错误信息）
   * @default false
   */
  hideFooter?: boolean;
  /**
   * 是否在 footer 错误文案前展示错误图标
   * @default true
   */
  showFooterErrorIcon?: boolean;
  /**
   * 确认按钮加载状态，为 true 时确认按钮显示 loading 动画且不可重复点击
   * @default false
   */
  confirmLoading?: boolean;
  /**
   * 是否处于初始化加载中状态。为 true 时，标题显示骨架屏、
   * 内容区域显示骨架屏（行数由 `initializingSkeletonRows` 控制）、footer 隐藏。
   * 初始化完成后设为 false，若加载失败可设置 `initializingError` 展示错误状态。
   */
  initializing?: boolean;
  /**
   * 初始化错误内容。有值时弹窗进入错误状态：标题变为"加载失败"，
   * 内容区域显示错误详情，确认按钮文案变为"重试"。
   * 与 `initializing` 配合使用：先设 initializing=true 加载，
   * 失败时设 initializing=false 且 initializingError="错误信息"。
   */
  initializingError?: string | React.ReactNode;
  /**
   * 初始化骨架屏行数，仅在 `initializing` 为 true 时生效
   * @default 2
   */
  initializingSkeletonRows?: number;
  /**
   * 测试标识符前缀，用于自动化测试定位元素。
   * 派生子 testid：`${testId}-cancel`（取消按钮）、`${testId}-ok`（确认按钮）、`${testId}-close`（关闭按钮）
   */
  "data-testid"?: string;
}
