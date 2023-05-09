import { css } from "@linaria/core";
import cs from "classnames";
import _ from "lodash";
import React, { createContext } from "react";

import { useElementsSize } from "../../hooks";
import Icon from "../Icon";
import { arrowChevronUp16BoldSecondary } from "../images";

const TableLoadingStyle = css`
  height: 100%;
  .table-loading-item {
    padding: 12px 4px;
    border-bottom: 1px solid rgba($gray-50, 0.18);
    display: flex;

    > * {
      height: 16px;
      margin: 4px;
      background: rgba($gray-50, 0.18);
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
      background: rgba($gray-70, 0.18);
    }
  }
  :nth-child(1) {
    > * {
      background: rgba($gray-60, 0.18);
    }
  }
`;

export const TableLoading: React.FC = () => {
  const sizes = useElementsSize(
    { loading: ".ant-table-wrapper .ant-spin" },
    {}
  );
  const rowLength = Math.floor(sizes.loading.height + 8 / 40) || 20;
  const rows = Array.from({ length: rowLength }, (r, i) => i);
  return (
    <div className={`${TableLoadingStyle} table-loading`}>
      {rows.map((i) => (
        <div key={i} className="table-loading-item">
          <div className="checkbox-loading"></div>
          <div className="td-loading"></div>
          <div className="td-loading"></div>
          <div className="td-loading"></div>
        </div>
      ))}
    </div>
  );
};

export const KitTableContext = createContext<{
  onClearSearchButtonEffect?: (base: string) => void;
}>({});

export const ColumnTitle: React.FC<{
  sortOrder?: "descend" | "ascend" | null;
  title: React.ReactNode;
}> = (props) => {
  const { title, sortOrder } = props;
  return (
    <>
      {title}
      {
        <Icon
          className={cs("order-icon", sortOrder)}
          src={arrowChevronUp16BoldSecondary}
        />
      }
    </>
  );
};

export const EmptyRowMenu: React.FC = () => {
  return <></>;
};
