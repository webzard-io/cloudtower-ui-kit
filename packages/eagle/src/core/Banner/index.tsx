import { InfoICircleFill16OntintIcon } from "@cloudtower/icons-react";
import Icon from "@src/core/Icon";
import { Typo } from "@src/core/Typo";
import { Show } from "@src/coreX";
import cls from "classnames";
import React from "react";

import {
  BasicBanner,
  ErrorBanner,
  InfoBanner,
  WarningBanner,
} from "./banner.style";
import { BannerProps } from "./banner.types";

export const Banner: React.FC<BannerProps> = ({
  message,
  type,
  btnProps,
  "data-testid": dataTestId,
}) => {
  return (
    <div data-testid={dataTestId} id="global-banner">
      <div
        className={cls(Typo.Label.l3_bold, BasicBanner, {
          [ErrorBanner]: type === "error",
          [InfoBanner]: type === "info",
          [WarningBanner]: type === "warning",
        })}
      >
        <Icon src={InfoICircleFill16OntintIcon} />
        <span>{message}</span>
        <Show condition={!btnProps?.hide}>
          <span
            className="dashed-btn"
            data-testid={dataTestId ? `${dataTestId}-action` : undefined}
            onClick={btnProps?.onClick}
          >
            {btnProps?.text}
          </span>
        </Show>
      </div>
    </div>
  );
};
