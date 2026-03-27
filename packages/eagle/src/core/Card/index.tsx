import { ArrowRightGrayIcon } from "@cloudtower/icons-react";
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
  /**
   * 用于测试的标识符，会传递到卡片根容器元素。
   */
  "data-testid"?: string;
} & React.DOMAttributes<HTMLDivElement>;

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
      "data-testid": dataTestId,
      ...domProps
    } = props;
    const [open, setOpen] = useState(defaultOpen);

    return (
      <CardWrapper
        ref={ref}
        className={cs(["card-wrapper", className, hoverable && "hoverable"])}
        {...domProps}
        shadow={shadow}
        data-testid={dataTestId}
      >
        {title && (
          <CardTitle
            className={cs(["card-title", collapsible ? "has-arrow" : ""])}
          >
            <div
              className={cs(["title-wrapper", open ? "is-open" : ""])}
              data-testid={
                dataTestId && collapsible ? `${dataTestId}-header` : undefined
              }
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
    );
  },
);

export default Card;
