import InitializedModal from "./InitializedModal";
import BaseModal from "./Modal";
import WizardModal from "./WizardModal";
declare type BaseModalType = typeof BaseModal;
export interface Modal2Type extends BaseModalType {
    Initialized: typeof InitializedModal;
    Wizard: typeof WizardModal;
}
declare const Modal: Modal2Type;
export default Modal;
export { InitializedModal, Modal, WizardModal };
export * from "./Error";
export * from "./InitializedModal";
export * from "./Modal";
export * from "./WizardModal";
