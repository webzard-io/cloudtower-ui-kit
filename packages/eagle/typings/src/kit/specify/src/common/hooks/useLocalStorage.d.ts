import { SupportLanguage } from "@tower/i18n";
import { Serializable, SerializableObject } from "@tower/utils";
import { UserSource } from "../../../../../generated/react-hooks";
import { GlobalSearchHistory, PastTime } from "../types";
declare type SetValue<T> = (obj: T | ((val: T) => T)) => void;
export declare const dispatchStorageEvent: <T extends Serializable>(key: string, value: T) => void;
declare type LocalStorageUser = {
    id: string;
    username: string;
    name: string;
    source: UserSource;
} | undefined;
declare type CustomizeColumnType = {
    key: string;
    width?: number;
    display: boolean;
};
export declare type LocalStorage = {
    topo: {
        datacenter: boolean;
        cluster: boolean;
        host: boolean;
        folder: boolean;
        showCount: boolean;
        hostOrFolderRef: "host" | "folder";
    };
    newTopo: {
        showCount: boolean;
        hostOrFolderRef: "host" | "folder";
    };
    topoExpand: Record<string, boolean>;
    token: string;
    "table-customize-column": Record<string, CustomizeColumnType[]>;
    "test-local-storage": string;
    "search-history": Record<string, SerializableObject[]>;
    "global-search-history": GlobalSearchHistory;
    language: SupportLanguage;
    user: LocalStorageUser;
    "nav-menu": Record<string, string>;
    reporter: Record<string, string[]>;
    "favorite-tabs": Record<string, string[]>;
    "topo-scalable-width": Record<string, number>;
    everoute: boolean;
    backup: boolean;
    alpha: {
        right: string;
        bottom: string;
    };
    "date-range-picker": {
        [key: string]: {
            type: "relative" | "absolute";
            timestamp: number;
            value: PastTime | string[];
        }[] | undefined | null;
    };
};
export default function useLocalStorage<K extends keyof LocalStorage>(key: K, defaultValue: LocalStorage[K] | (() => LocalStorage[K])): [LocalStorage[K], SetValue<LocalStorage[K]>, () => void];
export {};
