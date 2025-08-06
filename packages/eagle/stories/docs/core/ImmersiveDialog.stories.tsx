import { css } from "@linaria/core";
import Button from "@src/core/Button";
import { ImmersiveDialog } from "@src/core/ImmersiveDialog";
import KitStoreProvider, {
  usePopModal,
  usePushModal,
} from "@src/core/KitStoreProvider";
import ModalStack from "@src/core/ModalStack";
import { CoreMeta } from "@stories/types";
import React from "react";

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
