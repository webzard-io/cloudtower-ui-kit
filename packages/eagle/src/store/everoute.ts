export type EverouteState = {
  uploadEveroutePackageId?: string;
  deployEverouteClusterId?: string;
};

export enum EverouteActions {
  SET_UPLOAD_EVEROUTE_PACKAGE_TASK_ID = "SET_UPLOAD_EVEROUTE_PACKAGE_TASK_ID",
  SET_DEPLOY_EVEROUTE_CLUSTER_ID = "SET_DEPLOY_EVEROUTE_CLUSTER_ID",
}

export type Actions =
  | {
      type: EverouteActions.SET_UPLOAD_EVEROUTE_PACKAGE_TASK_ID;
      payload: {
        id?: string;
      };
    }
  | {
      type: EverouteActions.SET_DEPLOY_EVEROUTE_CLUSTER_ID;
      payload: {
        id?: string;
      };
    };

export const initialState: EverouteState = {};

export const everouteReducer = (
  state: EverouteState = initialState,
  action: Actions
): EverouteState => {
  switch (action.type) {
    case EverouteActions.SET_UPLOAD_EVEROUTE_PACKAGE_TASK_ID:
      return { ...state, uploadEveroutePackageId: action.payload.id };

    case EverouteActions.SET_DEPLOY_EVEROUTE_CLUSTER_ID:
      return { ...state, deployEverouteClusterId: action.payload.id };

    default:
      return state;
  }
};
