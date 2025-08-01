import { CloseCircleFilled } from "@ant-design/icons";
import Button from "@src/core/Button";
import KitStoreProvider, { usePushModal } from "@src/core/KitStoreProvider";
import Modal, { ModalProps, WizardSteps } from "@src/core/Modal";
import ModalStack from "@src/core/ModalStack";
import { ModalWrapper } from "@src/core/Styled";
import Tooltip from "@src/core/Tooltip";
import { Meta } from "@storybook/react";
import React, { useMemo, useState } from "react";

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
      closeIcon={
        <Tooltip overlay="tooltip">
          <CloseCircleFilled />
        </Tooltip>
      }
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
  title: "Core/Modal",
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

export const WithAside = () => {
  const pushModal = usePushModal();
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
                    prevText: "turn back",
                  },
                  {
                    title: "step3",
                    render: <div>step3 area</div>,
                    prevText: "custom",
                    onPrev: () => {
                      console.log("prev");
                    },
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

/**
 * 点击弹窗中的 close all modal 按钮，会清理掉页面中的所有弹窗
 */
export const CloseAllModal = () => {
  const pushModal = usePushModal();

  const TestModal: React.FC<{ closeAllModal: () => void }> = useMemo(
    () =>
      ({ closeAllModal }) => {
        return (
          <Modal
            title="Test Reset Modal"
            showOk={false}
            showCancel={false}
            closable={false}
          >
            <Button type="link" onClick={() => closeAllModal()}>
              close all modal
            </Button>
          </Modal>
        );
      },
    [],
  );

  return (
    <Button
      type="primary"
      onClick={() => {
        pushModal({
          component: TestModal,
          props: {},
        });
      }}
    >
      open modal
    </Button>
  );
};
