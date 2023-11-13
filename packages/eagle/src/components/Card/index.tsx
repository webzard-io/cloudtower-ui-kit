import { ArrowRightGrayIcon } from "@cloudtower/icons-react";
import cs from "classnames";
import React, {
  CSSProperties,
  FC,
  PropsWithChildren,
  ReactNode,
  useState,
} from "react";

import Icon from "../Icon";
import CardBody from "./CardBody";
import CardTitle from "./CardTitle";
import CardWrapper from "./CardWrapper";
import { css } from "@linaria/core";

export type CardProps = {
  collapsible?: boolean;
  defaultOpen?: boolean;
  title?: React.ReactNode | string;
  subInfo?: React.ReactNode;
  className?: string;
  hoverable?: boolean;
  // default to true
  shadow?: boolean;
  loading?:
    | {
        shimmerClassName?: string;
        shimmerStyle?: CSSProperties;
      }
    | boolean;
} & React.DOMAttributes<HTMLDivElement>;

const cardLoading = css`
  background-color: $fills-light-trans-2;
  .shimmerBG {
    height: 100%;
    animation-duration: 2100ms;
    animation-fill-mode: forwards;
    animation-iteration-count: infinite;
    animation-name: shimmer;
    animation-timing-function: linear;
    background: linear-gradient(
      -75deg,
      #ffffff00,
      #ffffff00 10%,
      #ffffff99,
      #ffffff00 90%,
      #ffffff00
    );
    background-size: 200% 100%;
    background-repeat: no-repeat;
    background-position: 200% 0;
    background-position: -200% 0;
  }
  overflow: hidden;
  @keyframes shimmer {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
`;

const Card = React.forwardRef<HTMLDivElement, PropsWithChildren<CardProps>>(
  (props, ref) => {
    const {
      collapsible = false,
      title,
      subInfo,
      className,
      defaultOpen = false,
      hoverable,
      shadow = true,
      children,
      loading,
      ...domProps
    } = props;
    const [open, setOpen] = useState(defaultOpen);

    if (loading) {
      let shimmerClassName;
      let shimmerStyle;
      if (typeof loading === "object") {
        shimmerClassName = loading.shimmerClassName;
        shimmerStyle = loading.shimmerStyle;
      }
      return (
        <CardWrapper
          ref={ref}
          className={cs([cardLoading, hoverable && "hoverable", className])}
          {...domProps}
          shadow={shadow}
        >
          <div
            className={cs("shimmerBG", shimmerClassName)}
            style={shimmerStyle}
          />
        </CardWrapper>
      );
    }

    return (
      <CardWrapper
        ref={ref}
        className={cs([hoverable && "hoverable", className])}
        {...domProps}
        shadow={shadow}
      >
        {title && (
          <CardTitle
            className={cs(["card-title", collapsible ? "has-arrow" : ""])}
          >
            <div
              className={cs(["title-wrapper", open ? "is-open" : ""])}
              onClick={() => {
                collapsible && setOpen(!open);
              }}
            >
              {collapsible && (
                <Icon className="collapse-arrow" src={ArrowRightGrayIcon} />
              )}
              {title}
            </div>
            {subInfo && <div className="sub-info">{subInfo}</div>}
          </CardTitle>
        )}
        {(!collapsible || open) && (
          <CardBody className="card-body">{children}</CardBody>
        )}
      </CardWrapper>
    );
  },
);

export default Card;
