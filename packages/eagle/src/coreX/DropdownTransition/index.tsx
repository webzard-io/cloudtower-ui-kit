import React from "react";
import { CSSTransition } from "react-transition-group";

const DropdownTransition: React.FC<
  {
    visible: boolean;
  } & CSSTransition["props"]
> = (props) => {
  const {
    visible,
    timeout,
    children,
    mountOnEnter = true,
    unmountOnExit = true,
    ...restProps
  } = props;

  return (
    <CSSTransition
      in={visible}
      timeout={timeout || 200}
      mountOnEnter={mountOnEnter}
      unmountOnExit={unmountOnExit}
      onEnter={(el) => {
        el.style.height = `${el.scrollHeight}px`;
      }}
      onEntered={(el) => {
        el.removeAttribute("style");
      }}
      onExit={(el) => {
        el.style.height = `${el.offsetHeight}px`;
      }}
      onExiting={(el) => {
        el.style.height = "0px";
      }}
      {...restProps}
    >
      {children}
    </CSSTransition>
  );
};

export default DropdownTransition;
