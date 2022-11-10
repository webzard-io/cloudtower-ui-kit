declare type Pointer = {
    visible: boolean;
    left?: number;
    text?: string;
    value?: number;
};
export declare type ChartState = {
    pointers: Partial<Record<string, Pointer>>;
    resourceData: Partial<Record<string, {
        id: string;
        name: string;
    }[]>>;
    averageData: Partial<Record<string, number>>;
};
export declare enum ChartActions {
    SET_POINTER = "SET_POINTER",
    SET_RESOURCE_DATA = "SET_RESOURCE_DATA",
    SET_AVERAGE_DATA = "SET_AVERAGE_DATA"
}
export declare type Actions = {
    type: ChartActions.SET_POINTER;
    payload: {
        uuid: string;
    } & Pointer;
} | {
    type: ChartActions.SET_RESOURCE_DATA;
    payload: {
        data: ChartState["resourceData"];
        uuid: string;
    };
} | {
    type: ChartActions.SET_AVERAGE_DATA;
    payload: {
        average: number;
        uuid: string;
    };
};
export declare const initialChartState: ChartState;
export declare const chartReducer: (state: ChartState | undefined, action: Actions) => ChartState;
export {};
