import {
  ArrowChevronDown16BoldBlueIcon,
  ArrowChevronDown16BoldSecondaryIcon,
  ArrowChevronDown16BoldTertiaryIcon,
  ArrowChevronUp16BoldBlueIcon,
  ArrowChevronUp16BoldSecondaryIcon,
  Search16BlueIcon,
  Search16SecondaryIcon,
} from "@cloudtower/icons-react";
import Icon from "@src/core/Icon";
import LegacySelect from "@src/core/LegacySelect";
import { Typo } from "@src/core/Typo";
import useParrotTranslation from "@src/hooks/useParrotTranslation";
import cs from "classnames";
import React from "react";

import {
  PlaceholderTextStyle,
  SelectIconStyle,
  SelectSizeStyle,
  SelectStyle,
} from "./select.style";
import { SelectComponentType } from "./select.type";

const Select: SelectComponentType<any, HTMLElement> = (props) => {
  const { size = "middle", isLoadingValue } = props;
  const { t } = useParrotTranslation();
  const typo = {
    large: Typo.Label.l2_regular,
    middle: Typo.Label.l3_regular,
    small: Typo.Label.l4_regular,
  }[size];

  return (
    <LegacySelect
      {...props}
      className={cs(
        SelectStyle,
        SelectIconStyle,
        SelectSizeStyle,
        isLoadingValue ? "select-loading-value" : "",
        props.className,
      )}
      placeholder={
        <span className={cs(typo, PlaceholderTextStyle)}>
          {isLoadingValue ? t("components.loading") : props.placeholder}
        </span>
      }
      suffixIcon={
        props.suffixIcon ||
        (props.loading ? undefined : (
          <>
            <Icon
              className="select-suffix"
              src={ArrowChevronDown16BoldTertiaryIcon}
            />
            <Icon
              className="select-hover-suffix"
              src={ArrowChevronDown16BoldBlueIcon}
            />
            <Icon
              className="select-active-suffix"
              src={ArrowChevronDown16BoldBlueIcon}
            />
            <Icon
              className="select-expanded-suffix"
              src={ArrowChevronUp16BoldBlueIcon}
            />
            <Icon
              className="select-expanded-search-suffix"
              src={Search16BlueIcon}
            />
            <Icon
              className="select-focus-suffix"
              src={ArrowChevronDown16BoldTertiaryIcon}
            />
            <Icon
              className="select-error-suffix"
              src={ArrowChevronDown16BoldTertiaryIcon}
            />
            <Icon
              className="select-error-hover-suffix"
              src={ArrowChevronDown16BoldSecondaryIcon}
            />
            <Icon
              className="select-error-active-suffix"
              src={ArrowChevronDown16BoldSecondaryIcon}
            />
            <Icon
              className="select-error-expanded-suffix"
              src={ArrowChevronUp16BoldSecondaryIcon}
            />
            <Icon
              className="select-error-expanded-search-suffix"
              src={Search16SecondaryIcon}
            />
            <Icon
              className="select-error-focus-suffix"
              src={ArrowChevronDown16BoldTertiaryIcon}
            />
          </>
        ))
      }
    />
  );
};

export default Select;

export * from "./select.type";
export * from "./select.widgets";
