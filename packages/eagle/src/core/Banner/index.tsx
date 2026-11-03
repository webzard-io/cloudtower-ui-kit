import {
  ArrowChevronLeft16BoldOntintIcon,
  ArrowChevronRight16BoldOntintIcon,
  InfoICircleFill16OntintIcon,
  XmarkClearFill16OntintIcon,
} from "@cloudtower/icons-react";
import Icon from "@src/core/Icon";
import Tooltip from "@src/core/Tooltip";
import { Typo } from "@src/core/Typo";
import OverflowTooltip from "@src/coreX/OverflowTooltip";
import useParrotTranslation from "@src/hooks/useParrotTranslation";
import cls from "classnames";
import React from "react";

import {
  BannerWrapper,
  BasicBanner,
  ErrorBanner,
  InfoBanner,
  WarningBanner,
} from "./banner.style";
import { BannerProps } from "./banner.types";

export type { BannerProps } from "./banner.types";

export const Banner: React.FC<BannerProps> = ({
  message,
  type,
  btnProps,
  pagination,
  onClose,
  id,
  "data-testid": dataTestId,
}) => {
  const { t } = useParrotTranslation();
  const hasPagination = pagination && pagination.total > 1;
  // rc-trigger 在入场动画结束时会短暂恢复 opacity: 0，关闭动画以避免闪烁。
  return (
    <div className={BannerWrapper} data-testid={dataTestId} id={id}>
      <div
        className={cls("banner-body", Typo.Label.l3_bold, BasicBanner, {
          [ErrorBanner]: type === "error",
          [InfoBanner]: type === "info",
          [WarningBanner]: type === "warning",
        })}
      >
        {hasPagination && (
          <div className="banner-pagination">
            <Tooltip
              title={t("components.banner_previous")}
              placement="bottom"
              transitionName=""
            >
              <button
                type="button"
                aria-label={t("components.banner_previous")}
                onClick={() =>
                  pagination.onChange(
                    pagination.current === 1
                      ? pagination.total
                      : pagination.current - 1
                  )
                }
              >
                <Icon src={ArrowChevronLeft16BoldOntintIcon} />
              </button>
            </Tooltip>
            <span className="banner-count">
              {pagination.current}/{pagination.total}
            </span>
            <Tooltip
              title={t("components.banner_next")}
              placement="bottom"
              transitionName=""
            >
              <button
                type="button"
                aria-label={t("components.banner_next")}
                onClick={() =>
                  pagination.onChange(
                    pagination.current === pagination.total
                      ? 1
                      : pagination.current + 1
                  )
                }
              >
                <Icon src={ArrowChevronRight16BoldOntintIcon} />
              </button>
            </Tooltip>
          </div>
        )}
        <div className="banner-content">
          <Icon src={InfoICircleFill16OntintIcon} />
          <OverflowTooltip
            className="banner-message"
            transitionName=""
            content={message}
            placement="bottom"
          />
          {btnProps && !btnProps.hide && (
            <span
              role="button"
              tabIndex={0}
              className="dashed-btn banner-action"
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  event.currentTarget.click();
                }
              }}
              data-testid={dataTestId ? `${dataTestId}-action` : undefined}
              onClick={btnProps.onClick}
            >
              {btnProps.text}
            </span>
          )}
        </div>
        {onClose && type !== "error" && (
          <Tooltip
            title={t("components.banner_remove")}
            placement="bottom"
            transitionName=""
          >
            <button
              type="button"
              className="banner-close"
              aria-label={t("components.banner_remove")}
              onClick={onClose}
            >
              <Icon src={XmarkClearFill16OntintIcon} />
            </button>
          </Tooltip>
        )}
      </div>
    </div>
  );
};
