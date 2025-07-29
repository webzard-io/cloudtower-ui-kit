import { css } from "@linaria/core";
import Button from "@src/core/Button";
import ImmersiveDialog, {
  ImmersiveDialogProps,
} from "@src/core/ImmersiveDialog";
import KitStoreProvider, {
  usePopModal,
  usePushModal,
} from "@src/core/KitStoreProvider";
import ModalStack from "@src/core/ModalStack";
import { Meta } from "@storybook/react";
import React, { useState } from "react";

const ContentStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: rgba(30, 201, 127, 0.1);
`;
const RightStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: rgba(237, 241, 250, 0.6);
`;

export const MultiStepDialog = (args: Parameters<typeof Button>) => {
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState(0);
  const [error, setError] = useState("");

  const props = {
    title: "Title",
    error,
    wizard: true,
    visible,
    step,
    steps: [
      {
        title: "Step 1",
        children: <div className={ContentStyle}>Step1 area</div>,
      },
      {
        title: "Step 2",
        children: <div className={ContentStyle}>Step2 area</div>,
      },
      {
        title: "Step 3",
        children: <div className={ContentStyle}>Step3 area</div>,
      },
    ],
    right: <div className={RightStyle}>Right area</div>,
    onCancel: () => {
      console.log("cancel");
      setVisible(false);
    },
    onOk: () => {
      console.log("ok");
      setVisible(false);
    },
    onNextStep: (step) => {
      console.log("next step", step);
    },
    onPrevStep: (step) => {
      console.log("prev step", step);
    },
    onStepChange: (step) => {
      console.log("step change", step);
      if (step === 2) {
        setError("Error text");
        return;
      }

      setStep(step);
    },
  } as ImmersiveDialogProps;

  return (
    <>
      <Button
        type="primary"
        onClick={() => {
          setVisible(true);
        }}
      >
        Open modal
      </Button>
      <ImmersiveDialog {...props} />
    </>
  );
};

export const WizardDialog = (args: Parameters<typeof Button>) => {
  const pushModal = usePushModal();
  const popModal = usePopModal();

  return (
    <Button
      type="primary"
      onClick={() =>
        pushModal({
          component: ImmersiveDialog,
          props: {
            title: "Title",
            error: "Error text",
            wizard: true,
            children: <div className={ContentStyle}>Content area</div>,
            onCancel: () => {
              console.log("cancel");
            },
            onOk: () => {
              console.log("ok");
              popModal();
            },
            onNextStep: (step: number) => {
              console.log("next step", step);
            },
            onPrevStep: (step: number) => {
              console.log("prev step", step);
            },
            onStepChange: (step: number) => {
              console.log("step change", step);
            },
          },
        })
      }
    >
      Open modal
    </Button>
  );
};

export const NormalImmersiveDialog = (args: Parameters<typeof Button>) => {
  const pushModal = usePushModal();
  const popModal = usePopModal();

  return (
    <Button
      type="primary"
      onClick={() =>
        pushModal({
          component: ImmersiveDialog,
          props: {
            title: "Title",
            error: "Error text",
            children: <div className={ContentStyle}>Content area</div>,
            onOk() {
              popModal();
            },
          },
        })
      }
    >
      Open modal
    </Button>
  );
};

const story: Meta<ImmersiveDialogProps> = {
  title: "Core/ImmersiveDialog",
  component: ImmersiveDialog,
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
