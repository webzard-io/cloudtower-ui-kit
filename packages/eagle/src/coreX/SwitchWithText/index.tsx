import { styled } from "@linaria/react";
import Switch from "@src/core/Switch";
import useParrotTranslation from "@src/hooks/useParrotTranslation";
import React from "react";

import { SwitchWithTextProps } from "./switchWithText.type";

const SwitchWrapper = styled.span`
  .enabled-switch {
    display: flex;
    align-items: center;
  }

  .enabled-text {
    margin-right: 8px;
  }
`;

const SwitchWithText: React.FC<SwitchWithTextProps> = (props) => {
  const { t } = useParrotTranslation();
  const {
    text = { checked: t("common.enabled"), unchecked: t("common.disabled") },
    ..._props
  } = props;
  return (
    <SwitchWrapper
      className="enabled-switch"
      onClick={(e) => e.stopPropagation()}
    >
      <span className="enabled-text">
        {_props.checked ? text.checked : text.unchecked}
      </span>
      <Switch {..._props} />
    </SwitchWrapper>
  );
};

export default SwitchWithText;

export * from "./switchWithText.type";
