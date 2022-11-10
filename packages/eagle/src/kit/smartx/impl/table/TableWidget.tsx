import { Maybe, Scalars } from "@cloudtower/eagle/generated/react-hooks";
import { useKitSelector } from "@cloudtower/eagle/kit/smartx";
import { RootState } from "@cloudtower/eagle/kit/smartx";
import { Icon } from "@cloudtower/eagle/kit/smartx";
import {
  kitContext,
  SearchOperation,
  SetSearch,
  tableCanClearQuery,
  useElementsSize,
  useSearch,
} from "@cloudtower/eagle/kit/specify";
import { css } from "@linaria/core";
import { styled } from "@linaria/react";
import { SerializableObject } from "@tower/utils";
import { ApolloError } from "apollo-boost";
import cs from "classnames";
import _ from "lodash";
import React, { useContext, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

const TablePaginationStyle = css``;

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

export const AuxiliaryLine = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 1px;
  background: $blue-60;
  transform: translateX(-9999px);
  z-index: 999;

  &::before {
    content: "";
    position: absolute;
    height: 34px;
    width: 3px;
    top: 0;
    left: -1px;
    background: $blue-60;
  }
`;

export const TablePagination = <T,>(props: {
  count?: number;
  skip: number;
  size: number;
  setQuery: (
    val: T | ((val: T) => T),
    operation?: SearchOperation | undefined
  ) => void;
  onChange?: (page?: number, size?: number) => void;
}) => {
  const { count, skip, size, setQuery, onChange } = props;
  const kit = useContext(kitContext);

  useEffect(() => {
    if (!count || skip < count) return;
    setQuery((query) => ({
      ...query,
      first: size,
      // reset skip when size changed
      skip: 0,
    }));
  }, [skip, count, setQuery, size]);

  return (
    <kit.pagination
      current={(skip || 0) / size + 1}
      count={count || 0}
      size={size}
      className={TablePaginationStyle}
      onChange={(page) => {
        setQuery((query) => ({
          ...query,
          skip: (page - 1) * size,
        }));
        if (typeof onChange === "function") {
          onChange(page, undefined);
        }
      }}
      onSizeChange={(newSize) => {
        setQuery((query) => ({
          ...query,
          first: newSize,
          // reset skip when size changed
          skip: 0,
        }));
        if (typeof onChange === "function") {
          onChange(undefined, newSize);
        }
      }}
    />
  );
};

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

export const TableEmpty: React.FC<{
  query: { where?: Maybe<SerializableObject> };
  setQuery: (query: {}) => void;
  base: string;
  clearGlobalSearch?: boolean;
}> = (props) => {
  const { query, setQuery, base, clearGlobalSearch = true } = props;
  const { t, i18n } = useTranslation();
  const kit = useContext(kitContext);
  const clearGlobalSearchFn = useKitSelector<
    RootState["globalSearch"]["clearInput"]
  >((state) => state.globalSearch.clearInput);

  return (
    <div className="table-default-empty">
      {_.isEmpty(query.where) ? (
        t("common.empty") + i18n.td(`common.${base}`)
      ) : (
        <>
          <div>
            {t("common.no_match_filter", {
              resource: i18n.td(`common.${base}`),
            })}
          </div>
          <kit.button
            type="ordinary"
            onClick={() => {
              setQuery({});
              if (tableCanClearQuery(base) && clearGlobalSearch) {
                clearGlobalSearchFn();
              }
            }}
          >
            {t("common.clear_query")}
          </kit.button>
        </>
      )}
    </div>
  );
};

export const TableError: React.FC<{
  error: ApolloError;
  refetch: () => Promise<unknown>;
}> = (props) => {
  const { error, refetch } = props;
  const { t } = useTranslation();
  const kit = useContext(kitContext);
  return (
    <div className="table-default-error">
      <div>{String(error)}</div>
      <kit.button type="ordinary" onClick={() => refetch()}>
        {t("overview.retry")}
      </kit.button>
    </div>
  );
};

export const usePosition = <
  V extends { skip?: Maybe<Scalars["Int"]>; first?: Maybe<Scalars["Int"]> }
>(props: {
  wrapper: React.MutableRefObject<HTMLDivElement | null>;
  setQuery: SetSearch<V>;
  defaultSize: number;
  data: unknown;
  elSelector?: { row?: string; wrapper?: string };
}) => {
  const { wrapper, setQuery, defaultSize, data, elSelector } = props;

  const [position, setPosition] = useSearch<string | undefined>(
    "position",
    undefined
  );

  const resourceIndex = useRef(-1);
  const isCompleted = useRef(false);

  const positionOnCompleted = (count: number) => {
    if (!position) return;
    isCompleted.current = false;
    setQuery(
      (query) => {
        const currentPage = Math.floor(
          (count + 1) / (query.first || defaultSize)
        );
        resourceIndex.current = count % 50;
        return { ...query, skip: currentPage * 50 };
      },
      { control: "replace" }
    );
    setPosition(undefined, { control: "replace" });
  };

  useEffect(() => {
    setTimeout(() => {
      if (!data || resourceIndex.current === -1 || isCompleted.current) return;

      const rowHeight =
        wrapper.current?.querySelector<HTMLTableDataCellElement>(
          elSelector?.row || ".ant-table-row"
        )?.offsetHeight;
      if (!rowHeight) return;

      const tbody = wrapper.current?.querySelector<HTMLTableElement>(
        elSelector?.wrapper || ".ant-table-body"
      );
      if (!tbody) return;
      const maxScroll = tbody.scrollHeight - tbody.offsetHeight;
      const currentScroll = rowHeight * resourceIndex.current;

      const scroll = Math.min(currentScroll, maxScroll);
      tbody.scroll(0, scroll);

      isCompleted.current = true;
    }, 0);
  }, [data, wrapper, elSelector]);

  return { positionOnCompleted };
};

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
          type="1-arrow-chevron-up-16-bold-secondary"
        />
      }
    </>
  );
};

export const EmptyRowMenu: React.FC = () => {
  return <></>;
};
