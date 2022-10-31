export declare type NavState = {
    resource?: string;
    view?: string;
};
export declare enum NavActions {
    SET_RESOURCE_AND_VIEW = "SET_RESOURCE_AND_VIEW",
    REMOVE_RESOURCE_AND_VIEW = "REMOVE_RESOURCE_AND_VIEW"
}
export declare type Actions = {
    type: NavActions.SET_RESOURCE_AND_VIEW;
    payload: {
        resource: string;
        view?: string;
    };
} | {
    type: NavActions.REMOVE_RESOURCE_AND_VIEW;
};
export declare const initialNavState: NavState;
export declare const navReducer: (state: NavState | undefined, action: Actions) => NavState;
