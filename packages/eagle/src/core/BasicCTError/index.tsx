import { cx } from "@linaria/core";
import { useCTErrorMsg } from "@src/hooks/useCTErrorMsg";
import useParrotTranslation from "@src/hooks/useParrotTranslation";
import { CTError } from "@src/utils";
import React, { useMemo } from "react";

import { Typo } from "../Typo";
import { BasicCTErrorStyle } from "./BasicCTError.style";
import { BasicCTErrorProps } from "./BasicCTError.type";

const defaultErrorContainerRender: React.FC<{
  className?: string;
  "data-testid"?: string;
}> = ({ children, className, "data-testid": dataTestId }) => {
  return (
    <span
      data-testid={dataTestId}
      className={cx(Typo.Label.l3_regular, BasicCTErrorStyle, className)}
    >
      {children}
    </span>
  );
};
export const BasicCTError: React.FC<BasicCTErrorProps> = (props) => {
  const {
    error,
    className,
    ErrorItemRender,
    ErrorContainerRender,
    errorMsgOptions,
    "data-testid": dataTestId,
  } = props;
  const msgs = useCTErrorMsg(error as unknown as CTError, errorMsgOptions);
  const { t } = useParrotTranslation();
  const ContainerRender = ErrorContainerRender || defaultErrorContainerRender;
  const child = useMemo(() => {
    if (ErrorItemRender) {
      return msgs.map((errorMsg, index) => (
        <ErrorItemRender errorMsg={errorMsg} index={index} key={index} />
      ));
    }
    return msgs.join("");
  }, [msgs, ErrorItemRender]);
  return (
    <ContainerRender
      className={className}
      errorMsgs={msgs}
      children={child}
      data-testid={dataTestId}
    />
  );
};
