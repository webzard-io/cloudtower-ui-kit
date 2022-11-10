export declare type Resources = string;
export declare type TableState = {
    [key: string]: {
        selectRows?: {
            id: string;
        }[];
        rows: {
            id: string;
        }[];
        query?: {
            where?: unknown;
            orderBy?: unknown;
        };
    };
};
export declare enum TableActions {
    SET_ROWS_SELECTION = "SET_ROWS_SELECTION",
    REMOVE_ROW_SELECTION = "REMOVE_ROW_SELECTION",
    SET_RESOURCE_DATA = "SET_RESOURCE_DATA",
    SET_RESOURCE_QUERY = "SET_RESOURCE_QUERY"
}
export declare type Actions = {
    type: TableActions.SET_ROWS_SELECTION;
    payload: {
        resource: Resources;
        rows: {
            id: string;
        }[];
    };
} | {
    type: TableActions.REMOVE_ROW_SELECTION;
    payload: {
        resource: Resources;
        id: string;
    };
} | {
    type: TableActions.SET_RESOURCE_DATA;
    payload: {
        resource: Resources;
        rows: {
            id: string;
        }[];
    };
} | {
    type: TableActions.SET_RESOURCE_QUERY;
    payload: {
        resource: Resources;
        query: {
            where?: unknown;
            orderBy?: unknown;
        };
    };
};
export declare const initialTableState: TableState;
export declare const tableReducer: (state: TableState | undefined, action: Actions) => TableState;
