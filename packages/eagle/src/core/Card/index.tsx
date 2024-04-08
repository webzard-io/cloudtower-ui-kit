import { ArrowRightGrayIcon } from "@cloudtower/icons-react";
import { css } from "@linaria/core";
import CardBody from "@src/core/Card/CardBody";
import CardTitle from "@src/core/Card/CardTitle";
import CardWrapper from "@src/core/Card/CardWrapper";
import Icon from "@src/core/Icon";
import cs from "classnames";
import React, { PropsWithChildren, useState } from "react";
export type CardProps = {
  collapsible?: boolean;
  defaultOpen?: boolean;
  title?: React.ReactNode | string;
  subInfo?: React.ReactNode;
  className?: string;
  hoverable?: boolean;
  // default to true
  shadow?: boolean;
} & React.DOMAttributes<HTMLDivElement>;

const CardBasic = css`
  height: 100%;
`;

const HoverableStyle = css`
  cursor: pointer;

  &:hover > div {
    transition: all 200ms ease;
    box-shadow:
      0px 9px 22px rgb(107 125 153 / 23%),
      0px 1.12694px 2.75474px rgb(107 125 153 / 12%);
    transform: translateY(-4px);
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
      ...domProps
    } = props;
    const [open, setOpen] = useState(defaultOpen);

    return (
      <div
        className={cs(
          {
            [HoverableStyle]: hoverable,
          },
          CardBasic,
        )}
      >
        <CardWrapper
          ref={ref}
          className={cs(["card-wrapper", className])}
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
            <CardBody className="card-body">{props.children}</CardBody>
          )}
        </CardWrapper>
      </div>
    );
  },
);

export default Card;
