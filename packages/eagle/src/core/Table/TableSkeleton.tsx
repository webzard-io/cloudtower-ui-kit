import { css } from "@linaria/core";
import { Color } from "@src/styles/token/color";
import React, { useMemo } from "react";

const TableLoadingStyle = css`
  overflow: hidden;
  height: 100%;
  background: white;
  .table-loading-item {
    padding: 8px 4px;
    display: flex;
    align-items: center;

    > * {
      height: 16px;
      margin: 4px;
      background: ${Color.fill.neutral["trans-1"]};
      border-radius: 2px;
    }
    .checkbox-loading {
      width: 16px;
    }
    .td-loading {
      flex: 1;
    }
  }

  :nth-child(1) {
    padding: 8px 4px;
    > * {
      background: ${Color.fill.neutral["trans-2"]};
    }
  }
`;

export interface ITableSkeletonProps {
  rowsCount?: number;
  headerHeight?: number;
  itemHeight?: number;
}

export const TableSkeleton = (props: ITableSkeletonProps) => {
  const { rowsCount = 50, headerHeight = 48, itemHeight = 40 } = props;

  const rows = useMemo(
    () => Array.from({ length: rowsCount }, (r, i) => i),
    [rowsCount],
  );

  return (
    <div className={`${TableLoadingStyle} table-loading`}>
      <div
        className="table-loading-header table-loading-item"
        style={{ height: headerHeight }}
      >
        <div className="checkbox-loading"></div>
        <div className="td-loading"></div>
        <div className="td-loading"></div>
        <div className="td-loading"></div>
      </div>
      {rows.map((i) => (
        <div
          key={i}
          className="table-loading-item"
          style={{ height: itemHeight }}
        >
          <div className="checkbox-loading"></div>
          <div className="td-loading"></div>
          <div className="td-loading"></div>
          <div className="td-loading"></div>
        </div>
      ))}
    </div>
  );
};
