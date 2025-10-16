import React, { useMemo } from "react";
import { Button, Input, SmallDialogProps, Space, Typo } from "@src/core";
import ModalStack from "@src/core/ModalStack";
import KitStoreProvider, { usePushModal } from "@src/core/KitStoreProvider";
import { SmallDialog } from "@src/core";
import { CoreMeta } from "@stories/types";
import { css } from "@linaria/core";
import { useMockQuery } from "@stories/utils";

const StoryContainer = css`
  padding: 20px;
`;

/**
 * SmallDialog 组件
 *
 * 一个轻量级的小尺寸对话框组件，适用于简单的确认、提示等场景。
 *
 * ### 特性
 * - 固定宽度 492px，适合移动端和桌面端使用
 * - 支持自定义标题、按钮文案和样式
 * - 支持在底部显示错误信息
 * - 可配置是否显示确认按钮、关闭按钮等
 * - 支持点击遮罩层关闭
 */
const meta: CoreMeta<typeof SmallDialog> = {
  component: SmallDialog,
  title: "Core/SmallDialog | 小弹窗",
  decorators: [
    (Story) => (
      <KitStoreProvider>
        <ModalStack />
        <div className={StoryContainer}>
          <Story />
        </div>
      </KitStoreProvider>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component: `
SmallDialog 是一个预设样式的小型对话框组件，具有以下特点：

- **固定宽度**: 492px，保持视觉一致性
- **灵活配置**: 支持自定义标题、按钮、错误信息等
- **响应式设计**: 适配不同屏幕尺寸
- **错误处理**: 内置错误信息显示功能
        `,
      },
    },
    design: {
      type: "figma",
      url: "https://www.figma.com/design/YOUR_FIGMA_URL_HERE", // 请替换为实际的设计稿URL
    },
  },
};

export default meta;

/**
 * 基础用法
 */
export const Basic = () => {
  const pushModal = usePushModal();

  return (
    <Button
      type="primary"
      onClick={() =>
        pushModal({
          component: () => (
            <SmallDialog
              title="基础对话框"
              onOk={(popModal) => {
                console.log("确认操作");
                popModal();
              }}
              onCancel={(popModal) => {
                console.log("取消操作");
                popModal();
              }}
            >
              <p>这是一个基础的小型对话框示例。</p>
              <p>您可以在这里放置任何内容。</p>
            </SmallDialog>
          ),
          props: {},
        })
      }
    >
      打开基础对话框
    </Button>
  );
};

/**
 * 确认删除对话框
 */
export const DeleteConfirmation = () => {
  const pushModal = usePushModal();

  return (
    <Button
      danger
      onClick={() =>
        pushModal({
          component: () => (
            <SmallDialog
              title="删除确认"
              okText="删除"
              cancelText="取消"
              okButtonProps={{ danger: true }}
              onOk={(popModal) => {
                console.log("执行删除操作");
                popModal();
              }}
            >
              <p>确定要删除这个项目吗？</p>
              <p className={Typo.Label.l3_regular} style={{ color: "#666" }}>
                删除后无法恢复，请谨慎操作。
              </p>
            </SmallDialog>
          ),
          props: {},
        })
      }
    >
      删除项目
    </Button>
  );
};

/**
 * 只有取消按钮
 */
export const CancelOnly = () => {
  const pushModal = usePushModal();

  return (
    <Button
      onClick={() =>
        pushModal({
          component: () => (
            <SmallDialog title="信息提示" showOk={false} cancelText="我知道了">
              <p>这是一个纯信息展示的对话框。</p>
              <p>只有一个关闭按钮。</p>
            </SmallDialog>
          ),
          props: {},
        })
      }
    >
      打开信息对话框
    </Button>
  );
};

/**
 * 带错误信息的对话框
 */
export const WithError = () => {
  const pushModal = usePushModal();

  return (
    <Button
      onClick={() =>
        pushModal({
          component: () => {
            const [hasError, setHasError] = React.useState(false);

            return (
              <SmallDialog
                title="操作确认"
                okText="提交"
                error={
                  hasError ? "请检查输入信息是否正确".repeat(5) : undefined
                }
                onOk={(popModal) => {
                  // 模拟验证失败
                  if (!hasError) {
                    setHasError(true);
                    return;
                  }
                  console.log("提交成功");
                  setHasError(false);
                  popModal();
                }}
                onCancel={() => {
                  setHasError(false);
                }}
              >
                <p>请确认您的操作信息：</p>
                <ul>
                  <li>操作类型：数据更新</li>
                  <li>影响范围：当前项目</li>
                  <li>执行时间：立即执行</li>
                </ul>
                <p style={{ fontSize: "12px", color: "#999" }}>
                  点击"提交"按钮会先模拟一次验证失败，再次点击才会成功。
                </p>
              </SmallDialog>
            );
          },
          props: {},
        })
      }
    >
      带错误提示的对话框
    </Button>
  );
};

/**
 * 长内容对话框
 */
export const LongContent = () => {
  const pushModal = usePushModal();

  const longContent = Array.from({ length: 2 }, (_, i) => (
    <p key={i}>
      这是第 {i + 1}{" "}
      段内容。在实际使用中，这里可能是用户协议、详细说明、配置信息等较长的文本内容。
      SmallDialog 会自动处理内容溢出，显示滚动条以确保所有内容都可以被查看。
    </p>
  ));

  return (
    <Space direction="vertical" size={16}>
      <Button
        onClick={() =>
          pushModal({
            component: () => (
              <SmallDialog
                title="这是长标题 Loooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong"
                okText="同意并继续"
                cancelText="不同意"
              >
                <h4>服务条款</h4>
                {longContent}
                <p style={{ fontWeight: "bold", color: "#1890ff" }}>
                  请仔细阅读以上条款，点击"同意并继续"表示您已阅读并同意所有条款。
                </p>
              </SmallDialog>
            ),
            props: {},
          })
        }
      >
        长标题对话框
      </Button>
      <Button
        onClick={() =>
          pushModal({
            component: () => (
              <SmallDialog
                title="用户协议"
                okText="同意并继续"
                cancelText="不同意"
              >
                <h4>服务条款</h4>
                {longContent}
                <p style={{ fontWeight: "bold", color: "#1890ff" }}>
                  请仔细阅读以上条款，点击"同意并继续"表示您已阅读并同意所有条款。
                </p>
              </SmallDialog>
            ),
            props: {},
          })
        }
      >
        长内容对话框
      </Button>
    </Space>
  );
};

/**
 * 初始化状态
 */
export const Initializing = () => {
  const pushModal = usePushModal();

  return (
    <Space direction="vertical" size={16}>
      <Button
        onClick={() => {
          pushModal({
            component: () => <SmallDialog initializing title="持续加载" />,
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

              const modalProps: SmallDialogProps = useMemo(() => {
                switch (true) {
                  case isLoading: {
                    const initializingModalProps = {
                      title: "",
                      initializing: isLoading,
                    };
                    return initializingModalProps;
                  }
                  case Boolean(error): {
                    const initializeFailedModalProps = {
                      title: "",
                      initializingError: error,
                      onOk: retry,
                    };
                    return initializeFailedModalProps;
                  }
                  default: {
                    const idleModalProps = {
                      title: "加载完成",
                    };
                    return idleModalProps;
                  }
                }
              }, [isLoading, error, retry]);

              return (
                <SmallDialog {...modalProps}>
                  <p>这是一个加载完成的对话框。</p>
                  <p>数据: {data}</p>
                </SmallDialog>
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
              const { isLoading, data, error, retry, attemptCount } =
                useMockQuery({
                  failFirstTime: true,
                });

              const modalProps: SmallDialogProps = useMemo(() => {
                switch (true) {
                  case isLoading: {
                    const initializingModalProps = {
                      title: "",
                      initializing: isLoading,
                    };
                    return initializingModalProps;
                  }
                  case Boolean(error): {
                    const initializeFailedModalProps = {
                      title: "",
                      initializingError: error,
                      onOk: retry,
                    };
                    return initializeFailedModalProps;
                  }
                  default: {
                    const idleModalProps = {
                      title: "加载成功",
                    };
                    return idleModalProps;
                  }
                }
              }, [isLoading, error, retry]);

              return (
                <SmallDialog {...modalProps}>
                  <p>恭喜！经过 {attemptCount} 次尝试，数据加载成功了。</p>
                  <p>数据: {data}</p>
                </SmallDialog>
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
