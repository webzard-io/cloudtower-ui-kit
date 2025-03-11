import { RejectDialogType } from "@src/core/Dialogs";
import { RejectDialog } from "@src/core/Dialogs/RejectDialog/RejectDialog";
import KitStoreProvider, { usePushModal } from "@src/core/KitStoreProvider";
import ModalStack from "@src/core/ModalStack";
import { Meta } from "@storybook/react";
import { Button } from "antd";
import React from "react";

/**
 * RejectDialog 是一个用于展示操作被拒绝的反馈信息的对话框组件。
 * - 单个对象操作被拒绝
 * - 批量操作时全部对象被拒绝
 * - 批量操作时部分对象被拒绝
 */
const story: Meta<typeof RejectDialog> = {
  title: "Core/Dialog/RejectDialog | 回绝对话框",
  component: RejectDialog,
  decorators: [
    (Story) => (
      <KitStoreProvider>
        <ModalStack />
        <Story />
      </KitStoreProvider>
    ),
  ],
};

export default story;

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

export const AllReject = () => {
  const pushModal = usePushModal();

  return (
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
              helperText="建议在业务低峰期执行删除操作"
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
  );
};

export const PartialReject = () => {
  const pushModal = usePushModal();

  return (
    <Button
      type="primary"
      onClick={() =>
        pushModal({
          component: () => (
            <RejectDialog
              type={RejectDialogType.Part}
              title="部分虚拟机无法删除"
              content={{
                "Database-Replica-01": [
                  "正在执行数据同步（进度：89%），强制删除可能导致数据不一致",
                  "有5个活跃的只读数据库连接",
                ],
                "App-Server-03": [
                  "检测到高CPU使用率（98%），可能正在执行重要计算任务",
                  "该节点被标记为生产环境核心节点，需要主管审批才能删除",
                  "存在未完成的日志归档任务，预计剩余15分钟",
                ],
              }}
              description="部分虚拟机已经删除成功"
              partialDescription="其他4个虚拟机将继续执行删除操作"
              helperText="可以选择继续删除其他虚拟机，或取消整个操作"
              okText="继续删除其他虚拟机"
              cancelText="取消删除"
              onOk={(popModal) => {
                console.log("继续删除其他虚拟机");
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
      批量删除虚拟机
    </Button>
  );
};
