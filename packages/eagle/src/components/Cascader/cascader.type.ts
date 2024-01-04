import { SearchInputProps } from "@src/spec/base";
import type { CascaderProps as Antd5CascaderProps } from "antd5/lib/cascader";

export type { Antd5SizeType } from "@src/utils/type";

export type PresetCascaderRenderProps = {
  menus: Parameters<NonNullable<CascaderProps["dropdownRender"]>>[0];
  header?: React.ReactNode;
  footer?: React.ReactNode;
  presetHeaderProps?: {
    searchProps?: SearchInputProps;
    defaultContent?: {
      hide?: boolean;
      label?: React.ReactNode;
      onClickAll?: (selectedAll: boolean) => void;
    };
  };
};

export type CascaderProps = Antd5CascaderProps & {
  /**
   * 自定义下拉菜单内容，具体可以参考[antd5](https://ant.design/components/cascader-cn/#API)
   * 注意：如果需要自定义下拉菜单，会覆盖掉已有的 header / footer 表现。
   */
  dropdownRender?: Antd5CascaderProps["dropdownRender"];
  /**
   * 自定义空白状态时的显示内容, 默认水平垂直居中。如果需要自定义样式，可以使用 notFoundContent
   */
  NotData?: string | React.ReactNode;
  /**
   * 透传参数给预设的级联下拉菜单内容
   */
  presetCascaderRenderProps?: Omit<PresetCascaderRenderProps, "menus">;
};
