import { css } from "@linaria/core";
import { Card } from "antd";
import React, { PropsWithChildren } from "react";

const card = css`
  border-radius: 8px;
  .ant-card-body {
    padding: 20px 24px 24px 24px;
  }
`;

interface IProps {}

const ExpandableContainer = (props: PropsWithChildren<IProps>) => {
  const { children } = props;
  return <Card className={card}>{children}</Card>;
};

export default ExpandableContainer;
