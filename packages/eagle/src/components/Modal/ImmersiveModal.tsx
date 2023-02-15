import React from "react";

import { ModalWrapper } from "../Styled";
import Modal from ".";

const ImmersiveModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <Modal
      title="Label"
      className={ModalWrapper}
      fullscreen
      okText="Button Title"
      cancelText="Button Title"
      onCancel={onClose}
    >
      <div>Main Area</div>
    </Modal>
  );
};

export default ImmersiveModal;
