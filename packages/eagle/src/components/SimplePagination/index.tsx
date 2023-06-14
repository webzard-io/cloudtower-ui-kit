import { css } from "@linaria/core";
import cs from "classnames";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";

import { ISimplePaginationProps } from "../../spec";
import Button from "../Button";
import Icon from "../Icon";
import { arrowChevronLeftSmall16BoldBlue } from "../images";
import InputInteger from "../InputInteger";
import { PaginationStyle } from "../Pagination";
import { Typo } from "../Typo";

const inputStyle = css`
  height: 24px;
  width: 56px !important;
  margin-right: 4px;
`;

const SimplePagination = (props: ISimplePaginationProps) => {
  const { className, current, count, size, onPageChange } = props;
  const { t } = useTranslation();

  const pageLength = Math.ceil(count / size);
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
    [onPageChange, pageLength]
  );

  return (
    <div className={cs(PaginationStyle, "pagination-wrapper", className)}>
      <span className={Typo.Label.l3_regular_title}>
        {t("components.pagination_lots_total", {
          total: count,
        })}
      </span>

      <span className="pagination-right">
        {showPrev && (
          <Button
            className="prev-btn"
            type="quiet"
            size="small"
            style={{
              marginRight: "8px",
            }}
            prefixIcon={
              <Icon
                alt={"arrowChevronLeftSmall16BoldBlue"}
                src={arrowChevronLeftSmall16BoldBlue}
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
            Typo.Label.l3_regular_upper
          )}
        >{`/ ${pageLength}`}</span>
        {showNext && (
          <Button
            className="next-btn"
            type="quiet"
            size="small"
            style={{
              marginLeft: "8px",
            }}
            prefixIcon={
              <Icon
                alt={"arrowChevronLeftSmall16BoldBlue"}
                src={arrowChevronLeftSmall16BoldBlue}
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
