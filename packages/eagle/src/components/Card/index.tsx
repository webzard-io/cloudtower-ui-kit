import { ChevronRightOn16TertiaryBoldIcon } from "@cloudtower/icons-react";
import cs from "classnames";
import React, { PropsWithChildren, useState } from "react";

import Icon from "../Icon";
import CardBody from "./CardBody";
import CardTitle from "./CardTitle";
import CardWrapper from "./CardWrapper";

export interface ICardProps {
  collapsible?: boolean;
  defaultOpen?: boolean;
  title?: React.ReactNode | string;
  subInfo?: React.ReactNode;
  className?: string;
  // default to true
  shadow?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, PropsWithChildren<ICardProps>>(
  (props, ref) => {
    const {
      collapsible = false,
      title,
      subInfo,
      className,
      defaultOpen = false,
      shadow = true,
      ...domProps
    } = props;
    const [open, setOpen] = useState(defaultOpen);

    return (
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
                <Icon
                  className="collapse-arrow"
                  src={ChevronRightOn16TertiaryBoldIcon}
                />
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
