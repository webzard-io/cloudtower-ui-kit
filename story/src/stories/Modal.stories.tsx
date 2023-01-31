import {
  antdKit,
  kitContext as UIKitContext,
  KitStoreProvider,
  ModalStack,
  ModalWrapper,
  pushModal,
} from "@cloudtower/eagle";
import { ComponentMeta } from "@storybook/react";
import React, { useContext } from "react";

const Modal1: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const UIKit = useContext(UIKitContext);

  return (
    <UIKit.modal
      title="Label"
      className={ModalWrapper}
      fullscreen
      okText="Button Title"
      cancelText="Button Title"
      onCancel={onClose}
    >
      <div>Main Area</div>
    </UIKit.modal>
  );
};

export const ImmersiveDialog = () => {
  return (
    <KitStoreProvider>
      <UIKitContext.Provider value={antdKit}>
        <ModalStack />
        <button
          onClick={() => {
            pushModal({
              component: Modal1,
              props: {
                name: "modal1",
              },
            });
          }}
        >
          open modal
        </button>
      </UIKitContext.Provider>
    </KitStoreProvider>
  );
};

ImmersiveDialog.story = {
  name: "Immersive Dialog",
};

export default {
  title: "Modal",
} as ComponentMeta<typeof antdKit.select>;
