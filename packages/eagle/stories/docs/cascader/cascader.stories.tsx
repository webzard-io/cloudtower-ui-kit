// @ts-nocheck
/* eslint-disable */
import { Filter16BlueSolidIcon } from "@cloudtower/icons-react";
import { Icon, Typo } from "@src/components";
import Button from "@src/components/Button";
import Cascader from "@src/components/Cascader";
import { CascaderDoubleRowOption } from "@src/components/Cascader/cascader.widget";
import SearchInput from "@src/components/SearchInput";
import Tag from "@src/components/Tag";
import Token from "@src/components/Token";
import { CoreMeta } from "@stories/types";
import type { StoryObj } from "@storybook/react";
import React, { useState } from "react";

/**
 * Basic
 */
const meta: CoreMeta<typeof Cascader> = {
  component: Cascader,
  title: "Core/Cascader | 级联组件",
};

type Story = StoryObj<typeof Cascader>;

export default meta;

// 分为 large | middle | small
export const Size: Story = {
  name: "尺寸",
  render: (args) => {
    const [value, setValue] = useState([]);
    return (
      <Cascader
        {...args}
        value={value}
        onChange={(v) => {
          setValue(v);
        }}
        presetCascaderRenderProps={{
          presetHeaderProps: {
            defaultContent: {
              label: "Label",
              onClickAll: (selectedAll) => {
                if (selectedAll) {
                  setValue([]);
                } else {
                  setValue(options.map((o) => [o.value]));
                }
              },
            },
          },
        }}
      />
    );
  },
  args: {
    size: "small",
    multiple: true,
    options: [
      {
        value: "c1",
        label: "Cluster",
        children: [
          { value: "v1", label: "VM-1" },
          { value: "v2", label: "VM-2" },
        ],
      },
      {
        value: "c2",
        label: "Cluster2",
        children: [
          { value: "vv1", label: "VVM-1" },
          { value: "vv2", label: "VVM-2" },
          { value: "vv3", label: "VVM-3" },
        ],
      },
    ],
  },
};

export const Empty: Story = {
  name: "空白状态",
  args: {
    NotData: "无虚拟机",
  },
};

export const DoubleRow: Story = {
  name: "Double Row",
  args: {
    size: "large",
    multiple: true,
    tagRender: ({ label }) => {
      if (Array.isArray(label) && React.isValidElement(label[0])) {
        return (
          <Token closable size="medium" color="blue">
            {label[0].props["data-label-text"]}
          </Token>
        );
      }
      return (
        <Token size="medium" closable color="blue">
          {label}
        </Token>
      );
    },
    options: [
      {
        value: "c1",
        label: "Cluster",
        children: [
          {
            value: "v1",
            key: "node 1",
            label: (
              <CascaderDoubleRowOption
                data-label-text={"node 1"}
                leftBottom="node 1"
                leftTop="Label"
                rightBottom={"Label"}
                rightTop={<Tag color="blue">Label</Tag>}
              />
            ),
          },
          {
            value: "v2",
            key: "node 2",
            label: (
              <CascaderDoubleRowOption
                data-label-text={"node 2"}
                leftTop={"node2"}
              />
            ),
          },
          {
            value: "v3",
            key: "node 3",
            label: (
              <CascaderDoubleRowOption
                data-label-text={"node 3"}
                leftTop={<span className={Typo.Label.l4_regular}>node 3</span>}
              />
            ),
          },
        ],
      },
    ],
  },
};

export const FetchError: Story = {
  name: "加载失败",
  args: {
    NotData: (
      <>
        <div>获取数据时遇到问题</div>
        <Button size="small">重试</Button>
      </>
    ),
  },
};

/**
 * 根据数据中心分级，选择多个集群
 */
export const Multiple: Story = {
  name: "多项选择菜单",
  args: {
    multiple: true,
    showSearch: true,
    children: <SearchInput onChange={() => {}} />,
    options: [
      {
        value: "datacenter-id-1",
        label: "IDC-B",
        children: [
          { value: "d-1-c-1", label: "Cluster B1" },
          { value: "d-1-c-2", label: "Cluster B2" },
        ],
      },
      {
        value: "datacenter-id-2",
        label: "IDC-C",
        children: [
          { value: "d-2-c-1", label: "Cluster C1" },
          { value: "d-2-c-2", label: "Cluster C2" },
        ],
      },
      {
        value: "datacenter-id-3",
        label: "IDC-D",
        children: [
          { value: "d-2-c-1", label: "Cluster D1" },
          { value: "d-2-c-2", label: "Cluster D2" },
        ],
      },
      {
        value: "unknown",
        label: "No Datacenter",
        children: [
          { value: "c-1", label: "Cluster 1" },
          { value: "c-2", label: "Cluster 2" },
        ],
      },
    ],
  },
};

/**
 * 根据可用域分级，筛选主机
 */
export const Filter: Story = {
  name: "筛选菜单",
  args: {
    showSearch: true,
    multiple: true,
    options: [
      {
        value: "id-1",
        label: "优先可用域",
        children: [
          { value: "h1", label: "node-name-1" },
          { value: "h2", label: "node-name-2" },
        ],
      },
      {
        value: "id-2",
        label: "次级可用域",
        children: [
          { value: "h3", label: "node-name-3" },
          { value: "h4", label: "node-name-4" },
        ],
      },
    ],
  },
};

// 配合 Filter Icon
export const FilterIcon: Story = {
  name: "配合 Filter Icon, 无 search 功能",
  args: {
    showSearch: true,
    options: Multiple.args?.options,
    children: <Icon src={Filter16BlueSolidIcon} />,
  },
};
