import { CloseCircleFilled } from "@ant-design/icons";
import { parrotI18n } from "@cloudtower/parrot";
import { Modal as AntdModal } from "antd";
import cs from "classnames";
import { isNil } from "lodash";
import React, { useContext, useRef } from "react";

import { kitContext, Modal2Props } from "../../spec";
import { KitRootState, ModalActions } from "../../store";
import { useKitDispatch, useKitSelector } from "../KitStoreProvider";
import { FullView } from "../Styled";

const Modal: React.FC<Modal2Props> = (props) => {
  const kit = useContext(kitContext);

  const {
    className,
    maskClosable = false,
    fullscreen,
    children,
    width,
    onCancel,
    onOk,
    afterClose,
    normal = true,
    footer,
    footerError,
    showCancel = true,
    showOk = true,
    cancelButtonProps,
    okButtonProps,
    confirmLoading,
    okLoading,
    okText = parrotI18n.t("common.confirm"),
    cancelText = parrotI18n.t("common.cancel"),
    size,
    ...modalPropsArgs
  } = props;

  /**
   * Control Visible
   */
  /* Get modal stack */
  const stack = useKitSelector<KitRootState["modal"]["stack"]>(
    (state) => state.modal.stack
  );
  /* Get modal close id */
  const id = useKitSelector<KitRootState["modal"]["closeId"]>(
    (state) => state.modal.closeId
  );
  const dispatch = useKitDispatch();
  /* Get id for top item in modal stack */
  const idRef = useRef(stack[stack.length - 1].id);

  /* Set transition className */
  const transitionClass = useRef<
    "modal-zoom" | "modal-send" | "fullscreen-modal" | ""
  >(fullscreen ? "fullscreen-modal" : "modal-zoom");

  const getClassName = () => {
    const setOfClassName = new Set<string>();

    if (className) {
      setOfClassName.add(className);
    }

    if (fullscreen) {
      setOfClassName.add("fullscreen");
    }

    if (!fullscreen && normal) {
      setOfClassName.add("normal-modal");
      if (size === "medium") {
        setOfClassName.add("size-medium");
      }
    }

    return cs.apply(undefined, [...setOfClassName]);
  };

  const getWidth = () => {
    if (fullscreen) {
      return "calc(100vw - 16px)";
    } else if (width) {
      return width;
    } else {
      if (size === "medium") {
        return "720px";
      }
      return normal ? 460 : "";
    }
  };

  const getFooter = () => {
    if (isNil(footer)) {
      return (
        <>
          {typeof footerError === "string" ? (
            <span className="modal-error">{footerError}</span>
          ) : (
            <div className="modal-footer-left">{footerError}</div>
          )}
          <div className="modal-footer-btn-group">
            {showCancel && (
              <kit.button
                type="quiet"
                onMouseDown={(e) => {
                  e.preventDefault();
                }}
                onClick={(e) => {
                  onCancel?.(e);
                  transitionClass.current = fullscreen ? "" : "modal-zoom";
                }}
                className={cs(cancelButtonProps?.className)}
                {...cancelButtonProps}
              >
                {cancelText}
              </kit.button>
            )}
            {showOk && (
              <kit.button
                onClick={(e) => {
                  onOk?.(e);
                  transitionClass.current = fullscreen ? "" : "modal-send";
                }}
                type="primary"
                loading={confirmLoading || okLoading}
                {...okButtonProps}
              >
                {okText}
              </kit.button>
            )}
          </div>
        </>
      );
    }

    return footer;
  };

  return (
    <AntdModal
      destroyOnClose
      className={getClassName()}
      width={getWidth()}
      maskClosable={maskClosable}
      transitionName={transitionClass.current}
      closeIcon={<CloseCircleFilled />}
      focusTriggerAfterClose={false}
      onCancel={(e) => {
        onCancel?.(e);
        transitionClass.current = fullscreen ? "" : "modal-zoom";
      }}
      {...modalPropsArgs}
      visible={idRef.current !== id}
      afterClose={() => {
        afterClose?.();
        dispatch({ type: ModalActions.REMOVE_MODAL, id: idRef.current });
      }}
      footer={<div className="footer-content">{getFooter()}</div>}
    >
      {children}
    </AntdModal>
  );
};

export default Modal;
