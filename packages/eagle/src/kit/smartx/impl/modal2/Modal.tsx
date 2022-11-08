import { CloseCircleFilled } from "@ant-design/icons";
import { useKitDispatch, useKitSelector } from "@cloudtower/eagle/kit/smartx";
import { kitContext, Modal2Props } from "@cloudtower/eagle/kit/specify";
import { Modal as AntdModal } from "antd";
import cs from "classnames";
import { isNil } from "lodash";
import React, { useContext, useRef } from "react";
import { useTranslation } from "react-i18next";

import { ModalActions, RootState } from "../../store";
import { ModalFooterError } from "./Error";

const Modal: React.FC<Modal2Props> = (props) => {
  const { t } = useTranslation();
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
    okText = t("cluster.confirm"),
    cancelText = t("common.cancel"),
    size,
    ...modalPropsArgs
  } = props;

  /**
   * Control Visible
   */
  /* Get modal stack */
  const stack = useKitSelector<RootState["modal"]["stack"]>(
    (state) => state.modal.stack
  );
  /* Get modal close id */
  const id = useKitSelector<RootState["modal"]["closeId"]>(
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
          <div className="modal-footer-left">
            <ModalFooterError className="modal-error" error={footerError} />
          </div>
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
