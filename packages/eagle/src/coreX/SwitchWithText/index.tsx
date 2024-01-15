import { styled } from "@linaria/react";
import Switch from "@src/core/Switch";
import React from "react";

import useParrotTranslation from "../../hooks/useParrotTranslation";
import { SwitchWithTextProps } from "../../spec";

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
    text = { checked: t("common.enable"), unchecked: t("common.disable") },
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
