import { Button, ModalStack } from "@src/core";
import KitStoreProvider, { usePushModal } from "@src/core/KitStoreProvider";
import { DeleteDialog } from "@src/coreX";
import { CoreXMeta } from "@stories/types";
import React, { useState } from "react";

/**
 * * 删除确认对话框组件
 * * 用于需要用户二次确认的删除操作
 * * 确认按钮使用危险样式以突出操作风险
 */
const meta = {
  title: "CoreX/Dialog/DeleteDialog | 删除确认对话框",
  component: DeleteDialog,
  decorators: [
    (Story) => (
      <KitStoreProvider>
        <ModalStack />
        <Story />
      </KitStoreProvider>
    ),
  ],
  args: {},
  parameters: {
    design: {
      type: "figma",
      url: "YOUR_FIGMA_URL_HERE", // 请替换为实际的设计稿URL
    },
  },
} satisfies CoreXMeta<typeof DeleteDialog>;

export default meta;

/**
 * 基础用法 - 删除单个项目
 */
export const Basic = () => {
  const pushModal = usePushModal();

  return (
    <Button
      type="primary"
      danger
      onClick={() =>
        pushModal({
          component: () => (
            <DeleteDialog
              title="删除虚拟机"
              description="确定要删除虚拟机吗？"
              secondaryDesc="删除后将无法恢复，是否确认删除该虚拟机？"
              okText="删除"
              onOk={(popModal) => {
                console.log("confirmed delete");
                popModal();
              }}
            />
          ),
          props: {
            name: "DeleteDialog",
          },
        })
      }
    >
      删除虚拟机
    </Button>
  );
};

/**
 * 自定义按钮文案
 */
export const CustomButtonText = () => {
  const pushModal = usePushModal();

  return (
    <Button
      type="primary"
      danger
      onClick={() =>
        pushModal({
          props: {
            name: "CustomDeleteDialog",
          },
          component: () => (
            <DeleteDialog
              title="删除数据盘"
              description="该数据盘中可能包含重要数据，删除后将无法恢复，是否确认删除？"
              cancelText="暂不删除"
              okText="删除"
              onOk={(popModal) => {
                console.log("confirmed delete disk");
                popModal();
              }}
            />
          ),
        })
      }
    >
      删除数据盘
    </Button>
  );
};

/**
 * 确认按钮加载状态
 */
export const ConfirmLoading = () => {
  const pushModal = usePushModal();

  return (
    <Button
      type="primary"
      danger
      onClick={() =>
        pushModal({
          props: {
            name: "LoadingDeleteDialog",
          },
          component: () => (
            <DeleteDialog
              title="删除集群"
              description="确定要删除集群吗？这个操作需要一些时间来完成。"
              secondaryDesc="删除过程中请耐心等待，不要关闭浏览器或刷新页面。"
              okText="删除"
              confirmLoading={true}
              onOk={(popModal) => {
                // 模拟异步删除操作
                setTimeout(() => {
                  console.log("delete operation completed");
                  popModal();
                }, 3000);
              }}
            />
          ),
        })
      }
    >
      删除集群（加载状态）
    </Button>
  );
};

/**
 * 删除失败
 */
export const Failed = () => {
  const pushModal = usePushModal();

  return (
    <Button
      type="primary"
      danger
      onClick={() =>
        pushModal({
          component: () => {
            const [loading, setLoading] = useState(false);
            const [error, setError] = useState<string | undefined>(undefined);

            return (
              <DeleteDialog
                title="删除集群"
                description="确定要删除集群吗？这个操作需要一些时间来完成。"
                secondaryDesc="删除过程中请耐心等待，不要关闭浏览器或刷新页面。"
                okText="删除"
                confirmLoading={loading}
                onOk={() => {
                  setLoading(true);
                  setError(undefined);
                  // 模拟异步删除操作
                  setTimeout(() => {
                    setLoading(false);
                    setError("删除失败");
                  }, 3000);
                }}
                error={error}
              />
            );
          },
          props: {
            name: "ErrorDeleteDialog",
          },
        })
      }
    >
      删除集群（错误）
    </Button>
  );
};
