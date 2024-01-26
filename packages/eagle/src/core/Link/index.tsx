import { css } from "@linaria/core";
import Button from "@src/core/Button";
import { LinkComponentType } from "@src/spec";
import cs from "classnames";
import React from "react";

const LinkStyle = css`
  @at-root {
    button#{&}.ant-btn {
      font-size: 12px;
      line-height: 18px;
      height: 18px;
    }
    button#{&} {
      color: $link-outstanding-normal;
      height: unset;
      .button-prefix-icon {
        margin-right: 4px;
      }
      .button-suffix-icon {
        margin-left: 4px;
      }

      &:hover,
      &.__pseudo-states-hover {
        color: $link-outstanding-hover;
      }

      &:active,
      &.__pseudo-states-active {
        color: $link-outstanding-active;
      }
      &.ui-kit-link-disabled {
        color: $link-outstanding-normal;
      }
      &.ui-kit-link-subtle {
        color: $text-neutral-primary;

        &:hover,
        &.__pseudo-states-hover {
          color: $link-outstanding-normal;
        }

        &:active,
        &.__pseudo-states-active {
          color: $link-outstanding-active;
        }

        &.ui-kit-link-disabled {
          color: $text-neutral-primary;
        }
      }
    }
  }
`;
const Link: LinkComponentType = React.forwardRef(
  ({ className, disabled, type, ...props }, ref) => {
    return (
      <Button
        {...props}
        ref={ref}
        disabled={disabled}
        className={cs(LinkStyle, className, {
          "ui-kit-link-disabled": disabled,
          "ui-kit-link-subtle": type === "subtle",
        })}
        type="link"
      />
    );
  },
);

export default Link;
