import { LegacyModal } from "@src/core";
import Button from "@src/core/Button";
import KitStoreProvider, { usePushModal } from "@src/core/KitStoreProvider";
import ModalStack from "@src/core/ModalStack";
import { Meta, StoryObj } from "@storybook/react";
import React, { Fragment } from "react";

const Demo = (props: { name?: string }) => {
  const pushModal = usePushModal();
  return (
    <Button
      onClick={() => {
        pushModal({
          //@ts-ignore
          component: (props: { name: string; onClose: () => void }) => {
            return (
              <LegacyModal onCancel={props.onClose}>
                <div>{props.name}</div>
              </LegacyModal>
            );
          },
          props: {
            name: props.name,
          },
        });
      }}
    >
      点击这里弹出 modal
    </Button>
  );
};

/**
 *
 * KitStoreProvider 提供 modal store 环境，并且相互隔离。
 *
 * ModalStack 需要放置于 KitStoreProvider 的子层级中。
 *
 * ModalStack 会向上查找 KitStoreContext, 如果未查找到，会使用 eagle 提供的默认 store。
 *
 * usePushModal，usePopModal，useCloseModal, useResetModal 与 ModalStack 同理。
 */

const meta: Meta<typeof Demo> = {
  title: "KitStoreProvider - 局部 store",
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/nOhhbt8AO1EscJOfx60rfD/CloudTower-UI-Components?node-id=99%3A0",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const WithKitStoreProviderPrimary: Story = {
  name: "有 KitStoreProvider Primary",
  args: { name: "有 KitStoreProvider, 注意这里只有一个弹窗" },
  render: (args) => {
    return (
      <KitStoreProvider>
        <ModalStack />
        <Demo {...args} />
      </KitStoreProvider>
    );
  },
};

export const WithKitStoreProviderSecondary: Story = {
  name: "有 KitStoreProvider Secondary",
  args: { name: "有 KitStoreProvider, 注意这里只有一个弹窗" },
  render: (args) => {
    return (
      <KitStoreProvider>
        <ModalStack />
        <Demo {...args} />
      </KitStoreProvider>
    );
  },
};

export const WithoutKitStoreProviderPrimary: Story = {
  name: "无 KitStoreProvider Primary",
  args: {
    name: "无 KitStoreProvider Primary, 注意这里有两个弹窗, 打开控制台查看具体元素",
  },
  render: (args) => {
    return (
      <Fragment>
        <ModalStack />
        <Demo {...args} />
      </Fragment>
    );
  },
};

export const WithoutKitStoreProviderSecondary: Story = {
  name: "无 KitStoreProvider Secondary",
  args: {
    name: "无 KitStoreProvider Secondary, 注意这里有两个弹窗, 打开控制台查看具体元素",
  },
  render: (args) => {
    return (
      <Fragment>
        <ModalStack />
        <Demo {...args} />
      </Fragment>
    );
  },
};
