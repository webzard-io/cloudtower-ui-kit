import { Filter16BlueSolidIcon } from "@cloudtower/icons-react";
import { Icon, Typo } from "@src/core";
import Button from "@src/core/Button";
import { Cascader } from "@src/core/Cascader";
import { CascaderProps } from "@src/core/Cascader/cascader.type";
import { CascaderDoubleRowOption } from "@src/core/Cascader/cascader.widget";
import SearchInput from "@src/core/SearchInput";
import Tag from "@src/core/Tag";
import Token from "@src/core/Token";
import OverflowTooltip from "@src/coreX/OverflowTooltip";
import { CoreMeta } from "@stories/types";
import type { StoryObj } from "@storybook/react";
import React, { useState } from "react";

/**
 * * antd5 组件
 * * 更多 props 请参考：https://ant.design/components/cascader-cn#api
 * * 自定义 props 已在表格进行说明
 *
 */
const meta = {
  component: Cascader,
  title: "Core/Cascader | 级联组件",
  args: {
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
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/KnLAdpXGfsN6JlNk1JyFkf/Cascader%EF%BD%9C%E7%BA%A7%E8%81%94%E9%80%89%E6%8B%A9?node-id=18%3A84545&mode=dev",
    },
  },
} satisfies CoreMeta<typeof Cascader>;

export default meta;

type Story = StoryObj<typeof Cascader>;

/**
 * 注意： 全选需要自行封装相关实现， 非组件默认行为
 */
export const Size: Story = {
  name: "基本用例",
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = useState<CascaderProps["value"]>([]);
    return (
      <Cascader
        {...args}
        value={value}
        onChange={(v: CascaderProps["value"]) => {
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
                  setValue(args.options?.map((o) => [o.value]));
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

/**
 * 需要展示空白状态时，可以通过 NotData 来处理。
 */
export const Empty: Story = {
  name: "空白状态",
  args: {
    options: undefined,
    NotData: "无虚拟机",
  },
};

/**
 * NotData 同样可以接受 React.ReactNode 类型，来自定义空白状态里的内容。例如常见的加载失败。
 */
export const FetchError: Story = {
  name: "加载失败",
  args: {
    options: undefined,
    NotData: (
      <>
        <div>获取数据时遇到问题</div>
        <Button size="small">重试</Button>
      </>
    ),
  },
};

/**
 * UI-KIT 同时提供了 CascaderDoubleRowOption 组件，当需要使用 double row 时，可以自行封装
 *
 * option 中的 label 如果是 ReactNode 的情况下，可以通过 label[0].props 获取到一些额外自定义在组件上的属性来进一步处理。例如示例中的 data-label-text
 */
export const DoubleRow: Story = {
  name: "Double Row",
  args: {
    size: "large",
    multiple: true,
    open: true,
    tagRender: ({ label }) => {
      if (Array.isArray(label) && React.isValidElement(label[0])) {
        return (
          <Token closable size="medium" color="blue">
            {(label[0] as React.ReactElement).props["data-label-text"]}
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
                rightTop={<Tag color="blue">Label</Tag>}
                rightBottom={"Label"}
                leftTop={
                  <OverflowTooltip
                    tooltip={"l".repeat(200)}
                    content={"l".repeat(200)}
                  />
                }
                leftBottom={
                  <OverflowTooltip
                    tooltip={"x".repeat(200)}
                    content={"x".repeat(200)}
                  />
                }
              />
            ),
          },
          {
            value: "v2",
            key: "node 4",
            label: (
              <CascaderDoubleRowOption
                data-label-text={"node 2"}
                leftTop={
                  <OverflowTooltip
                    tooltip={"l".repeat(200)}
                    content={"l".repeat(200)}
                  />
                }
                leftBottom={
                  <OverflowTooltip
                    tooltip={"x".repeat(200)}
                    content={"x".repeat(200)}
                  />
                }
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

/**
 * 通过 children 来覆盖 cascader 自带的 input 组件
 */
export const FilterIcon: Story = {
  name: "自定义 Input",
  args: {
    showSearch: true,
    children: <Icon src={Filter16BlueSolidIcon} />,
  },
};

/**
 * 示例： 根据数据中心分级，选择多个集群
 */
export const Multiple: Story = {
  name: "多项选择菜单",
  args: {
    multiple: true,
    showSearch: true,
    children: <SearchInput onChange={() => {}} />,
  },
};

/**
 * 示例：根据可用域分级，筛选主机
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
