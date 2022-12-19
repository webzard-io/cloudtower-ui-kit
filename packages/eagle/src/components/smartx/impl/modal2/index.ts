import { Modal2Type } from "@cloudtower/eagle";

import InitializedModal from "./InitializedModal";
import BaseModal from "./Modal";
import WizardModal from "./WizardModal";

const Modal: Modal2Type = BaseModal as Modal2Type;

Modal.Initialized = InitializedModal;
Modal.Wizard = WizardModal;

export default Modal;
export { InitializedModal, Modal, WizardModal };
export * from "./Error";
export * from "./InitializedModal";
export * from "./Modal";
export * from "./WizardModal";
