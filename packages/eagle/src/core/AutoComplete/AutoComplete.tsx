import { AutoComplete as Antd5AutoComplete, AutoCompleteProps } from "antd5";
import cs from "classnames";
import React from "react";

import { SelectStyle as LegacySelectStyle } from "../LegacySelect/select.style";
import { SelectStyle } from "../Select/select.style";

export const AutoComplete: React.FC<AutoCompleteProps> = (props) => {
  return (
    <Antd5AutoComplete
      {...props}
      className={cs(LegacySelectStyle, SelectStyle, props.className)}
    />
  );
};
