import { styled } from "@linaria/react";
import React from "react";

import { IDetailCardProps } from "./detailCard.type";

const CardWrapper = styled.div`
  margin-bottom: 16px;

  .card-title {
    font-size: 16px;
    color: var(--text-neutral-tertiary);
    font-weight: 700;
    line-height: 32px;
  }
  .card-body {
    padding: 24px;
    border-radius: 8px;
    background: var(--fill-neutral-white);
  }

  .empty {
    font-weight: 700;
    font-size: 14px;
    line-height: 22px;
    color: rgba(0, 21, 64, 0.3);
    text-align: center;
  }
`;

const DetailCard: React.FC<IDetailCardProps> = (props) => {
  const { title, children, "data-testid": dataTestId } = props;

  return (
    <CardWrapper data-testid={dataTestId}>
      {title && <div className="card-title">{title}</div>}
      <div className="card-body">{children}</div>
    </CardWrapper>
  );
};

export default DetailCard;

export * from "./detailCard.type";
