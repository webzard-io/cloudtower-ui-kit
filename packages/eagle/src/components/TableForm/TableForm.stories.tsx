import { parrotI18n } from "@cloudtower/parrot";
import { css } from "@linaria/core";
import { styled } from "@linaria/react";
import { Checkbox, Form, Input, Select, Space } from "antd";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import Button from "../Button";
import { Typo } from "../Typo";
import TableForm from ".";
import {
  DataType,
  DeletableConfigurations,
  TableFormColumn,
  TableFormHandle,
  TableFormProps,
  TableFormRowConfiguration,
  ValidateTriggerType,
} from "./types";

const Title: React.FC = ({ children }) => (
  <div style={{ marginTop: "16px" }} className={Typo.Display.d2_bold_title}>
    {children}
  </div>
);

const ContentWrapper = styled.div`
  padding: 20px;
`;

const formStyles = css`
  margin-bottom: "10px";
  max-width: "800px";
  overflow: hidden;
  .ant-form .ant-form-item {
    width: unset !important;
    flex-flow: unset;
  }
`;

const BatchInputForm: React.FC<{
  updateTableForm?: (data: DataType[]) => void;
  tableForm2DataLength?: number;
}> = ({ updateTableForm, tableForm2DataLength }) => {
  const onFinish = (values) => {
    if (tableForm2DataLength) {
      const newData = [...Array(tableForm2DataLength)].fill({ ...values });
      updateTableForm?.(newData);
    }
  };

  return (
    <Form
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete="off"
      className={formStyles}
      size="small"
      layout="inline"
    >
      <Form.Item label="起始管理 IP" name="address">
        <Input />
      </Form.Item>
      <Form.Item label="递增 input" name="increase">
        <Input />
      </Form.Item>
      <Form.Item label="密码" name="password">
        <Input.Password />
      </Form.Item>
      <Form.Item label="复选框" name="checkbox" valuePropName="checked">
        <Checkbox />
      </Form.Item>
      <Form.Item label="affix" name="affix">
        <Input />
      </Form.Item>
      <Form.Item label="自定义组件" name="customizedCmpt">
        <Select options={selectOptions} />
      </Form.Item>

      <Form.Item style={{ alignSelf: "flex-end" }}>
        <Button type="quiet" className="quiet-blue" htmlType="submit">
          批量填充
        </Button>
      </Form.Item>
    </Form>
  );
};

const story = {
  title: "TableForm",
};

const selectOptions = [
  { label: "选项 1", value: "option 1" },
  { label: "选项 2", value: "option 2" },
  { label: "选项 3", value: "option 3" },
  { label: "选项 4", value: "option 4" },
];

const getColumnsForValidation = (
  type: ValidateTriggerType
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
  rowValidator: (rowIndex, rowData) => {
    if (rowIndex === 2 && rowData["address"]?.includes("row")) {
      return "Row Level Error Msg.";
    }
  },
};

export const Basic = () => {
  const [formHandle, setFormHandle] = useState<TableFormHandle>();
  const [tableForm2DataLength, setTableForm2DataLength] = useState<number>();
  const ref1 = useRef<TableFormHandle>(null);
  const ref2 = useRef<TableFormHandle>(null);

  useEffect(() => {
    if (ref2.current !== null) {
      setFormHandle(ref2.current);
    }
    if (ref1.current !== null) {
      ref1.current.validateWholeFields();
    }
  }, []);

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
    []
  );

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
    [rowValidationForValidationForm]
  );
  return (
    <div style={{ padding: "20px" }}>
      change lng
      <Button
        onClick={() => {
          parrotI18n.changeLanguage("zh-CN");
        }}
      >
        中文
      </Button>
      <Button
        onClick={() => {
          parrotI18n.changeLanguage("en-US");
        }}
      >
        english
      </Button>
      <Space direction="vertical">
        <Title>Batch input TableForm</Title>
        <ContentWrapper>
          <TableForm
            {...commonTableFormProps}
            ref={ref1}
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
      </Space>
      <Space direction="vertical" style={{ marginTop: "32px", width: "100%" }}>
        <Title>Batch input TableForm with dynamic rows</Title>
        <ContentWrapper>
          <BatchInputForm
            updateTableForm={formHandle?.setData}
            tableForm2DataLength={tableForm2DataLength}
          />
          <TableForm
            ref={ref2}
            {...commonTableFormProps}
            deleteConfig={deleteConfig}
            disableBatchFilling
            validateTriggerType={ValidateTriggerType.Lazy}
            rowAddConfig={{
              addible: true,
              maximum: 8,
            }}
            onBodyChange={(data) => {
              setTableForm2DataLength(data.length);
            }}
          />
        </ContentWrapper>
      </Space>
      <Space direction="vertical" style={{ marginTop: "32px", width: "100%" }}>
        <Title>Draggable batch input TableForm</Title>
        <ContentWrapper>
          <TableForm
            {...commonTableFormProps}
            disableBatchFilling
            draggable
            validateTriggerType={ValidateTriggerType.Aggressive}
          />
        </ContentWrapper>
      </Space>
      <Space direction="vertical" style={{ marginTop: "32px", width: "100%" }}>
        <Title>Normal validate type for TableForm</Title>
        <ContentWrapper>
          <TableForm
            disableBatchFilling
            columns={getColumnsForValidation(ValidateTriggerType.Normal)}
            rowValidator={rowValidationForValidationForm}
          />
        </ContentWrapper>
      </Space>
      <Space direction="vertical" style={{ marginTop: "32px", width: "100%" }}>
        <Title>Lazy validate type for TableForm</Title>
        <ContentWrapper>
          <TableForm
            validateTriggerType={ValidateTriggerType.Lazy}
            disableBatchFilling
            columns={getColumnsForValidation(ValidateTriggerType.Lazy)}
            rowValidator={rowValidationForValidationForm}
          />
        </ContentWrapper>
      </Space>
      <Space direction="vertical" style={{ marginTop: "32px", width: "100%" }}>
        <Title>Aggressive validate type for TableForm</Title>
        <ContentWrapper>
          <TableForm
            validateTriggerType={ValidateTriggerType.Aggressive}
            disableBatchFilling
            columns={getColumnsForValidation(ValidateTriggerType.Aggressive)}
            rowValidator={rowValidationForValidationForm}
          />
        </ContentWrapper>
      </Space>
      <Space direction="vertical" style={{ marginTop: "32px", width: "100%" }}>
        <Title>Use new "row" configuration TableForm</Title>
        <ContentWrapper>
          <TableForm
            disableBatchFilling
            columns={getColumnsForValidation(ValidateTriggerType.Normal)}
            rowValidator={rowValidationForValidationForm}
            row={tableFormRowConfig}
          />
        </ContentWrapper>
      </Space>
      <Space direction="vertical">
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
                address: "this is address cell error",
                password: "this is password cell error",
              },
            ]}
          />
        </ContentWrapper>
      </Space>
    </div>
  );
};

Basic.story = {
  name: "Basic",
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/sv8N9opZrWCMApiGeq2V6M/Table-Form-%7C-%E8%A1%A8%E6%A0%BC%E8%A1%A8%E5%8D%95?type=design&node-id=1-41&t=3ZbR4MoYkAvXtd0P-0",
    },
  },
};

export default story;
