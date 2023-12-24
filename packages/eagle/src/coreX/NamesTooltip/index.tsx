import { css } from "@linaria/core";
import { styled } from "@linaria/react";
import React from "react";

import Tooltip from "../../components/Tooltip";
import { NamesTooltipType } from "../../spec";

const NameItem = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  line-height: 18px;

  &:not(:last-child) {
    margin-bottom: 4px;
  }
`;

const TooltipText = styled.span`
  margin: 0 3px;
`;

const ToolTipStyle = css`
  max-height: 400px;
  overflow: "auto";
`;

const NamesTooltip: React.FC<NamesTooltipType> = (props) => {
  const { names, children } = props;
  return (
    <Tooltip
      title={
        <>
          {names.map((name) => (
            <NameItem key={name.id}>{name.name}</NameItem>
          ))}
        </>
      }
      overlayClassName={ToolTipStyle}
    >
      <TooltipText className="dashed-border-bottom">{children}</TooltipText>
    </Tooltip>
  );
};

export default NamesTooltip;
