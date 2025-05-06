import { css } from "@linaria/core";
import { Antd5PrefixCls } from "@src/utils";
import { Segmented as AntdSegmented } from "antd5";
import classNames from "classnames";
import React from "react";

import { ISegmentedControlProps } from "./segmentControl.type";

const Segment = css`
  .${Antd5PrefixCls}-segmented-item:not(:last-child) {
    margin-right: 2px;
  }
`;

const SmallSegment = css`
  &.${Antd5PrefixCls}-segmented-sm .${Antd5PrefixCls}-segmented-item-label {
    padding-left: 8px;
    padding-right: 8px;
    font-size: 12px;
  }

  &.${Antd5PrefixCls}-segmented-sm .${Antd5PrefixCls}-segmented-item-selected {
    border-radius: 4px;
  }

  &.${Antd5PrefixCls}-segmented
    .${Antd5PrefixCls}-segmented-item:hover:not(.${Antd5PrefixCls}-segmented-item-selected):not(
      .${Antd5PrefixCls}-segmented-item-disabled
    ) {
    border-radius: 4px;
  }
`;

const MediumSegment = css`
  .${Antd5PrefixCls}-segmented-item-label {
    padding-left: 12px;
    padding-right: 12px;
  }
`;

const ColorSegment = css`
  background-color: $fill-neutral-trans-2;
  &.${Antd5PrefixCls}-segmented
    .${Antd5PrefixCls}-segmented-item:hover:not(.${Antd5PrefixCls}-segmented-item-selected):not(
      .${Antd5PrefixCls}-segmented-item-disabled
    ) {
    background-color: $fill-neutral-light-white;
    color: $text-neutral-secondary-light;
  }
  // on animate remove hover bg color
  &.${Antd5PrefixCls}-segmented
    .${Antd5PrefixCls}-segmented-thumb
    ~ .${Antd5PrefixCls}-segmented-item:hover:not(.${Antd5PrefixCls}-segmented-item-selected):not(
      .${Antd5PrefixCls}-segmented-item-disabled
    ) {
    background-color: transparent;
  }
  // remove after's bg color
  &.${Antd5PrefixCls}-segmented
    .${Antd5PrefixCls}-segmented-item:hover:not(.${Antd5PrefixCls}-segmented-item-selected):not(
      .${Antd5PrefixCls}-segmented-item-disabled
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
      prefixCls={`${Antd5PrefixCls}-segmented`}
      {...props}
    />
  );
};

export default SegmentControl;

export * from "./segmentControl.type";
