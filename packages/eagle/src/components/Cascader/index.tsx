import { HierarchyTriangleRight16PrimaryIcon } from "@cloudtower/icons-react";
import { Cascader as Antd5Cascader } from "antd5";
import cls from "classnames";
import React from "react";
import { Antd5PrefixCls } from "@src/utils/constants";
import Icon from "../Icon";
import {
  CascaderDropdown,
  CascaderInputStyle,
  CascaderLargeDropdown,
  CascaderSmallDropdown,
} from "./cascader.style";
import { CascaderProps } from "./cascader.type";
import {
  NotDataContent,
  PresetCascaderRender,
  defaultTagRender,
} from "./cascader.widget";

const Cascader: React.FC<CascaderProps> = (props) => {
  const {
    size = "middle",
    NotData = "No Data",
    dropdownClassName,
    presetCascaderRenderProps,
    ...restProps
  } = props;

  return (
    <Antd5Cascader
      size={size}
      prefixCls={Antd5PrefixCls}
      expandIcon={<Icon src={HierarchyTriangleRight16PrimaryIcon} />}
      popupClassName={cls(
        {
          [CascaderLargeDropdown]: size === "large",
          [CascaderSmallDropdown]: size === "small",
        },
        dropdownClassName,
        CascaderDropdown,
      )}
      dropdownRender={(menus) => (
        <PresetCascaderRender menus={menus} {...presetCascaderRenderProps} />
      )}
      notFoundContent={<NotDataContent content={NotData} />}
      tagRender={defaultTagRender}
      rootClassName={CascaderInputStyle}
      {...restProps}
    />
  );
};

export default Cascader;
