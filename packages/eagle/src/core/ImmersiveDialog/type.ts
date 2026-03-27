import { ButtonProps } from "@src/core/Button";
import { ModalProps as AntdModalProps } from "antd/lib/modal";

/**
 * 沉浸式全屏对话框，支持左中右三栏布局。适合复杂操作、大面积内容展示。通过 usePushModal 打开。
 *
 * 默认三栏布局宽度：左侧面板 192px、中间内容区 648px、右侧面板 192px，左右面板与内容区间距 60px。
 * 设置 `isContentFull` 后左右面板隐藏，内容区占满整个对话框宽度。
 *
 * @example
 * ```tsx
 * // 带左右面板的全屏对话框（创建虚拟机场景）
 * import { ImmersiveDialog } from "@cloudtower/eagle";
 * import { usePushModal, usePopModal } from "@cloudtower/eagle";
 *
 * const pushModal = usePushModal();
 *
 * pushModal({
 *   component: () => (
 *     <ImmersiveDialog
 *       title="创建虚拟机"
 *       left={<VMConfigSteps current={step} />}
 *       right={<VMResourceSummary cpu={cpu} memory={memory} />}
 *       onOk={() => handleCreate()}
 *     >
 *       <VMConfigForm step={step} />
 *     </ImmersiveDialog>
 *   ),
 *   props: { name: "CreateVmDialog" },
 * });
 * ```
 *
 * @example
 * ```tsx
 * // 纯内容全屏对话框（isContentFull 模式）
 * import { ImmersiveDialog } from "@cloudtower/eagle";
 * import { usePushModal, usePopModal } from "@cloudtower/eagle";
 *
 * const popModal = usePopModal();
 *
 * <ImmersiveDialog
 *   title="查看详情"
 *   isContentFull
 *   onOk={() => popModal()}
 * >
 *   <FullWidthContent />
 * </ImmersiveDialog>
 * ```
 *
 * 除下列自有属性外，还继承了 antd Modal 的全部属性（如 `onCancel`、`maskClosable`、`closable` 等），
 * 这些属性会直接透传给底层 Modal 组件。
 *
 * @see WizardDialog — 基于 ImmersiveDialog 的向导变体，支持分步操作
 * @see SmallDialog — 小型弹窗（492px），适用于简单确认或少量内容
 * @see MediumDialog — 中型弹窗（720px），适用于中等复杂度的表单或内容
 */
export type ImmersiveDialogProps = React.PropsWithChildren<
  AntdModalProps & {
    /** 自定义关闭图标，替换右上角默认的关闭按钮图标 */
    closeIcon?: React.ReactNode;
    /**
     * 是否显示取消按钮
     * @default true
     */
    showCancel?: boolean;
    /**
     * 取消按钮的文本。
     * 当 showOk 为 true 时默认为"取消"，否则默认为"关闭"。
     */
    cancelText?: string;
    /** 取消按钮的属性，透传至底层 Button 组件 */
    cancelButtonProps?: ButtonProps;
    /**
     * 是否显示确定按钮
     * @default true
     */
    showOk?: boolean;
    /**
     * 确定按钮的文本。
     * 当存在 initializingError 时默认为"重试"，否则默认为"确认"。
     */
    okText?: string;
    /** 确定按钮的属性，透传至底层 Button 组件 */
    okButtonProps?: ButtonProps;
    /** 底部错误信息，显示在 footer 左侧区域，最多展示 3 行溢出后 tooltip 提示 */
    error?: React.ReactNode;
    /**
     * 是否隐藏 footer。隐藏后 footer 区域仍保留 40px 的空白间距。
     * @default false
     */
    hideFooter?: boolean;
    /**
     * 是否展示 footer 错误信息旁的错误图标
     * @default true
     */
    showFooterErrorIcon?: boolean;
    /**
     * 确定按钮的回调。
     *
     * 注意：签名为 `(e: React.MouseEvent) => void`，与 SmallDialog/MediumDialog 的
     * `onOk?: (popModal: () => void) => void` 不同。此组件的 onOk 不会自动关闭弹窗，
     * 需要通过 `usePopModal()` hook 获取 popModal 函数手动关闭。
     */
    onOk?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
    /**
     * 是否内容占满整个对话框宽度。
     * 开启后隐藏左右面板，内容区域占满对话框，左右各留 40px 的内边距。
     * @default false
     */
    isContentFull?: boolean;
    /**
     * 左侧面板的自定义内容。
     * 三栏布局下固定宽度 192px，使用 fixed 定位，顶部距弹窗上边缘 140px。
     * 当 isContentFull 为 true 或处于 initializing/initializingError 状态时不渲染。
     */
    left?: React.ReactNode;
    /**
     * 左侧面板的自定义类名，用于覆盖左侧面板的默认样式。
     * 面板默认宽度 192px，可通过此类名调整样式。
     */
    leftClassName?: string;
    /**
     * 右侧面板的自定义内容。
     * 三栏布局下固定宽度 192px，使用 fixed 定位，顶部距弹窗上边缘 140px。
     * 当 isContentFull 为 true 或处于 initializing/initializingError 状态时不渲染。
     */
    right?: React.ReactNode;
    /**
     * 右侧面板的自定义类名，用于覆盖右侧面板的默认样式。
     * 面板默认宽度 192px，可通过此类名调整样式。
     */
    rightClassName?: string;
    /**
     * 底部左侧的操作区域，通常放置"上一步"按钮或其他辅助操作。
     * 渲染在 footer 左侧，与确定/取消按钮分居两端。
     */
    footerLeftAction?: React.ReactNode;
    /**
     * 是否处于初始化加载中状态。
     * 为 true 时标题区显示骨架屏，内容区显示 4 行骨架屏加载占位，footer 隐藏。
     * 加载完成后设为 false 显示正常内容。
     * @default false
     */
    initializing?: boolean;
    /**
     * 初始化错误的内容。设置后内容区显示错误提示（居中展示），
     * 标题自动变为"加载失败"，确定按钮文本自动变为"重试"。
     * 与 initializing 配合使用：先设 initializing=true 开始加载，
     * 失败时设 initializing=false 并设置 initializingError。
     */
    initializingError?: string | React.ReactNode;
    /**
     * 测试标识符前缀，用于自动化测试定位元素。
     * 派生子 testid：`${testId}-cancel`、`${testId}-ok`、`${testId}-close`
     */
    "data-testid"?: string;
  }
>;
