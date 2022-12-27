import React from "react";

import { closeModal, KitRootState } from "../../store";
import { useKitSelector } from "../KitStoreProvider";

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
