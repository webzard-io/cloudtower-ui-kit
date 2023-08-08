import "antd";
import React from "react";
import { ReactReduxContextValue } from "react-redux";
import { Actions, KitRootState } from "./store";
declare module "antd/lib/modal" {
  export interface ModalProps {
    focusTriggerAfterClose?: boolean;
  }
}

declare global {
  interface Window {
    EagleReduxContext?: React.Context<
      React.Context<ReactReduxContextValue<KitRootState, Actions>>
    >;
  }
}
