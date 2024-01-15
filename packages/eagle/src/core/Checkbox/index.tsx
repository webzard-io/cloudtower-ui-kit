import { CheckboxStyle } from "@src/core/Checkbox/checkbox.style";
import { Typo } from "@src/core/Typo";
import { Checkbox as AntdCheckbox } from "antd";
import { CheckboxProps } from "antd/lib/checkbox";
import cs from "classnames";
import React, { ReactNode } from "react";
const Checkbox: React.FC<
  CheckboxProps & {
    description?: ReactNode;
    compact?: boolean;
    "data-test"?: string;
  }
> = ({ className, children, description, compact, ...props }) => {
  return (
    <AntdCheckbox
      {...props}
      data-test={props["data-test"] || props.value}
      className={cs(className, CheckboxStyle, compact && "compact")}
    >
      {children ? (
        <>
          <div className={cs("main", Typo.Label.l2_regular)}>{children}</div>
          {description ? (
            <div className={cs("sub", Typo.Label.l4_regular)}>
              {description}
            </div>
          ) : null}
        </>
      ) : null}
    </AntdCheckbox>
  );
};

export default Checkbox;
