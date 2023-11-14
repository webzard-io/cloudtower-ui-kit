import React, { useState } from "react";

import { WizardSteps } from "../../spec";
import { ModalWrapper } from "../Styled";
import Modal from ".";

const AsideModel: React.FC<{ onClose: () => void; steps: WizardSteps }> = ({
  onClose,
  steps,
}) => {
  const [current, setCurrent] = useState(0);
  return (
    <Modal
      title="StepsModal"
      className={ModalWrapper}
      fullscreen
      okText="submit"
      cancelText=""
      onCancel={onClose}
      onOk={() => {
        if (steps.length === 1 || current >= 2) {
          return;
        }
        setCurrent(current + 1);
      }}
      wizard={{
        destroyOtherStep: true,
        step: current,
        onStepChange: (step) => {
          setCurrent(step);
        },
        steps: steps,
        right: <div>right</div>,
      }}
    >
      <div>common Area</div>
    </Modal>
  );
};

export default AsideModel;
