import { css } from "@linaria/core";
import { Segmented as AntdSegmented } from "antd5";
import classNames from "classnames";
import React from "react";

import { ISegmentedControlProps } from "../../spec/type";

const Segment = css`
  .ant-segmented-item:not(:last-child) {
    margin-right: 2px;
  }
`;

const SmallSegment = css`
  &.ant-segmented-sm .ant-segmented-item-label {
    padding-left: 8px;
    padding-right: 8px;
  }

  &.ant-segmented-sm .ant-segmented-item-selected {
    border-radius: 4px;
  }

  &.ant-segmented
    .ant-segmented-item:hover:not(.ant-segmented-item-selected):not(
      .ant-segmented-item-disabled
    ) {
    border-radius: 4px;
  }
`;

const MediumSegment = css`
  .ant-segmented-item-label {
    padding-left: 12px;
    padding-right: 12px;
  }
`;

const ColorSegment = css`
  background-color: $fill-neutral-trans-2;
  &.ant-segmented
    .ant-segmented-item:hover:not(.ant-segmented-item-selected):not(
      .ant-segmented-item-disabled
    ) {
    background-color: $fill-neutral-light-white;
    color: $text-neutral-secondary-light;
  }
  // on animate remove hover bg color
  &.ant-segmented
    .ant-segmented-thumb
    ~ .ant-segmented-item:hover:not(.ant-segmented-item-selected):not(
      .ant-segmented-item-disabled
    ) {
    background-color: transparent;
  }
  // remove after's bg color
  &.ant-segmented
    .ant-segmented-item:hover:not(.ant-segmented-item-selected):not(
      .ant-segmented-item-disabled
    )::after {
    background-color: transparent;
  }
`;

const SegmentControl = (props: ISegmentedControlProps) => {
  const { size = "middle", className } = props;

  return (
    <AntdSegmented
      className={classNames(
        className,
        {
          [SmallSegment]: size === "small",
          [MediumSegment]: size === "middle",
        },
        Segment,
        ColorSegment,
      )}
      size={size}
      {...props}
    />
  );
};

export default SegmentControl;
