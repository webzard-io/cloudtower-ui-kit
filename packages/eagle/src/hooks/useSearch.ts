import { Serializable } from "@tower/utils";
import _ from "lodash";
import qs from "querystring";
import { useCallback, useEffect, useRef, useState } from "react";

import { hashHistory as history } from "../components/spec/common/history";
import { getAllSearch } from "../components/spec/common/router";
import { getSearch, getValue } from "./utils";

export type SearchOperation = {
  pick?: string | string[];
  omit?: string | string[];
  preventRender?: boolean;
  control?: "push" | "replace";
};
export type SetSearch<T> = (
  val: T | ((val: T) => T),
  operation?: SearchOperation
) => void;
const useSearch = <T extends Serializable>(
  key: string,
  defaultValue: T,
  option?: {
    preventRender?: boolean;
  }
): [T, SetSearch<T>] => {
  const unmounted = useRef<boolean>();
  const prevSearch = useRef<Record<string, string>>({});
  const stateRef = useRef<T>();
  const [state, setState] = useState(() => {
    const allSearch = getAllSearch();
    const searchString = allSearch[key];
    prevSearch.current = allSearch;
    return getSearch(searchString, defaultValue);
  });
  stateRef.current = state;
  const setSearch = useCallback(
    (val: T | ((val: T) => T), operation?: SearchOperation) => {
      if (unmounted.current) return true;
      const control = operation?.control || "push";
      const value = getValue(val, stateRef.current);
      let nextSearch = getAllSearch();
      if (operation?.pick) {
        nextSearch = _.pick(nextSearch, operation.pick);
      } else if (operation?.omit) {
        nextSearch = _.omit(nextSearch, operation.omit);
      }
      const search = value
        ? { ...nextSearch, [key]: JSON.stringify(value) }
        : _.omit(nextSearch, key);

      history[control]({ search: qs.stringify(search) });
    },
    [key]
  );

  // this effect is used to add history listener to watch changes of target `key`
  // the listener should be remounted when `key` has changed
  useEffect(() => {
    const unsubscribe = history.listen(() => {
      const allSearch = getAllSearch();
      const searchString = allSearch[key];
      if (prevSearch.current[key] !== searchString && !option?.preventRender) {
        const search = getSearch<T>(searchString, defaultValue);
        setState(search);
      }
      prevSearch.current = allSearch;
    });
    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  useEffect(() => {
    return () => {
      unmounted.current = true;
    };
  }, []);

  return [state, setSearch];
};

export default useSearch;
