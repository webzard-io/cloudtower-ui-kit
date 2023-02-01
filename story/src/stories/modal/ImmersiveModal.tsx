import { kitContext as UIKitContext, ModalWrapper } from "@cloudtower/eagle";
import React, { useContext } from "react";

const ImmersiveModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const UIKit = useContext(UIKitContext);

  return (
    <UIKit.modal
      title="Label"
      className={ModalWrapper}
      fullscreen
      okText="Button Title"
      cancelText="Button Title"
      onCancel={onClose}
    >
      <div>Main Area</div>
    </UIKit.modal>
  );
};

export default ImmersiveModal;
