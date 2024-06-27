import { cx } from "@linaria/core";
import { styled } from "@linaria/react";
import { StatusColorMap } from "@src/core/Progress/progress.const";
import {
  BaseProgressStyle,
  FlexFullContentStyle,
  ProgressStyle,
} from "@src/core/Progress/progress.style";
import { ComponentType, ProgressProps } from "@src/core/Progress/progress.type";
import { Area } from "@src/core/Progress/progress.widgets";
import { Antd5ComponentPrefixCls, Antd5PrefixCls } from "@src/utils";
import { isStringArray } from "@src/utils/isStringArr";
import { Progress as AntdProgress } from "antd5";
import React from "react";

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  column-gap: 6px;
`;

const ProgressContainer = styled.div<{ type: ProgressProps["type"] }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  row-gap: ${({ type }) => (type === "rich" ? "6px" : "4px")};

  .${Antd5PrefixCls}-progress-line {
    font-size: 0;
  }
`;

const getStatus = (
  status: ProgressProps["status"],
  percent: ProgressProps["percent"],
  indeterminate?: boolean,
) => {
  if (indeterminate) return "active";
  if (!status && percent! >= 100) return "success";
  return status || "active";
};

const createAreaNode = (
  content: React.ReactNode,
  className: string,
  type: ComponentType,
  gap: number = 6,
): React.ReactNode => {
  return typeof content === "string" ? (
    <Area
      className={className}
      items={[{ type, children: content }]}
      gap={gap}
    />
  ) : (
    content
  );
};

export const Progress: React.FC<ProgressProps> = ({
  type = "simple",
  status,
  size = "small",
  leftTop,
  rightTop,
  leftBottom,
  rightBottom,
  percent = 0,
  className,
  indeterminate,
  ...props
}) => {
  const finalStatus = getStatus(status, percent, indeterminate);
  const storkeWidth = size === "small" ? 4 : 8;
  const isBaseProgress = type === "base";
  const isRichProgress = type === "rich";

  let titleNode: React.ReactNode;
  let actionNode = rightBottom;
  let statusTextNode: React.ReactNode;

  if (type === "simple") {
    let items;
    if (!rightBottom) {
      items = [`${percent}%`];
    } else if (isStringArray(rightBottom)) {
      items = [...rightBottom, `${percent}%`];
    }

    if (items) {
      actionNode = (
        <Area
          items={items.map((desc) => ({
            type: "description",
            children: desc,
          }))}
          split="dot"
        />
      );
    }
    titleNode = createAreaNode(
      leftTop,
      cx(FlexFullContentStyle, "progress-leftTop"),
      "description",
    );
  } else {
    statusTextNode = createAreaNode(
      rightTop,
      "progress-status",
      "description",
      2,
    );
    titleNode = createAreaNode(leftTop, "progress-leftTop", "title");
  }

  return (
    <ProgressContainer type={type} className={cx(className, ProgressStyle)}>
      {titleNode ? (
        <Row>
          {titleNode}
          {statusTextNode}
        </Row>
      ) : null}
      <AntdProgress
        className={isBaseProgress ? BaseProgressStyle : ""}
        strokeWidth={storkeWidth}
        showInfo={false}
        {...props}
        prefixCls={Antd5ComponentPrefixCls["Progress"]}
        status={finalStatus === "active" ? "active" : undefined}
        percent={indeterminate ? 100 : percent}
        strokeColor={StatusColorMap[finalStatus]}
      />
      {leftBottom || actionNode ? (
        <Row>
          {isStringArray(leftBottom) ? (
            <Area
              className={FlexFullContentStyle}
              items={leftBottom.map((desc) => ({
                type: "description",
                children: desc,
                multiLines: !rightBottom ? 2 : 1,
              }))}
              gap={isRichProgress ? 2 : 0}
              split="dot"
            />
          ) : (
            leftBottom
          )}
          {actionNode}
        </Row>
      ) : null}
    </ProgressContainer>
  );
};

export * from "./progress.type";
export * from "./progress.widgets";
