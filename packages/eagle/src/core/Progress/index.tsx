import { css, cx } from "@linaria/core";
import { styled } from "@linaria/react";
import { Area } from "@src/core/Progress/Area";
import { StatusColorMap } from "@src/core/Progress/progress.const";
import {
  BaseProgressStyle,
  DescriptionStyle,
  FlexFullContentStyle,
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
  column-gap: 6px;
`;

const ProgressContainer = styled.div<{ type: "simple" | "rich" }>`
  display: flex;
  flex-direction: column;
  row-gap: ${({ type }) => (type === "simple" ? "4px" : "6px")};

  .ant-progress-line {
    font-size: 0;
  }
`;

const Progress: React.FC<ProgressProps> = ({
  type = "simple",
  status,
  size = "small",
  info,
  statusText,
  description,
  operation,
  percent,
  className,
  ...props
}) => {
  const finalStatus =
    status === "active" && percent >= 100 ? "success" : status;
  const storkeWidth = size === "small" ? 4 : 8;
  if (type === "base") {
    return (
      <AntdProgress
        className={cx(className, BaseProgressStyle)}
        strokeWidth={storkeWidth}
        showInfo={false}
        status={finalStatus === "active" ? "active" : undefined}
        percent={percent}
        strokeColor={StatusColorMap[finalStatus]}
      />
    );
  }
  let titleNode;
  let operationNode = operation;
  let statusTextNode;

  if (type === "simple") {
    if (operation && isArray(operation)) {
      operationNode = (
        <Area
          items={operation
            .concat(`${percent}%`)
            .map((desc) => ({ type: "description", children: desc }))}
          gap={2}
          split="dot"
        />
      );
    }

    titleNode =
      typeof info === "string" ? (
        <Area
          className={css`
            width: 100%;
          `}
          items={[{ type: "description", children: info }]}
        />
      ) : (
        info
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
      typeof info === "string" ? (
        <span className={cx("progress-info", Typo.Label.l2_bold)}>{info}</span>
      ) : (
        info
      );
  }

  return (
    <ProgressContainer type={type} className={className}>
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
            className={FlexFullContentStyle}
            items={description.map((desc) => ({
              type: "description",
              children: desc,
              multiLines: !operation ? 2 : 1,
            }))}
            gap={2}
            split="dot"
          />
        ) : null}
        {operationNode}
      </Row>
    </ProgressContainer>
  );
};

export default Progress;
