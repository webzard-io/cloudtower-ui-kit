import { css } from "@linaria/core";
import Button from "@src/core/Button";
import useParrotTranslation from "@src/hooks/useParrotTranslation";
import cs from "classnames";
import React from "react";

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
  "data-testid"?: string;
}> = (props) => {
  const {
    error,
    refetch,
    className,
    title,
    refetchText,
    "data-testid": dataTestId,
  } = props;
  const { t } = useParrotTranslation();
  return (
    <div
      data-testid={dataTestId}
      className={cs(FailedLoadStyle, className)}
      title={title}
    >
      <div className="error-text">{String(error)}</div>
      <Button
        type="ordinary"
        data-testid={dataTestId ? `${dataTestId}-retry` : undefined}
        onClick={() => refetch()}
      >
        {refetchText || t("common.retry")}
      </Button>
    </div>
  );
};

export default FailedLoad;
