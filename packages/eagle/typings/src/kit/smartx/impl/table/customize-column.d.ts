export declare type CustomizeColumnType = {
    key: string;
    width?: number;
    display: boolean;
};
declare type T = CustomizeColumnType[];
export declare const useCustomizeColumn: (key: string, defaultFieldsValue: T | (() => T)) => [T, (obj: T | ((val: T) => T)) => void, (_key?: string) => void];
export declare function useEqualAllColumnKeys<T>(nextAllColumnKeys: T): T | undefined;
export {};
