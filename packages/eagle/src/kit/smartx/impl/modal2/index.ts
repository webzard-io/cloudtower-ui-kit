import InitializedModal from "./InitializedModal";
import BaseModal from "./Modal";
import WizardModal from "./WizardModal";

type BaseModalType = typeof BaseModal;
export interface Modal2Type extends BaseModalType {
  Initialized: typeof InitializedModal;
  Wizard: typeof WizardModal;
}

const Modal: Modal2Type = BaseModal as Modal2Type;

Modal.Initialized = InitializedModal;
Modal.Wizard = WizardModal;

export default Modal;
export { InitializedModal, Modal, WizardModal };
export * from "./Error";
export * from "./InitializedModal";
export * from "./Modal";
export * from "./WizardModal";
