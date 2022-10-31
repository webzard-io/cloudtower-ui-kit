import { Serializable } from "@tower/utils";
export declare const getSearch: <T extends Serializable>(searchString: string, defaultValue: T) => T;
export declare function getValue<T extends Serializable>(val: T | Function, params?: T): T;
