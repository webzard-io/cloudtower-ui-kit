import { css, cx } from "@linaria/core";
import { styled } from "@linaria/react";
import Button from "@src/core/Button";
import TableForm from "@src/core/TableForm";
import {
  DataType,
  DeletableConfigurations,
  TableFormColumn,
  TableFormErrorsType,
  TableFormHandle,
  TableFormProps,
  TableFormRowConfiguration,
  ValidateTriggerType,
} from "@src/core/TableForm/types";
import { genEmptyRow } from "@src/core/TableForm/utils";
import Tooltip from "@src/core/Tooltip";
import { Typo } from "@src/core/Typo";
import { CoreMeta } from "@stories/types";
import { Checkbox, Form, Input, Select, Space } from "antd";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

const meta = {
  component: TableForm,
  title: "Core/TableForm | 表格表单",
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/sv8N9opZrWCMApiGeq2V6M/Table-Form-%7C-%E8%A1%A8%E6%A0%BC%E8%A1%A8%E5%8D%95?node-id=0-1&node-type=canvas&t=J7VBRAphSq2DIdhA-0",
    },
  },
} satisfies CoreMeta<typeof TableForm>;

export default meta;

const Title: React.FC = ({ children }) => (
  <div style={{ marginTop: "16px" }} className={Typo.Display.d2_bold_title}>
    {children}
  </div>
);

const Desc = styled.div`
  margin-top: 8px;
  margin-bottom: 8px;
  color: $text-light-secondary;
`;

const ContentWrapper = styled.div`
  padding: 20px;
`;

const OverflowUnderlineStyle = css`
  border-bottom: 1px dashed;
  border-color: $strokes-light-trans-4;
`;
const CustomSubtitleStyle = css`
  color: $text-secondary-light;
`;

const selectOptions = [
  { label: "选项 1", value: "option 1" },
  { label: "选项 2", value: "option 2" },
  { label: "选项 3", value: "option 3" },
  { label: "选项 4", value: "option 4" },
];

const getColumnsForValidation = (
  type: ValidateTriggerType,
): TableFormColumn[] => [
  {
    title: "这是一个专门做校验的 tableForm",
    type: "text",
    key: "normalTitle",
    render() {
      switch (type) {
        case ValidateTriggerType.Normal:
          return "Normal类型的校验方式：onBlur 后的 onChange 才会触发校验";
        case ValidateTriggerType.Lazy:
          return "Lazy类型的校验方式：只有onBlur 才会触发校验";
        case ValidateTriggerType.Aggressive:
          return "Aggressive类型的校验方式：每次 onChange 都会触发校验";
      }
      return null;
    },
  },
  {
    title: "输入“Validation”触发校验失败吧~",
    key: "validation",
    type: "input",
    validator({
      value,
      isHeader,
    }: Parameters<NonNullable<TableFormColumn["validator"]>>[0] & {
      value?: string;
    }) {
      if (!isHeader && value?.includes("Validation")) {
        return "this is a special error for “Validation”!";
      }
    },
  },
];

const commonTableFormProps: TableFormProps = {
  onHeaderChange: (data) => {},
  columns: [
    {
      type: "text",
      title: "title",
      subTitle: "批量填充",
      key: "name",
      displayText:
        "NameNameNameNameNameNameNameNameNameNameNameNameNameNameName",
      width: 100,
    },
    {
      type: "input",
      title: "起始管理 IP",
      key: "address",
      defaultValue: "",
      validator: ({ value }) => {
        if ((value as string)?.includes("Value")) {
          return "Input Level Error Msg. Input Level Error Msg.";
        }
      },
    },
    {
      type: "input",
      title: "递增 input",
      subTitle: "连续递增",
      key: "increase",
      defaultValue: "must end with number,like: value0",
      autoIncrease: true,
    },
    {
      type: "password",
      title: "密码",
      key: "password",
    },
    {
      type: "checkbox",
      title: "复选框",
      subTitle: "checkbox",
      key: "checkbox",
      hidden: false,
      align: "center",
    },
    {
      type: "affix",
      title: "affix",
      key: "affix",
    },
    {
      title: "自定义组件",
      subTitle: "",
      key: "customizedCmpt",
      defaultValue: "option 2",
      render({ isHeader, value, rowIndex, ...restProps }) {
        return (
          <Select
            {...restProps}
            size="small"
            placeholder={
              isHeader
                ? "批量选择"
                : selectOptions.find((o) => o.value === restProps.placeholder)
                    ?.label || "请选择"
            }
            value={value as string}
            options={selectOptions}
          />
        );
      },
      validator({ value, rowIndex }) {
        const val = value as string;
        if (val?.includes("3")) {
          return "this is a special error for option 3";
        }
      },
    },
  ],
  onBodyChange: (data, rowIndex, columnKey) => {
    console.group("onBodyChange:");
    console.log("data: ", data);
    console.log("rowIndex: ", rowIndex);
    console.log("column key: ", columnKey);
    console.groupEnd();
  },
  onBodyAdd(value, rowIndex) {
    console.group("onBodyAdd:");
    console.log("value: ", value);
    console.log("rowIndex: ", rowIndex);
    console.groupEnd();
  },
  rowValidator: (rowIndex, rowData) => {
    if (rowIndex === 2 && rowData["address"]?.includes("row")) {
      return "Row Level Error Msg.";
    }
  },
};
const defaultAsyncErrors = [null];

const DEFAULT_ROW_COUNT = 3;
const defaultData = [...Array(DEFAULT_ROW_COUNT)].map(() =>
  genEmptyRow(commonTableFormProps.columns),
);

const BatchInputStory = () => {
  const ref = useRef<TableFormHandle>(null);

  useEffect(() => {
    if (ref.current !== null) {
      ref.current.validateWholeFields();
    }
  }, []);

  return (
    <>
      <Title>TableForm With Batch Input</Title>
      <ContentWrapper>
        <TableForm
          {...commonTableFormProps}
          ref={ref}
          maxHeight={300}
          defaultData={[
            {
              address: "Value",
              password: "this-is-pwd",
              checkbox: false,
            },
            {
              address: "row has address",
              password: "this-is-pwd",
              checkbox: true,
            },
            {
              address: "row has address",
              password: "this-is-pwd",
              checkbox: false,
            },
            {
              address: "Values",
              password: "this-is-pwd",
              checkbox: false,
            },
            {
              address: "Values",
              password: "this-is-pwd",
              checkbox: false,
            },
            {
              address: "Values",
              password: "this-is-pwd",
              checkbox: false,
            },
          ]}
        />
      </ContentWrapper>
    </>
  );
};
export const BatchInput = {
  render: () => <BatchInputStory />,
};

const DynamicRowsStory = () => {
  const ref = useRef<TableFormHandle>(null);
  const deleteConfig: DeletableConfigurations = useMemo(
    () => ({
      deletable: true,
      specifyRowDeleteDisabled(index, data) {
        if (data.length === 1) {
          return true;
        }
        return false;
      },
    }),
    [],
  );

  return (
    <>
      <Title>Batch input TableForm with dynamic rows</Title>
      <ContentWrapper>
        <TableForm
          ref={ref}
          {...commonTableFormProps}
          deleteConfig={deleteConfig}
          validateTriggerType={ValidateTriggerType.Lazy}
          rowAddConfig={{
            addible: true,
            maximum: 8,
          }}
          defaultData={defaultData}
        />
      </ContentWrapper>
    </>
  );
};
export const DynamicRows = {
  render: () => {
    return <DynamicRowsStory />;
  },
};

export const Draggable = {
  render: () => {
    return (
      <>
        <Title>Draggable TableForm</Title>
        <ContentWrapper>
          <TableForm
            {...commonTableFormProps}
            disableBatchFilling
            draggable
            validateTriggerType={ValidateTriggerType.Aggressive}
            defaultData={defaultData}
          />
        </ContentWrapper>
      </>
    );
  },
};

const NormalValidateStory = () => {
  const rowValidationForValidationForm: TableFormProps["rowValidator"] =
    useCallback((index, value: { validation?: string }) => {
      if (index === 1 && value.validation?.includes("Validation")) {
        return "this is a special row level error for “Validation”!";
      }
    }, []);

  return (
    <>
      <Title>Normal validate type for TableForm</Title>
      <ContentWrapper>
        <TableForm
          disableBatchFilling
          columns={getColumnsForValidation(ValidateTriggerType.Normal)}
          rowValidator={rowValidationForValidationForm}
          defaultData={defaultData}
        />
      </ContentWrapper>
    </>
  );
};
export const NormalValidate = {
  render: () => <NormalValidateStory />,
};

const LazyValidateStory = () => {
  const rowValidationForValidationForm: TableFormProps["rowValidator"] =
    useCallback((index, value: { validation?: string }) => {
      if (index === 1 && value.validation?.includes("Validation")) {
        return "this is a special row level error for “Validation”!";
      }
    }, []);

  return (
    <>
      <Title>Lazy validate type for TableForm</Title>
      <ContentWrapper>
        <TableForm
          validateTriggerType={ValidateTriggerType.Lazy}
          disableBatchFilling
          columns={getColumnsForValidation(ValidateTriggerType.Lazy)}
          rowValidator={rowValidationForValidationForm}
          defaultData={defaultData}
        />
      </ContentWrapper>
    </>
  );
};
export const LazyValidate = {
  render: () => <LazyValidateStory />,
};

const AggressiveValidateStory = () => {
  const rowValidationForValidationForm: TableFormProps["rowValidator"] =
    useCallback((index, value: { validation?: string }) => {
      if (index === 1 && value.validation?.includes("Validation")) {
        return "this is a special row level error for “Validation”!";
      }
    }, []);

  return (
    <>
      <Title>Aggressive validate type for TableForm</Title>
      <ContentWrapper>
        <TableForm
          validateTriggerType={ValidateTriggerType.Aggressive}
          disableBatchFilling
          columns={getColumnsForValidation(ValidateTriggerType.Aggressive)}
          rowValidator={rowValidationForValidationForm}
          defaultData={defaultData}
        />
      </ContentWrapper>
    </>
  );
};
export const AggressiveValidate = {
  render: () => <AggressiveValidateStory />,
};

const RowConfigStory = () => {
  const rowValidationForValidationForm: TableFormProps["rowValidator"] =
    useCallback((index, value: { validation?: string }) => {
      if (index === 1 && value.validation?.includes("Validation")) {
        return "this is a special row level error for “Validation”!";
      }
    }, []);

  const tableFormRowConfig: TableFormRowConfiguration = useMemo(
    () => ({
      draggable: true,
      deletable: (index) => index !== 1,
      disableActions: (index) => (index === 2 ? ["delete"] : undefined),
      validator: rowValidationForValidationForm,
      splitType: "zebraMarking",
      descriptions: ["this is a special desc for the first row"],
      // same with above "descriptions" configuration
      // customizedDescription: ({ rowIndex }) =>
      //   rowIndex === 0
      //     ? "this is a special desc for the first row"
      //     : null,
    }),
    [rowValidationForValidationForm],
  );

  return (
    <>
      <Title>Use new "row" configuration TableForm</Title>
      <ContentWrapper>
        <TableForm
          disableBatchFilling
          columns={getColumnsForValidation(ValidateTriggerType.Normal)}
          rowValidator={rowValidationForValidationForm}
          row={tableFormRowConfig}
          defaultData={defaultData}
        />
      </ContentWrapper>
    </>
  );
};
export const RowConfig = {
  render: () => <RowConfigStory />,
};

export const ErrorsConfig = {
  render: () => (
    <>
      <Title>Use new "errors" configuration TableForm</Title>
      <ContentWrapper>
        <TableForm
          {...commonTableFormProps}
          disableBatchFilling
          rowValidator={undefined}
          defaultData={[
            {
              address: "Value",
              password: "this-is-pwd",
              checkbox: false,
            },
            {
              address: "row has address",
              password: "this-is-pwd",
              checkbox: true,
            },
          ]}
          errors={[
            "this is a row error",
            {
              address:
                "this is address cell error, will be replaced by column's validator",
              password: "this is password cell error",
            },
          ]}
        />
      </ContentWrapper>
    </>
  ),
};

const AsyncErrorsStory = () => {
  const [asyncErrors, setAsyncErrors] =
    useState<TableFormErrorsType>(defaultAsyncErrors);

  return (
    <>
      <Title>
        Use new "errors" configuration TableForm - "errors" is updated
        asynchronously
      </Title>
      <Desc>
        Type "error" in password field, then errors will be updated
        asynchronously
      </Desc>
      <ContentWrapper>
        <TableForm
          {...commonTableFormProps}
          disableBatchFilling
          rowValidator={undefined}
          defaultData={[
            {
              address: "address-1",
              password: "password-1",
              checkbox: false,
            },
          ]}
          errors={asyncErrors}
          onBodyChange={(data) => {
            const password = data[0]?.password;
            if (password === "error") {
              setTimeout(() => {
                setAsyncErrors([
                  { password: "the password is invalid - set by setTimeout" },
                ]);
              }, 500);
            } else {
              setAsyncErrors(defaultAsyncErrors);
            }
          }}
        />
      </ContentWrapper>
    </>
  );
};
export const ErrorsConfigWithAsyncErr = {
  render: () => <AsyncErrorsStory />,
};

export const ShowTableFormWhenNoData = {
  render: () => (
    <>
      <Title>Show table form when there is no data</Title>
      <ContentWrapper>
        <TableForm
          {...commonTableFormProps}
          columns={[
            {
              key: "col-1",
              title: "This is the first column without data",
              type: "input",
            },
            {
              key: "col-2",
              title: "This is the second column without data",
              type: "input",
            },
          ]}
          disableBatchFilling
          rowValidator={undefined}
          rowAddConfig={{
            addible: true,
          }}
          row={{
            deletable: true,
          }}
        />
      </ContentWrapper>
    </>
  ),
};

export const HideTableFormWhenNoData = {
  render: () => (
    <>
      <Title>Hide table form when there is no data</Title>
      <ContentWrapper>
        <TableForm
          {...commonTableFormProps}
          disableBatchFilling
          rowValidator={undefined}
          hideEmptyTable
          rowAddConfig={{
            addible: true,
          }}
          row={{
            deletable: true,
          }}
        />
      </ContentWrapper>
    </>
  ),
};

export const TitleAndSubTitle = {
  render: () => (
    <>
      <Title>Render different title and subTitle for header cell</Title>
      <ContentWrapper>
        <TableForm
          {...commonTableFormProps}
          columns={[
            {
              key: "col-1",
              title: "This is the string type title, without subTitleRender",
              type: "input",
            },
            {
              key: "col-2",
              title: (
                <Tooltip title="This is the ReactNode type title">
                  <span className={OverflowUnderlineStyle}>
                    This is the ReactNode type
                  </span>
                </Tooltip>
              ),
              type: "input",
              subTitleRender(props) {
                return null;
              },
            },
            {
              key: "col-3",
              title: "This is the string type title, with subTitleRender",
              subTitleRender(props) {
                return (
                  <p className={cx(Typo.Label.l4_regular, CustomSubtitleStyle)}>
                    This is the ReactNode type
                    <Tooltip title="subTitle">
                      <span className={OverflowUnderlineStyle}>
                        {" subTitle"}
                      </span>
                    </Tooltip>
                  </p>
                );
              },
              type: "input",
            },
            {
              key: "col-4",
              title: (
                <Tooltip title="This is the ReactNode type title, with subTitleRender">
                  <span className={OverflowUnderlineStyle}>
                    This is the ReactNode type
                  </span>
                </Tooltip>
              ),
              subTitleRender(props) {
                return (
                  <p className={cx(Typo.Label.l4_regular, CustomSubtitleStyle)}>
                    This is the ReactNode type subTitle, and it is a long
                    description
                  </p>
                );
              },
              type: "input",
            },
          ]}
          rowValidator={undefined}
          rowAddConfig={{
            addible: true,
          }}
          row={{
            deletable: true,
          }}
        />
      </ContentWrapper>
    </>
  ),
};
