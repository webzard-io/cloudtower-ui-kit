export declare type GlobalSearchState = {
    resource: string;
    base: string;
    inPage: boolean;
    clearInput: () => void;
};
export declare enum GloablSearchActions {
    SET_RESOURCE = "SET_RESOURCE",
    SET_BASE = "SET_BASE",
    SET_CLEAR_INPUT = "SET_CLEAR_INPUT",
    SET_IN_PAGE = "SET_IN_PAGE"
}
export declare type Actions = {
    type: GloablSearchActions.SET_RESOURCE;
    payload: {
        resource: string;
    };
} | {
    type: GloablSearchActions.SET_BASE;
    payload: {
        base: string;
    };
} | {
    type: GloablSearchActions.SET_CLEAR_INPUT;
    payload: {
        cb: GlobalSearchState["clearInput"];
    };
} | {
    type: GloablSearchActions.SET_IN_PAGE;
    payload: {
        boolean: boolean;
    };
};
export declare const initialGlobalSearchState: GlobalSearchState;
export declare const globalSearchReducer: (state: GlobalSearchState | undefined, action: Actions) => GlobalSearchState;
