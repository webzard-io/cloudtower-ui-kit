import { SmallDialogProps } from "../SmallDialog/SmallDialog.type";

/**
 * 720px 宽度的中型对话框，适合表单和较多内容的场景。
 *
 * @description
 * MediumDialog 继承 SmallDialog 的全部功能，在此基础上提供更大的显示区域（720px 宽度、
 * 60px 水平内边距）和更突出的标题排版（d1s_bold_title）。通过 `usePushModal` 打开弹窗，
 * 在 `onOk` / `onCancel` 回调中调用 `popModal` 参数来关闭弹窗。
 *
 * @example
 * ```tsx
 * import { MediumDialog, Button, KitStoreProvider, ModalStack } from "@cloudtower/eagle";
 * import { usePushModal } from "@cloudtower/eagle/KitStoreProvider";
 *
 * const EditVmButton: React.FC = () => {
 *   const pushModal = usePushModal();
 *
 *   return (
 *     <Button onClick={() => pushModal({
 *       component: () => (
 *         <MediumDialog
 *           title="编辑虚拟机"
 *           onOk={(popModal) => {
 *             saveVmConfig().then(() => popModal());
 *           }}
 *           onCancel={(popModal) => popModal()}
 *         >
 *           <VmConfigForm />
 *         </MediumDialog>
 *       ),
 *       props: { name: "EditVmDialog" },
 *     })}>
 *       编辑虚拟机
 *     </Button>
 *   );
 * };
 * ```
 *
 * @see SmallDialog — 更小的对话框（492px 宽度）
 * @see ImmersiveDialog — 全屏沉浸式对话框
 */
export interface MediumDialogProps extends SmallDialogProps {
  /**
   * 内容是否尽可能占满视窗，用于适配中型弹窗的非常规尺寸。
   *
   * @description
   * 开启后弹窗尺寸变为 `width: calc(100vw - 160px)`、`height: calc(100vh - 80px)`，
   * 内容区域自动 flex 填充剩余高度，适用于需要大面积展示内容（如表格、拓扑图）的场景。
   *
   * @default false
   */
  isContentFull?: boolean;
}
