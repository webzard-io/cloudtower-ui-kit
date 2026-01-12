import { Vm16Icon } from "@cloudtower/icons-react";
import { css, cx } from "@linaria/core";
import { Button, Icon, Space } from "@src/core";
import KitStoreProvider, { usePushModal } from "@src/core/KitStoreProvider";
import ModalStack from "@src/core/ModalStack";
import { Typo } from "@src/core/Typo";
import { RejectDialog, RejectDialogType } from "@src/coreX";
import { CoreXMeta } from "@stories/types";
import React from "react";

/**
 * * 回绝对话框组件
 * * 用于展示操作被拒绝的反馈信息
 * * 支持四种模式：单个对象拒绝、批量全部拒绝、批量部分拒绝、自定义内容
 */
const meta = {
  title: "CoreX/Dialog/RejectDialog | 回绝对话框",
  component: RejectDialog,
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
      url: "YOUR_FIGMA_URL_HERE", // 请替换为实际的设计稿URL
    },
  },
} satisfies CoreXMeta<typeof RejectDialog>;

export default meta;

/**
 * 单个对象拒绝 - 单条原因
 */
export const SingleReject = () => {
  const pushModal = usePushModal();

  return (
    <Button
      type="primary"
      onClick={() =>
        pushModal({
          component: () => (
            <RejectDialog
              type={RejectDialogType.Single}
              title="无法删除虚拟机"
              content="虚拟机正在运行中，且正在执行关键业务任务，建议在业务低峰期执行删除操作"
              description="删除虚拟机是不可逆操作，请确保数据已备份"
            />
          ),
          props: {
            name: "SingleRejectDialog",
          },
        })
      }
    >
      删除虚拟机
    </Button>
  );
};

/**
 * 单个对象拒绝 - 多条原因
 */
export const SingleRejectMultiReasons = () => {
  const pushModal = usePushModal();

  return (
    <Button
      type="primary"
      onClick={() =>
        pushModal({
          component: () => (
            <RejectDialog
              type={RejectDialogType.Single}
              title="无法删除虚拟机"
              content={[
                "虚拟机当前状态为运行中，需要先关机才能执行删除操作",
                "该虚拟机是当前项目的Kubernetes主节点，删除后将导致整个集群不可用。如确需删除，请先迁移集群控制平面到其他节点",
                "存在未完成的数据备份任务（预计剩余25分钟）",
                "该虚拟机已被安全策略锁定，原因：检测到异常的网络访问行为，需要管理员审核后才能执行删除操作",
              ]}
              description="请解决以上问题后重试"
            />
          ),
          props: {
            name: "MultiReasonsDialog",
          },
        })
      }
    >
      删除虚拟机
    </Button>
  );
};

/**
 * 批量全部拒绝
 */
export const AllReject = () => {
  const pushModal = usePushModal();

  return (
    <Space direction="vertical" size={16}>
      <Button
        type="primary"
        onClick={() =>
          pushModal({
            component: () => (
              <RejectDialog
                type={RejectDialogType.All}
                title="无法删除选中的虚拟机"
                content={{
                  "Kubernetes-Master-01": [
                    "作为集群主节点，需要先迁移控制平面",
                    "存在运行中的容器工作负载（共12个Pod）",
                  ],
                  "Database-Primary": [
                    "当前为主数据库节点，需要先完成主从切换",
                    "有10个活跃的数据库连接",
                    "检测到未完成的数据同步任务，预计还需要1小时23分钟完成全量同步，强制删除可能导致数据不一致",
                  ],
                  "Cache-Node-01": [
                    "正在执行数据重平衡（进度：67%）",
                    "有3个依赖的应用节点",
                  ],
                }}
                description="以下虚拟机无法执行删除操作"
                secondaryDesc="建议在业务低峰期执行删除操作"
              />
            ),
            props: {
              name: "AllRejectDialog",
            },
          })
        }
      >
        批量删除虚拟机
      </Button>

      <Button
        type="primary"
        onClick={() =>
          pushModal({
            component: () => (
              <RejectDialog
                type={RejectDialogType.All}
                title="无法删除选中的虚拟机"
                content={{
                  "Kubernetes-Master-01": [
                    "作为集群主节点，需要先迁移控制平面",
                    "存在运行中的容器工作负载（共12个Pod）",
                  ],
                  "Database-Primary": [
                    "当前为主数据库节点，需要先完成主从切换",
                    "有10个活跃的数据库连接",
                    "检测到未完成的数据同步任务，预计还需要1小时23分钟完成全量同步，强制删除可能导致数据不一致",
                  ],
                  "Cache-Node-01": [
                    "正在执行数据重平衡（进度：67%）",
                    "有3个依赖的应用节点",
                  ],
                }}
                resourceIcon={<Icon src={Vm16Icon} />}
                description="以下虚拟机无法执行删除操作"
                secondaryDesc="建议在业务低峰期执行删除操作"
              />
            ),
            props: {
              name: "AllRejectDialog",
            },
          })
        }
      >
        批量删除虚拟机（带图标）
      </Button>
    </Space>
  );
};

const BeforeDescription = css`
  background: $fill-neutral-trans-2;
  padding: 8px;
  border-radius: 6px;
  color: $gray-a60-8;
  margin-bottom: 16px;
`;

/**
 * 批量部分拒绝
 */
export const PartialReject = () => {
  const pushModal = usePushModal();

  return (
    <Space direction="vertical" size={16}>
      <Button
        type="primary"
        onClick={() =>
          pushModal({
            component: () => (
              <RejectDialog
                type={RejectDialogType.Part}
                title="升级虚拟机工具"
                content={{
                  vm1: ["无需升级。"],
                  vm2: ["未安装虚拟机工具。"],
                }}
                beforeDescription={
                  <div className={cx(BeforeDescription, Typo.Label.l4_regular)}>
                    虚拟机工具是安装在客户机操作系统中的一组工具，能为 Web
                    控制台提供更丰富的虚拟机信息和更强大的虚拟机管理功能。
                  </div>
                }
                description="选中的 3 个虚拟机中，有 1 个可以升级虚拟机工具。"
                secondaryDesc="虚拟机工具的 ISO 映像将会载入到虚拟机中，并在操作系统内自动执行升级操作。升级完成后，将会自动尝试弹出虚拟机工具映像。"
                partialDescription="1 个虚拟机无法升级虚拟机工具，继续操作将会跳过这些虚拟机。"
                okText="部分升级"
                cancelText="取消"
                okButtonProps={{
                  danger: false,
                }}
                onOk={(popModal) => {
                  console.log("执行部分升级");
                  popModal();
                }}
              />
            ),
            props: {
              name: "PartialRejectDialog",
            },
          })
        }
      >
        批量升级虚拟机工具
      </Button>
      <Button
        type="primary"
        onClick={() =>
          pushModal({
            component: () => (
              <RejectDialog
                type={RejectDialogType.Part}
                title="升级虚拟机工具"
                content={{
                  vm1: ["无需升级。"],
                  vm2: ["未安装虚拟机工具。"],
                }}
                resourceIcon={<Icon src={Vm16Icon} />}
                beforeDescription={
                  <div className={cx(BeforeDescription, Typo.Label.l4_regular)}>
                    虚拟机工具是安装在客户机操作系统中的一组工具，能为 Web
                    控制台提供更丰富的虚拟机信息和更强大的虚拟机管理功能。
                  </div>
                }
                description="选中的 3 个虚拟机中，有 1 个可以升级虚拟机工具。"
                secondaryDesc="虚拟机工具的 ISO 映像将会载入到虚拟机中，并在操作系统内自动执行升级操作。升级完成后，将会自动尝试弹出虚拟机工具映像。"
                partialDescription="1 个虚拟机无法升级虚拟机工具，继续操作将会跳过这些虚拟机。"
                okText="部分升级"
                cancelText="取消"
                okButtonProps={{
                  danger: false,
                }}
                onOk={(popModal) => {
                  console.log("执行部分升级");
                  popModal();
                }}
              />
            ),
            props: {
              name: "PartialRejectDialog",
            },
          })
        }
      >
        批量升级虚拟机工具（带图标）
      </Button>
    </Space>
  );
};

/**
 * 自定义内容
 */
export const CustomContent = () => {
  const pushModal = usePushModal();

  return (
    <Button
      type="primary"
      onClick={() =>
        pushModal({
          component: () => (
            <RejectDialog
              type={RejectDialogType.Custom}
              title="资源配额不足"
              description="无法创建新的虚拟机"
              customContent={
                <div style={{ marginTop: 8 }}>
                  <div style={{ marginBottom: 16 }}>
                    当前项目资源使用情况：
                    <ul>
                      <li>CPU: 48/50 核 (已使用96%)</li>
                      <li>内存: 192/200 GB (已使用96%)</li>
                      <li>存储: 9.8/10 TB (已使用98%)</li>
                    </ul>
                  </div>
                  <div>
                    您可以：
                    <ul>
                      <li>删除不再使用的资源</li>
                      <li>联系管理员申请提升配额</li>
                      <li>尝试在其他项目中创建资源</li>
                    </ul>
                  </div>
                </div>
              }
              okText="申请提升配额"
              cancelText="我知道了"
            />
          ),
          props: {
            name: "CustomContentDialog",
          },
        })
      }
    >
      创建虚拟机
    </Button>
  );
};
