import { css } from "@linaria/core";
import HoverableElement from "@src/core/Button/HoverableElement";
import { Typo } from "@src/core/Typo";
import { Button as AntdButton } from "antd";
import { ButtonType as AntdButtonType } from "antd/lib/button";
import cs from "classnames";
import React, { useState } from "react";

import { ButtonProps } from "./button.type";

const ButtonStyle = css`
  &.ant-btn-icon-only {
    justify-content: center;
  }
  &.ant-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 32px;
    border-radius: 6px;
    line-height: 22px;
    transition:
      transform 160ms ease,
      background 160ms ease,
      opacity 160ms ease;
    transform: scale(var(--scale)) translateY(var(--transY)) translateZ(0);

    padding: 5px 12px;

    &.ant-btn-lg {
      height: 40px;
      line-height: 24px;
      padding: 8px 16px;
    }

    &.ant-btn-sm {
      height: 24px;
      line-height: 20px;
      padding: 2px 8px;
    }

    &.ant-btn-link {
      padding: 0;
    }

    &.ant-btn-circle,
    &.ant-btn-circle-outline {
      border-radius: 50%;
    }
  }

  .ant-btn-loading-icon span.anticon {
    margin-right: 8px;
    padding-right: 0px;
  }

  &.ant-btn.ant-btn-primary,
  &.ant-btn.ant-btn-secondary,
  &.ant-btn.ant-btn-tertiary,
  &.ant-btn.ant-btn-ordinary,
  &.ant-btn.ant-btn-ordinary-onTint,
  &.ant-btn.ant-btn-quiet {
    color: var(--color, #06101f);
    font-weight: var(--font-weight);
    background: var(--background-color, var(--fill-neutral-white));
    border-width: var(--border-width, 1px);
    border-color: var(--border-color, #d9d9d9);

    &[ant-click-animating-without-extra-node="true"]:after {
      display: none;
    }

    .anticon {
      color: var(--color, inherit);
    }

    &:hover,
    &.__pseudo-states-hover {
      background: var(--background-color-hover, var(--background-color));
      border-color: var(--border-color-hover, var(--border-color, transparent));
    }

    &:active,
    &.__pseudo-states-active {
      --scale: 1;
      --transY: 1px;
      background: var(--background-color-active, var(--background-color));
      border-color: var(
        --border-color-active,
        var(--border-color, transparent)
      );
    }

    &:focus,
    &.__pseudo-states-focus {
      background: var(--background-color-focus, var(--background-color));
      box-shadow: 0 0 0px 4px var(--box-shadow-color-focus);
      border-color: var(--border-color-focus, var(--border-color, transparent));
    }

    &[disabled],
    &[disabled]:hover,
    &[disabled]:focus,
    &[disabled]:active {
      color: var(--color-disabled, var(--color));
      background: var(--background-color-disabled, var(--background-color));
      border-color: var(
        --border-color-disabled,
        var(--border-color, transparent)
      );
      opacity: 0.5;
      --transY: 0;
    }
  }

  &.ant-btn-link {
    &[disabled] {
      color: var(--text-colorful-outstanding);
      opacity: 0.5;
    }

    &:hover,
    &:focus {
      color: var(--link-outstandinghover);
    }

    &:active {
      color: var(--link-outstandingactive);
    }
  }

  &.ant-btn-primary {
    --color: var(--text-neutral-ontint);
    --font-weight: bold;
    --border-width: 0;

    --background-color: var(--fill-outstanding-base);
    --background-color-hover: var(--fill-outstanding-bright);
    --background-color-active: var(--fill-outstanding-dark);
    --background-color-focus: var(--fill-outstanding-base);
    --box-shadow-color-focus: #{rgba(0, 136, 255, 0.16)};
  }

  &.ant-btn-primary.ant-btn-dangerous {
    --background-color: var(--fill-serious-base);
    --background-color-hover: var(--fill-serious-bright);
    --background-color-active: var(--fill-serious-dark);
    --background-color-focus: var(--fill-serious-bright);
    --box-shadow-color-focus: #{rgba(255, 74, 74, 0.16)};
  }

  &.ant-btn-primary.btn-primary-orange {
    --background-color: var(--fill-notice-base);
    --background-color-hover: var(--fill-notice-bright);
    --background-color-active: var(--fill-notice-dark);
    --background-color-focus: var(--fill-notice-base);
  }

  &.ant-btn-secondary {
    --color: var(--text-colorful-outstanding);
    --font-weight: bold;
    --border-width: 0;

    --background-color: #{rgba(0, 136, 255, 0.1)};
    --background-color-hover: #{rgba(0, 136, 255, 0.16)};
    --background-color-active: var(--fill-outstanding-lightactive);
    --background-color-focus: #{rgba(0, 136, 255, 0.1)};
    --box-shadow-color-focus: #{rgba(0, 136, 255, 0.16)};
  }

  &.ant-btn-secondary.ant-btn-dangerous {
    --color: var(--text-colorful-serious);

    --background-color: #{rgba(255, 74, 74, 0.1)};
    --background-color-hover: #{rgba(255, 74, 74, 0.16)};
    --background-color-active: var(--fill-serious-lightactive);
    --background-color-focus: #{rgba(255, 74, 74, 0.1)};
    --box-shadow-color-focus: #{rgba(255, 74, 74, 0.16)};
  }

  &.ant-btn-secondary.btn-primary-orange {
    --color: var(--text-colorful-notice);
    --background-color: #{rgba(255, 187, 0, 0.1)};
    --background-color-hover: #{rgba(255, 187, 0, 0.16)};
    --background-color-active: #{rgba(255, 187, 0, 0.2)};
    --background-color-focus: #{rgba(255, 187, 0, 0.1)};
  }

  &.ant-btn-tertiary {
    --color: var(--text-colorful-outstanding);
    --font-weight: bold;
    --border-width: 0;

    --background-color: var(--fill-neutral-white);
    --box-shadow-color-focus: #{rgba(0, 136, 255, 0.16)};

    box-shadow: none;

    &:not([disabled]),
    &:not(:focus) {
      &:hover,
      &:active,
      &.__pseudo-states-hover,
      &.__pseudo-states-active {
        filter: drop-shadow(0px 2px 8px rgba(0, 136, 255, 0.1));
      }
    }
  }

  &.ant-btn-tertiary.ant-btn-dangerous {
    --color: var(--text-colorful-serious);

    --background-color: var(--fill-neutral-white);
    --box-shadow-color-focus: #{rgba(255, 74, 74, 0.16)};

    &:not([disabled]),
    &:not(:focus) {
      &:hover,
      &:active,
      &.__pseudo-states-hover,
      &.__pseudo-states-active {
        filter: drop-shadow(0px 2px 8px rgba(255, 74, 74, 0.1));
      }
    }
  }

  &.ant-btn-tertiary.btn-primary-orange {
    --color: var(--text-colorful-notice);
    --background-color: var(--fill-neutral-white);

    &:not([disabled]),
    &:not(:focus) {
      &:hover,
      &:active,
      &.__pseudo-states-hover,
      &.__pseudo-states-active {
        filter: drop-shadow(0px 2px 8px rgba(255, 187, 0, 0.1));
      }
    }
  }

  &.ant-btn-ordinary {
    --color: var(--text-neutral-super);
    --border-color: var(--stroke-neutral-opaque-3);

    --background-color: var(--fill-neutral-white);
    --background-color-hover: var(--fill-neutral-opaque-2);
    --background-color-active: var(--fill-neutral-opaque-3);
    --box-shadow-color-focus: #{rgba(0, 136, 255, 0.16)};

    box-shadow: var(--effect-shadow-button-ordinary);

    &:focus,
    &.__pseudo-states-focus {
      box-shadow: 0 0 0px 4px var(--box-shadow-color-focus);
    }
  }

  &.ant-btn-ordinary.ordinary-blue {
    --color: var(--text-colorful-outstanding);
    --border-color: var(--fill-outstanding-base);

    --background-color: var(--fill-neutral-white);
    --background-color-hover: #{linear-gradient(
          0deg,
          rgba(0, 136, 255, 0.16),
          rgba(0, 136, 255, 0.16)
        ),
      var(--fill-neutral-white)};
    --background-color-active: #{linear-gradient(
          0deg,
          var(--fill-outstanding-lightactive),
          var(--fill-outstanding-lightactive)
        ),
      var(--fill-neutral-white)};
    --box-shadow-color-focus: #{rgba(0, 136, 255, 0.16)};

    box-shadow: var(--effect-shadow-button-ordinary);
  }

  &.ant-btn-ordinary.ant-btn-dangerous {
    --color: var(--text-colorful-serious);
    --border-color: var(--fill-serious-base);

    --background-color: var(--fill-neutral-white);
    --background-color-hover: #{linear-gradient(
          0deg,
          rgba(255, 74, 74, 0.16),
          rgba(255, 74, 74, 0.16)
        ),
      var(--fill-neutral-white)};
    --background-color-active: #{linear-gradient(
          0deg,
          var(--fill-serious-lightactive),
          var(--fill-serious-lightactive)
        ),
      var(--fill-neutral-white)};
    --box-shadow-color-focus: #{rgba(255, 74, 74, 0.16)};
  }

  &.ant-btn-ordinary-onTint {
    --color: var(--text-neutral-super);
    --border-color: var(--stroke-neutral-white);

    --background-color: var(--fill-neutral-white);
    --background-color-hover: var(--fill-neutral-trans-3);
    --background-color-active: var(--fill-neutral-trans-4);
    --box-shadow-color-focus: #{rgba(0, 136, 255, 0.16)};

    box-shadow: none;
  }

  &.ant-btn-ordinary-onTint.ordinary-blue {
    --color: var(--text-colorful-outstanding);
    --border-color: var(--stroke-neutral-white);

    --background-color: var(--fill-neutral-white);
    --background-color-hover: #{rgba(0, 136, 255, 0.16)};
    --background-color-active: var(--fill-outstanding-lightactive);
    --box-shadow-color-focus: #{rgba(0, 136, 255, 0.16)};

    box-shadow: none;
  }

  &.ant-btn-ordinary-onTint.ant-btn-dangerous {
    --color: var(--text-colorful-serious);

    --background-color-hover: #{rgba(255, 74, 74, 0.16)};
    --background-color-active: var(--fill-serious-lightactive);
    --box-shadow-color-focus: #{rgba(255, 74, 74, 0.16)};
  }

  &.ant-btn-quiet {
    --color: var(--text-neutral-tertiary);
    --border-width: 0;

    --background-color: transparent;
    --background-color-hover: var(--fill-neutral-trans-3);
    --background-color-active: var(--fill-neutral-trans-4);
    --background-color-focus: var(--fill-neutral-white);
    --box-shadow-color-focus: #{rgba(0, 136, 255, 0.16)};
    box-shadow: none;
  }

  &.ant-btn-quiet.ant-btn-dangerous {
    --color: var(--text-colorful-serious);

    --background-color-hover: #{rgba(255, 74, 74, 0.16)};
    --background-color-active: var(--fill-serious-lightactive);
    --box-shadow-color-focus: #{rgba(255, 74, 74, 0.16)};
  }

  &.ant-btn-quiet.quiet-blue {
    --color: var(--text-colorful-outstanding);

    --background-color: transparent;
    --background-color-hover: #{rgba(0, 136, 255, 0.16)};
    --background-color-active: var(--fill-outstanding-lightactive);
    --background-color-focus: var(--fill-neutral-white);
    --box-shadow-color-focus: #{rgba(0, 136, 255, 0.16)};
  }

  .button-prefix-icon {
    margin-right: 8px;
    display: inline-flex;
  }
  .button-suffix-icon {
    margin-left: 8px;
    display: inline-flex;
  }
  .icon-wrapper {
    display: flex;
    justify-content: center;
  }
`;

const isAntdButtonTypes = (type?: string): type is AntdButtonType => {
  return Boolean(
    type &&
      ["default", "primary", "ghost", "dashed", "link", "text"].includes(type),
  );
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const {
      type,
      className,
      children,
      prefixIcon,
      hoverPrefixIcon,
      suffixIcon,
      hoverSuffixIcon,
      onMouseEnter,
      onMouseLeave,
      size = "middle",
      ...restProps
    } = props;
    const [status, setStatus] = useState<"normal" | "hover">("normal");
    const hasIcon = prefixIcon || suffixIcon;
    const hasHoverIcon = hoverPrefixIcon || hoverSuffixIcon;
    const onlyIcon = !children && (prefixIcon || suffixIcon);
    return (
      <AntdButton
        ref={ref}
        className={cs(
          className,
          ButtonStyle,
          size === "large" && Typo.Label.l1_regular_title,
          size === "middle" && Typo.Label.l2_regular_title,
          size === "small" && Typo.Label.l3_regular_title,
          type && `ant-btn-${type}`,
          onlyIcon && "ant-btn-icon-only",
        )}
        type={isAntdButtonTypes(type) ? type : undefined}
        onMouseEnter={(e) => {
          onMouseEnter?.(e);
          if (hasIcon && hasHoverIcon) {
            setStatus("hover");
          }
        }}
        onMouseLeave={(e) => {
          onMouseLeave?.(e);
          if (hasIcon && hasHoverIcon) {
            setStatus("normal");
          }
        }}
        size={size}
        {...restProps}
      >
        {prefixIcon && (
          <HoverableElement
            icon={prefixIcon}
            hoverEle={hoverPrefixIcon}
            hover={status === "hover"}
            className={!onlyIcon ? "button-prefix-icon" : ""}
          />
        )}
        {children}
        {suffixIcon && (
          <HoverableElement
            icon={suffixIcon}
            hoverEle={hoverSuffixIcon}
            hover={status === "hover"}
            className={!onlyIcon ? "button-suffix-icon" : ""}
          />
        )}
      </AntdButton>
    );
  },
);

export default Button;

export * from "./button.type";
