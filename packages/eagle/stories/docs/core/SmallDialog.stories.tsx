import { css, cx } from "@linaria/core";
import { Button, SmallDialogProps, Space, Typo } from "@src/core";
import { SmallDialog } from "@src/core";
import KitStoreProvider, { usePushModal } from "@src/core/KitStoreProvider";
import ModalStack from "@src/core/ModalStack";
import { CoreMeta } from "@stories/types";
import { useMockQuery } from "@stories/utils";
import React, { useMemo } from "react";

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
 *
 * 演示最基本的 SmallDialog 用法：通过 `usePushModal` 打开弹窗，
 * 在 `onOk`/`onCancel` 回调中调用 `popModal()` 关闭弹窗。
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
Basic.storyName = "基础用法";

/**
 * 确认删除对话框
 *
 * 演示危险操作确认场景：通过 `okButtonProps={{ danger: true }}` 将确认按钮标红，
 * 自定义 `okText` 和 `cancelText` 按钮文案。
 */
/**
 * 确认删除
 *
 * 演示用 SmallDialog 原始 API 实现删除确认弹窗。
 * 生产环境中推荐直接使用 DeleteDialog，它已内置 danger 按钮和删除语义。
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
DeleteConfirmation.storyName = "确认删除";

/**
 * 只有取消按钮
 *
 * 通过 `showOk={false}` 隐藏确认按钮，仅展示关闭按钮。
 * 适用于纯信息提示场景。取消按钮样式自动从 `quiet` 变为 `ordinary`。
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
CancelOnly.storyName = "仅取消按钮";

/**
 * 带错误信息的对话框
 *
 * 演示 `error` 属性：在 footer 区域显示错误文案（最多 3 行，超出后 tooltip 展示）。
 * 首次点击"提交"模拟验证失败并显示错误，再次点击成功关闭。
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
WithError.storyName = "错误信息展示";

/**
 * 长内容对话框
 *
 * 演示内容溢出时的滚动行为。包含长标题截断和长内容滚动两种场景。
 */
export const LongContent = () => {
  const pushModal = usePushModal();

  const longContent = Array.from({ length: 10 }, (_, i) => (
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
LongContent.storyName = "长内容";

/**
 * 初始化状态
 *
 * 演示 `initializing`、`initializingError` 属性的三种场景：
 * 持续加载（骨架屏）、加载成功、加载失败后重试。
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
Initializing.storyName = "初始化状态";

/**
 * 不展示 footer
 *
 * 通过 `hideFooter` 隐藏底部按钮区域，适用于纯展示内容的场景。
 * 用户仍可通过右上角关闭按钮或遮罩层关闭弹窗。
 */
export const NoFooter = () => {
  const pushModal = usePushModal();

  const getLongContent = (length: number) => {
    return Array.from({ length }, (_, i) => (
      <p key={i}>
        这是第 {i + 1}{" "}
        段内容。在实际使用中，这里可能是用户协议、详细说明、配置信息等较长的文本内容。
        SmallDialog 会自动处理内容溢出，显示滚动条以确保所有内容都可以被查看。
      </p>
    ));
  };

  return (
    <Space direction="vertical" size={16}>
      <Button
        onClick={() =>
          pushModal({
            component: () => (
              <SmallDialog
                title="用户协议"
                okText="同意并继续"
                cancelText="不同意"
                hideFooter
              >
                <h4>服务条款</h4>
                {getLongContent(1)}
                <p style={{ fontWeight: "bold", color: "#1890ff" }}>
                  请仔细阅读以上条款，点击"同意并继续"表示您已阅读并同意所有条款。
                </p>
              </SmallDialog>
            ),
            props: {},
          })
        }
      >
        不展示 footer
      </Button>
      <Button
        onClick={() =>
          pushModal({
            component: () => (
              <SmallDialog
                title="用户协议"
                okText="同意并继续"
                cancelText="不同意"
                hideFooter
              >
                <h4>服务条款</h4>
                {getLongContent(10)}
                <p style={{ fontWeight: "bold", color: "#1890ff" }}>
                  请仔细阅读以上条款，点击"同意并继续"表示您已阅读并同意所有条款。
                </p>
              </SmallDialog>
            ),
            props: {},
          })
        }
      >
        不展示 footer（长内容）
      </Button>
    </Space>
  );
};
NoFooter.storyName = "隐藏底部栏";

/**
 * 自定义标题渲染
 *
 * 通过 `TitleRender` 属性完全接管标题区域的渲染逻辑。
 * 默认标题使用 `Typo.Display.d2_bold_title` 样式，
 * 自定义时可添加图标、状态标签等额外元素。
 */
export const CustomTitle = () => {
  const pushModal = usePushModal();

  const SnapshotTitleRender: React.FC<{ title?: React.ReactNode }> = ({
    title,
  }) => {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span
          style={{
            display: "inline-block",
            width: 8,
            height: 8,
            borderRadius: "50%",
            backgroundColor: "#52c41a",
          }}
        />
        <span className={cx(Typo.Display.d2_bold_title)}>{title}</span>
        <span
          className={Typo.Label.l4_regular}
          style={{
            color: "#52c41a",
            border: "1px solid #b7eb8f",
            borderRadius: 4,
            padding: "0 6px",
            fontSize: 12,
          }}
        >
          运行中
        </span>
      </div>
    );
  };

  return (
    <Button
      type="primary"
      onClick={() =>
        pushModal({
          component: () => (
            <SmallDialog
              title="虚拟机快照"
              TitleRender={SnapshotTitleRender}
              onOk={(popModal) => {
                console.log("确认创建快照");
                popModal();
              }}
              onCancel={(popModal) => popModal()}
            >
              <p>确认为当前虚拟机创建快照？</p>
              <ul>
                <li>快照名称：snapshot-20260302</li>
                <li>虚拟机：web-server-01</li>
                <li>预计耗时：约 30 秒</li>
              </ul>
            </SmallDialog>
          ),
          props: {},
        })
      }
    >
      自定义标题渲染
    </Button>
  );
};
CustomTitle.storyName = "自定义标题渲染";

/**
 * 异步提交
 *
 * 演示 `confirmLoading` + `onOk` 异步提交的完整流程，
 * 这是最常见的业务模式：点击确认后显示 loading 状态，
 * 异步操作完成后关闭弹窗，失败时展示错误信息并保持弹窗打开。
 */
export const AsyncSubmit = () => {
  const pushModal = usePushModal();

  return (
    <Space direction="vertical" size={16}>
      <Button
        type="primary"
        onClick={() =>
          pushModal({
            component: () => {
              const [submitting, setSubmitting] = React.useState(false);
              const [submitError, setSubmitError] = React.useState<
                string | undefined
              >(undefined);

              return (
                <SmallDialog
                  title="创建虚拟机快照"
                  okText="创建"
                  confirmLoading={submitting}
                  error={submitError}
                  onOk={async (popModal) => {
                    setSubmitting(true);
                    setSubmitError(undefined);
                    try {
                      // 模拟异步 API 调用
                      await new Promise((resolve) =>
                        setTimeout(resolve, 1500)
                      );
                      console.log("快照创建成功");
                      popModal();
                    } catch {
                      setSubmitError("快照创建失败，请稍后重试");
                    } finally {
                      setSubmitting(false);
                    }
                  }}
                  onCancel={(popModal) => popModal()}
                >
                  <p>确认为以下虚拟机创建快照：</p>
                  <ul>
                    <li>虚拟机名称：web-server-01</li>
                    <li>快照描述：日常备份</li>
                  </ul>
                </SmallDialog>
              );
            },
            props: {},
          })
        }
      >
        异步提交（成功）
      </Button>
      <Button
        danger
        onClick={() =>
          pushModal({
            component: () => {
              const [submitting, setSubmitting] = React.useState(false);
              const [submitError, setSubmitError] = React.useState<
                string | undefined
              >(undefined);

              return (
                <SmallDialog
                  title="删除集群节点"
                  okText="删除"
                  okButtonProps={{ danger: true }}
                  confirmLoading={submitting}
                  error={submitError}
                  onOk={async (popModal) => {
                    setSubmitting(true);
                    setSubmitError(undefined);
                    try {
                      // 模拟异步 API 调用失败
                      await new Promise((_, reject) =>
                        setTimeout(
                          () => reject(new Error("节点处于维护模式")),
                          1500
                        )
                      );
                      popModal();
                    } catch (err) {
                      setSubmitError(
                        `操作失败：${err instanceof Error ? err.message : "未知错误"}，请检查节点状态后重试`
                      );
                    } finally {
                      setSubmitting(false);
                    }
                  }}
                  onCancel={(popModal) => popModal()}
                >
                  <p>确认删除以下集群节点？此操作不可恢复。</p>
                  <ul>
                    <li>节点名称：node-03</li>
                    <li>节点 IP：192.168.1.103</li>
                    <li>当前状态：运行中</li>
                  </ul>
                </SmallDialog>
              );
            },
            props: {},
          })
        }
      >
        异步提交（失败）
      </Button>
    </Space>
  );
};
AsyncSubmit.storyName = "异步提交";

/**
 * 自定义按钮样式
 *
 * 通过 `okButtonProps` 和 `cancelButtonProps` 自定义确认和取消按钮的样式，
 * 包括 `danger`、`disabled`、`type` 等属性。属性会透传给 Button 组件。
 */
export const ButtonCustomization = () => {
  const pushModal = usePushModal();

  return (
    <Space direction="vertical" size={16}>
      <Button
        danger
        onClick={() =>
          pushModal({
            component: () => (
              <SmallDialog
                title="危险操作确认"
                okText="确认删除"
                okButtonProps={{ danger: true }}
                cancelButtonProps={{ type: "quiet" }}
                onOk={(popModal) => {
                  console.log("执行危险操作");
                  popModal();
                }}
                onCancel={(popModal) => popModal()}
              >
                <p>此操作将永久删除选中的虚拟机及其关联数据。</p>
                <p className={Typo.Label.l3_regular} style={{ color: "#666" }}>
                  删除后数据无法恢复，请确认已备份重要数据。
                </p>
              </SmallDialog>
            ),
            props: {},
          })
        }
      >
        危险按钮样式
      </Button>
      <Button
        onClick={() =>
          pushModal({
            component: () => {
              const [agreed, setAgreed] = React.useState(false);

              return (
                <SmallDialog
                  title="服务协议"
                  okText="同意并继续"
                  okButtonProps={{ disabled: !agreed }}
                  onOk={(popModal) => {
                    console.log("已同意协议");
                    popModal();
                  }}
                  onCancel={(popModal) => popModal()}
                >
                  <p>请阅读并同意以下服务条款：</p>
                  <div
                    style={{
                      padding: "8px 12px",
                      backgroundColor: "#f5f5f5",
                      borderRadius: 4,
                      fontSize: 13,
                      maxHeight: 120,
                      overflow: "auto",
                      marginBottom: 12,
                    }}
                  >
                    <p>1. 用户数据将在集群内加密存储。</p>
                    <p>2. 管理员有权在维护期间暂停服务。</p>
                    <p>3. 资源配额受集群容量限制。</p>
                  </div>
                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      cursor: "pointer",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={agreed}
                      onChange={(e) => setAgreed(e.target.checked)}
                    />
                    <span className={Typo.Label.l3_regular}>
                      我已阅读并同意以上协议
                    </span>
                  </label>
                </SmallDialog>
              );
            },
            props: {},
          })
        }
      >
        确认按钮禁用状态
      </Button>
    </Space>
  );
};
ButtonCustomization.storyName = "按钮定制";
