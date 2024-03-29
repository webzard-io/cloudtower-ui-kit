import { Search16BlueIcon } from "@cloudtower/icons-react";
import { AntdSelect } from "@src/antd";
import { Fields } from "@src/core";
import InputGroup from "@src/core/InputGroup";
import InputInteger from "@src/core/InputInteger";
import Select from "@src/core/Select";
import { EMPTY_FUNCTION } from "@src/utils";
import { StoryObj } from "@storybook/react";
import React from "react";

const meta = {
  component: InputGroup,
  title: "Core/InputGroup",
};

export default meta;

type Story = StoryObj<typeof InputGroup>;

export const Simple: Story = {
  name: "基本用例",
  render: () => {
    return (
      <InputGroup compact={true}>
        <InputInteger />
        <Select
          className="type"
          input={{
            value: "LUN",
          }}
        >
          <AntdSelect.Option value={"LUN"}>LUN</AntdSelect.Option>
          <AntdSelect.Option value={"ISCSITarget"}>
            ISCSITarget
          </AntdSelect.Option>
          <AntdSelect.Option value={"Cluster"}>Cluster</AntdSelect.Option>
          <AntdSelect.Option value={"ConsistencyGroup"}>
            ConsistencyGroup
          </AntdSelect.Option>
        </Select>
        <Select input={{}} />
        <Fields.String
          size="small"
          className="filter-name-input"
          input={{
            name: "iscsi-lun-search",
            value: "search",
            onChange: EMPTY_FUNCTION,
            onFocus: EMPTY_FUNCTION,
            onBlur: EMPTY_FUNCTION,
          }}
          meta={{}}
        />
        <InputInteger />
        <Select input={{}} />
      </InputGroup>
    );
  },
};

export const Small: Story = {
  name: "小尺寸用例",
  render: () => {
    return (
      <InputGroup compact={true}>
        <InputInteger size="small" />
        <Select
          size="small"
          className="type"
          input={{
            value: "LUN",
          }}
        >
          <AntdSelect.Option value={"LUN"}>LUN</AntdSelect.Option>
          <AntdSelect.Option value={"ISCSITarget"}>
            ISCSITarget
          </AntdSelect.Option>
          <AntdSelect.Option value={"Cluster"}>Cluster</AntdSelect.Option>
          <AntdSelect.Option value={"ConsistencyGroup"}>
            ConsistencyGroup
          </AntdSelect.Option>
        </Select>
        <Select input={{}} size="small" />
        <Fields.String
          size="small"
          className="filter-name-input"
          input={{
            name: "iscsi-lun-search",
            value: "search",
            onChange: EMPTY_FUNCTION,
            onFocus: EMPTY_FUNCTION,
            onBlur: EMPTY_FUNCTION,
          }}
          prefix={<Search16BlueIcon />}
          meta={{}}
        />
        <InputInteger size="small" />
        <Select input={{}} size="small" />
      </InputGroup>
    );
  },
};
