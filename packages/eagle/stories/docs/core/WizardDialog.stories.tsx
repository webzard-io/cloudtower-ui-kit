import { css } from "@linaria/core";
import { Space, Typo } from "@src/core";
import Button from "@src/core/Button";
import KitStoreProvider, {
  usePopModal,
  usePushModal,
} from "@src/core/KitStoreProvider";
import ModalStack from "@src/core/ModalStack";
import Steps from "@src/core/Steps";
import { WizardDialog } from "@src/core/WizardDialog";
import { SwitchWithText } from "@src/coreX";
import { CoreMeta } from "@stories/types";
import { useMockQuery } from "@stories/utils";
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
  border-radius: 4px;
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
                      <div
                        className={ContentStyle}
                        style={{ height: "2000px" }}
                      >
                        Step2 area
                      </div>
                    ),
                  },
                  {
                    title: "Step 3",
                    children: <div className={ContentStyle}>Step3 area</div>,
                  },
                ]}
                right={<div>Right area</div>}
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
                      <div
                        className={ContentStyle}
                        style={{ height: "2000px" }}
                      >
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
                <div className={ContentStyle} style={{ height: "2000px" }}>
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

const ScrollableItemStyle = css`
  padding: 16px;
  margin-bottom: 12px;
  background-color: #ffffff;
  border-radius: 8px;
  border: 1px solid #e1e6f1;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const CenterScrollStyle = css`
  padding: 20px;
  height: 100%;
  overflow-y: auto;
  background-color: #ffffff;
`;

export const ScrollableWizardDialog = () => {
  const pushModal = usePushModal();
  const [isLongTitle, setIsLongTitle] = useState(false);

  return (
    <Space size={16}>
      <SwitchWithText
        checked={isLongTitle}
        onChange={(checked) => setIsLongTitle(checked)}
        text={{
          checked: "长标题",
          unchecked: "短标题",
        }}
      />
      <Button
        type="primary"
        onClick={() => {
          pushModal({
            component: () => {
              const [step, setStep] = useState(0);
              const [error, setError] = useState("");

              const popModal = usePopModal();

              // 生成右侧滚动内容
              const generateRightContent = () => {
                const items = [];
                for (let i = 1; i <= 25; i++) {
                  items.push(
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                      }}
                    >
                      <span className={Typo.Label.l3_bold}>配置项 {i}</span>
                      <span className={Typo.Label.l4_regular}>
                        这是配置项 {i} 的详细说明，用于展示右侧面板的滚动效果。
                      </span>
                    </div>,
                  );
                }
                return items;
              };

              // 生成中间内容（不同步骤有不同内容量）
              const generateStepContent = (
                stepIndex: number,
                itemCount: number,
              ) => {
                const items = [];
                for (let i = 1; i <= itemCount; i++) {
                  items.push(
                    <div key={i} className={ScrollableItemStyle}>
                      <h3>
                        步骤 {stepIndex + 1} - 数据项 {i}
                      </h3>
                      <p>
                        这是步骤 {stepIndex + 1} 中第 {i} 个数据项的详细内容。
                        {stepIndex === 2 &&
                          "这个步骤包含特别多的内容，需要滚动查看。"}
                        {stepIndex === 4 &&
                          "第五步包含最多的配置项，需要仔细检查每一项设置。"}
                      </p>
                      <div
                        style={{
                          display: "flex",
                          gap: "8px",
                          marginTop: "12px",
                        }}
                      >
                        <span
                          style={{
                            padding: "4px 8px",
                            backgroundColor: "#f0f0f0",
                            borderRadius: "4px",
                            fontSize: "12px",
                          }}
                        >
                          项目 {i}
                        </span>
                        {stepIndex >= 2 && (
                          <span
                            style={{
                              padding: "4px 8px",
                              backgroundColor: "#e6f7ff",
                              borderRadius: "4px",
                              fontSize: "12px",
                              color: "#1890ff",
                            }}
                          >
                            高级配置
                          </span>
                        )}
                      </div>
                      {i % 5 === 0 && (
                        <div
                          style={{
                            marginTop: "12px",
                            padding: "8px",
                            backgroundColor: "#fff7e6",
                            borderRadius: "4px",
                            border: "1px solid #ffd591",
                          }}
                        >
                          ⚠️ 重要提示：这是第 {i} 项的特殊说明
                        </div>
                      )}
                    </div>,
                  );
                }
                return items;
              };

              // 定义7个步骤，内容量递增展示滚动效果
              const steps = [
                {
                  title: "基础信息",
                  children: (
                    <div className={CenterScrollStyle}>
                      <h3 style={{ marginBottom: "20px" }}>📝 基础信息配置</h3>
                      {generateStepContent(0, 5)}
                    </div>
                  ),
                },
                {
                  title: "网络设置",
                  children: (
                    <div className={CenterScrollStyle}>
                      <h3 style={{ marginBottom: "20px" }}>🌐 网络参数设置</h3>
                      {generateStepContent(1, 8)}
                    </div>
                  ),
                },
                {
                  title: "存储配置",
                  children: (
                    <div className={CenterScrollStyle}>
                      <h3 style={{ marginBottom: "20px" }}>💾 存储系统配置</h3>
                      {generateStepContent(2, 15)}
                      <div
                        style={{
                          marginTop: "20px",
                          padding: "16px",
                          backgroundColor: "#f6ffed",
                          border: "1px solid #b7eb8f",
                          borderRadius: "8px",
                        }}
                      >
                        ✅ 这个步骤包含较多配置项，请仔细检查每一项设置
                      </div>
                    </div>
                  ),
                },
                {
                  title: "安全设置",
                  children: (
                    <div className={CenterScrollStyle}>
                      <h3 style={{ marginBottom: "20px" }}>🔒 安全策略配置</h3>
                      {generateStepContent(3, 12)}
                    </div>
                  ),
                },
                {
                  title: "高级配置",
                  children: (
                    <div className={CenterScrollStyle}>
                      <h3 style={{ marginBottom: "20px" }}>⚙️ 高级功能配置</h3>
                      {generateStepContent(4, 20)}
                      <div
                        style={{
                          marginTop: "20px",
                          padding: "16px",
                          backgroundColor: "#fff2e8",
                          border: "1px solid #ffbb96",
                          borderRadius: "8px",
                        }}
                      >
                        🚨
                        高级配置包含最多的选项，修改前请确保理解每个配置的作用
                      </div>
                    </div>
                  ),
                },
                {
                  title: "监控告警",
                  children: (
                    <div className={CenterScrollStyle}>
                      <h3 style={{ marginBottom: "20px" }}>📊 监控告警设置</h3>
                      {generateStepContent(5, 10)}
                    </div>
                  ),
                },
                {
                  title: "完成确认",
                  children: (
                    <div className={CenterScrollStyle}>
                      <div
                        style={{
                          padding: "24px",
                          backgroundColor: "#f6ffed",
                          border: "2px solid #52c41a",
                          borderRadius: "8px",
                          textAlign: "center",
                        }}
                      >
                        <h2 style={{ color: "#52c41a", marginBottom: "16px" }}>
                          🎉 配置即将完成！
                        </h2>
                        <p style={{ marginBottom: "16px" }}>
                          请确认所有配置项都已正确设置，点击"完成"按钮将保存配置并应用设置。
                        </p>
                        <div
                          style={{
                            textAlign: "left",
                            backgroundColor: "#ffffff",
                            padding: "16px",
                            borderRadius: "6px",
                            marginTop: "20px",
                          }}
                        >
                          <h4>配置摘要：</h4>
                          <ul style={{ paddingLeft: "20px", marginTop: "8px" }}>
                            <li>基础信息：已配置 5 项</li>
                            <li>网络设置：已配置 8 项</li>
                            <li>存储配置：已配置 15 项</li>
                            <li>安全设置：已配置 12 项</li>
                            <li>高级配置：已配置 20 项</li>
                            <li>监控告警：已配置 10 项</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  ),
                },
              ];

              return (
                <WizardDialog
                  title={
                    isLongTitle
                      ? "多步骤配置向导 - 滚动演示 - 长标题 Loooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong"
                      : "多步骤配置向导 - 滚动演示"
                  }
                  error={error}
                  step={step}
                  steps={steps}
                  rightClassName={RightStyle}
                  right={
                    <div>
                      <h4
                        style={{
                          marginBottom: "16px",
                          fontSize: "14px",
                          fontWeight: "bold",
                        }}
                      >
                        📋 配置指南
                      </h4>
                      <div
                        style={{
                          marginBottom: "16px",
                          fontSize: "12px",
                          color: "#666",
                        }}
                      >
                        当前步骤：{steps[step]?.title} ({step + 1}/
                        {steps.length})
                      </div>
                      {generateRightContent()}
                    </div>
                  }
                  onCancel={() => {
                    console.log("取消配置向导");
                    popModal();
                  }}
                  onOk={() => {
                    console.log("完成配置向导");
                    popModal();
                  }}
                  onNextStep={(nextStep) => {
                    console.log("下一步", nextStep);
                    // 模拟某些步骤的验证逻辑
                    if (step === 2 && Math.random() > 0.7) {
                      setError("存储配置验证失败，请检查磁盘空间设置");
                      return false; // 阻止进入下一步
                    }
                    setError(""); // 清除错误
                  }}
                  onPrevStep={(prevStep) => {
                    console.log("上一步", prevStep);
                    setError(""); // 清除错误
                  }}
                  onStepChange={(newStep) => {
                    console.log("步骤变更", newStep);
                    setStep(newStep);
                    setError(""); // 清除错误
                  }}
                  prevText="返回上一步"
                  nextText="继续下一步"
                  okText="完成配置"
                  cancelText="取消向导"
                />
              );
            },
            props: {},
          });
        }}
      >
        打开滚动向导对话框
      </Button>
    </Space>
  );
};

export const InitializingWizardDialog = () => {
  const pushModal = usePushModal();
  const popModal = usePopModal();

  return (
    <Space direction="vertical" size={16}>
      <Button
        onClick={() => {
          pushModal({
            component: () => {
              return <WizardDialog initializing title="持续加载" />;
            },
            props: {},
          });
        }}
      >
        持续加载
      </Button>
      <Button
        onClick={() =>
          pushModal({
            component: () => {
              const { isLoading, data, error, retry } = useMockQuery();
              const [step, setStep] = useState(0);
              const [modalError, setModalError] = useState("");

              if (isLoading || error) {
                return (
                  <WizardDialog
                    initializing={isLoading}
                    initializingError={error}
                    onOk={retry}
                    title=""
                  />
                );
              }

              return (
                <WizardDialog
                  title={"加载完成"}
                  error={modalError}
                  isContentFull={false}
                  step={step}
                  steps={[
                    {
                      title: "Step 1",
                      children: (
                        <div className={ContentStyle}>
                          <p>这是一个加载完成的对话框。</p>
                          <p>数据: {data}</p>
                        </div>
                      ),
                    },
                    {
                      title: "Step 2",
                      children: (
                        <div
                          className={ContentStyle}
                          style={{ height: "2000px" }}
                        >
                          Step2 area
                        </div>
                      ),
                    },
                    {
                      title: "Step 3",
                      children: <div className={ContentStyle}>Step3 area</div>,
                    },
                  ]}
                  right={<div>Right area</div>}
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
                      setModalError(
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
          })
        }
      >
        加载完成
      </Button>
      <Button
        onClick={() => {
          pushModal({
            component: () => {
              const { isLoading, data, error, retry } = useMockQuery({
                failFirstTime: true,
              });
              const [step, setStep] = useState(0);
              const [modalError, setModalError] = useState("");

              if (isLoading || error) {
                return (
                  <WizardDialog
                    initializing={isLoading}
                    initializingError={error}
                    onOk={retry}
                    title=""
                  />
                );
              }

              return (
                <WizardDialog
                  title="加载成功"
                  error={modalError}
                  isContentFull={false}
                  step={step}
                  steps={[
                    {
                      title: "Step 1",
                      children: (
                        <div className={ContentStyle}>
                          <p>这是一个加载完成的对话框。</p>
                          <p>数据: {data}</p>
                        </div>
                      ),
                    },
                    {
                      title: "Step 2",
                      children: (
                        <div
                          className={ContentStyle}
                          style={{ height: "2000px" }}
                        >
                          Step2 area
                        </div>
                      ),
                    },
                    {
                      title: "Step 3",
                      children: <div className={ContentStyle}>Step3 area</div>,
                    },
                  ]}
                  right={<div>Right area</div>}
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
                      setModalError(
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
        加载失败
      </Button>
    </Space>
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
