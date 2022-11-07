import { ButtonGroupType } from "../../../specify";
import { css, cx } from "@linaria/core";
import { styled } from "@linaria/react";
import React from "react";

import BaseButton from "../button";
import Tooltip from "../tooltip";

export const ButtonStyle = css`
  padding: 4px 11px;
`;

const ButtonGroupContainer = styled.div`
  white-space: nowrap;
  filter: drop-shadow(0px 2px 8px rgba(0, 136, 255, 0.1));

  & > .ant-btn {
    &.ant-btn-ordinary-onTint:not(.ant-btn-dangerous) {
      --color: #{$text-light-general};

      &[disabled],
      &:hover[disabled] {
        --color: #{$text-light-general};
      }
    }
  }

  & > .ant-btn:not(:only-child) {
    & + .ant-btn {
      margin-left: 1px;
    }

    &:first-child {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }

    &:last-child {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }

    &:not(:first-child, :last-child) {
      border-radius: unset;
    }
  }
`;

const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupType>(
  (props, ref) => {
    const { className, options, size = "middle" } = props;
    if (!options.length) {
      return null;
    }

    return (
      <ButtonGroupContainer className={className} ref={ref}>
        {options.map((button, index) => {
          const {
            key,
            icon,
            type = "ordinary-onTint",
            children,
            danger,
            ghost,
            className,
            hideTitle,
            title,
            ...buttonPropArgs
          } = button;
          if (hideTitle) {
            return (
              <Tooltip key={key || index} overlay={title || children}>
                <BaseButton
                  type={type}
                  size={size}
                  danger={danger}
                  ghost={ghost}
                  className={cx(ButtonStyle, className)}
                  prefixIcon={icon}
                  {...buttonPropArgs}
                />
              </Tooltip>
            );
          }
          return (
            <BaseButton
              key={key || index}
              type={type}
              size={size}
              danger={danger}
              ghost={ghost}
              className={cx(ButtonStyle, className)}
              prefixIcon={icon}
              {...buttonPropArgs}
            >
              {(title || children) && (
                <span className="button-group-item">{title || children}</span>
              )}
            </BaseButton>
          );
        })}
      </ButtonGroupContainer>
    );
  }
);

export default ButtonGroup;
