import { FormOutlined } from "@ant-design/icons";
import { styled } from "@linaria/react";
import Empty from "@src/core/Empty";
import {
  SummaryTableComponentType,
  SummaryTableContentComponentType,
} from "@src/spec";
import cs from "classnames";
import _ from "lodash";
import React, { ReactNode } from "react";

const Table = styled.div`
  background: white;

  &.inline {
    .table-row {
      flex-direction: column;

      > label {
        padding: 0 16px 7px 0;
      }
    }
  }

  &.has-border {
    .table-header {
      border-bottom: 1px solid $strokes-light-trans-1;
    }

    .hiddenBorder {
      border-top: none !important;
    }

    .table-row + .table-row {
      border-top: 1px solid $strokes-light-trans-1;
    }

    .table-row:last-of-type {
      padding-bottom: 0;
    }
  }

  &.align-right {
    .content {
      text-align: right;
    }
  }
  .uuid-row {
    display: flex;
    justify-content: space-between;

    .id-text {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
`;

const TableHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  min-height: 32px;

  .table-title {
    color: $text-secondary-light;
    font-weight: 600;
    font-size: 12px;
    line-height: 8px;
  }

  .edit-icon {
    font-size: 16px;
    color: $strokes-translucent-2-light;
    cursor: pointer;
  }
`;

const TableContent = styled.div`
  font-size: 12px;
  line-height: 18px;
`;

const TableRow = styled.div`
  display: flex;
  padding: 8px 0;
  color: $text-primary-light;

  .hidden {
    display: none;
  }

  .ant-btn-link {
    height: auto;
  }

  .content {
    overflow: hidden;
    overflow-x: auto;
    width: 100%;
    white-space: pre-wrap;

    .ant-btn {
      white-space: pre-wrap;
      text-align: left;
    }

    .unit-chart {
      justify-content: flex-start;
    }
  }
`;

const RowLabel = styled.label<{ width: string }>`
  width: ${(props) => props.width};
  flex-shrink: 0;
  color: $text-secondary-light;
  padding-right: 12px;
`;

export const SummaryTableRow: React.FunctionComponent<{
  labelWidth?: string;
  title: string | ReactNode;
  hiddenTitle?: boolean;
  hiddenBorder?: boolean;
}> = (props) => {
  const {
    labelWidth = "42%",
    title,
    children,
    hiddenTitle = false,
    hiddenBorder = false,
  } = props;

  return (
    <TableRow className={cs("table-row", { hiddenBorder: hiddenBorder })}>
      <RowLabel width={labelWidth} className={cs({ hidden: hiddenTitle })}>
        {title}
      </RowLabel>
      <div className="content">{children}</div>
    </TableRow>
  );
};

const SummaryTableContent: SummaryTableContentComponentType = (props) => {
  const { items, labelWidth, dataSource } = props;

  return (
    <>
      {items.map((item) => {
        // TODO: update me
        if (item.dataIndex === "[__typename]") {
          return null;
        }

        const value = _.get(dataSource, item.dataIndex);
        return (
          <SummaryTableRow
            key={item.key}
            labelWidth={labelWidth}
            hiddenTitle={item?.hiddenTitle}
            hiddenBorder={item?.hiddenBorder}
            title={item.title}
          >
            {item.render
              ? item.render(value, dataSource)
              : _.isNull(value) || _.isUndefined(value) || value === ""
              ? Empty
              : value}
          </SummaryTableRow>
        );
      })}
    </>
  );
};

const SummaryTable: SummaryTableComponentType = (props) => {
  const {
    showHeader = true,
    border = true,
    className,
    title,
    showEdit,
    onEdit,
    rightAlign,
    layout = "horizontal",
  } = props;

  return (
    <Table
      className={cs([
        "summary-table",
        className,
        border ? "has-border" : "",
        rightAlign ? "align-right" : "",
        layout,
      ])}
    >
      {showHeader && (
        <TableHeader className="table-header">
          <span className="table-title">{title}</span>
          {showEdit && (
            <FormOutlined
              className="edit-icon"
              onClick={() => {
                onEdit && onEdit();
              }}
            />
          )}
        </TableHeader>
      )}
      <TableContent>
        {"children" in props ? (
          props.children
        ) : (
          <SummaryTableContent
            items={props.items}
            labelWidth={props.labelWidth}
            dataSource={props.dataSource}
          />
        )}
      </TableContent>
    </Table>
  );
};

export default SummaryTable;
