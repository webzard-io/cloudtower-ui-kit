import { parrotI18n } from "@cloudtower/parrot";
import cs from "classnames";
import { css } from "linaria";
import React from "react";

import Button from "../Button";

const FailedLoadStyle = css`
  width: 100%;
  height: 100%;
  min-height: 124px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .error-text {
    color: $text-terdiary-light;
    margin-bottom: 16px;
    font-size: 18px;
  }
`;

const FailedLoad: React.FC<{
  error: Error | string;
  refetch: () => Promise<unknown>;
  refetchText?: string;
  className?: string;
  title?: string;
}> = (props) => {
  const { error, refetch, className, title, refetchText } = props;
  return (
    <div className={cs(FailedLoadStyle, className)} title={title}>
      <div className="error-text">{String(error)}</div>
      <Button type="ordinary" onClick={() => refetch()}>
        {refetchText || parrotI18n.t("common.retry")}
      </Button>
    </div>
  );
};

export default FailedLoad;
