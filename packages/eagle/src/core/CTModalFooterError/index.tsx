import React, { useMemo } from "react";
import { cx } from "@linaria/core";
import { CTModalFooterErrorStyle } from "./CTModalFooterError.style";
import { Typo } from "../Typo";
import { useCTErrorMsg } from "@src/hooks/useCTErrorMsg";
import useParrotTranslation from "@src/hooks/useParrotTranslation";
import { CTModalFooterErrorProps } from "./CTModalFooterError.type";

const defaultErrorContainerRender: React.FC<{ className?: string }> = ({
  children,
  className,
}) => {
  return (
    <span
      className={cx(Typo.Label.l3_regular, CTModalFooterErrorStyle, className)}
    >
      {children}
    </span>
  );
};
export const CTModalFooterError: React.FC<CTModalFooterErrorProps> = (
  props,
) => {
  const {
    error,
    className,
    ErrorItemRender,
    ErrorContainerRender,
    errorMsgOptions,
  } = props;
  const msgs = useCTErrorMsg(error, errorMsgOptions);
  const { t } = useParrotTranslation();
  const ContainerRender = ErrorContainerRender || defaultErrorContainerRender;
  const child = useMemo(() => {
    if (ErrorItemRender) {
      return msgs.map((errorMsg, index) => (
        <ErrorItemRender errorMsg={errorMsg} index={index} key={index} />
      ));
    }
    return msgs.join("");
  }, [msgs, ErrorItemRender, t]);
  return (
    <ContainerRender className={className} errorMsgs={msgs} children={child} />
  );
};
