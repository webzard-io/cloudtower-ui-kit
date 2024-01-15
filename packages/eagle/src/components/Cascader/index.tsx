import { HierarchyTriangleRight16PrimaryIcon } from "@cloudtower/icons-react";
import {
  CascaderDropdown,
  CascaderInputStyle,
  CascaderLargeDropdown,
  CascaderSmallDropdown,
} from "@src/components/Cascader/cascader.style";
import { CascaderProps } from "@src/components/Cascader/cascader.type";
import {
  defaultTagRender,
  NotDataContent,
  PresetCascaderRender,
} from "@src/components/Cascader/cascader.widget";
import Icon from "@src/components/Icon";
import { Antd5PrefixCls } from "@src/utils/constants";
import { Cascader as Antd5Cascader } from "antd5";
import cls from "classnames";
import React from "react";
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
        CascaderDropdown
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
