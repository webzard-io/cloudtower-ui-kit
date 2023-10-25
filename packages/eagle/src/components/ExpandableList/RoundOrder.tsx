import { css } from "@linaria/core";
import classNames from "classnames";
import React, { PropsWithChildren } from "react";
import { Typo } from "../Typo";

const RoundedOrderStyle = css`
  display: flex;
  align-items: center;
  .order {
    height: 24px;
    width: 24px;
    border-radius: 20px;
    color: $text-light-general;
    background: $fill-light-element-container-outstanding;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 6px;
  }
`;

interface IProps {
  order?: number;
}

const RoundedOrder = (props: PropsWithChildren<IProps>) => {
  const { children, order } = props;
  return (
    <div className={RoundedOrderStyle}>
      {order != null ? (
        <span className="order">
          <span className={Typo.Label.l2_bold}>{order}</span>
        </span>
      ) : null}
      {children}
    </div>
  );
};

export default RoundedOrder;
