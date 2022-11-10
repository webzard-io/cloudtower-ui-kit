/// <reference types="react" />
import { EntityAsyncStatus, Maybe } from "@cloudtower/eagle/generated/react-hooks";
export declare const CreatingSelectDropdownStyle: import("@linaria/core").LinariaClassName;
export declare function CreateResourceDropdownRender<T extends {
    id: string;
    entityAsyncStatus?: Maybe<EntityAsyncStatus>;
}>(props: {
    onCreate: (name: string) => Promise<{
        data?: T;
        error?: string;
    }>;
    isAsync?: boolean;
    onCreatingChange?: (creating: boolean, data?: T) => void;
    placeholder?: string;
}): JSX.Element;
