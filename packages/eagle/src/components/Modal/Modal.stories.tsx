import { Meta } from "@storybook/react";
import React from "react";

import { ModalProps } from "../../spec";
import { pushModal } from "../../store";
import Button from "../Button";
import KitStoreProvider from "../KitStoreProvider";
import ModalStack from "../ModalStack";
import Modal from ".";
import AsideModal from "./AsideModal";
import ImmersiveModal from "./ImmersiveModal";
const story: Meta<ModalProps> = {
  title: "Modal",
  component: Modal,
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
};

export default story;

export const ImmersiveDialog = (args) => {
  return (
    <Button type="primary" {...args}>
      open modal
    </Button>
  );
};

ImmersiveDialog.args = {
  onClick: () => {
    pushModal({
      component: ImmersiveModal,
      props: {
        name: "ImmersiveModal",
      },
    });
  },
};

export const WithAside = () => {
  return (
    <div>
      <div>
        <Button
          type="primary"
          onClick={() => {
            pushModal({
              // @ts-ignore
              // TODO: Refine the type of pushModal
              component: AsideModal,
              props: {
                name: "AsideModal",
                steps: [
                  {
                    title: "step1",
                    render: <div>step1 area</div>,
                  },
                  {
                    title: "step2",
                    render: <div>step2 area</div>,
                  },
                  {
                    title: "step3",
                    render: <div>step3 area</div>,
                  },
                ],
              },
            });
          }}
        >
          open modal
        </Button>
      </div>
      <div style={{ marginTop: "20px" }}>
        <Button
          type="primary"
          onClick={() => {
            pushModal({
              // @ts-ignore
              // TODO: Refine the type of pushModal
              component: AsideModal,
              props: {
                name: "AsideModal",
                steps: [
                  {
                    title: "step1",
                    render: <div>步骤1：只有一步时，不显示左侧 steps</div>,
                  },
                ],
              },
            });
          }}
        >
          one step
        </Button>
      </div>
    </div>
  );
};

WithAside.args = {};
