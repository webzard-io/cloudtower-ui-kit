import { styled } from "@linaria/react";
import React from "react";

import { IDetailCardProps } from "../../spec/type";

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
  const { title } = props;

  return (
    <CardWrapper>
      {title && <div className="card-title">{title}</div>}
      <div className="card-body">{props.children}</div>
    </CardWrapper>
  );
};

export default DetailCard;
