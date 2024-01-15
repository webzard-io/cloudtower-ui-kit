import {
  HandlePoint816BlueIcon,
  HandlePoint816SecondaryIcon,
  XmarkRemove16RegularRedIcon,
  XmarkRemove16SecondaryIcon,
} from "@cloudtower/icons-react";
import { cx } from "@linaria/core";
import Icon from "@src/components/Icon";
import { DraggableHandleWrapper } from "@src/components/TableForm/style";
import { TableFormBodyCell } from "@src/components/TableForm/TableFormBodyCell";
import {
  DataType,
  TableFormProps,
  TableFormRowsProps,
  ValidateTriggerType,
} from "@src/components/TableForm/types";
import { moveItemInArray } from "@src/components/TableForm/utils";
import Tooltip from "@src/components/Tooltip";
import { Typo } from "@src/components/Typo";
import useParrotTranslation from "@src/hooks/useParrotTranslation";
import { List as AntdList } from "antd";
import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import {
  DragDropContext,
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
  Droppable,
  OnDragEndResponder,
} from "react-beautiful-dnd";

const TableFormRowDeleteAction: React.FC<
  Pick<TableFormProps, "deleteConfig" | "row"> & {
    rowIndex: number;
    updateData: (data: DataType[]) => void;
    data: DataType[];
  }
> = (props) => {
  const { deleteConfig, row, updateData, rowIndex, data } = props;
  const { t } = useParrotTranslation();

  if (typeof row?.deletable === "function" && !row.deletable(rowIndex, data)) {
    return <></>;
  }

  const disableActionsFromRowConfig =
    typeof row?.disableActions === "object"
      ? row.disableActions
      : row?.disableActions?.(rowIndex, data) ?? [];

  const isRowDeleteDisabled =
    (disableActionsFromRowConfig.includes("delete") ||
      deleteConfig?.specifyRowDeleteDisabled?.(rowIndex, data)) ??
    false;

  const DeleteIcon = (
    <Icon
      data-testid="eagle-table-form-row-action"
      className={cx("delete-row-icon", isRowDeleteDisabled && "disabled")}
      src={XmarkRemove16SecondaryIcon}
      hoverSrc={isRowDeleteDisabled ? undefined : XmarkRemove16RegularRedIcon}
      onClick={() => {
        if (isRowDeleteDisabled) return;
        const newData = [...data];
        newData.splice(rowIndex, 1);
        updateData(newData);
      }}
    />
  );
  const DeleteAction = isRowDeleteDisabled ? (
    DeleteIcon
  ) : (
    <Tooltip title={t("components.remove")}>{DeleteIcon}</Tooltip>
  );
  return DeleteAction;
};

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
    passwordVisible,
    deleteConfig,
    draggable,
    rowIndex,
    provided,
    snapshot,
    validateTriggerType = ValidateTriggerType.Normal,
    row,
    errors = [],
    updateData,
    onBodyBlur,
    renderRowDescription,
    validateAll,
  } = props;
  const rowData = data[rowIndex];
  const errorFromProps = errors[rowIndex];
  const rowLevelError =
    typeof errorFromProps === "string" ? errorFromProps : undefined;
  const [rowError, setRowError] = useState<string | undefined>(rowLevelError);
  const rowValidator = row?.validator || props.rowValidator;
  const cellsLevelError =
    errorFromProps && typeof errorFromProps === "object"
      ? errorFromProps
      : null;

  useEffect(() => {
    setRowError(rowLevelError);
  }, [rowLevelError]);

  const rowDeletable =
    typeof row?.deletable === "boolean"
      ? row.deletable
      : (typeof row?.deletable === "function" || deleteConfig?.deletable) ??
        false;

  const getRowValidateResult = useCallback(
    (rowData: DataType): string | undefined => {
      if (!rowValidator) return rowLevelError;
      const result = rowValidator(rowIndex, rowData);
      setRowError(result);
      return result;
    },
    [rowValidator, rowIndex, rowLevelError]
  );

  const Cells = columns.map((col) => {
    const cellError = cellsLevelError?.[col.key];
    return (
      <TableFormBodyCell
        key={col.key}
        column={col}
        data={data}
        latestData={latestData}
        disabled={disabled}
        index={rowIndex}
        onChange={updateData}
        onBlur={onBodyBlur}
        visible={passwordVisible}
        validateTriggerType={validateTriggerType}
        isRowError={!!rowError}
        getRowValidateResult={getRowValidateResult}
        validateAll={validateAll}
        error={cellError}
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
    const rowDescFuncParams = {
      rowIndex,
      rowData,
      latestData,
    };
    const DescriptionResult =
      typeof row?.descriptions == "object"
        ? row.descriptions[rowIndex]
        : typeof row?.customizedDescription === "function"
        ? row.customizedDescription(rowDescFuncParams)
        : renderRowDescription?.(rowDescFuncParams) || null;
    return typeof DescriptionResult === "string" ? (
      <p className={cx(Typo.Label.l4_regular, "row-description")}>
        {DescriptionResult}
      </p>
    ) : (
      DescriptionResult
    );
  }, [rowIndex, rowData, latestData, renderRowDescription, row]);

  return (
    <AntdList.Item
      key={rowIndex}
      data-testid="eagle-table-form-row-for-test"
      className={cx(
        "eagle-table-form-row",
        snapshot?.isDragging && "isDragging"
      )}
      actions={
        rowDeletable
          ? [
              <TableFormRowDeleteAction
                data={data}
                rowIndex={rowIndex}
                deleteConfig={deleteConfig}
                row={row}
                updateData={updateData}
              />,
            ]
          : undefined
      }
    >
      {DraggableHandle}
      {Cells}
      {rowError ? (
        <p className={cx(Typo.Label.l4_regular, "row-error-message")}>
          {rowError}
        </p>
      ) : null}
      {RowDescription}
    </AntdList.Item>
  );
};

const TableFormBodyRows: React.FC<TableFormRowsProps> = memo((props) => {
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
          <div
            className="draggable-container"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
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
});

export default TableFormBodyRows;
