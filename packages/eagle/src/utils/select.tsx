import { css } from "@linaria/core";
import OverflowTooltip from "@src/coreX/OverflowTooltip";
import { Select } from "antd";
import { OptionProps as AntdOptionProps } from "antd/lib/select";
import React from "react";

export type OptionProps = AntdOptionProps & {
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
};

const OptionStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;

  &,
  :first-child {
    // unset the global style
    line-height: inherit !important;
  }
`;
const LeftStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  min-width: 0;
`;
const SlotStyle = css`
  display: flex;
  align-items: center;
  flex-shrink: 0;
`;

const AntdOption = Select.Option;

export function getOptions(options: OptionProps[]) {
  return options.map((option) => {
    const { prefix, suffix, children, ...restProps } = option;

    return (
      <AntdOption {...restProps}>
        <div className={OptionStyle}>
          <span className={LeftStyle}>
            {prefix ? <span className={SlotStyle}>{prefix}</span> : null}
            <OverflowTooltip content={children} />
          </span>
          {suffix ? <span className={SlotStyle}>{suffix}</span> : null}
        </div>
      </AntdOption>
    );
  });
}
