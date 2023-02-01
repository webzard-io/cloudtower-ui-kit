import { kitContext as UIKitContext, ModalWrapper } from "@cloudtower/eagle";
import React, { useContext } from "react";

const FootErrorModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const UIKit = useContext(UIKitContext);

  return (
    <UIKit.modal2
      title="Label"
      className={ModalWrapper}
      fullscreen
      okText="Button Title"
      cancelText="Button Title"
      onCancel={onClose}
      footerError={"Error Here"}
    >
      <div>Main Area</div>
    </UIKit.modal2>
  );
};

export default FootErrorModal;
