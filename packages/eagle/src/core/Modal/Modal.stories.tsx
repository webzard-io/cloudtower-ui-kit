import Button from "@src/core/Button";
import KitStoreProvider from "@src/core/KitStoreProvider";
import Modal from "@src/core/Modal";
import ModalStack from "@src/core/ModalStack";
import { ModalWrapper } from "@src/core/Styled";
import { ModalProps, WizardSteps } from "@src/spec";
import { pushModal } from "@src/store";
import { Meta } from "@storybook/react";
import React, { useState } from "react";

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

const AsideModal: React.FC<{ onClose: () => void; steps: WizardSteps }> = ({
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
        hideLeft: steps.length === 1,
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

const story: Meta<ModalProps> = {
  title: "Modal",
  component: Modal,
  decorators: [
    (Story) => {
      return (
        <KitStoreProvider>
          <ModalStack />
          <Story />
        </KitStoreProvider>
      );
    },
  ],
};

export default story;

export const ImmersiveDialog = (args: Parameters<typeof Button>) => {
  return (
    <Button type="primary" {...args}>
      open modal
    </Button>
  );
};

ImmersiveDialog.args = {
  onClick: () => {
    pushModal({
      component: ImmersiveModal,
      props: {
        name: "ImmersiveModal",
      },
    });
  },
};

export const WithAside = () => {
  return (
    <div>
      <div>
        <div>这是一个包含了左侧、右侧、中间区域的 modal</div>
        <Button
          type="primary"
          onClick={() => {
            pushModal({
              // @ts-ignore
              // TODO: Refine the type of pushModal
              component: AsideModal,
              props: {
                name: "AsideModal",
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
              },
            });
          }}
        >
          open modal
        </Button>
      </div>
      <div style={{ marginTop: "20px" }}>
        <div>
          这是一个隐藏了左侧 steps 的 modal，通过设置 hideLeft 为 true
          可以隐藏左侧 steps
        </div>
        <Button
          type="primary"
          onClick={() => {
            pushModal({
              // @ts-ignore
              // TODO: Refine the type of pushModal
              component: AsideModal,
              props: {
                name: "AsideModal",
                steps: [
                  {
                    title: "step1",
                    render: (
                      <div>
                        步骤1：只有一步时，设置 hideLeft 为 true，不显示左侧
                        steps，但仍会占据空间
                      </div>
                    ),
                  },
                ],
              },
            });
          }}
        >
          one step
        </Button>
      </div>
    </div>
  );
};

WithAside.args = {};
