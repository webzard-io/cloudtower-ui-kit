import { Serializable, SerializableObject } from "@tower/utils";
import { useCallback, useEffect, useRef, useState } from "react";

import { UserSource } from "../spec";
import { GlobalSearchHistory, PastTime } from "../utils";
import { getValue } from "./utils";

type SetValue<T> = (obj: T | ((val: T) => T)) => void;

export enum SupportLanguage {
  zh = "zh-CN",
  en = "en-US",
}

interface CustomStorageEvent<T> extends Event {
  key?: string;
  value?: T;
}

export const dispatchStorageEvent = <T extends Serializable>(
  key: string,
  value: T
) => {
  const storageEvent: CustomStorageEvent<Serializable> = new Event(
    "storageChange"
  );
  storageEvent.key = key;
  storageEvent.value = value;
  document.dispatchEvent(storageEvent);
};

type LocalStorageUser =
  | { id: string; username: string; name: string; source: UserSource }
  | undefined;

type CustomizeColumnType = {
  key: string;
  width?: number;
  display: boolean;
};

export type LocalStorage = {
  topo: {
    datacenter: boolean;
    cluster: boolean;
    host: boolean;
    folder: boolean;
    showCount: boolean;
    hostOrFolderRef: "host" | "folder";
  };
  newTopo: { showCount: boolean; hostOrFolderRef: "host" | "folder" };
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
    [key: string]:
      | {
          type: "relative" | "absolute";
          timestamp: number;
          value: PastTime | string[];
        }[]
      | undefined
      | null;
  };
};

const localStorageVersions: Record<keyof LocalStorage, number> = {
  topo: 1,
  newTopo: 1,
  topoExpand: 1,
  token: 1,
  "table-customize-column": 11,
  "search-history": 4,
  "global-search-history": 3,
  language: 1,
  user: 1,
  "nav-menu": 1,
  reporter: 1,
  "favorite-tabs": 1,
  everoute: 1,
  // for unit testing
  "test-local-storage": 2,
  "topo-scalable-width": 1,
  backup: 1,
  alpha: 1,
  "date-range-picker": 1,
};

export default function useLocalStorage<K extends keyof LocalStorage>(
  key: K,
  defaultValue: LocalStorage[K] | (() => LocalStorage[K])
): [LocalStorage[K], SetValue<LocalStorage[K]>, () => void] {
  const versions = localStorageVersions[key];

  const [value, setValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (!item) return getValue(defaultValue);
      let localItem;
      try {
        localItem = JSON.parse(item);
      } catch {
        // ignore
      }

      if (!localItem?.versions || versions > localItem?.versions) {
        const nextValue = getValue(defaultValue);

        window.localStorage.setItem(
          key,
          JSON.stringify({ value: nextValue, versions })
        );
        return nextValue;
      } else {
        return localItem.value;
      }
    } catch (error) {
      return getValue(defaultValue);
    }
  });

  const onStorageChange = useCallback(
    (e: CustomStorageEvent<LocalStorage[K]>) => {
      if (e.key === key) {
        setValue(e.value as LocalStorage[K]);
      }
    },
    [key]
  );

  const storageListener = useCallback((e: StorageEvent) => {
    if (!e.key) {
      return;
    }
    if (e.newValue) {
      try {
        if (localStorage.getItem(e.key) === e.newValue) {
          return;
        }
        const newValue = JSON.parse(e.newValue).value;
        dispatchStorageEvent(e.key, newValue);
      } catch (error) {
        if (process.env.NODE_ENV === "development") {
          console.error("json parse failed", error);
        }
      }
    } else {
      dispatchStorageEvent(e.key, null);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("storageChange", onStorageChange);
    window.addEventListener("storage", storageListener);
    return () => {
      document.removeEventListener("storageChange", onStorageChange);
      window.removeEventListener("storage", storageListener);
    };
  }, [onStorageChange, storageListener]);

  const valueRef = useRef(value);
  valueRef.current = value;
  const _setValue = useCallback(
    (val: LocalStorage[K] | ((val: LocalStorage[K]) => LocalStorage[K])) => {
      const nextValue = getValue(val, valueRef.current);

      window.localStorage.setItem(
        key,
        JSON.stringify({ value: nextValue, versions })
      );
      // NOTE: This event should be fired after the line above. The order does matter, for unknown reason!
      dispatchStorageEvent(key, nextValue);
    },
    [key, versions]
  );

  const removeLocalStorage = () => {
    dispatchStorageEvent(key, null);
    window.localStorage.removeItem(key);
  };

  return [value, _setValue, removeLocalStorage];
}
