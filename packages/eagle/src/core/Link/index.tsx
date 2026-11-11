import { css } from "@linaria/core";
import Button from "@src/core/Button";
import { Color } from "@src/styles/token/color";
import cs from "classnames";
import React from "react";

import { LinkComponentType } from "./link.type";

const LinkStyle = css`
  @at-root {
    button#{&}.ant-btn,
    button#{&}.ant-btn.ant-btn-sm,
    button#{&}.ant-btn.ant-btn-lg {
      font-size: 12px;
      line-height: 18px;
      height: 18px;
    }
    button#{&} {
      color: ${Color.link.outstandingnormal};
      height: unset;
      .button-prefix-icon {
        margin-right: 4px;
      }
      .button-suffix-icon {
        margin-left: 4px;
      }

      &:hover,
      &.__pseudo-states-hover {
        color: ${Color.link.outstandinghover};
      }

      &:active,
      &.__pseudo-states-active {
        color: ${Color.link.outstandingactive};
      }
      &.ui-kit-link-disabled {
        color: ${Color.link.outstandingnormal};
      }
      &.ui-kit-link-primary {
        color: ${Color.text.neutral.primary};

        &:hover,
        &.__pseudo-states-hover {
          color: ${Color.link.outstandingnormal};
        }

        &:active,
        &.__pseudo-states-active {
          color: ${Color.link.outstandingactive};
        }

        &.ui-kit-link-disabled {
          color: ${Color.text.neutral.primary};
        }
      }

      &.ui-kit-link-secondary {
        color: ${Color.text.neutral.secondary};

        &:hover,
        &.__pseudo-states-hover {
          color: ${Color.link.outstandingnormal};
        }

        &:active,
        &.__pseudo-states-active {
          color: ${Color.link.outstandingactive};
        }

        &.ui-kit-link-disabled {
          color: ${Color.text.neutral.secondary};
        }
      }
    }
  }
`;
const Link: LinkComponentType = React.forwardRef(
  ({ className, disabled, type = "default", ...props }, ref) => {
    return (
      <Button
        {...props}
        ref={ref}
        disabled={disabled}
        className={cs(LinkStyle, className, {
          "ui-kit-link-disabled": disabled,
          "ui-kit-link-primary": type === "primary",
          "ui-kit-link-secondary": type === "secondary",
        })}
        type="link"
      />
    );
  },
);

export default Link;

export * from "./link.type";
