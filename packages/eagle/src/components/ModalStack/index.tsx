import React from "react";

import { closeModal, KitRootState, ModalActions } from "../../store";
import { useKitDispatch, useKitSelector } from "../KitStoreProvider";

const ModalStack: React.FC = () => {
  const stack = useKitSelector<KitRootState["modal"]["stack"]>(
    (state) => state.modal.stack
  );
  const dispatch = useKitDispatch();

  const closeId = useKitSelector<KitRootState["modal"]["closeId"]>(
    (state) => state.modal.closeId
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
          removeModal={() => {
            dispatch({ type: ModalActions.REMOVE_MODAL, id: modal.id });
          }}
          visible={closeId !== modal.id}
        />
      ))}
    </>
  );
};

export default ModalStack;
