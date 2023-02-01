import { kitContext as UIKitContext, ModalWrapper } from "@cloudtower/eagle";
import React, { useContext } from "react";

const ContentErrorModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const UIKit = useContext(UIKitContext);

  return (
    <UIKit.modal2.Wizard
      title="Label"
      className={ModalWrapper}
      fullscreen
      okText="Button Title"
      cancelText="Button Title"
      onCancel={onClose}
      step={0}
      steps={[]}
      contentError={"Error Here"}
    >
      <div>Main Area</div>
    </UIKit.modal2.Wizard>
  );
};

export default ContentErrorModal;
