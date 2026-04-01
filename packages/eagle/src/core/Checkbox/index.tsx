import { CheckboxStyle } from "@src/core/Checkbox/checkbox.style";
import { Typo } from "@src/core/Typo";
import { Checkbox as AntdCheckbox } from "antd";
import { CheckboxProps } from "antd/lib/checkbox";
import cs from "classnames";
import React, { ReactNode, useCallback } from "react";
const Checkbox: React.FC<
  CheckboxProps & {
    description?: ReactNode;
    compact?: boolean;
    "data-testid"?: string;
  }
> = ({
  className,
  children,
  description,
  compact,
  "data-testid": dataTestId,
  ...props
}) => {
  // Ant Design Checkbox 的 change 事件绑在外层 <label> 上，
  // 但 data-* 属性会透传到内部隐藏的 <input>，导致 E2E 测试中
  // 通过 data-testid 定位到 input 后 click 无法触发 onChange。
  // 用 marker ref 将 data-testid 设置到外层 <label> 上。
  const markerRef = useCallback(
    (node: HTMLSpanElement | null) => {
      if (node) {
        const label = node.closest("label.ant-checkbox-wrapper");
        if (label) {
          const testId = dataTestId || props.value;
          if (testId) {
            label.setAttribute("data-testid", String(testId));
          }
        }
      }
    },
    [dataTestId, props.value],
  );

  return (
    <AntdCheckbox
      {...props}
      className={cs(className, CheckboxStyle, compact && "compact")}
    >
      {(dataTestId || props.value) && (
        <span ref={markerRef} style={{ display: "none" }} />
      )}
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
