import { css, cx } from "@linaria/core";
import { styled } from "@linaria/react";
import Loading from "@src/core/Loading";
import React from "react";

import { InfoRow } from "./InfoRow";
import { InfoListProps } from "./InfoRowList.type";

const InfoListRowStyle = css`
  padding: 8px 0;

  .col-label {
    flex-shrink: unset;
    * {
      line-height: 18px;
    }
  }
  .col-content {
    flex: 1 1 0;
    display: flex;
    align-items: center;
    * {
      line-height: 18px;
    }
  }
`;

const LooseStyle = css`
  padding: 6px 0;

  .col-label * {
    font-size: 13px;
    line-height: 20px;
  }
  .col-content * {
    font-size: 14px;
    line-height: 20px;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex: 1;
  min-width: 0;
`;

const NullText = styled.div`
  color: $text-light-tertiary;
`;

export const InfoRowList = React.forwardRef<HTMLDivElement, InfoListProps>(
  function InfoList(props, ref) {
    const { loading, data, className, rowClassName, compact } = props;

    if (loading) {
      return (
        <div ref={ref} className={className}>
          <Loading />
        </div>
      );
    }

    return (
      <div ref={ref} className={className}>
        {data.map((item) => {
          const { key, value, name, action, hidden } = item;
          if (hidden) return null;
          return (
            <InfoRow
              key={key}
              className={cx(
                compact ? "" : LooseStyle,
                InfoListRowStyle,
                rowClassName,
              )}
              label={<div>{name || key}</div>}
              content={
                <ContentWrapper>
                  {value || <NullText>-</NullText>}
                  {action}
                </ContentWrapper>
              }
            />
          );
        })}
      </div>
    );
  },
);
