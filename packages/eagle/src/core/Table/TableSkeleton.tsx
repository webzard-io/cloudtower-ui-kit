import { css } from "@linaria/core";
import { useElementsSize } from "@src/hooks";
import { Color } from "@src/styles/token/color";
import React from "react";

export interface ITableSkeletonProps {
  /**
   * rows 默认为 undefined，此情况下组件会根据表格的高度和单项高度计算列数量。
   * 在自动计算的 row 不符合需求时，可以自定义骨架屏 rows 的数量。
   */
  rows?: number;
  /**
   * 在表格加入了 scrollY 属性以后，表格的结构会发生变化。
   * 获取表格高度的选择器有所区别，需要外部将此信息传入。
   */
  scrollY?: boolean;

  /**
   * 默认值骨架屏表头部分高度为 48 px
   * 当存在默认高度不符合实际需求时，可以通过 headerHeight 设置表头处的骨架高度
   */
  headerHeight?: number;

  /**
   * 骨架屏单项高度默认为动态计算
   * 当存在计算错误时，可以通过 itemHeight 设置单项的骨架高度
   */
  itemHeight?: number;
}

export const TableSkeleton = (props: ITableSkeletonProps) => {
  const {
    rows: _rowLength,
    scrollY = false,
    headerHeight = 48,
    itemHeight: _itemHeight,
  } = props;
  const sizes = useElementsSize(
    {
      loading: ".ant-table-container .ant-table-content .ant-table-tbody",
      scrollYLoading: ".ant-table-container .ant-table-tbody",
    },
    {},
  );

  const itemSizes = useElementsSize(
    {
      loading:
        ".ant-table-container .ant-table-content .ant-table-tbody > tr:not(:first-child)",
      scrollYLoading:
        ".ant-table-container .ant-table-tbody > tr:not(:first-child)",
    },
    {},
  );

  const itemHeight =
    (_itemHeight ?? itemSizes[scrollY ? "scrollYLoading" : "loading"].height) ||
    40;

  const rowLength =
    (_rowLength ??
      Math.ceil(
        sizes[scrollY ? "scrollYLoading" : "loading"].height / itemHeight,
      )) ||
    20;

  const rows = Array.from({ length: rowLength }, (r, i) => i);

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
