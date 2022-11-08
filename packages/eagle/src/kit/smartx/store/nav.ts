import _ from "lodash";

export type NavState = {
  resource?: string;
  view?: string;
};

export const enum NavActions {
  SET_RESOURCE_AND_VIEW = "SET_RESOURCE_AND_VIEW",
  REMOVE_RESOURCE_AND_VIEW = "REMOVE_RESOURCE_AND_VIEW",
}

export type Actions =
  | {
      type: NavActions.SET_RESOURCE_AND_VIEW;
      payload: {
        resource: string;
        view?: string;
      };
    }
  | {
      type: NavActions.REMOVE_RESOURCE_AND_VIEW;
    };

export const initialNavState: NavState = {};

export const navReducer = (
  state: NavState = initialNavState,
  action: Actions
) => {
  switch (action.type) {
    case NavActions.SET_RESOURCE_AND_VIEW: {
      const { resource, view } = action.payload;
      return resource === state.resource && view === state.view
        ? state
        : { resource: action.payload.resource, view: action.payload.view };
    }
    case NavActions.REMOVE_RESOURCE_AND_VIEW:
      return _.isEmpty(state) ? state : {};
    default:
      return state;
  }
};
