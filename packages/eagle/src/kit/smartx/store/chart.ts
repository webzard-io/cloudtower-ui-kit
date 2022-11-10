type Pointer = {
  visible: boolean;
  left?: number;
  text?: string;
  value?: number;
};

export type ChartState = {
  pointers: Partial<Record<string, Pointer>>;
  resourceData: Partial<Record<string, { id: string; name: string }[]>>;
  averageData: Partial<Record<string, number>>;
};

export enum ChartActions {
  SET_POINTER = "SET_POINTER",
  SET_RESOURCE_DATA = "SET_RESOURCE_DATA",
  SET_AVERAGE_DATA = "SET_AVERAGE_DATA",
}

export type Actions =
  | {
      type: ChartActions.SET_POINTER;
      payload: { uuid: string } & Pointer;
    }
  | {
      type: ChartActions.SET_RESOURCE_DATA;
      payload: { data: ChartState["resourceData"]; uuid: string };
    }
  | {
      type: ChartActions.SET_AVERAGE_DATA;
      payload: { average: number; uuid: string };
    };

export const initialChartState: ChartState = {
  pointers: {},
  resourceData: {},
  averageData: {},
};

export const chartReducer = (
  state: ChartState = initialChartState,
  action: Actions
) => {
  switch (action.type) {
    case ChartActions.SET_POINTER: {
      const { uuid, left, text, visible, value } = action.payload;
      return {
        ...state,
        pointers: {
          ...state.pointers,
          [uuid]: {
            left,
            text,
            visible,
            value,
          },
        },
      };
    }
    case ChartActions.SET_RESOURCE_DATA: {
      const { uuid, data } = action.payload;
      return {
        ...state,
        resourceData: {
          ...state.resourceData,
          [uuid]: data,
        } as ChartState["resourceData"],
      };
    }

    case ChartActions.SET_AVERAGE_DATA: {
      const { uuid, average } = action.payload;
      return {
        ...state,
        averageData: {
          ...state.averageData,
          [uuid]: average,
        },
      };
    }

    default: {
      return state;
    }
  }
};
