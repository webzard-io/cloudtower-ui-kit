// TODO: improve type
/* eslint-disable
@typescript-eslint/no-explicit-any,
*/

import {
  kitContext,
  Resources,
  RootState,
  store,
  TableActions,
  TableProps,
} from "@cloudtower/sparrow";
import { css } from "@linaria/core";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import _ from "lodash";
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useSelector } from "react-redux";

import { eventStopPropagation } from "./common";

const CheckboxStyle = css`
  .ant-checkbox {
    &.ant-checkbox-checked::after {
      display: none;
    }
  }
`;

type Resource = RootState["table"][Resources];

const TitleCheckbox = <T extends { id: string }>(props: {
  resource: string;
  onChange?: (
    keys: string[],
    rows: T[],
    e?: CheckboxChangeEvent,
    record?: T
  ) => void;
}) => {
  const kit = useContext(kitContext);
  const { resource, onChange } = props;
  const state = useSelector<RootState, Resource>(
    (state) => state.table[resource]
  ) || { selectRows: [], rows: [] };
  const { selectRows = [], rows = [] } = state;

  const isChecked = selectRows?.length === rows.length;
  return (
    <kit.checkbox
      className={CheckboxStyle}
      checked={Boolean(selectRows?.length) && isChecked}
      indeterminate={!isChecked && Boolean(selectRows?.length)}
      onChange={(e) => {
        const newRows = e.target.checked ? rows : [];
        onChange?.(newRows?.map((r) => r.id) || [], newRows as any);
      }}
    />
  );
};

const TableCheckbox = <T extends { id: string }>(props: {
  resource: string;
  record: T;
  onChange?: (
    keys: string[],
    rows: T[],
    e?: CheckboxChangeEvent,
    record?: T
  ) => void;
}) => {
  const kit = useContext(kitContext);
  const { resource, record, onChange, ...restProps } = props;
  const selectRows =
    useSelector<RootState, Resource["selectRows"]>(
      (state) => state.table[resource]?.selectRows
    ) || [];

  return (
    <kit.checkbox
      {...restProps}
      className={CheckboxStyle}
      checked={Boolean(selectRows.find((r) => r.id === record.id))}
      onClick={eventStopPropagation}
      onChange={(e) => {
        const newRows = e.target.checked
          ? [...selectRows, record as any]
          : selectRows.filter((r) => r.id !== record.id);
        onChange?.(
          newRows.map((r) => r.id),
          newRows,
          e,
          record
        );
      }}
    />
  );
};

/**
 * callback function of table checkbox when `shift` button is being pressed
 * @param payload
 * @param payload.keys last checked keys
 * @param payload.rows last checked records
 * @param payload.checked is checked
 * @param payload.record target record
 * @param payload.lastSelectedKey last selected key
 * @param payload.data data source
 */
export const onShiftChanged = <T extends { id: string }>(payload: {
  keys: string[];
  rows: T[];
  checked: boolean;
  record: T;
  lastSelectedKey: string | undefined;
  data: T[];
}) => {
  const { keys, rows, checked, record, lastSelectedKey, data } = payload;
  const keySet = new Set(keys);
  const rowMap = rows.reduce((map, r) => {
    map[r.id] = r;
    return map;
  }, {} as { [key: string]: T });
  const pointKeys = new Set([lastSelectedKey, record.id]);

  let startIndex = -1;
  let endIndex = -1;

  // init startIndex & endIndx
  data.some((record, recordIndex) => {
    if (pointKeys.has(record.id) && startIndex === -1) {
      startIndex = recordIndex;
      return false;
    }

    if (pointKeys.has(record.id) && startIndex !== -1) {
      endIndex = recordIndex;
      return true;
    }

    return false;
  });

  // reset keys & rows
  if (endIndex !== -1 && startIndex !== endIndex) {
    const range = data.slice(startIndex, endIndex + 1);

    if (checked) {
      range.forEach((r) => {
        !keySet.has(r.id) && keySet.add(r.id);
        rowMap[r.id] === undefined && (rowMap[r.id] = r);
      });
    } else {
      range.forEach((r) => {
        keySet.has(r.id) && keySet.delete(r.id);
        rowMap[r.id] && delete rowMap[r.id];
      });
    }
  }

  return {
    keys: Array.from(keySet).sort((a, b) => {
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    }),
    rows: Object.values(rowMap).sort((a, b) => {
      if (a.id < b.id) return -1;
      if (a.id > b.id) return 1;
      return 0;
    }),
  };
};

export const useTableSelection = <T extends { id: string }>(
  rowSelection: TableProps<T>["rowSelection"],
  resource: Resources | string
) => {
  const isSelection = Boolean(rowSelection);
  const { selectRows, rows } = useSelector<RootState, Resource>(
    (state) => state.table[resource]
  ) || {
    selectRows: [],
    rows: [],
  };

  const storeRef = useRef(selectRows || []);
  storeRef.current = selectRows || [];
  const dataRef = useRef(rows);
  dataRef.current = rows;

  const [lastSelectedKey, setLastSelectedKey] = useState<string | undefined>();
  const onChange = useCallback(
    (keys: string[], rows: T[], e?: CheckboxChangeEvent, record?: T) => {
      let newKeys = keys;
      let newRows = rows;

      if (e && record && e.nativeEvent.shiftKey) {
        const res = onShiftChanged({
          keys,
          rows,
          checked: e.target.checked,
          record,
          lastSelectedKey,
          data: dataRef.current,
        });

        newKeys = res.keys;
        newRows = res.rows as T[];
      }

      if (typeof rowSelection?.onChange === "function") {
        rowSelection.onChange(newKeys, newRows);
      }

      if (record) setLastSelectedKey(record.id);
    },
    [setLastSelectedKey, lastSelectedKey, rowSelection]
  );

  // sync data update
  useEffect(() => {
    if (!isSelection || !dataRef.current) return;
    const selects = storeRef.current;
    const newRows = _.intersectionBy(rows, selects, (item) =>
      typeof item === "object" ? item.id : item
    );
    if (selects?.length && newRows && !_.isEqual(newRows, selects)) {
      store.dispatch({
        type: TableActions.SET_ROWS_SELECTION,
        payload: {
          resource: resource,
          rows: newRows,
        },
      });
      rowSelection?.onChange?.(
        newRows.map((r) => r.id),
        newRows as any
      );
    }
    // rowSelection.onChange should be static
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rows, resource]);

  // monitor rowSelection.selectedRowKeys for changes,
  // if it is different from store.state, update the store.state
  useEffect(() => {
    if (!isSelection || !dataRef.current) return;
    if (
      !_.isEqual(
        rowSelection?.selectedRowKeys,
        storeRef.current.map((r) => r.id)
      )
    ) {
      const dataMap = (dataRef.current || []).reduce(
        (prev: Record<string, Resource["rows"][0]>, cur) => {
          prev[cur.id] = cur;
          return prev;
        },
        {}
      );

      store.dispatch({
        type: TableActions.SET_ROWS_SELECTION,
        payload: {
          resource: resource,
          rows: rowSelection?.selectedRowKeys?.map((r) => dataMap[r]) || [],
        },
      });
    }
  }, [rowSelection, isSelection, resource]);

  useEffect(() => {
    if (!isSelection) return;
    return () => {
      store.dispatch({
        type: TableActions.SET_ROWS_SELECTION,
        payload: {
          resource: resource,
          rows: [],
        },
      });
    };
  }, [resource, isSelection]);

  const getCheckboxProps = useRef(rowSelection?.getCheckboxProps);
  getCheckboxProps.current = rowSelection?.getCheckboxProps;

  const result: TableProps<T>["rowSelection"] = useMemo(
    () =>
      isSelection
        ? {
            columnTitle: (
              <TitleCheckbox resource={resource} onChange={onChange} />
            ),
            renderCell: (v, record) => {
              const checkboxProps = getCheckboxProps.current
                ? getCheckboxProps.current(record)
                : {};

              return (
                <TableCheckbox
                  {...checkboxProps}
                  resource={resource}
                  record={record}
                  onChange={onChange}
                />
              );
            },
          }
        : undefined,
    [resource, isSelection, onChange]
  );
  return result;
};
