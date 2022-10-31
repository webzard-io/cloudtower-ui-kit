import { PreviewTasksQuery, TaskTableQuery } from "@cloudtower/eagle/generated/react-hooks";
import { TOptions } from "i18next";
import { UseTranslationResponse } from "react-i18next";
import { Node } from "../../store/task";
export declare const UNSAFE_EXTRACT_ERROR_REG: RegExp;
export declare function trimRegExpStr(regExpStr: string): string;
export declare function extractHostnameBySvtServiceErrorMsg(code: string, msg: string): string | undefined;
export declare function tryToExtractError(error_code: string | null | undefined, msg: string | null | undefined, i18n: UseTranslationResponse["i18n"]): {
    msg: string;
    key?: string;
    options?: TOptions;
};
export declare const getTaskStartedAndFinished: (node: Pick<TaskTableQuery["tasks"][0], "id" | "started_at" | "status" | "cluster">) => {
    started_at: string;
    finished_at: string;
    cluster: TaskTableQuery["tasks"][0]["cluster"];
} | Pick<{
    __typename?: "Task" | undefined;
} & Pick<import("@cloudtower/eagle/generated/react-hooks").Task, "id" | "status" | "internal" | "description" | "local_created_at" | "args" | "error_code" | "error_message" | "finished_at" | "progress" | "resource_mutation" | "snapshot" | "started_at"> & {
    steps: ({
        __typename?: "Step" | undefined;
    } & Pick<import("@cloudtower/eagle/generated/react-hooks").Step, "key" | "finished" | "current" | "per_second" | "total">)[];
    cluster?: import("@cloudtower/eagle/generated/react-hooks").Maybe<{
        __typename?: "Cluster" | undefined;
    } & Pick<import("@cloudtower/eagle/generated/react-hooks").Cluster, "name" | "id" | "architecture" | "type" | "version">>;
    user?: import("@cloudtower/eagle/generated/react-hooks").Maybe<{
        __typename?: "User" | undefined;
    } & Pick<import("@cloudtower/eagle/generated/react-hooks").User, "name" | "id">>;
}, "id" | "cluster" | "status" | "started_at">;
export declare const isMigrationCompleted: (task: Pick<PreviewTasksQuery["tasks"][0], "steps" | "args">) => boolean;
export declare function useFilterExecutingTask(filter?: (task: Node, index: number, array: Node[]) => unknown): Node[];
export declare const parseErrorString: (errorString: string | undefined, i18n: UseTranslationResponse["i18n"]) => string;
