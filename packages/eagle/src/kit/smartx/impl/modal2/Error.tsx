import { FullView, Typo } from "@cloudtower/eagle/kit/smartx";
import { parrotI18n } from "@cloudtower/parrot";
import { css, cx } from "@linaria/core";
import React from "react";

import { analyzeFallbackError } from "../../components/FormError";

const FullViewErrorStyle = css`
  flex-direction: column;
  color: $text-secondary-light;
`;

interface ModalErrorType {
  error: Error | string | React.ReactNode;
}

export const ModalContentError: React.FC<ModalErrorType> = (props) => {
  const { error } = props;

  if (React.isValidElement(error)) {
    return error;
  }

  if (typeof error === "string") {
    return (
      <FullView className={FullViewErrorStyle}>
        <p className={Typo.Display.d2_bold_title}>
          {parrotI18n.t("common.load_failed")}
        </p>
        <p className={Typo.Label.l1_regular_title}>
          {parrotI18n.t("task.error_message")}:&nbsp;<span>{error}</span>
        </p>
      </FullView>
    );
  }
  if (error instanceof Error) {
    return (
      <FullView className={FullViewErrorStyle}>
        <p className={Typo.Display.d2_bold_title}>
          {parrotI18n.t("common.load_failed")}
        </p>
        <p className={Typo.Label.l1_regular_title}>
          {parrotI18n.t("task.error_message")}:&nbsp;
          <span>{error.message}</span>
        </p>
      </FullView>
    );
  }

  const errorMsg = analyzeFallbackError(error, parrotI18n);

  if (errorMsg?.msg) {
    return (
      <FullView className={FullViewErrorStyle}>
        <p className={Typo.Display.d2_bold_title}>
          {parrotI18n.t("common.load_failed")}
        </p>
        <p className={Typo.Label.l1_regular_title}>
          {parrotI18n.t("task.error_message")}:&nbsp;<span>{errorMsg.msg}</span>
        </p>
      </FullView>
    );
  }

  return <>{error}</>;
};

interface ModalFooterErrorType extends ModalErrorType {
  className?: string;
}

export const ModalFooterError: React.FC<ModalFooterErrorType> = (props) => {
  const { error, className } = props;

  if (React.isValidElement(error)) {
    return <span className="modal-error">{error}</span>;
  }

  const errorMsg = analyzeFallbackError(error, parrotI18n);
  if (!errorMsg) {
    return null;
  }
  return (
    <span
      title={errorMsg.originalMsg || String(error)}
      className={cx("modal-error", className)}
    >
      {errorMsg.msg}
    </span>
  );
};
