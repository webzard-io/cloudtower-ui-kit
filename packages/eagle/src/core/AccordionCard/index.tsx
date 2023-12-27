import { XmarkRemove24SecondaryIcon } from "@cloudtower/icons-react";
import { styled } from "@linaria/react";
import cs from "classnames";
import React, { useState } from "react";

import Icon from "../../components/Icon";
import DropdownTransition from "../../coreX/DropdownTransition";

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

const AccordionCard: React.FC<{
  header: React.ReactNode | ((active: boolean) => React.ReactNode);
  expand: React.ReactNode;
  className?: string;
  defaultExpand?: boolean;
  mountOnEnter?: boolean;
  unmountOnExit?: boolean;
}> & { CloseButton: React.FC<CloseButtonProps> } = (props) => {
  const {
    header,
    expand,
    className,
    defaultExpand = true,
    mountOnEnter,
    unmountOnExit,
  } = props;
  const [active, setActive] = useState(defaultExpand);

  return (
    <Card className={cs(active && "active", className)}>
      <header onClick={() => setActive(!active)} className="show-close">
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
