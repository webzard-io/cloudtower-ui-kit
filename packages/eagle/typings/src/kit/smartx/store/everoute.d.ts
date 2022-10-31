export declare type EverouteState = {
    uploadEveroutePackageId?: string;
    deployEverouteClusterId?: string;
};
export declare enum EverouteActions {
    SET_UPLOAD_EVEROUTE_PACKAGE_TASK_ID = "SET_UPLOAD_EVEROUTE_PACKAGE_TASK_ID",
    SET_DEPLOY_EVEROUTE_CLUSTER_ID = "SET_DEPLOY_EVEROUTE_CLUSTER_ID"
}
export declare type Actions = {
    type: EverouteActions.SET_UPLOAD_EVEROUTE_PACKAGE_TASK_ID;
    payload: {
        id?: string;
    };
} | {
    type: EverouteActions.SET_DEPLOY_EVEROUTE_CLUSTER_ID;
    payload: {
        id?: string;
    };
};
export declare const initialEverouteState: EverouteState;
export declare const everouteReducer: (state: EverouteState | undefined, action: Actions) => EverouteState;
