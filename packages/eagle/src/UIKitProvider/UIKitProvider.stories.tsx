import type { Meta, StoryObj } from "@storybook/react";
import { TimePicker as Antd4TimePicker } from "antd";
import { TimePicker } from "antd5";
import { Cascader } from "../core/Cascader";
import React from "react";

import UIKitProvider from ".";

const meta: Meta<typeof UIKitProvider> = {
  component: UIKitProvider,
};

export default meta;

type Story = StoryObj<typeof UIKitProvider>;
export const Chinese: Story = {
  args: {
    config: {
      antd5Configs: {
        prefixCls: "custom",
      },
      antd4Configs: {
        prefixCls: "custom ant",
      },
    },
    children: (
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <Antd4TimePicker.RangePicker picker="time" />
        <TimePicker.RangePicker />
        <Cascader
          size="small"
          multiple
          options={[
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
          ]}
        />
      </div>
    ),
    lng: "zh-CN",
  },
};

export const English: Story = {
  args: {
    config: {
      antd4Configs: {
        prefixCls: "custom ant",
      },
      antd5Configs: {
        prefixCls: "custom",
      },
    },
    children: (
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <Antd4TimePicker.RangePicker picker="time" />
        <TimePicker.RangePicker />
        <Cascader
          size="small"
          multiple
          options={[
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
          ]}
        />
      </div>
    ),
  },
};
