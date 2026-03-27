import { ImmersiveDialogProps } from "@src/core/ImmersiveDialog/type";

/**
 * 基于 ImmersiveDialog 的多步骤向导对话框。
 *
 * @description
 * 自动管理步骤导航、步骤指示器和按钮文案切换。
 * 非最后一步时，确定按钮显示"下一步"并触发 `onNextStep`；
 * 最后一步时显示"确定"并触发 `onOk`。左侧面板默认渲染垂直步骤条。
 * 通过 `usePushModal` 打开。
 *
 * @example
 * ```tsx
 * // 基础三步向导——创建集群
 * import { WizardDialog } from "@cloudtower/eagle";
 * import { usePushModal } from "@cloudtower/eagle/KitStoreProvider";
 *
 * const pushModal = usePushModal();
 *
 * pushModal({
 *   component: () => (
 *     <WizardDialog
 *       title="创建集群"
 *       steps={[
 *         { title: "基本信息", children: <ClusterBasicForm /> },
 *         { title: "网络配置", children: <ClusterNetworkForm /> },
 *         { title: "确认创建", children: <ClusterConfirmPanel /> },
 *       ]}
 *       onOk={(e) => handleCreate()}
 *     />
 *   ),
 *   props: { name: "CreateClusterWizard" },
 * });
 * ```
 *
 * @example
 * ```tsx
 * // 带步骤校验的向导——onNextStep 返回 false 阻止导航
 * <WizardDialog
 *   title="创建虚拟机"
 *   steps={steps}
 *   onNextStep={(nextStep) => {
 *     if (!validateCurrentStep()) {
 *       message.error("请完善当前步骤的必填项");
 *       return false; // 阻止跳转到下一步
 *     }
 *   }}
 *   onOk={(e) => handleSubmit()}
 * />
 * ```
 *
 * 注意以下继承属性在 WizardDialog 中有特殊行为：
 * - `footerLeftAction`：WizardDialog 内部使用此属性渲染"上一步"按钮，外部传入会被覆盖。
 * - `isContentFull`：WizardDialog 内部强制设为 `false`，外部传入无效。
 *
 * @see ImmersiveDialog 基础全屏对话框组件
 * @see Steps 步骤条组件
 */
export type WizardDialogProps = ImmersiveDialogProps & {
  /**
   * 当前步骤索引（从 0 开始）。
   *
   * @description
   * 传入此属性时进入受控模式，步骤切换完全由外部状态驱动；
   * 不传时为非受控模式，组件内部自动管理当前步骤。
   *
   * @default 0
   */
  step?: number;
  /**
   * 步骤配置数组，每项定义一个向导步骤。
   *
   * @description
   * 每个步骤包含 `title`（显示在左侧步骤条中的标题）和
   * `children`（该步骤的主体内容，通常为表单或信息面板）。
   * 步骤数量决定导航行为：非最后一步点击确定按钮触发 `onNextStep`，
   * 最后一步触发 `onOk`。
   */
  steps?: {
    /** 步骤标题，显示在左侧垂直步骤条中 */
    title: string;
    /** 步骤内容，通常为表单或信息展示面板 */
    children: React.ReactNode;
    /** 测试标识，挂在对应的 step item 上 */
    "data-testid"?: string;
  }[];
  /**
   * 是否隐藏左侧步骤指示器。
   *
   * @description
   * 设为 `true` 时不渲染默认的垂直步骤条。
   * 可配合 `left` 属性放置自定义的步骤指示器或其他导航内容。
   *
   * @default false
   */
  hideSteps?: boolean;
  /**
   * 左侧面板自定义内容。
   *
   * @description
   * 传入后将替换默认的步骤指示器。常用于自定义步骤导航样式。
   */
  left?: React.ReactNode;
  /**
   * 右侧面板自定义内容。
   *
   * @description
   * 渲染在主内容区域右侧的额外面板。
   */
  right?: React.ReactNode;
  /**
   * 是否销毁非当前步骤的内容。
   *
   * @description
   * - `true`：仅渲染当前步骤，切换时销毁前一步骤的 DOM，节省内存。
   * - `false`：所有步骤始终保留在 DOM 中，通过 `display: none` 隐藏非当前步骤。
   *   适用于需要保留表单状态的场景（如用户在步骤间来回切换时不丢失已填写的数据）。
   *
   * @default false
   */
  destroyOtherStep?: boolean;
  /**
   * "上一步"按钮的自定义文本。
   *
   * @default t("common.prev_step")（i18n：上一步 / Previous）
   */
  prevText?: string;
  /**
   * 点击"上一步"按钮时的回调。
   *
   * @param step - 即将跳转到的步骤索引（当前步骤 - 1）
   */
  onPrevStep?: (step: number) => void;
  /**
   * "下一步"按钮的自定义文本。
   *
   * @description
   * 仅在非最后一步时显示，替换确定按钮的默认"下一步"文案。
   *
   * @default t("common.next_step")（i18n：下一步 / Next）
   */
  nextText?: string;
  /**
   * 点击"下一步"时的回调，支持阻止导航。
   *
   * @description
   * 在非最后一步点击确定按钮时触发。这是实现步骤校验的核心机制：
   * - 返回 `false` 将**阻止**导航到下一步（可用于表单校验失败时阻止前进）。
   * - 返回 `void`（不返回值）或返回非 `false` 值时正常跳转到下一步。
   *
   * 注意：仅严格等于 `false`（`=== false`）时才阻止，返回 `undefined` 或其他假值不会阻止。
   *
   * @param step - 即将跳转到的步骤索引（当前步骤 + 1）
   * @returns 返回 `false` 阻止导航，返回 `void` 允许导航
   */
  onNextStep?: (step: number) => void | boolean;
  /**
   * 步骤发生变化时的回调。
   *
   * @description
   * 无论是通过"上一步"、"下一步"按钮，还是点击左侧步骤条直接跳转，
   * 步骤变化后都会触发此回调。适合用于同步外部状态或埋点。
   *
   * @param step - 变化后的新步骤索引
   */
  onStepChange?: (step: number) => void;
};
