import { kitContext } from "@cloudtower/eagle";
import { parrotI18n } from "@cloudtower/parrot";
import { css } from "@linaria/core";
import { ApolloError } from "apollo-boost";
import cs from "classnames";
import React, { useContext } from "react";

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
  error: ApolloError | string;
  refetch: () => Promise<unknown>;
  refetchText?: string;
  className?: string;
  title?: string;
}> = (props) => {
  const { error, refetch, className, title, refetchText } = props;
  const kit = useContext(kitContext);
  return (
    <div className={cs(FailedLoadStyle, className)} title={title}>
      <div className="error-text">{String(error)}</div>
      <kit.button type="ordinary" onClick={() => refetch()}>
        {refetchText || parrotI18n.t("common.retry")}
      </kit.button>
    </div>
  );
};

export default FailedLoad;
