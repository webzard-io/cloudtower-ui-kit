import { MoreEllipsis316BoldSecondaryIcon } from "@cloudtower/icons-react";
import { css } from "@linaria/core";
import Button from "@src/core/Button";
import { Icon } from "@src/index";
import { Antd5Dropdown } from "@src/index";
import { DropdownProps } from "antd5";
import React from "react";

const actionStyle = css`
  margin-left: 8px;
`;

const actionStyleLabel = css`
  font-size: 12px;
  color: $text-neutral-primary;
`;

const LineChartActions: React.FC<{
  label: string | React.ReactNode;
  dropdownProps?: DropdownProps;
}> = (props) => {
  const { label, dropdownProps } = props;

  return (
    <div className="metric-extra">
      <div className={actionStyleLabel}>{label}</div>
      {dropdownProps && (
        <Antd5Dropdown {...dropdownProps}>
          <Button
            size="small"
            type="tertiary"
            className={actionStyle}
            prefixIcon={<Icon src={MoreEllipsis316BoldSecondaryIcon} />}
          />
        </Antd5Dropdown>
      )}
    </div>
  );
};

export default LineChartActions;
