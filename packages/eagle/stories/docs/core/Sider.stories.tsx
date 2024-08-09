import {
  ContainerRegistry24BlueIcon,
  ContainerRegistry24OntintIcon,
  GlobalConfiguration24GradientBlueIcon,
  GlobalConfiguration24OntintIcon,
  LogCollection24GradientBlueIcon,
  LogCollection24WhiteIcon,
  PhysicalMachineManagementBlue24Icon,
  PhysicalMachineManagementOntint24Icon,
  SksIpPool24BlueIcon,
  SksIpPool24WhiteIcon,
  SksManagementCluster24BlueIcon,
  SksManagementCluster24WhiteIcon,
  SksMonitoring24BlueIcon,
  SksMonitoring24WhiteIcon,
  SksNodeTemplate24BlueIcon,
  SksNodeTemplate24WhiteIcon,
  SksServiceUpgrade24BlueIcon,
  SksServiceUpgrade24WhiteIcon,
  SksZbsCsi24BlueIcon,
  SksZbsCsi24WhiteIcon,
  SoftwareLicense24GradientBlueIcon,
  SoftwareLicense24OntintIcon,
} from "@cloudtower/icons-react";
import Sider, { SiderProps } from "@src/coreX/Sider";
import { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";

import { Button } from "../../../src";

const config = [
  {
    title: "配置",
    items: [
      {
        icon: {
          normal: SoftwareLicense24GradientBlueIcon,
          active: SoftwareLicense24OntintIcon,
        },
        title: "软件许可",
        key: "license",
      },
    ],
    key: "general",
  },
  {
    title: "服务设置",
    key: "ip_pool",
    items: [
      {
        icon: {
          normal: SksZbsCsi24BlueIcon,
          active: SksZbsCsi24WhiteIcon,
        },
        title: "ZBS CSI 设置",
        key: "zbs_csi",
      },
      {
        icon: {
          normal: SksNodeTemplate24BlueIcon,
          active: SksNodeTemplate24WhiteIcon,
        },
        title: "节点相关文件",
        key: "node_related_files",
      },
      {
        icon: {
          normal: PhysicalMachineManagementBlue24Icon,
          active: PhysicalMachineManagementOntint24Icon,
        },
        title: "物理机管理",
        key: "pm_manage",
      },
      {
        icon: {
          normal: SksIpPool24BlueIcon,
          active: SksIpPool24WhiteIcon,
        },
        title: "管控集群 IP 池",
        key: "ip_pool",
      },
      {
        icon: {
          normal: GlobalConfiguration24GradientBlueIcon,
          active: GlobalConfiguration24OntintIcon,
        },
        title: "全局设置",
        key: "global_config",
      },
    ],
  },
  {
    title: "服务设置",
    key: "sks_maintainace",
    items: [
      {
        icon: {
          normal: SksManagementCluster24BlueIcon,
          active: SksManagementCluster24WhiteIcon,
        },
        title: "SKS 管控集群",
        key: "management_cluster",
      },
      {
        icon: {
          normal: ContainerRegistry24BlueIcon,
          active: ContainerRegistry24OntintIcon,
        },
        title: "SKS 镜像仓库",
        key: "registry",
      },
      {
        icon: {
          normal: SksMonitoring24BlueIcon,
          active: SksMonitoring24WhiteIcon,
        },
        title: "监控",
        key: "monitoring",
      },
      {
        icon: {
          normal: LogCollection24GradientBlueIcon,
          active: LogCollection24WhiteIcon,
        },
        title: "日志",
        key: "logging",
      },
      {
        icon: {
          normal: SksServiceUpgrade24BlueIcon,
          active: SksServiceUpgrade24WhiteIcon,
        },
        title: "升级 SKS",
        key: "upgrade_sks",
        disabled: true,
      },
    ],
  },
];

/**
 *
 * Sider 组件用于展示侧边栏。
 *
 */
const meta: Meta<SiderProps> = {
  title: "Core/Sider | 侧边栏",
  component: Sider,
};
export default meta;

/**
 *
 * Sider 的基本用法
 *
 */
export const Default: StoryObj<SiderProps> = {
  name: "基本用例",
  render: (props) => {
    const [selectedKey, setSelectedKey] = useState("license");
    return (
      <Sider
        {...props}
        config={config}
        selectedKeys={[selectedKey]}
        onClick={(key) => {
          setSelectedKey(key);
        }}
      >
        <Button type="quiet" danger style={{ margin: "auto" }}>
          卸载 SKS
        </Button>
      </Sider>
    );
  }
};

/**
 *
 * Sider 的收缩模式
 *
 */
export const Shrink: StoryObj<SiderProps> = {
  name: "收缩模式",
  render: (props) => {
    const [selectedKey, setSelectedKey] = useState("license");
    return (
      <Sider
        {...props}
        selectedKeys={[selectedKey]}
        onClick={(key) => {
          setSelectedKey(key);
        }}
      />
    );
  },
  args: {
    config,
    isShrink: true,
  },
};
