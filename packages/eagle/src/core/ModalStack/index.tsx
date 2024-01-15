import { useKitSelector } from "@src/core/KitStoreProvider";
import { closeModal, KitRootState } from "@src/store";
import React from "react";

const ModalStack: React.FC = () => {
  const stack = useKitSelector<KitRootState["modal"]["stack"]>(
    (state) => state.modal.stack
  );
  return (
    <>
      {stack.map((modal) => (
        <modal.component
          {...modal.props}
          modalId={modal.id}
          onClose={() => {
            if (modal.props?.onClose) {
              modal.props.onClose();
            }
            closeModal(modal.id);
          }}
          key={modal.id}
        />
      ))}
    </>
  );
};

export default ModalStack;
