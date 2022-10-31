import { Serializable } from "@tower/utils";
export declare type SearchOperation = {
    pick?: string | string[];
    omit?: string | string[];
    preventRender?: boolean;
    control?: "push" | "replace";
};
export declare type SetSearch<T> = (val: T | ((val: T) => T), operation?: SearchOperation) => void;
declare const useSearch: <T extends Serializable>(key: string, defaultValue: T, option?: {
    preventRender?: boolean;
}) => [T, SetSearch<T>];
export default useSearch;
