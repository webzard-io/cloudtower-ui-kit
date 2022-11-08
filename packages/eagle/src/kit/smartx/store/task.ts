import { TaskSubscription } from "@cloudtower/eagle/generated/react-hooks";

export type Node = Omit<
  Exclude<TaskSubscription["task"]["node"], null | undefined>,
  "__typename"
>;

export type TaskState = {
  executing: Node[];
  failed: Node[];
};

export enum TaskActions {
  SET_EXECUTING_TASK = "SET_EXECUTING_TASK",
  ADD_EXECUTING_TASK = "ADD_EXECUTING_TASK",
  UPDATE_EXECUTING_TASK = "UPDATE_EXECUTING_TASK",
  REMOVE_EXECUTING_TASK = "REMOVE_EXECUTING_TASK",
  ADD_FAILED_TASK = "ADD_FAILED_TASK",
  REMOVE_ALL_FAILED_TASK = "REMOVE_ALL_FAILED_TASK",
}

export type Actions =
  | {
      type: TaskActions.SET_EXECUTING_TASK;
      payload: {
        nodes: Node[];
      };
    }
  | {
      type: TaskActions.ADD_EXECUTING_TASK;
      payload: {
        node: Node;
      };
    }
  | {
      type: TaskActions.REMOVE_EXECUTING_TASK;
      payload: {
        id: string;
      };
    }
  | {
      type: TaskActions.UPDATE_EXECUTING_TASK;
      payload: {
        node: Node;
      };
    }
  | {
      type: TaskActions.ADD_FAILED_TASK;
      payload: { node: Node };
    }
  | { type: TaskActions.REMOVE_ALL_FAILED_TASK };

export const initialTaskState: TaskState = {
  executing: [],
  failed: [],
};

export const taskReducer = (
  state: TaskState = initialTaskState,
  action: Actions
) => {
  switch (action.type) {
    case TaskActions.SET_EXECUTING_TASK:
      return { ...state, executing: action.payload.nodes };

    case TaskActions.ADD_EXECUTING_TASK:
      return { ...state, executing: [action.payload.node, ...state.executing] };

    case TaskActions.UPDATE_EXECUTING_TASK:
      return {
        ...state,
        executing: state.executing.map((task) =>
          task.id === action.payload.node.id ? action.payload.node : task
        ),
      };

    case TaskActions.REMOVE_EXECUTING_TASK:
      return {
        ...state,
        executing: state.executing.filter(
          (task) => task.id !== action.payload.id
        ),
      };

    case TaskActions.ADD_FAILED_TASK: {
      // TODO: taskSubscription will push two task when the task failed
      const failExisted = state.failed.find(
        (task) => task.id === action.payload.node.id
      );
      return failExisted
        ? state
        : { ...state, failed: [...state.failed, action.payload.node] };
    }
    case TaskActions.REMOVE_ALL_FAILED_TASK: {
      return { ...state, failed: [] };
    }

    default:
      return state;
  }
};
