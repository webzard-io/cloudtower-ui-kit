import {
  HandlePoint816BlueIcon,
  HandlePoint816SecondaryIcon,
  XmarkRemove16RegularRedIcon,
  XmarkRemove16SecondaryIcon,
} from "@cloudtower/icons-react";
import { parrotI18n } from "@cloudtower/parrot";
import { cx } from "@linaria/core";
import { List as AntdList } from "antd";
import React, { useCallback, useMemo } from "react";
import {
  DragDropContext,
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
  Droppable,
  OnDragEndResponder,
} from "react-beautiful-dnd";

import Icon from "../Icon";
import Tooltip from "../Tooltip";
import { DraggableHandleWrapper } from "./style";
import { TableFormBodyCell } from "./TableFormBodyCell";
import { TableFormRowsProps } from "./types";
import { moveItemInArray } from "./utils";
import { Typo } from "../Typo";

const TableFormRow: React.FC<
  TableFormRowsProps & {
    rowIndex: number;
    provided?: DraggableProvided;
    snapshot?: DraggableStateSnapshot;
  }
> = (props) => {
  const {
    data,
    columns,
    latestData,
    disabled,
    errorInfo = {},
    passwordVisible,
    deletable,
    draggable,
    updateData,
    onBodyBlur,
    rowIndex,
    provided,
    snapshot,
    renderRowDescription,
  } = props;

  const rowData = data[rowIndex];

  const handleClear = useCallback(
    (newData, path) => {
      updateData(newData);
    },
    [updateData]
  );

  const handleBlur = useCallback(
    (newData, path) => {
      onBodyBlur?.(newData, path);
    },
    [onBodyBlur]
  );

  const deleteRow = (index: number) => {
    const newData = [...data];
    newData.splice(index, 1);
    updateData(newData);
  };

  const getRowActions = (index: number, rowDeletable?: boolean) => {
    const isRowDeleteDisabled = rowDeletable === false;
    const DeleteIcon = (
      <Icon
        className={cx("delete-row-icon", isRowDeleteDisabled && "disabled")}
        src={XmarkRemove16SecondaryIcon}
        hoverSrc={isRowDeleteDisabled ? undefined : XmarkRemove16RegularRedIcon}
        onClick={() => {
          if (isRowDeleteDisabled) return;
          deleteRow(index);
        }}
      />
    );
    const FinalRenderIcon = isRowDeleteDisabled ? (
      DeleteIcon
    ) : (
      <Tooltip title={parrotI18n.t("components.remove")}>{DeleteIcon}</Tooltip>
    );
    return deletable ? [FinalRenderIcon] : undefined;
  };

  const Cells = columns.map((col) => {
    return (
      <TableFormBodyCell
        key={col.key}
        column={col}
        data={data}
        latestData={latestData}
        disabled={disabled}
        index={rowIndex}
        errorInfo={errorInfo}
        onClear={handleClear}
        onChange={updateData}
        onBlur={handleBlur}
        visible={passwordVisible}
      />
    );
  });

  const DraggableHandle = useMemo(
    () =>
      draggable && provided ? (
        <DraggableHandleWrapper {...provided.dragHandleProps}>
          <Icon
            src={HandlePoint816SecondaryIcon}
            hoverSrc={HandlePoint816BlueIcon}
          />
        </DraggableHandleWrapper>
      ) : null,
    [draggable, provided]
  );

  const RowDescription = useMemo(() => {
    const RenderResult =
      renderRowDescription?.({
        rowIndex,
        rowData,
        latestData,
      }) || null;
    return typeof RenderResult === "string" ? (
      <p className={cx(Typo.Label.l4_regular, "row-description")}>
        {RenderResult}
      </p>
    ) : (
      RenderResult
    );
  }, [rowIndex, rowData, latestData, renderRowDescription]);

  return (
    <AntdList.Item
      key={rowIndex}
      className={cx(
        "eagle-table-form-row",
        snapshot?.isDragging && "isDragging"
      )}
      actions={getRowActions(rowIndex, rowData.deletable)}
    >
      {DraggableHandle}
      {Cells}
      {RowDescription}
    </AntdList.Item>
  );
};

const TableFormBodyRows: React.FC<TableFormRowsProps> = (props) => {
  const { data, draggable, updateData } = props;

  const onDragEnd: OnDragEndResponder = useCallback(
    (result) => {
      const fromIndex = result.source.index;
      const toIndex = result.destination?.index;
      if (typeof toIndex !== "number" || toIndex === fromIndex) return;
      const newData = moveItemInArray(data, fromIndex, toIndex);
      updateData(newData);
    },
    [data, updateData]
  );

  return draggable ? (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {data.map((_d, i) => (
              <Draggable
                draggableId={`draggable-id-${i}`}
                key={`draggable-id-${i}`}
                index={i}
              >
                {(provided, snapshot) => (
                  <div ref={provided.innerRef} {...provided.draggableProps}>
                    <TableFormRow
                      {...props}
                      rowIndex={i}
                      provided={provided}
                      snapshot={snapshot}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  ) : (
    <>
      {data.map((_d, i) => (
        <TableFormRow {...props} rowIndex={i} key={`table-row-${i}`} />
      ))}
    </>
  );
};

export default TableFormBodyRows;
