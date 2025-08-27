import React from "react";
import { Button, Space } from "@src/core";
import ModalStack from "@src/core/ModalStack";
import KitStoreProvider, { usePushModal } from "@src/core/KitStoreProvider";
import { MediumDialog } from "@src/core";
import { CoreMeta } from "@stories/types";
import { css } from "@linaria/core";
import { useMockQuery } from "@stories/utils";

const StoryContainer = css`
  padding: 20px;
`;

/**
 * MediumDialog 组件
 *
 * 一个中等尺寸的对话框组件，适用于需要更多内容展示空间的场景。
 *
 * ### 特性
 * - 固定宽度 720px，提供更多内容展示空间
 * - 最小高度 200px，适合展示更丰富的内容
 * - 继承 SmallDialog 的所有功能特性
 * - 支持自定义标题、按钮文案和样式
 * - 支持在底部显示错误信息
 * - 可配置是否显示确认按钮、关闭按钮等
 * - 支持点击遮罩层关闭
 */
const meta: CoreMeta<typeof MediumDialog> = {
  component: MediumDialog,
  title: "Core/MediumDialog | 中弹窗",
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
MediumDialog 是一个预设样式的中型对话框组件，具有以下特点：

- **中等宽度**: 720px，比 SmallDialog (492px) 提供更多展示空间
- **最小高度**: 200px，适合展示更多内容
- **灵活配置**: 支持自定义标题、按钮、错误信息等
- **响应式设计**: 适配不同屏幕尺寸
- **错误处理**: 内置错误信息显示功能
- **功能完整**: 继承 SmallDialog 的所有功能特性
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
            <MediumDialog
              title="中等尺寸对话框"
              onOk={(popModal) => {
                console.log("确认操作");
                popModal();
              }}
              onCancel={(popModal) => {
                console.log("取消操作");
                popModal();
              }}
            >
              <div>
                <p>这是一个中等尺寸的对话框示例，宽度为 720px。</p>
                <p>相比小型对话框，它提供了更多的内容展示空间。</p>
                <p>适合用于需要展示较多信息或复杂表单的场景。</p>
              </div>
            </MediumDialog>
          ),
          props: {},
        })
      }
    >
      打开中等对话框
    </Button>
  );
};

/**
 * 表单配置对话框
 */
export const FormConfiguration = () => {
  const pushModal = usePushModal();

  return (
    <Button
      onClick={() =>
        pushModal({
          component: () => (
            <MediumDialog
              title="高级配置"
              okText="保存配置"
              cancelText="取消"
              onOk={(popModal) => {
                console.log("保存配置");
                popModal();
              }}
            >
              <div>
                <h4>网络设置</h4>
                <div style={{ marginBottom: "16px" }}>
                  <label style={{ display: "block", marginBottom: "8px" }}>
                    <strong>主机地址:</strong>
                  </label>
                  <input
                    type="text"
                    placeholder="192.168.1.100"
                    style={{
                      width: "100%",
                      padding: "8px",
                      border: "1px solid #d9d9d9",
                      borderRadius: "4px",
                    }}
                  />
                </div>
                <div style={{ marginBottom: "16px" }}>
                  <label style={{ display: "block", marginBottom: "8px" }}>
                    <strong>端口号:</strong>
                  </label>
                  <input
                    type="number"
                    placeholder="8080"
                    style={{
                      width: "100%",
                      padding: "8px",
                      border: "1px solid #d9d9d9",
                      borderRadius: "4px",
                    }}
                  />
                </div>

                <h4 style={{ marginTop: "24px" }}>安全设置</h4>
                <div style={{ marginBottom: "16px" }}>
                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <input type="checkbox" />
                    启用 HTTPS 加密传输
                  </label>
                </div>
                <div style={{ marginBottom: "16px" }}>
                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <input type="checkbox" defaultChecked />
                    启用身份验证
                  </label>
                </div>
                <div style={{ marginBottom: "16px" }}>
                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <input type="checkbox" />
                    启用访问日志记录
                  </label>
                </div>
              </div>
            </MediumDialog>
          ),
          props: {},
        })
      }
    >
      打开配置对话框
    </Button>
  );
};

/**
 * 数据展示对话框
 */
export const DataDisplay = () => {
  const pushModal = usePushModal();

  const sampleData = [
    { id: 1, name: "服务器-01", status: "运行中", cpu: "45%", memory: "67%" },
    { id: 2, name: "服务器-02", status: "运行中", cpu: "23%", memory: "34%" },
    { id: 3, name: "服务器-03", status: "停止", cpu: "0%", memory: "0%" },
    { id: 4, name: "服务器-04", status: "运行中", cpu: "78%", memory: "89%" },
    { id: 5, name: "服务器-05", status: "维护中", cpu: "12%", memory: "15%" },
  ];

  return (
    <Button
      onClick={() =>
        pushModal({
          component: () => (
            <MediumDialog
              title="服务器状态监控"
              showOk={false}
              cancelText="关闭"
            >
              <div>
                <p>当前集群服务器运行状态概览：</p>
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    marginTop: "16px",
                  }}
                >
                  <thead>
                    <tr style={{ backgroundColor: "#f5f5f5" }}>
                      <th
                        style={{
                          padding: "8px",
                          border: "1px solid #d9d9d9",
                          textAlign: "left",
                        }}
                      >
                        服务器名称
                      </th>
                      <th
                        style={{
                          padding: "8px",
                          border: "1px solid #d9d9d9",
                          textAlign: "left",
                        }}
                      >
                        状态
                      </th>
                      <th
                        style={{
                          padding: "8px",
                          border: "1px solid #d9d9d9",
                          textAlign: "left",
                        }}
                      >
                        CPU 使用率
                      </th>
                      <th
                        style={{
                          padding: "8px",
                          border: "1px solid #d9d9d9",
                          textAlign: "left",
                        }}
                      >
                        内存使用率
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {sampleData.map((item) => (
                      <tr key={item.id}>
                        <td
                          style={{
                            padding: "8px",
                            border: "1px solid #d9d9d9",
                          }}
                        >
                          {item.name}
                        </td>
                        <td
                          style={{
                            padding: "8px",
                            border: "1px solid #d9d9d9",
                          }}
                        >
                          <span
                            style={{
                              color:
                                item.status === "运行中"
                                  ? "#52c41a"
                                  : item.status === "停止"
                                    ? "#f5222d"
                                    : "#1890ff",
                            }}
                          >
                            {item.status}
                          </span>
                        </td>
                        <td
                          style={{
                            padding: "8px",
                            border: "1px solid #d9d9d9",
                          }}
                        >
                          {item.cpu}
                        </td>
                        <td
                          style={{
                            padding: "8px",
                            border: "1px solid #d9d9d9",
                          }}
                        >
                          {item.memory}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div
                  style={{ marginTop: "16px", fontSize: "12px", color: "#666" }}
                >
                  数据更新时间: {new Date().toLocaleString()}
                </div>
              </div>
            </MediumDialog>
          ),
          props: {},
        })
      }
    >
      查看服务器状态
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
              <MediumDialog
                title="数据提交"
                okText="提交数据"
                error={
                  hasError ? "请检查所有必填字段是否已正确填写" : undefined
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
                <div>
                  <h4>用户信息表单</h4>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "16px",
                    }}
                  >
                    <div>
                      <label style={{ display: "block", marginBottom: "8px" }}>
                        <strong>姓名 *</strong>
                      </label>
                      <input
                        type="text"
                        placeholder="请输入姓名"
                        style={{
                          width: "100%",
                          padding: "8px",
                          border: "1px solid #d9d9d9",
                          borderRadius: "4px",
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", marginBottom: "8px" }}>
                        <strong>邮箱 *</strong>
                      </label>
                      <input
                        type="email"
                        placeholder="请输入邮箱"
                        style={{
                          width: "100%",
                          padding: "8px",
                          border: "1px solid #d9d9d9",
                          borderRadius: "4px",
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", marginBottom: "8px" }}>
                        <strong>电话号码</strong>
                      </label>
                      <input
                        type="tel"
                        placeholder="请输入电话号码"
                        style={{
                          width: "100%",
                          padding: "8px",
                          border: "1px solid #d9d9d9",
                          borderRadius: "4px",
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", marginBottom: "8px" }}>
                        <strong>部门</strong>
                      </label>
                      <select
                        style={{
                          width: "100%",
                          padding: "8px",
                          border: "1px solid #d9d9d9",
                          borderRadius: "4px",
                        }}
                      >
                        <option value="">请选择部门</option>
                        <option value="tech">技术部</option>
                        <option value="sales">销售部</option>
                        <option value="hr">人事部</option>
                        <option value="finance">财务部</option>
                      </select>
                    </div>
                  </div>
                  <div style={{ marginTop: "16px" }}>
                    <label style={{ display: "block", marginBottom: "8px" }}>
                      <strong>备注</strong>
                    </label>
                    <textarea
                      placeholder="请输入备注信息"
                      rows={3}
                      style={{
                        width: "100%",
                        padding: "8px",
                        border: "1px solid #d9d9d9",
                        borderRadius: "4px",
                        resize: "vertical",
                      }}
                    />
                  </div>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#999",
                      marginTop: "16px",
                    }}
                  >
                    *
                    为必填字段。第一次点击"提交数据"会模拟验证失败，再次点击才会成功。
                  </p>
                </div>
              </MediumDialog>
            );
          },
          props: {},
        })
      }
    >
      带表单的对话框
    </Button>
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
            component: () => <MediumDialog initializing title="持续加载" />,
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

              if (isLoading || error) {
                return (
                  <MediumDialog
                    initializing={isLoading}
                    initializingError={error}
                    onOk={retry}
                    title=""
                  />
                );
              }

              return (
                <MediumDialog title={"加载完成"}>
                  <p>这是一个加载完成的对话框。</p>
                  <p>数据: {data}</p>
                </MediumDialog>
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

              if (isLoading || error) {
                return (
                  <MediumDialog
                    initializing={isLoading}
                    initializingError={error}
                    onOk={retry}
                    title=""
                  />
                );
              }

              return (
                <MediumDialog title="加载成功">
                  <p>恭喜！经过 {attemptCount} 次尝试，数据加载成功了。</p>
                  <p>数据: {data}</p>
                </MediumDialog>
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
