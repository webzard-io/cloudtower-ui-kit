import { styled } from "@linaria/react";
import React from "react";

import { IDetailCardProps } from "./detailCard.type";

const CardWrapper = styled.div`
  margin-bottom: 16px;

  .card-title {
    font-size: 16px;
    color: $text-secondary-light;
    font-weight: 700;
    line-height: 32px;
  }
  .card-body {
    padding: 24px;
    border-radius: 8px;
    background: $fills-light-white;
  }

  .empty {
    font-weight: 700;
    font-size: 14px;
    line-height: 22px;
    color: $text-light-tertiary;
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
