import { Button } from "@src/core";
import KitStoreProvider, { usePushModal } from "@src/core/KitStoreProvider";
import ModalStack from "@src/core/ModalStack";
import KubeConfigModal from "@src/coreX/KubeConfigModal";
import { CoreXMeta } from "@stories/types";
import type { StoryObj } from "@storybook/react";
import React, { useState } from "react";

/**
 * KubeConfigModal 组件
 *
 * 用于显示和下载 Kubernetes 集群配置文件的全屏模态框组件。
 * 支持复制配置内容到剪贴板、下载配置文件等功能。
 *
 * ### 参数说明
 *
 * | 参数 | 说明 | 类型 | 默认值 |
 * | --- | --- | --- | --- |
 * | downloadName | 下载文件的名称，不包含文件扩展名，会自动添加 .yaml 后缀 | string | - |
 * | customDesc | 自定义描述文本，如果不提供则使用默认的下载提示文案 | string | - |
 * | loading | 是否显示加载状态，当为 true 时会显示 Loading 组件 | boolean | false |
 * | data | kubeconfig 配置数据内容，通常是 YAML 格式的字符串 | string | - |
 * | error | 错误信息，当有错误时会禁用下载按钮 | string | - |
 * | refetch | 重新获取数据的回调函数，用于刷新 kubeconfig 内容 | () => void | - |
 */
const meta = {
  component: KubeConfigModal,
  title: "CoreX/KubeConfigModal | Kubeconfig 下载模态框",
  decorators: [
    (Story) => (
      <KitStoreProvider>
        <ModalStack />
        <Story />
      </KitStoreProvider>
    ),
  ],
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/4I0kbaob8M1M9vlAUTJoAw/SFS-1.3?node-id=17929-31563&m=dev",
    },
  },
} satisfies CoreXMeta<typeof KubeConfigModal>;

export default meta;

type Story = StoryObj<typeof KubeConfigModal>;

// 模拟的 kubeconfig 数据
const mockKubeConfigData = `apiVersion: v1
kind: Config
clusters:
- name: my-cluster
  cluster:
    server: https://kubernetes.example.com
contexts:
- name: my-context
  context:
    cluster: my-cluster
    user: my-user
current-context: my-context
users:
- name: my-user
  user:
    token: eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJrdWJlcm5ldGVzL3NlcnZpY2VhY2NvdW50Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9uYW1lc3BhY2UiOiJkZWZhdWx0Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9zZWNyZXQubmFtZSI6ImRlZmF1bHQtdG9rZW4tYWJjZGUiLCJrdWJlcm5ldGVzLmlvL3NlcnZpY2VhY2NvdW50L3NlcnZpY2UtYWNjb3VudC5uYW1lIjoiZGVmYXVsdCIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VydmljZS1hY2NvdW50LnVpZCI6IjEyMzQ1Njc4LTkwYWItMTJjZC0zNGVmLTU2Nzg5MGFiY2RlZiIsInN1YiI6InN5c3RlbTpzZXJ2aWNlYWNjb3VudDpkZWZhdWx0OmRlZmF1bHQifQ.example-token`;

// 长内容的 kubeconfig 数据
const longKubeConfigData = `apiVersion: v1
kind: Config
clusters:
- name: production-cluster
  cluster:
    server: https://kubernetes.production.example.com:6443
    insecure-skip-tls-verify: false
- name: staging-cluster
  cluster:
    server: https://kubernetes.staging.example.com:6443
    insecure-skip-tls-verify: false
- name: development-cluster
  cluster:
    server: https://kubernetes.dev.example.com:6443
    insecure-skip-tls-verify: false
contexts:
- name: production-context
  context:
    cluster: production-cluster
    user: production-user
    namespace: production
- name: staging-context
  context:
    cluster: staging-cluster
    user: staging-user
    namespace: staging
- name: development-context
  context:
    cluster: development-cluster
    user: development-user
    namespace: development
current-context: production-context
users:
- name: production-user
  user:
    token: eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJrdWJlcm5ldGVzL3NlcnZpY2VhY2NvdW50Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9uYW1lc3BhY2UiOiJwcm9kdWN0aW9uIiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9zZWNyZXQubmFtZSI6InByb2R1Y3Rpb24tdG9rZW4tYWJjZGUiLCJrdWJlcm5ldGVzLmlvL3NlcnZpY2VhY2NvdW50L3NlcnZpY2UtYWNjb3VudC5uYW1lIjoicHJvZHVjdGlvbiIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VydmljZS1hY2NvdW50LnVpZCI6IjEyMzQ1Njc4LTkwYWItMTJjZC0zNGVmLTU2Nzg5MGFiY2RlZiIsInN1YiI6InN5c3RlbTpzZXJ2aWNlYWNjb3VudDpwcm9kdWN0aW9uOnByb2R1Y3Rpb24ifQ.production-token
- name: staging-user
  user:
    token: eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJrdWJlcm5ldGVzL3NlcnZpY2VhY2NvdW50Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9uYW1lc3BhY2UiOiJzdGFnaW5nIiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9zZWNyZXQubmFtZSI6InN0YWdpbmctdG9rZW4tYWJjZGUiLCJrdWJlcm5ldGVzLmlvL3NlcnZpY2VhY2NvdW50L3NlcnZpY2UtYWNjb3VudC5uYW1lIjoic3RhZ2luZyIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VydmljZS1hY2NvdW50LnVpZCI6IjEyMzQ1Njc4LTkwYWItMTJjZC0zNGVmLTU2Nzg5MGFiY2RlZiIsInN1YiI6InN5c3RlbTpzZXJ2aWNlYWNjb3VudDpzdGFnaW5nOnN0YWdpbmcifQ.staging-token
- name: development-user
  user:
    token: eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJrdWJlcm5ldGVzL3NlcnZpY2VhY2NvdW50Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9uYW1lc3BhY2UiOiJkZXZlbG9wbWVudCIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VjcmV0Lm5hbWUiOiJkZXZlbG9wbWVudC10b2tlbi1hYmNkZSIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VydmljZS1hY2NvdW50Lm5hbWUiOiJkZXZlbG9wbWVudCIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VydmljZS1hY2NvdW50LnVpZCI6IjEyMzQ1Njc4LTkwYWItMTJjZC0zNGVmLTU2Nzg5MGFiY2RlZiIsInN1YiI6InN5c3RlbTpzZXJ2aWNlYWNjb3VudDpkZXZlbG9wbWVudDpkZXZlbG9wbWVudCJ9.development-token`;

/**
 * 基础用法
 *
 * 展示 KubeConfigModal 组件的基本功能，包括显示 kubeconfig 内容、
 * 复制到剪贴板和下载配置文件。
 */
export const Basic: Story = {
  name: "基础用法",
  render: () => {
    const pushModal = usePushModal();

    return (
      <div style={{ padding: "20px" }}>
        <Button
          type="primary"
          onClick={() => {
            pushModal({
              component: (props: any) => <KubeConfigModal {...props} />,
              props: {
                downloadName: "my-cluster-config",
                data: mockKubeConfigData,
              },
            });
          }}
        >
          打开 KubeConfig 模态框
        </Button>
      </div>
    );
  },
};

/**
 * 自定义描述文本
 *
 * 通过 customDesc 参数自定义模态框中的描述文本，
 * 适用于需要特殊说明的场景。
 */
export const CustomDescription: Story = {
  name: "自定义描述文本",
  render: () => {
    const pushModal = usePushModal();

    return (
      <div style={{ padding: "20px" }}>
        <Button
          type="primary"
          onClick={() => {
            pushModal({
              component: (props: any) => <KubeConfigModal {...props} />,
              props: {
                downloadName: "production-cluster-config",
                customDesc:
                  "这是生产环境的 Kubernetes 集群配置文件，请妥善保管，不要泄露给无关人员。",
                data: mockKubeConfigData,
              },
            });
          }}
        >
          打开自定义描述模态框
        </Button>
      </div>
    );
  },
};

/**
 * 加载状态
 *
 * 当 loading 为 true 时，模态框会显示加载状态，
 * 同时禁用下载按钮，适用于异步获取配置数据的场景。
 */
export const Loading: Story = {
  name: "加载状态",
  render: () => {
    const pushModal = usePushModal();

    return (
      <div style={{ padding: "20px" }}>
        <Button
          type="primary"
          onClick={() => {
            pushModal({
              component: (props: any) => <KubeConfigModal {...props} />,
              props: {
                downloadName: "loading-cluster-config",
                loading: true,
                data: mockKubeConfigData,
              },
            });
          }}
        >
          打开加载状态模态框
        </Button>
      </div>
    );
  },
};

/**
 * 长内容展示
 *
 * 展示包含多个集群和上下文的复杂 kubeconfig 内容，
 * 验证组件在长内容情况下的显示效果。
 */
export const LongContent: Story = {
  name: "长内容展示",
  render: () => {
    const pushModal = usePushModal();

    return (
      <div style={{ padding: "20px" }}>
        <Button
          type="primary"
          onClick={() => {
            pushModal({
              component: (props: any) => <KubeConfigModal {...props} />,
              props: {
                downloadName: "multi-cluster-config",
                customDesc:
                  "这是一个包含多个集群配置的复杂 kubeconfig 文件，包含生产、测试和开发环境的配置信息。",
                data: longKubeConfigData,
              },
            });
          }}
        >
          打开长内容模态框
        </Button>
      </div>
    );
  },
};

/**
 * 错误状态
 *
 * 当有错误信息时，下载按钮会被禁用，
 * 适用于配置获取失败或无效的场景。
 */
export const Error: Story = {
  name: "错误状态",
  render: () => {
    const pushModal = usePushModal();

    return (
      <div style={{ padding: "20px" }}>
        <Button
          type="primary"
          onClick={() => {
            pushModal({
              component: (props: any) => <KubeConfigModal {...props} />,
              props: {
                downloadName: "error-cluster-config",
                error: "Failed to fetch kubeconfig: Network timeout",
                data: mockKubeConfigData,
              },
            });
          }}
        >
          打开错误状态模态框
        </Button>
      </div>
    );
  },
};

/**
 * 带刷新功能
 *
 * 通过 refetch 回调函数提供重新获取数据的功能，
 * 适用于需要动态更新配置的场景。
 */
export const WithRefetch: Story = {
  name: "带刷新功能",
  render: () => {
    const pushModal = usePushModal();
    const [refreshCount, setRefreshCount] = useState(0);

    const handleRefetch = () => {
      setRefreshCount((prev) => prev + 1);
      console.log("Refetching kubeconfig data...");
    };

    return (
      <div style={{ padding: "20px" }}>
        <div style={{ marginBottom: "16px" }}>
          <span>刷新次数: {refreshCount}</span>
        </div>
        <Button
          type="primary"
          onClick={() => {
            pushModal({
              component: (props: any) => <KubeConfigModal {...props} />,
              props: {
                downloadName: "refreshable-cluster-config",
                customDesc: "点击刷新按钮可以重新获取最新的集群配置信息。",
                data: mockKubeConfigData,
                error: "Failed to fetch kubeconfig: Network timeout",
                refetch: handleRefetch,
              },
            });
          }}
        >
          打开带刷新功能模态框
        </Button>
      </div>
    );
  },
};
