import React from "react";

import { CloseCb } from "../../store";
import { ModalWrapper } from "../Styled";
import Modal from ".";

const ImmersiveModal: React.FC<CloseCb> = ({
  onClose,
  removeModal,
  visible,
}) => {
  return (
    <Modal
      title="Label"
      className={ModalWrapper}
      fullscreen
      okText="Button Title"
      cancelText="Button Title"
      onCancel={onClose}
      removeModal={removeModal}
      visible={visible}
    >
      <div>Main Area</div>
    </Modal>
  );
};

export default ImmersiveModal;
