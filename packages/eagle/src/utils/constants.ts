import antd5 from "antd5";
export const EMPTY_FUNCTION = () => {};
export const EMPTY_ARRAY = [];
export const EMPTY_OBJECT = {};
export const EMPTY_COMPONENT = () => null;

export const DAYJS_I18N_MAP: Record<string, string> = {
  "zh-CN": "zh-cn",
  "en-US": "en",
};

export const Antd5PrefixCls = "antd5";

export const Antd5ComponentPrefixCls = {
  Cascader: `${Antd5PrefixCls}-cascader`,
  Progress: `${Antd5PrefixCls}-progress`,
  Segmented: `${Antd5PrefixCls}-segmented`,
  Menu: `${Antd5PrefixCls}-menu`,
} satisfies Partial<Record<keyof typeof antd5, string>>;
