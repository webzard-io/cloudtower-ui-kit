import { HierarchyTriangleRight16PrimaryIcon } from "@cloudtower/icons-react";
import { Cascader as Antd5Cascader } from "antd5";
import cls from "classnames";
import React from "react";

import Icon from "../Icon";
import {
  CascaderDropdown,
  CascaderLargeDropdown,
  CascaderSmallDropdown,
} from "./cascader.style";
import { CascaderProps } from "./cascader.type";
import { NotDataContent, PresetCascaderRender } from "./cascader.widget";

export const CascaderSpliter = "__RC_CASCADER_SPLIT__";

const Cascader: React.FC<CascaderProps> = (props) => {
  const {
    // onChange,
    // options,
    size = "middle",
    NotData = "No Data",
    dropdownClassName,
    presetCascaderRenderProps,
    ...restProps
  } = props;

  return (
    //@ts-ignore
    <Antd5Cascader
      prefixCls="antd5"
      size={size}
      expandIcon={<Icon src={HierarchyTriangleRight16PrimaryIcon} />}
      dropdownClassName={cls(dropdownClassName, CascaderDropdown, {
        [CascaderLargeDropdown]: size === "large",
        [CascaderSmallDropdown]: size === "small",
      })}
      dropdownRender={(menus) => (
        <PresetCascaderRender menus={menus} {...presetCascaderRenderProps} />
      )}
      notFoundContent={<NotDataContent content={NotData} />}
      {...restProps}
    />
  );
};

export default Cascader;
