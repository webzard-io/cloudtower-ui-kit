import { XmarkRemove24SecondaryIcon } from "@cloudtower/icons-react";
import { styled } from "@linaria/react";
import Icon from "@src/core/Icon";
import cs from "classnames";
import React, { useState } from "react";

import DropdownTransition from "../../coreX/DropdownTransition";
import { IAccordionCardProps } from "./accordionCard.type";

const Card = styled.div`
  border: 1px solid $gray-40;
  border-radius: 4px;

  & + & {
    margin-top: 8px;
  }

  &:hover {
    border-color: $blue-60;

    > header {
      background: rgba($blue-60, 0.1);
    }
  }

  &.active {
    header {
      border-bottom: 1px solid $gray-40;
    }
  }

  > header {
    padding: 8px 12px;
  }
`;

export type CloseButtonProps = {
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
};

const CloseButton: React.FC<CloseButtonProps> = (props) => {
  const { className, onClick } = props;
  return (
    <Icon
      src={XmarkRemove24SecondaryIcon}
      iconHeight={24}
      iconWidth={24}
      className={className}
      onClick={(e) => {
        e.stopPropagation();
        onClick?.(e);
      }}
    />
  );
};

const AccordionCard: React.FC<IAccordionCardProps> & {
  CloseButton: React.FC<CloseButtonProps>;
} = (props) => {
  const {
    header,
    expand,
    className,
    defaultExpand = true,
    mountOnEnter,
    unmountOnExit,
    "data-testid": dataTestId,
  } = props;
  const [active, setActive] = useState(defaultExpand);

  return (
    <Card
      data-testid={dataTestId}
      className={cs(active && "active", className)}
    >
      <header
        data-testid={dataTestId ? `${dataTestId}-header` : undefined}
        onClick={() => setActive(!active)}
        className="show-close"
      >
        {typeof header === "function" ? header(active) : header}
      </header>

      <DropdownTransition
        visible={active}
        timeout={200}
        classNames="topo-dropdown"
        mountOnEnter={mountOnEnter}
        unmountOnExit={unmountOnExit}
      >
        <div className="expand">{expand}</div>
      </DropdownTransition>
    </Card>
  );
};

AccordionCard.CloseButton = CloseButton;

export default AccordionCard;

export * from "./accordionCard.type";
