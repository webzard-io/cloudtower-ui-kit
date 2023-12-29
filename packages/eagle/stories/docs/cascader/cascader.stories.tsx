import { Filter16BlueSolidIcon } from "@cloudtower/icons-react";
import { Icon, Typo } from "@src/components";
import Button from "@src/components/Button";
import Cascader from "@src/components/Cascader";
import {
  CascaderDoubleRowOption,
  CascaderOptionWithCount,
} from "@src/components/Cascader/cascader.widget";
import Progress from "@src/components/Progress";
import SearchInput from "@src/components/SearchInput";
import Tag from "@src/components/Tag";
import { CoreMeta } from "@stories/types";
import type { StoryObj } from "@storybook/react";
import React, { useMemo, useState } from "react";

/**
 * Basic
 */
const meta: CoreMeta<typeof Cascader> = {
  component: Cascader,
  title: "Core/Cascader | 级联组件",
  argTypes: {
    open: {
      type: "boolean",
    },
  },
};

type Story = StoryObj<typeof Cascader>;

export default meta;

// 分为 large | middle | small
export const Size: Story = {
  storyName: "尺寸",
  render: (args) => {
    // const selectedMap = useMemo(() => {
    //   console.log(value);
    //   return [];
    // }, [value])
    return (
      <Cascader
        {...args}
        // value={value}
        onChange={(v) => {
          console.log(v);
        }}
        options={[
          {
            value: "c1",
            label: (
              <CascaderOptionWithCount
                label={"Cluster 1"}
                count={{ selected: 1, total: 2 }}
              />
            ),
            children: [
              { value: "v1", label: "VM-1" },
              { value: "v2", label: "VM-2" },
            ],
          },
          {
            value: "c2",
            label: (
              <CascaderOptionWithCount
                label={"Cluster 2"}
                count={{ selected: 1, total: 3 }}
              />
            ),
            children: [
              { value: "vv1", label: "VVM-1" },
              { value: "vv2", label: "VVM-2" },
              { value: "vv3", label: "VVM-3" },
            ],
          },
        ]}
        // presetCascaderRenderProps={{
        //   presetHeaderProps: {
        //     defaultContent: {
        //       label: "Label",
        //       onClickAll: (selectedAll) => {
        //         if (selectedAll) {
        //           //@ts-ignore
        //           setValue([]);
        //         } else {
        //           //@ts-ignore
        //           setValue(args.options?.map((o) => o.value));
        //         }
        //       },
        //     },
        //   },
        // }}
      />
    );
  },
  args: {
    size: "small",
    multiple: true,
  },
};

export const Empty: Story = {
  storyName: "空白状态",
  args: {
    NotData: "无虚拟机",
  },
};

// Double Row
export const DoubleRow: Story = {
  storyName: "Double Row",
  args: {
    size: "large",
    multiple: true,
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
                data-label-text={"node 2"}
                leftBottom={
                  <span className={Typo.Label.l4_regular}>node 1</span>
                }
                leftTop={<span className={Typo.Label.l2_medium}>Label</span>}
                rightBottom={
                  <div>
                    <span
                      style={{ marginRight: 2 }}
                      className={Typo.Label.l4_regular}
                    >
                      Label
                    </span>
                    <Progress
                      style={{ width: 80 }}
                      percent={80}
                      status="success"
                      showInfo={false}
                    />
                    <span className={Typo.Label.l4_regular}>80%</span>
                  </div>
                }
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
                leftTop={<span className={Typo.Label.l4_regular}>node 2</span>}
                rightTop={<Tag color="blue">Label</Tag>}
                rightBottom={"rightBottom"}
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
  storyName: "加载失败",
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
  storyName: "多项选择菜单",
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
  storyName: "筛选菜单",
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
  storyName: "配合 Filter Icon, 无 search 功能",
  args: {
    showSearch: true,
    options: Multiple.args?.options,
    children: <Icon src={Filter16BlueSolidIcon} />,
  },
};
