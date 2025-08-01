import { css } from "@linaria/core";
import Button from "@src/core/Button";
import KitStoreProvider, {
  usePopModal,
  usePushModal,
} from "@src/core/KitStoreProvider";
import ModalStack from "@src/core/ModalStack";
import Steps from "@src/core/Steps";
import { WizardDialog } from "@src/core/WizardDialog";
import { CoreMeta } from "@stories/types";
import React, { useState } from "react";

const WrapperStyle = css`
  display: flex;
  flex-direction: column;
  gap: 16px;
  height: 100%;
`;
const ContentStyle = css`
  flex: 1;
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
const WideBodyModalStyle = css`
  &.ant-modal {
    .middle {
      width: 1024px;
    }
  }
`;

export const StepWizardDialog = () => {
  const pushModal = usePushModal();

  return (
    <Button
      type="primary"
      onClick={() => {
        pushModal({
          component: () => {
            const [step, setStep] = useState(0);
            const [error, setError] = useState("");

            const popModal = usePopModal();

            return (
              <WizardDialog
                title="Title"
                error={error}
                step={step}
                steps={[
                  {
                    title: "Step 1",
                    children: <div className={ContentStyle}>Step1 area</div>,
                  },
                  {
                    title: "Step 2",
                    children: (
                      <div className={ContentStyle} style={{ height: "200%" }}>
                        Step2 area
                      </div>
                    ),
                  },
                  {
                    title: "Step 3",
                    children: <div className={ContentStyle}>Step3 area</div>,
                  },
                ]}
                right={<div className={RightStyle}>Right area</div>}
                onCancel={() => {
                  console.log("cancel");
                }}
                onOk={() => {
                  console.log("ok");
                  popModal();
                }}
                onNextStep={(step) => {
                  console.log("next step", step);
                }}
                onPrevStep={(step) => {
                  console.log("prev step", step);
                }}
                onStepChange={(step) => {
                  console.log("step change", step);
                  if (step === 2) {
                    setError(
                      "请检查输入信息是否正确请检查输入信息是否正确请检查输入信息是否正确请检查输入信息是否正确请检查输入信息是否正确请检查输入信息是否正确请检查输入信息是否正确请检查输入信息是否正确",
                    );
                    return;
                  }

                  setStep(step);
                }}
              />
            );
          },
          props: {},
        });
      }}
    >
      Open modal
    </Button>
  );
};

export const OnlyLeftWizardDialog = () => {
  const pushModal = usePushModal();

  return (
    <Button
      type="primary"
      onClick={() => {
        pushModal({
          component: () => {
            const [step, setStep] = useState(0);
            const [error, setError] = useState("");

            const popModal = usePopModal();

            return (
              <WizardDialog
                title="Title"
                error={error}
                step={step}
                steps={[
                  {
                    title: "Step 1",
                    children: <div className={ContentStyle}>Step1 area</div>,
                  },
                  {
                    title: "Step 2",
                    children: (
                      <div className={ContentStyle} style={{ height: "200%" }}>
                        Step2 area
                      </div>
                    ),
                  },
                  {
                    title: "Step 3",
                    children: <div className={ContentStyle}>Step3 area</div>,
                  },
                ]}
                onCancel={() => {
                  console.log("cancel");
                }}
                onOk={() => {
                  console.log("ok");
                  popModal();
                }}
                onNextStep={(step) => {
                  console.log("next step", step);
                }}
                onPrevStep={(step) => {
                  console.log("prev step", step);
                }}
                onStepChange={(step) => {
                  console.log("step change", step);
                  if (step === 2) {
                    setError(
                      "请检查输入信息是否正确请检查输入信息是否正确请检查输入信息是否正确请检查输入信息是否正确请检查输入信息是否正确请检查输入信息是否正确请检查输入信息是否正确请检查输入信息是否正确",
                    );
                    return;
                  }

                  setStep(step);
                }}
              />
            );
          },
          props: {},
        });
      }}
    >
      Open modal
    </Button>
  );
};

export const CustomStepsWizardDialog = () => {
  const pushModal = usePushModal();

  return (
    <Button
      type="primary"
      onClick={() => {
        pushModal({
          component: () => {
            const [step, setStep] = useState(0);
            const [error, setError] = useState("");

            const stepConfig = [
              {
                title: "Step 1",
              },
              {
                title: "Step 2",
              },
              {
                title: "Step 3",
              },
            ];
            const stepsComponent = (
              <Steps
                current={step}
                onChange={(value) => {
                  setStep(value);
                }}
                direction="horizontal"
                stepsConfig={stepConfig}
              />
            );
            const stepContents = [
              <div className={WrapperStyle}>
                {stepsComponent}
                <div className={ContentStyle}>Step1 area</div>
              </div>,
              <div className={WrapperStyle}>
                {stepsComponent}
                <div className={ContentStyle} style={{ height: "200%" }}>
                  Step2 area
                </div>
              </div>,
              <div className={WrapperStyle}>
                {stepsComponent}
                <div className={ContentStyle}>Step3 area</div>
              </div>,
            ];
            const steps = stepContents.map((content, index) => ({
              title: stepConfig[index].title,
              children: content,
            }));

            return (
              <WizardDialog
                title="Title"
                className={step === 2 ? WideBodyModalStyle : ""}
                error={error}
                step={step}
                steps={steps}
                onCancel={() => {
                  console.log("cancel");
                }}
                onOk={() => {
                  console.log("ok");
                  setError(
                    "请检查输入信息是否正确请检查输入信息是否正确请检查输入信息是否正确请检查输入信息是否正确请检查输入信息是否正确请检查输入信息是否正确请检查输入信息是否正确请检查输入信息是否正确",
                  );
                }}
                onNextStep={(step) => {
                  console.log("next step", step);
                }}
                onPrevStep={(step) => {
                  console.log("prev step", step);
                }}
                onStepChange={(step) => {
                  console.log("step change", step);

                  setStep(step);
                }}
                hideSteps
              />
            );
          },
          props: {},
        });
      }}
    >
      Open modal
    </Button>
  );
};

const story = {
  title: "Core/WizardDialog | 向导弹窗",
  component: WizardDialog,
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
} satisfies CoreMeta<typeof WizardDialog>;

export default story;
