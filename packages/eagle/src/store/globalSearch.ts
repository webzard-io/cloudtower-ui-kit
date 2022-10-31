export type GlobalSearchState = {
  resource: string;
  base: string;
  inPage: boolean;
  clearInput: () => void;
};

export enum GloablSearchActions {
  SET_RESOURCE = "SET_RESOURCE",
  SET_BASE = "SET_BASE",
  SET_CLEAR_INPUT = "SET_CLEAR_INPUT",
  SET_IN_PAGE = "SET_IN_PAGE",
}

export type Actions =
  | {
      type: GloablSearchActions.SET_RESOURCE;
      payload: {
        resource: string;
      };
    }
  | {
      type: GloablSearchActions.SET_BASE;
      payload: {
        base: string;
      };
    }
  | {
      type: GloablSearchActions.SET_CLEAR_INPUT;
      payload: {
        cb: GlobalSearchState["clearInput"];
      };
    }
  | { type: GloablSearchActions.SET_IN_PAGE; payload: { boolean: boolean } };

export const initialState: GlobalSearchState = {
  resource: "",
  base: "",
  clearInput: () => {},
  inPage: false,
};

export const globalSearchReducer = (
  state: GlobalSearchState = initialState,
  action: Actions
) => {
  switch (action.type) {
    case GloablSearchActions.SET_RESOURCE:
      return { ...state, resource: action.payload.resource };

    case GloablSearchActions.SET_BASE:
      return { ...state, base: action.payload.base };

    case GloablSearchActions.SET_CLEAR_INPUT:
      return { ...state, clearInput: action.payload.cb };

    case GloablSearchActions.SET_IN_PAGE:
      return { ...state, inPage: action.payload.boolean };

    default:
      return state;
  }
};
