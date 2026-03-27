import { cx } from "@linaria/core";
import { styled } from "@linaria/react";
import { Color } from "@src/index";
import React from "react";

import { AvatarProps } from "./avatar.type";

const AvatarWrapper = styled.span<{
  background: string;
}>`
  .user-icon-inner {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: $white;
    font-weight: bold;
    font-size: 12px;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: ${({ background }) => background};
  }
  &.btn-item {
    transition: all 160ms ease;
    cursor: pointer;
    width: 56px;
    height: 40px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 6px;

    &:hover {
      box-shadow:
        0px 0px 20px rgba(107, 125, 153, 0.18),
        0px 25px 80px rgba(45, 58, 86, 0.3);
    }

    &:active {
      transform: translateY(2px);
      transition: all 320ms ease;
    }
  }
`;

const Avatar: React.FC<AvatarProps> = ({
  username,
  className,
  background = "light-blue",
  "data-testid": dataTestId,
}) => {
  return (
    <AvatarWrapper
      data-testid={dataTestId}
      background={Color.gradient[background] || background}
      className={cx(className, "user-icon btn-item")}
    >
      <span className="user-icon-inner">{username.substring(0, 1)}</span>
    </AvatarWrapper>
  );
};

export default Avatar;
