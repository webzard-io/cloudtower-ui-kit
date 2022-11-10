import { TaskSubscription } from "@cloudtower/eagle/generated/react-hooks";
export declare type Node = Omit<Exclude<TaskSubscription["task"]["node"], null | undefined>, "__typename">;
export declare type TaskState = {
    executing: Node[];
    failed: Node[];
};
export declare enum TaskActions {
    SET_EXECUTING_TASK = "SET_EXECUTING_TASK",
    ADD_EXECUTING_TASK = "ADD_EXECUTING_TASK",
    UPDATE_EXECUTING_TASK = "UPDATE_EXECUTING_TASK",
    REMOVE_EXECUTING_TASK = "REMOVE_EXECUTING_TASK",
    ADD_FAILED_TASK = "ADD_FAILED_TASK",
    REMOVE_ALL_FAILED_TASK = "REMOVE_ALL_FAILED_TASK"
}
export declare type Actions = {
    type: TaskActions.SET_EXECUTING_TASK;
    payload: {
        nodes: Node[];
    };
} | {
    type: TaskActions.ADD_EXECUTING_TASK;
    payload: {
        node: Node;
    };
} | {
    type: TaskActions.REMOVE_EXECUTING_TASK;
    payload: {
        id: string;
    };
} | {
    type: TaskActions.UPDATE_EXECUTING_TASK;
    payload: {
        node: Node;
    };
} | {
    type: TaskActions.ADD_FAILED_TASK;
    payload: {
        node: Node;
    };
} | {
    type: TaskActions.REMOVE_ALL_FAILED_TASK;
};
export declare const initialTaskState: TaskState;
export declare const taskReducer: (state: TaskState | undefined, action: Actions) => TaskState;
