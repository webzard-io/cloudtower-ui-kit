import React, { useState } from "react";

import { ModalWrapper } from "../Styled";
import Modal from ".";

const AsideModel: React.FC<{ onClose: () => void }> = ({ onClose }) => {
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
        if (current < 2) {
          setCurrent(current + 1);
        }
      }}
      wizard={{
        destroyOtherStep: true,
        step: current,
        onStepChange: (step) => {
          setCurrent(step);
        },
        steps: [
          {
            title: "step1",
            render: <div>step1 area</div>,
          },
          {
            title: "step2",
            render: <div>step2 area</div>,
          },
          {
            title: "step3",
            render: <div>step3 area</div>,
          },
        ],
        right: <div>right</div>,
      }}
    >
      <div>common Area</div>
    </Modal>
  );
};

export default AsideModel;
