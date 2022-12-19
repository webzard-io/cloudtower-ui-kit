export type TableState = {
  [key: string]: {
    selectRows?: { id: string }[];
    rows: { id: string }[];
    query?: {
      where?: unknown;
      orderBy?: unknown;
    };
  };
};

export enum TableActions {
  SET_ROWS_SELECTION = "SET_ROWS_SELECTION",
  REMOVE_ROW_SELECTION = "REMOVE_ROW_SELECTION",
  SET_RESOURCE_DATA = "SET_RESOURCE_DATA",
  SET_RESOURCE_QUERY = "SET_RESOURCE_QUERY",
}

export type Actions =
  | {
      type: TableActions.SET_ROWS_SELECTION;
      payload: {
        resource: string;
        rows: { id: string }[];
      };
    }
  | {
      type: TableActions.REMOVE_ROW_SELECTION;
      payload: { resource: string; id: string };
    }
  | {
      type: TableActions.SET_RESOURCE_DATA;
      payload: {
        resource: string;
        rows: { id: string }[];
      };
    }
  | {
      type: TableActions.SET_RESOURCE_QUERY;
      payload: {
        resource: string;
        query: {
          where?: unknown;
          orderBy?: unknown;
        };
      };
    };

export const initialTableState: TableState = {};

export const tableReducer = (
  state: TableState = initialTableState,
  action: Actions
) => {
  switch (action.type) {
    case TableActions.SET_ROWS_SELECTION: {
      const { resource, rows } = action.payload;
      return {
        ...state,
        [resource]: {
          ...state[resource],
          selectRows: rows,
        },
      };
    }

    case TableActions.REMOVE_ROW_SELECTION: {
      const { resource, id } = action.payload;
      return {
        ...state,
        [resource]: {
          ...state[resource],
          selectRows: state[resource].selectRows?.filter((r) => r.id !== id),
        },
      };
    }

    case TableActions.SET_RESOURCE_DATA: {
      const { resource, rows } = action.payload;
      return {
        ...state,
        [resource]: {
          ...state[resource],
          rows,
        },
      };
    }

    case TableActions.SET_RESOURCE_QUERY: {
      const { resource, query } = action.payload;
      return {
        ...state,
        [resource]: {
          ...state[resource],
          query,
        },
      };
    }

    default:
      return state;
  }
};
