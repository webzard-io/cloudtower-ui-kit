import { css, cx } from "@linaria/core";
import { styled } from "@linaria/react";
import { Area } from "@src/core/Progress/Area";
import { StatusColorMap } from "@src/core/Progress/progress.const";
import {
  BaseProgressStyle,
  DescriptionStyle,
  ProgressStyle,
} from "@src/core/Progress/progress.style";
import { ProgressProps } from "@src/core/Progress/progress.type";
import { Typo } from "@src/core/Typo";
import { Progress as AntdProgress } from "antd5";
import { isArray } from "lodash";
import React from "react";

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Progress: React.FC<ProgressProps> = ({
  type = "simple",
  status,
  size = "small",
  title,
  statusText,
  description,
  operation,
  percent,
  ...props
}) => {
  const finalStatus =
    status === "active" && percent >= 100 ? "success" : status;
  const storkeWidth = size === "small" ? 4 : 8;
  if (type === "base") {
    return (
      <AntdProgress
        className={BaseProgressStyle}
        strokeWidth={storkeWidth}
        showInfo={false}
        status={finalStatus === "active" ? "active" : undefined}
        percent={percent}
        strokeColor={StatusColorMap[finalStatus]}
      />
    );
  }
  let titleNode;
  let operationNode;
  let statusTextNode;

  if (type === "simple") {
    operationNode =
      operation && isArray(operation) ? (
        <Area
          items={operation
            .concat(`${percent}%`)
            .map((desc) => ({ type: "description", content: desc }))}
          gap={2}
          split="dot"
        />
      ) : null;
    titleNode =
      typeof title === "string" ? (
        <Area
          classname={css`
            width: 100%;
          `}
          items={[{ type: "description", content: title }]}
        />
      ) : (
        title
      );
  } else {
    statusTextNode =
      typeof statusText === "string" ? (
        <span className={cx("progress-status", DescriptionStyle)}>
          {statusText}
        </span>
      ) : (
        statusText
      );
    titleNode =
      typeof title === "string" ? (
        <span className={cx("progress-title", Typo.Label.l2_bold)}>
          {title}
        </span>
      ) : (
        title
      );
  }

  return (
    <div className={ProgressStyle}>
      <Row>
        {titleNode}
        {statusTextNode}
      </Row>
      <AntdProgress
        strokeWidth={storkeWidth}
        showInfo={false}
        {...props}
        percent={percent}
        strokeColor={StatusColorMap[finalStatus]}
      />
      <Row>
        {description ? (
          <Area
            items={description.map((desc) => ({
              type: "description",
              content: desc,
            }))}
            gap={2}
            split="dot"
          />
        ) : null}
        {operationNode}
      </Row>
    </div>
  );
};

export default Progress;
