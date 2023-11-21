import { css } from "@linaria/core";
import cs from "classnames";
import React from "react";

import { LinkComponentType } from "../../spec";

const LinkStyle = css`
  &.ui-kit-link {
    color: $link-outstanding-normal;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    height: 18px;
    column-gap: 4px;
    &:hover,
    &.__pseudo-states-hover {
      cursor: pointer;
      color: $link-outstanding-hover;
    }

    &:active,
    &.__pseudo-states-active {
      cursor: pointer;
      color: $link-outstanding-active;
    }
    &.ui-kit-link-disabled {
      color: $link-outstanding-normal;
      opacity: 0.5;
      cursor: not-allowed;
    }
    &.ui-kit-link-subtle {
      color: $text-neutral-primary;

      &:hover,
      &.__pseudo-states-hover,
      &:active,
      &.__pseudo-states-active {
        cursor: pointer;
        color: $link-outstanding-normal;
      }
      &.ui-kit-link-disabled {
        color: $text-neutral-primary;
        opacity: 0.5;
        cursor: not-allowed;
      }
    }
  }
`;
const Link: LinkComponentType = React.forwardRef(
  (
    {
      className,
      style,
      children,
      disabled,
      prefixIcon,
      suffixIcon,
      type,
      href,
      onClick,
      ...rest
    },
    ref,
  ) => {
    const LinkWrapper = href ? "a" : "span";

    return (
      <LinkWrapper
        className={cs("ui-kit-link", LinkStyle, className, {
          "ui-kit-link-disabled": disabled,
          "ui-kit-link-subtle": type === "subtle",
        })}
        ref={ref}
        {...rest}
        style={style}
        onClick={(e) => {
          if (disabled) {
            e.preventDefault();
            e.stopPropagation();
          } else {
            onClick?.(e);
          }
        }}
        href={href}
      >
        {prefixIcon}
        {children}
        {suffixIcon}
      </LinkWrapper>
    );
  },
);

export default Link;
