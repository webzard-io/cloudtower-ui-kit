import {
  ArrowBoldDown16WhiteIcon,
  PlusAddCreateNew16BoldOntintIcon,
} from "@cloudtower/icons-react";
import { css } from "@linaria/core";
import Button from "@src/core/Button";
import Icon from "@src/core/Icon";
import { Meta, StoryObj } from "@storybook/react";
import { Space } from "antd";
import _ from "lodash";
import React from "react";

const meta: Meta<typeof Button> = {
  title: "Core/Button",
  component: Button,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/nOhhbt8AO1EscJOfx60rfD/CloudTower-UI-Components?node-id=99%3A0",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Basic: Story = {
  args: {
    size: "middle",
    type: "primary",
    children: "text",
    loading: false,
  },
};

/**
 *      为了避免与 suffixIcon 和 prefixIcon 属性混淆使用，移除了 icon
        属性。如果您需要单独的图标按钮，请使用 suffixIcon 或 prefixIcon
        属性，并且不需要传递 children。
 */
export const Rounded: Story = {
  args: {
    size: "middle",
    type: "primary",
    prefixIcon: <Icon src={ArrowBoldDown16WhiteIcon} />,
  },
};

/**
 *   children 结构稍微复杂的情况，比如在 children 组合使用 Icon +
    text，需要使用者自己保证 Icon 和文字的间距
 */
export const CustomChildren: Story = {
  render: () => {
    return (
      <Space size={10}>
        <Button
          size="middle"
          type="primary"
          className={css`
            column-gap: 8px;
          `}
        >
          <Icon src={PlusAddCreateNew16BoldOntintIcon} />
          text
        </Button>

        <Button
          size="middle"
          type="primary"
          className={css`
            column-gap: 8px;
            width: 200px;
          `}
        >
          <Icon src={PlusAddCreateNew16BoldOntintIcon} />
          text
        </Button>
      </Space>
    );
  },
};

/**
 *  * 当 type 传入 'link'时，会呈现为超链接文本的形式
 * * 不建议通过 type='link' 的形式使用 button 来实现超链接的效果，应该使用  Link 组件
 * * 这里仅对已有的用法进行展示
 */
export const Link: Story = {
  args: {
    type: "link",
    children: "text",
  },
};

/**
 * * 禁用按钮示例
 * * 当 disabled 设置为 true 时，按钮将变为禁用状态
 * * 禁用状态下按钮不可点击，且样式会有相应变化
 */
export const Disabled: Story = {
  render: () => {
    return (
      <Space size={16} direction="vertical">
        <Space size={10}>
          <Button type="primary" disabled>
            禁用主按钮
          </Button>
          <Button type="default" disabled>
            禁用默认按钮
          </Button>
          <Button type="dashed" disabled>
            禁用虚线按钮
          </Button>
          <Button type="text" disabled>
            禁用文本按钮
          </Button>
          <Button type="link" disabled>
            禁用链接按钮
          </Button>
        </Space>

        <Space size={10}>
          <Button
            type="primary"
            disabled
            prefixIcon={<Icon src={PlusAddCreateNew16BoldOntintIcon} />}
          >
            禁用图标按钮
          </Button>
          <Button
            type="primary"
            disabled
            prefixIcon={<Icon src={PlusAddCreateNew16BoldOntintIcon} />}
          />
        </Space>
      </Space>
    );
  },
};
