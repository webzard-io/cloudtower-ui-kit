import { css } from "@linaria/core";
import Button from "@src/core/Button";
import { ImmersiveDialog } from "@src/core/ImmersiveDialog";
import { ImmersiveDialogProps } from "@src/core/ImmersiveDialog/type";
import KitStoreProvider, {
  usePopModal,
  usePushModal,
} from "@src/core/KitStoreProvider";
import ModalStack from "@src/core/ModalStack";
import Space from "@src/core/Space";
import { SwitchWithText } from "@src/coreX";
import { CoreMeta } from "@stories/types";
import { useMockQuery } from "@stories/utils";
import React, { useMemo, useState } from "react";

const ContentStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: rgba(30, 201, 127, 0.1);
`;

export const CenterImmersiveDialog = () => {
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
            isContentFull: false,
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

export const FullContentImmersiveDialog = () => {
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
            isContentFull: true,
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

const ScrollItemStyle = css`
  margin-bottom: 16px;
  background-color: #ffffff;
  border-radius: 8px;
  padding: 16px;
  border: 1px solid #e1e6f1;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

export const ScrollableImmersiveDialog = () => {
  const pushModal = usePushModal();
  const popModal = usePopModal();
  const [isFull, setIsFull] = useState(false);
  const [isLongTitle, setIsLongTitle] = useState(false);

  // 生成大量内容用于演示滚动
  const generateScrollContent = () => {
    const items = [];
    for (let i = 1; i <= 3; i++) {
      items.push(
        <div key={i} className={ScrollItemStyle}>
          <h3>数据项 {i}</h3>
          <p>
            这是第 {i}{" "}
            个数据项的详细描述内容。这个对话框展示了当内容超过可视区域高度时的滚动效果。
            用户可以通过滚动来查看所有的内容项，确保在全屏对话框中能够舒适地浏览大量数据。
          </p>
          <p>
            额外的描述文本用于增加内容长度：Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat.
          </p>
        </div>,
      );
    }
    return items;
  };

  return (
    <div style={{ display: "flex", gap: 16 }}>
      <SwitchWithText
        checked={isFull}
        onChange={(checked) => setIsFull(checked)}
        text={{
          checked: "非常规尺寸",
          unchecked: "常规尺寸",
        }}
      />
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
        onClick={() =>
          pushModal({
            component: ImmersiveDialog,
            props: {
              title: isLongTitle
                ? "可滚动内容展示 - 全屏长标题 Loooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong"
                : "可滚动内容展示 - 全屏对话框",
              error: "这是一个包含大量数据的示例，展示滚动功能",
              isContentFull: isFull,
              children: (
                <div>
                  <div
                    style={{
                      marginBottom: "20px",
                      fontSize: "16px",
                      fontWeight: "bold",
                    }}
                  >
                    📋 数据列表 (共50项，支持滚动查看)
                  </div>
                  {generateScrollContent()}
                  <div
                    style={{
                      textAlign: "center",
                      fontSize: "14px",
                      color: "#666",
                      borderRadius: "8px",
                    }}
                  >
                    🎉 恭喜！您已滚动到底部
                  </div>
                </div>
              ),
              okText: "确认处理",
              cancelText: "取消操作",
              onOk() {
                console.log("用户确认处理数据");
                popModal();
              },
              onCancel() {
                console.log("用户取消操作");
              },
            },
          })
        }
      >
        打开可滚动对话框
      </Button>
    </div>
  );
};

const story = {
  title: "Core/ImmersiveDialog | 全屏弹窗",
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
} satisfies CoreMeta<typeof ImmersiveDialog>;

export default story;

/**
 * 带错误信息的对话框
 */
export const WithError = () => {
  const pushModal = usePushModal();
  const popModal = usePopModal();

  return (
    <Space direction="vertical" size={16}>
      <Button
        type="primary"
        onClick={() =>
          pushModal({
            component: ImmersiveDialog,
            props: {
              title: "Title",
              error: "Error text",
              children: <div className={ContentStyle}>Content area</div>,
              isContentFull: false,
              onOk() {
                popModal();
              },
            },
          })
        }
      >
        带错误 icon
      </Button>
      <Button
        type="primary"
        onClick={() =>
          pushModal({
            component: ImmersiveDialog,
            props: {
              title: "Title",
              error: "Error text",
              showFooterErrorIcon: false,
              children: <div className={ContentStyle}>Content area</div>,
              isContentFull: false,
              onOk() {
                popModal();
              },
            },
          })
        }
      >
        不带错误 icon
      </Button>
    </Space>
  );
};

/**
 * 初始化状态
 */
export const Initializing = () => {
  const pushModal = usePushModal();
  const popModal = usePopModal();

  return (
    <Space direction="vertical" size={16}>
      <Button
        onClick={() => {
          pushModal({
            component: () => <ImmersiveDialog initializing title="持续加载" />,
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

              const modalProps: ImmersiveDialogProps = useMemo(() => {
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
                <ImmersiveDialog {...modalProps}>
                  <p>这是一个加载完成的对话框。</p>
                  <p>数据: {data}</p>
                </ImmersiveDialog>
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

              const modalProps: ImmersiveDialogProps = useMemo(() => {
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
                <ImmersiveDialog {...modalProps}>
                  <p>恭喜！经过 {attemptCount} 次尝试，数据加载成功了。</p>
                  <p>数据: {data}</p>
                </ImmersiveDialog>
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
