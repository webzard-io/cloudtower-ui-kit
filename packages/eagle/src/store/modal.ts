import React from "react";

export type CloseCb = { onClose: () => void; modalId: number };

export type ModalType<TProps> = TProps extends void
  ? {
      component: React.FC<TProps & CloseCb>;
    }
  : {
      component: React.FC<TProps & CloseCb>;
      props: TProps & {
        onClose?: () => void;
      };
    };

export type ModalState = {
  stack: Array<ModalType<unknown> & { id: number }>;
  closeId: number;
};

export enum ModalActions {
  PUSH_MODAL = "PUSH_MODAL",
  POP_MODAL = "POP_MODAL",
  REMOVE_MODAL = "REMOVE_MODAL",
  CLOSE_MODAL = "CLOSE_MODAL",
  RESET_MODAL = "RESET_MODAL",
}

type PUSH_MODAL<TProps> = {
  type: ModalActions.PUSH_MODAL;
  payload: ModalType<TProps>;
};

type POP_MODAL = {
  type: ModalActions.POP_MODAL;
};

type REMOVE_MODAL = {
  type: ModalActions.REMOVE_MODAL;
  id: number;
};

type CLOSE_MODAL = {
  type: ModalActions.CLOSE_MODAL;
  id: number;
};

type RESET_MODAL = {
  type: ModalActions.RESET_MODAL;
};

export type Actions =
  | PUSH_MODAL<unknown>
  | POP_MODAL
  | REMOVE_MODAL
  | CLOSE_MODAL
  | RESET_MODAL;

export const initialModalState: ModalState = {
  stack: [],
  closeId: 0,
};

let MODAL_ID = 1;

export const modalReducer = (
  state: ModalState = initialModalState,
  action: Actions,
) => {
  switch (action.type) {
    case ModalActions.PUSH_MODAL:
      if (
        state.stack.some(
          (modal) => modal.component === action.payload.component,
        )
      ) {
        return state;
      }
      return {
        ...state,
        stack: state.stack.concat({
          ...action.payload,
          id: MODAL_ID++,
        }),
      };
    case ModalActions.POP_MODAL:
      return {
        ...state,
        stack: state.stack.slice(0, -1),
      };
    case ModalActions.REMOVE_MODAL:
      return {
        ...state,
        closeId: 0,
        stack: state.stack.filter((m) => m.id !== action.id),
      };
    case ModalActions.CLOSE_MODAL:
      return {
        ...state,
        closeId: action.id,
      };
    case ModalActions.RESET_MODAL:
      return initialModalState;
    default:
      return state;
  }
};

export interface IModalProps {
  [key: string]: Partial<{
    [key: string]: unknown;
  }>;
}

export type GetModalProps<K extends keyof IModalProps> = IModalProps[K] &
  CloseCb;
