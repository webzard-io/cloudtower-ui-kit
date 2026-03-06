# WizardDialog

## 简介

WizardDialog 是基于 ImmersiveDialog 的多步骤向导对话框组件，自动管理步骤导航、步骤指示器和按钮文案切换。非最后一步时确定按钮显示"下一步"并触发 `onNextStep`；最后一步显示"确定"并触发 `onOk`。左侧内置垂直步骤条（Steps），底部自动展示"上一步"按钮（第一步时隐藏）。

## 何时使用

- 多步骤表单（如"创建虚拟机"需要依次填写基本信息、网络配置、存储配置）
- 分步操作流程（需要引导用户按顺序完成一系列操作）
- 需要在步骤之间做校验、阻止用户跳到下一步的场景

不要使用：

- 简单确认操作 --> 请用 `SmallDialog`
- 不需要步骤的全屏操作 --> 请用 `ImmersiveDialog`
- 包含表单但无需分步 --> 请用 `MediumDialog`

## 基础用法

```tsx
import React from "react";
import { WizardDialog, Button } from "@cloudtower/eagle";
import { usePushModal, usePopModal } from "@cloudtower/eagle";

const CreateVmDialog: React.FC = () => {
  const popModal = usePopModal();

  return (
    <WizardDialog
      title="创建虚拟机"
      steps={[
        {
          title: "基本信息",
          children: <div>填写虚拟机名称、描述等基本信息</div>,
        },
        {
          title: "网络配置",
          children: <div>选择网络、配置 IP 地址</div>,
        },
        {
          title: "存储配置",
          children: <div>选择存储策略、配置磁盘</div>,
        },
      ]}
      onOk={(e) => {
        console.log("提交创建");
        popModal();
      }}
    >
    </WizardDialog>
  );
};

// 使用方式
const App = () => {
  const pushModal = usePushModal();

  return (
    <Button
      type="primary"
      onClick={() =>
        pushModal({
          component: () => <CreateVmDialog />,
          props: { name: "CreateVmDialog" },
        })
      }
    >
      创建虚拟机
    </Button>
  );
};
```

## 常见模式

### 模式一：基础向导

最简单的多步骤向导，步骤之间自由导航，最后一步提交。

```tsx
import React from "react";
import { WizardDialog, Button } from "@cloudtower/eagle";
import { usePushModal, usePopModal } from "@cloudtower/eagle";

const BasicWizardDialog: React.FC = () => {
  const popModal = usePopModal();

  return (
    <WizardDialog
      title="初始化集群"
      steps={[
        {
          title: "选择节点",
          children: <div>从列表中选择要加入集群的节点</div>,
        },
        {
          title: "网络设置",
          children: <div>配置集群网络参数</div>,
        },
        {
          title: "确认信息",
          children: <div>确认集群配置信息无误后提交</div>,
        },
      ]}
      onOk={(e) => {
        console.log("提交集群初始化");
        popModal();
      }}
    >
    </WizardDialog>
  );
};

const App = () => {
  const pushModal = usePushModal();

  return (
    <Button
      type="primary"
      onClick={() =>
        pushModal({
          component: () => <BasicWizardDialog />,
          props: { name: "BasicWizardDialog" },
        })
      }
    >
      初始化集群
    </Button>
  );
};
```

### 模式二：带校验的向导（onNextStep 阻止导航）

这是 WizardDialog 最核心的模式。通过 `onNextStep` 回调返回 `false` 来阻止用户在校验未通过时跳到下一步。注意：组件内部使用严格等于 `=== false` 判断，因此只有显式返回 `false` 才会阻止导航，返回 `undefined`（即不返回值）不会阻止。

```tsx
import React, { useState } from "react";
import { WizardDialog, Button } from "@cloudtower/eagle";
import { usePushModal, usePopModal } from "@cloudtower/eagle";

const ValidatedWizardDialog: React.FC = () => {
  const popModal = usePopModal();
  const [vmName, setVmName] = useState("");
  const [network, setNetwork] = useState("");
  const [error, setError] = useState<string>();

  return (
    <WizardDialog
      title="创建虚拟机"
      error={error}
      steps={[
        {
          title: "基本信息",
          children: (
            <div>
              <label>虚拟机名称</label>
              <input
                value={vmName}
                onChange={(e) => {
                  setVmName(e.target.value);
                  setError(undefined);
                }}
                placeholder="请输入虚拟机名称"
              />
            </div>
          ),
        },
        {
          title: "网络配置",
          children: (
            <div>
              <label>网络</label>
              <input
                value={network}
                onChange={(e) => {
                  setNetwork(e.target.value);
                  setError(undefined);
                }}
                placeholder="请选择网络"
              />
            </div>
          ),
        },
        {
          title: "确认",
          children: (
            <div>
              <p>虚拟机名称：{vmName}</p>
              <p>网络：{network}</p>
            </div>
          ),
        },
      ]}
      onNextStep={(nextStep) => {
        // nextStep 是即将跳转到的步骤索引
        if (nextStep === 1 && !vmName.trim()) {
          setError("请输入虚拟机名称");
          return false; // 阻止导航
        }
        if (nextStep === 2 && !network.trim()) {
          setError("请选择网络");
          return false; // 阻止导航
        }
        setError(undefined);
        // 不返回值（即返回 undefined），允许导航
      }}
      onOk={(e) => {
        console.log("提交创建", { vmName, network });
        popModal();
      }}
    >
    </WizardDialog>
  );
};

const App = () => {
  const pushModal = usePushModal();

  return (
    <Button
      type="primary"
      onClick={() =>
        pushModal({
          component: () => <ValidatedWizardDialog />,
          props: { name: "ValidatedWizardDialog" },
        })
      }
    >
      创建虚拟机
    </Button>
  );
};
```

### 模式三：受控模式向导

通过外部 state 控制当前步骤，配合 `onStepChange` 同步状态。适用于需要在父组件中根据步骤变化执行额外逻辑的场景。

```tsx
import React, { useState } from "react";
import { WizardDialog, Button } from "@cloudtower/eagle";
import { usePushModal, usePopModal } from "@cloudtower/eagle";

const ControlledWizardDialog: React.FC = () => {
  const popModal = usePopModal();
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <WizardDialog
      title="部署应用"
      step={currentStep}
      onStepChange={(step) => {
        console.log("步骤变化:", step);
        setCurrentStep(step);
      }}
      onPrevStep={(step) => {
        console.log("返回上一步:", step);
      }}
      onNextStep={(step) => {
        console.log("进入下一步:", step);
      }}
      steps={[
        {
          title: "选择镜像",
          children: <div>当前步骤：{currentStep + 1} / 3</div>,
        },
        {
          title: "配置资源",
          children: <div>当前步骤：{currentStep + 1} / 3</div>,
        },
        {
          title: "确认部署",
          children: <div>当前步骤：{currentStep + 1} / 3</div>,
        },
      ]}
      onOk={(e) => {
        console.log("确认部署");
        popModal();
      }}
    >
    </WizardDialog>
  );
};

const App = () => {
  const pushModal = usePushModal();

  return (
    <Button
      type="primary"
      onClick={() =>
        pushModal({
          component: () => <ControlledWizardDialog />,
          props: { name: "ControlledWizardDialog" },
        })
      }
    >
      部署应用
    </Button>
  );
};
```

## 关键说明

- **按钮文案自动切换**：非最后一步时，确认按钮文案自动显示为 `nextText`（默认"下一步"）；最后一步时显示为 `okText`（默认"确认"）。
- **onNextStep 校验机制**：`onNextStep` 返回值严格等于 `false`（`=== false`）时阻止导航到下一步。返回 `undefined`、`null`、`true` 或其他值均不会阻止。这是该组件最核心的交互模式。
- **onOk 仅在最后一步触发**：非最后一步点击确认按钮时触发的是 `onNextStep`，不会触发 `onOk`。
- **onOk 签名**：`onOk` 的签名为 `(e: React.MouseEvent) => void`，与 ImmersiveDialog 一致。需要使用 `usePopModal()` 获取 `popModal` 函数手动关闭弹窗。
- **步骤内容保留**：默认情况下所有步骤内容均保留在 DOM 中（通过 `display: none` 隐藏），表单状态不会丢失。如需销毁非当前步骤的内容，可设置 `destroyOtherStep={true}`。
- **"上一步"按钮**：当步骤索引大于 0 时，底部左侧自动展示"上一步"按钮（带左箭头图标）。第一步时不显示。
- **footerLeftAction 被占用**：WizardDialog 内部使用 `footerLeftAction` 渲染"上一步"按钮，因此外部传入的 `footerLeftAction` 会被覆盖。

## 废弃说明

当前推荐使用。WizardDialog 是多步骤向导场景的标准组件，新代码应统一使用 WizardDialog。

## 相关组件

- `ImmersiveDialog` -- 全屏沉浸式对话框，WizardDialog 的基础组件，适用于不需要步骤的全屏操作
- `SmallDialog` -- 轻量级对话框（492px），适用于简单确认和信息提示
- `MediumDialog` -- 中等尺寸对话框（720px），适用于包含表单输入的场景
- `DeleteDialog` -- 删除确认对话框，封装了删除场景的标准样式和交互（位于 `@cloudtower/eagle` 的 coreX 模块）
- `Steps` -- 步骤条组件，WizardDialog 内部使用的步骤指示器
