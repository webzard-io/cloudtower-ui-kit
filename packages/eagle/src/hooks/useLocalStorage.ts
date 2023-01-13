import { Serializable } from "@tower/utils";
import { useCallback, useEffect, useRef, useState } from "react";

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

export type CustomizeColumnType = {
  key: string;
  width?: number;
  display?: boolean;
};

export const localStorageVersions = {
  "table-customize-column": 11,
  "test-local-storage": 2,
};

export default function useLocalStorage<V extends Serializable>(
  key: string,
  versions: number,
  defaultValue: V | (() => V)
): [V, SetValue<V>, () => void] {
  const [value, setValue] = useState<V>(() => {
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
    (e: CustomStorageEvent<V>) => {
      if (e.key === key) {
        setValue(e.value as V);
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
    (val: V | ((val: V) => V)) => {
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
