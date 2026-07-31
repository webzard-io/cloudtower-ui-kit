import { css } from "@linaria/core";

import { Antd5PrefixCls } from "../../utils";
import { CheckboxStyleContent } from "../Checkbox/checkbox.style";

export const Antd5TreeStyle = css`
  ${(CheckboxStyleContent || "").replaceAll("ant-", `${Antd5PrefixCls}-tree-`)}
`;
