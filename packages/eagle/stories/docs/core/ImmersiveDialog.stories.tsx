import { css, cx } from "@linaria/core";
import Button from "@src/core/Button";
import { ImmersiveDialog } from "@src/core/ImmersiveDialog";
import { ImmersiveDialogProps } from "@src/core/ImmersiveDialog/type";
import KitStoreProvider, {
  usePopModal,
  usePushModal,
} from "@src/core/KitStoreProvider";
import ModalStack from "@src/core/ModalStack";
import Space from "@src/core/Space";
import { Typo } from "@src/core/Typo";
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
          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
      </div>,
    );
  }
  return items;
};

/**
 * 居中内容
 */
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
CenterImmersiveDialog.storyName = "居中内容";

/**
 * 全宽内容
 */
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
FullContentImmersiveDialog.storyName = "全宽内容";

const ScrollItemStyle = css`
  margin-bottom: 16px;
  background-color: #ffffff;
  border-radius: 8px;
  padding: 16px;
  border: 1px solid #e1e6f1;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

/**
 * 可滚动内容
 */
export const ScrollableImmersiveDialog = () => {
  const pushModal = usePushModal();
  const popModal = usePopModal();
  const [isFull, setIsFull] = useState(false);
  const [isLongTitle, setIsLongTitle] = useState(false);

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
                    数据列表 (共50项，支持滚动查看)
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
                    已滚动到底部
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
ScrollableImmersiveDialog.storyName = "可滚动内容";

/**
 * ImmersiveDialog 组件
 *
 * 全屏沉浸式对话框，适用于需要大面积操作空间的复杂表单和详情编辑。多步骤向导请使用 WizardDialog。
 *
 * ### 特性
 * - 全屏展示，占满视口（留 10px 边距）
 * - 支持三栏布局：左侧导航（192px）+ 中间内容（648px）+ 右侧辅助信息（192px）
 * - `isContentFull` 模式隐藏左右面板，内容区占满宽度
 * - 底部操作栏支持 `footerLeftAction` 自定义左侧区域
 * - 内置初始化加载和错误重试状态
 */
const meta = {
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
  parameters: {
    docs: {
      description: {
        component: `
ImmersiveDialog 是一个全屏沉浸式对话框组件，具有以下特点：

- **全屏布局**: 占满整个视口（留 10px 边距），适合复杂操作
- **三栏布局**: 左侧（192px）+ 中间（648px）+ 右侧（192px），可用于详情查看、配置编辑
- **全宽模式**: 通过 \`isContentFull\` 隐藏左右面板，内容区占满宽度
- **底部操作区**: 支持 \`footerLeftAction\` 在底部左侧放置辅助操作
- **初始化状态**: 内置 loading 骨架屏和错误重试交互

注意：\`onOk\` 回调接收 \`(e: React.MouseEvent)\`，需要使用 \`usePopModal()\` 单独关闭弹窗。
        `,
      },
    },
  },
} satisfies CoreMeta<typeof ImmersiveDialog>;

export default meta;

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
WithError.storyName = "带错误信息";

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
              const [submitting, setSubmitting] = useState(false);

              const handleOk = () => {
                setSubmitting(true);
                setTimeout(() => {
                  setSubmitting(false);
                  popModal();
                }, 1000);
              };

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
                      okText: submitting ? "提交中..." : "提交",
                      onOk: handleOk,
                      confirmLoading: submitting,
                    };
                    return idleModalProps;
                  }
                }
              }, [isLoading, error, retry, submitting]);

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
Initializing.storyName = "初始化状态";

/**
 * 不展示 footer
 */
export const NoFooter = () => {
  const pushModal = usePushModal();
  const popModal = usePopModal();
  const [isFull, setIsFull] = useState(false);

  return (
    <Space direction="vertical" size={16}>
      <SwitchWithText
        checked={isFull}
        onChange={(checked) => setIsFull(checked)}
        text={{
          checked: "非常规尺寸",
          unchecked: "常规尺寸",
        }}
      />
      <Button
        type="primary"
        onClick={() =>
          pushModal({
            component: ImmersiveDialog,
            props: {
              title: "可滚动内容展示 - 全屏对话框",
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
                    数据列表 (共50项，支持滚动查看)
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
                    已滚动到底部
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
              hideFooter: true,
            },
          })
        }
      >
        不展示 footer（长内容）
      </Button>
    </Space>
  );
};
NoFooter.storyName = "不展示底部栏";

// --- 新增 Story 的样式 ---

const NavListStyle = css`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const NavItemStyle = css`
  padding: 10px 12px;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 4px;
  color: #6e7d95;
  transition: background-color 0.2s, color 0.2s;

  &:hover {
    background-color: rgba(30, 201, 127, 0.06);
  }
`;

const NavItemActiveStyle = css`
  background-color: rgba(30, 201, 127, 0.1);
  color: #1ec97f;
  font-weight: 600;
`;

const PropertyListStyle = css`
  padding: 0;
`;

const PropertyGroupStyle = css`
  margin-bottom: 20px;
`;

const PropertyGroupTitleStyle = css`
  color: #6e7d95;
  margin-bottom: 8px;
`;

const PropertyItemStyle = css`
  display: flex;
  justify-content: space-between;
  padding: 6px 0;
  border-bottom: 1px solid #f0f2f5;

  &:last-child {
    border-bottom: none;
  }
`;

const PropertyLabelStyle = css`
  color: #8c99ad;
`;

const PropertyValueStyle = css`
  color: #323e4f;
  font-weight: 500;
`;

const DetailSectionStyle = css`
  margin-bottom: 24px;
`;

const DetailSectionTitleStyle = css`
  margin-bottom: 16px;
  padding-bottom: 8px;
  border-bottom: 1px solid #e1e6f1;
  color: #323e4f;
`;

const DetailRowStyle = css`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
`;

const DetailLabelStyle = css`
  width: 100px;
  color: #6e7d95;
  flex-shrink: 0;
`;

const DetailValueStyle = css`
  flex: 1;
  color: #323e4f;
`;

/**
 * 三栏布局
 *
 * 演示 ImmersiveDialog 的核心三栏布局特性：左侧导航菜单 + 中间详情内容 + 右侧属性面板。
 * 适合资源详情查看、配置编辑等非向导场景。
 * 如需多步骤向导流程，请使用 WizardDialog。
 */
export const TwoPanelLayout = () => {
  const pushModal = usePushModal();
  const popModal = usePopModal();

  return (
    <Button
      type="primary"
      onClick={() =>
        pushModal({
          component: () => {
            const [activeSection, setActiveSection] = useState(0);

            const sections = ["概览", "网络", "存储", "安全策略"];

            const leftPanel = (
              <div>
                <div
                  className={cx(Typo.Label.l2_bold)}
                  style={{ color: "#323e4f", marginBottom: 16 }}
                >
                  vm-web-server-01
                </div>
                <ul className={NavListStyle}>
                  {sections.map((section, index) => (
                    <li
                      key={index}
                      className={cx(
                        Typo.Label.l2_regular,
                        NavItemStyle,
                        index === activeSection && NavItemActiveStyle,
                      )}
                      onClick={() => setActiveSection(index)}
                    >
                      {section}
                    </li>
                  ))}
                </ul>
              </div>
            );

            const rightPanel = (
              <div className={PropertyListStyle}>
                <div
                  className={cx(Typo.Label.l2_bold)}
                  style={{ color: "#323e4f", marginBottom: 16 }}
                >
                  快速信息
                </div>
                <div className={PropertyGroupStyle}>
                  <div
                    className={cx(
                      Typo.Label.l3_regular,
                      PropertyGroupTitleStyle,
                    )}
                  >
                    状态
                  </div>
                  <div className={PropertyItemStyle}>
                    <span
                      className={cx(
                        Typo.Label.l3_regular,
                        PropertyLabelStyle,
                      )}
                    >
                      运行状态
                    </span>
                    <span
                      className={cx(
                        Typo.Label.l3_regular,
                        PropertyValueStyle,
                      )}
                    >
                      运行中
                    </span>
                  </div>
                  <div className={PropertyItemStyle}>
                    <span
                      className={cx(
                        Typo.Label.l3_regular,
                        PropertyLabelStyle,
                      )}
                    >
                      IP 地址
                    </span>
                    <span
                      className={cx(
                        Typo.Label.l3_regular,
                        PropertyValueStyle,
                      )}
                    >
                      10.0.0.15
                    </span>
                  </div>
                </div>
                <div className={PropertyGroupStyle}>
                  <div
                    className={cx(
                      Typo.Label.l3_regular,
                      PropertyGroupTitleStyle,
                    )}
                  >
                    资源
                  </div>
                  <div className={PropertyItemStyle}>
                    <span
                      className={cx(
                        Typo.Label.l3_regular,
                        PropertyLabelStyle,
                      )}
                    >
                      vCPU
                    </span>
                    <span
                      className={cx(
                        Typo.Label.l3_regular,
                        PropertyValueStyle,
                      )}
                    >
                      4 核
                    </span>
                  </div>
                  <div className={PropertyItemStyle}>
                    <span
                      className={cx(
                        Typo.Label.l3_regular,
                        PropertyLabelStyle,
                      )}
                    >
                      内存
                    </span>
                    <span
                      className={cx(
                        Typo.Label.l3_regular,
                        PropertyValueStyle,
                      )}
                    >
                      8 GiB
                    </span>
                  </div>
                </div>
              </div>
            );

            return (
              <ImmersiveDialog
                title="虚拟机详情"
                left={leftPanel}
                right={rightPanel}
                isContentFull={false}
                showOk={false}
                cancelText="关闭"
              >
                {activeSection === 0 && (
                  <div className={DetailSectionStyle}>
                    <h3
                      className={cx(
                        Typo.Label.l1_bold_title,
                        DetailSectionTitleStyle,
                      )}
                    >
                      概览
                    </h3>
                    <div className={DetailRowStyle}>
                      <span
                        className={cx(Typo.Label.l2_regular, DetailLabelStyle)}
                      >
                        名称
                      </span>
                      <span className={DetailValueStyle}>
                        vm-web-server-01
                      </span>
                    </div>
                    <div className={DetailRowStyle}>
                      <span
                        className={cx(Typo.Label.l2_regular, DetailLabelStyle)}
                      >
                        集群
                      </span>
                      <span className={DetailValueStyle}>
                        production-cluster
                      </span>
                    </div>
                    <div className={DetailRowStyle}>
                      <span
                        className={cx(Typo.Label.l2_regular, DetailLabelStyle)}
                      >
                        操作系统
                      </span>
                      <span className={DetailValueStyle}>
                        Ubuntu 22.04 LTS
                      </span>
                    </div>
                    <div className={DetailRowStyle}>
                      <span
                        className={cx(Typo.Label.l2_regular, DetailLabelStyle)}
                      >
                        创建时间
                      </span>
                      <span className={DetailValueStyle}>
                        2024-01-15 10:30:00
                      </span>
                    </div>
                  </div>
                )}
                {activeSection === 1 && (
                  <div className={DetailSectionStyle}>
                    <h3
                      className={cx(
                        Typo.Label.l1_bold_title,
                        DetailSectionTitleStyle,
                      )}
                    >
                      网络
                    </h3>
                    <div className={DetailRowStyle}>
                      <span
                        className={cx(Typo.Label.l2_regular, DetailLabelStyle)}
                      >
                        虚拟网络
                      </span>
                      <span className={DetailValueStyle}>default-network</span>
                    </div>
                    <div className={DetailRowStyle}>
                      <span
                        className={cx(Typo.Label.l2_regular, DetailLabelStyle)}
                      >
                        IP 分配
                      </span>
                      <span className={DetailValueStyle}>DHCP</span>
                    </div>
                  </div>
                )}
                {activeSection === 2 && (
                  <div className={DetailSectionStyle}>
                    <h3
                      className={cx(
                        Typo.Label.l1_bold_title,
                        DetailSectionTitleStyle,
                      )}
                    >
                      存储
                    </h3>
                    <div className={DetailRowStyle}>
                      <span
                        className={cx(Typo.Label.l2_regular, DetailLabelStyle)}
                      >
                        系统盘
                      </span>
                      <span className={DetailValueStyle}>40 GiB</span>
                    </div>
                    <div className={DetailRowStyle}>
                      <span
                        className={cx(Typo.Label.l2_regular, DetailLabelStyle)}
                      >
                        数据盘
                      </span>
                      <span className={DetailValueStyle}>100 GiB</span>
                    </div>
                  </div>
                )}
                {activeSection === 3 && (
                  <div className={DetailSectionStyle}>
                    <h3
                      className={cx(
                        Typo.Label.l1_bold_title,
                        DetailSectionTitleStyle,
                      )}
                    >
                      安全策略
                    </h3>
                    <div className={DetailRowStyle}>
                      <span
                        className={cx(Typo.Label.l2_regular, DetailLabelStyle)}
                      >
                        高可用
                      </span>
                      <span className={DetailValueStyle}>开启</span>
                    </div>
                    <div className={DetailRowStyle}>
                      <span
                        className={cx(Typo.Label.l2_regular, DetailLabelStyle)}
                      >
                        启动顺序
                      </span>
                      <span className={DetailValueStyle}>磁盘优先</span>
                    </div>
                  </div>
                )}
              </ImmersiveDialog>
            );
          },
          props: {},
        })
      }
    >
      打开三栏布局对话框
    </Button>
  );
};
TwoPanelLayout.storyName = "三栏布局";

/**
 * 底部左侧操作区域
 *
 * 演示通过 `footerLeftAction` 在底部左侧放置辅助操作按钮。
 * 此处展示"重置为默认值"按钮的典型用法。
 * 如需"上一步"按钮等向导场景，请使用 WizardDialog。
 */
export const FooterLeftAction = () => {
  const pushModal = usePushModal();
  const popModal = usePopModal();

  return (
    <Button
      type="primary"
      onClick={() =>
        pushModal({
          component: ImmersiveDialog,
          props: {
            title: "编辑虚拟机配置",
            isContentFull: false,
            okText: "保存",
            cancelText: "取消",
            footerLeftAction: (
              <Button size="large" type="quiet" danger>
                <span className={Typo.Label.l1_bold_title}>
                  重置为默认值
                </span>
              </Button>
            ),
            children: (
              <div className={DetailSectionStyle}>
                <h3
                  className={cx(
                    Typo.Label.l1_bold_title,
                    DetailSectionTitleStyle,
                  )}
                >
                  虚拟机配置
                </h3>
                <div className={DetailRowStyle}>
                  <span
                    className={cx(Typo.Label.l2_regular, DetailLabelStyle)}
                  >
                    vCPU
                  </span>
                  <span className={DetailValueStyle}>4 核</span>
                </div>
                <div className={DetailRowStyle}>
                  <span
                    className={cx(Typo.Label.l2_regular, DetailLabelStyle)}
                  >
                    内存
                  </span>
                  <span className={DetailValueStyle}>8 GiB</span>
                </div>
                <div className={DetailRowStyle}>
                  <span
                    className={cx(Typo.Label.l2_regular, DetailLabelStyle)}
                  >
                    系统盘
                  </span>
                  <span className={DetailValueStyle}>40 GiB</span>
                </div>
              </div>
            ),
            onOk() {
              popModal();
            },
          },
        })
      }
    >
      带重置按钮的编辑框
    </Button>
  );
};
FooterLeftAction.storyName = "底部左侧操作";
