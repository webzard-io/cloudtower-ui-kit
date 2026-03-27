import { ArrowChevronLeftSmall16BoldBlueIcon } from "@cloudtower/icons-react";
import { css } from "@linaria/core";
import Button from "@src/core/Button";
import Icon from "@src/core/Icon";
import InputInteger from "@src/core/InputInteger";
import { PaginationStyle } from "@src/core/Pagination";
import { Typo } from "@src/core/Typo";
import useParrotTranslation from "@src/hooks/useParrotTranslation";
import cs from "classnames";
import React, { useCallback } from "react";

import { ISimplePaginationProps } from "./simplePagination.type";

const inputStyle = css`
  height: 24px;
  width: 56px !important;
  margin-right: 4px;
`;

const SimplePagination = (props: ISimplePaginationProps) => {
  const {
    className,
    current,
    count,
    size,
    onPageChange,
    "data-testid": dataTestId,
  } = props;
  const { t } = useParrotTranslation();
  const sub = (suffix: string) =>
    dataTestId ? `${dataTestId}-${suffix}` : undefined;

  const pageLength = count === 0 ? 1 : Math.ceil(count / size);
  const showPrev = current > 1;
  const showNext = current * size < count;

  const changeValue = useCallback(
    (value: string) => {
      const page = parseInt(value);
      if (page > 0) {
        onPageChange?.(Math.min(pageLength, page));
      } else {
        onPageChange?.(1);
      }
    },
    [onPageChange, pageLength],
  );

  return (
    <div
      data-testid={dataTestId}
      className={cs(PaginationStyle, "pagination-wrapper", className)}
    >
      <span className={Typo.Label.l3_regular_title}>
        {t("components.pagination_lots_total", {
          count,
        })}
      </span>

      <span className="pagination-right">
        {showPrev && (
          <Button
            className="prev-btn"
            type="quiet"
            size="small"
            data-testid={sub("prev")}
            style={{
              marginRight: "8px",
            }}
            prefixIcon={
              <Icon
                alt={"arrowChevronLeftSmall16BoldBlue"}
                src={ArrowChevronLeftSmall16BoldBlueIcon}
              />
            }
            onClick={() => {
              onPageChange?.(current - 1);
            }}
          ></Button>
        )}
        <InputInteger
          className={cs(Typo.Label.l3_regular, inputStyle)}
          value={current}
          size={"small"}
          data-testid={sub("input")}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              changeValue((event.target as HTMLInputElement).value);
            }
          }}
          onBlur={(event) => {
            changeValue((event.target as HTMLInputElement).value);
          }}
        />
        <span
          className={cs(
            css`
              color: $text-secondary-light;
            `,
            Typo.Label.l3_regular_upper,
          )}
        >{`/ ${pageLength}`}</span>
        {showNext && (
          <Button
            className="next-btn"
            type="quiet"
            size="small"
            data-testid={sub("next")}
            style={{
              marginLeft: "8px",
            }}
            prefixIcon={
              <Icon
                alt={"arrowChevronLeftSmall16BoldBlue"}
                src={ArrowChevronLeftSmall16BoldBlueIcon}
              />
            }
            onClick={() => {
              onPageChange?.(current + 1);
            }}
          ></Button>
        )}
      </span>
    </div>
  );
};

export default SimplePagination;

export * from "./simplePagination.type";
