import { HierarchyTriangleRight16PrimaryIcon } from "@cloudtower/icons-react";
import {
  CascaderDropdown,
  CascaderInputStyle,
  CascaderLargeDropdown,
  CascaderSmallDropdown,
} from "@src/core/Cascader/cascader.style";
import { CascaderProps } from "@src/core/Cascader/cascader.type";
import {
  defaultTagRender,
  NotDataContent,
  PresetCascaderRender,
} from "@src/core/Cascader/cascader.widget";
import Icon from "@src/core/Icon";
import { Antd5PrefixCls } from "@src/utils/constants";
import { Cascader as Antd5Cascader } from "antd5";
import cls from "classnames";
import React from "react";

export const Cascader: React.FC<CascaderProps> = (props) => {
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
      prefixCls={`${Antd5PrefixCls}-cascader`}
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

export * from "./cascader.style";
export * from "./cascader.type";
export * from "./cascader.widget";
