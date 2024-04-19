import { useCloseModal, useKitSelector } from "@src/core/KitStoreProvider";
import { KitRootState } from "@src/store";
import React from "react";

const ModalStack: React.FC = () => {
  const stack = useKitSelector<KitRootState["modal"]["stack"]>(
    (state) => state.modal.stack,
  );
  const closeModal = useCloseModal();

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
