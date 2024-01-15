import {
  ArrowChevronDownSmall16BlueIcon,
  ArrowChevronDownSmall16SecondaryIcon,
  ArrowChevronLeftSmall16BoldBlueIcon,
} from "@cloudtower/icons-react";
import { css } from "@linaria/core";
import Button from "@src/components/Button";
import Icon from "@src/components/Icon";
import useParrotTranslation from "@src/hooks/useParrotTranslation";
import { PaginationProps } from "@src/spec";
import { Menu } from "antd";
import { Dropdown as AntdDropdown } from "antd";
import cs from "classnames";
import React, { useEffect, useMemo, useRef } from "react";

export const PaginationStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  color: $text-light-secondary;
  font-size: 12px;
  line-height: 24px;

  .pagination-left {
    padding: 2px 8px;
  }

  .dropdown-trigger {
    display: flex;
    align-items: center;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background: $fills-interaction-light-general-hover;
      color: $text-light-general;
    }
    .icon-inner {
      margin-left: 4px;
    }
  }

  .pagination-right {
    display: flex;
    align-items: center;
    color: $blue-60;
    font-weight: bold;
    .icon-inner {
      margin-left: 4px;
    }
    .prev-btn,
    .next-btn {
      padding: 0 8px;
      > span {
        color: $text-light-general;
      }
    }

    .next-btn {
      .icon-inner {
        transform: rotate(180deg);
      }
    }
  }
`;

const DropdownOverlayStyle = css`
  &.ant-dropdown .ant-dropdown-menu {
    max-height: calc(100vh - 128px);
    overflow-y: auto;

    .ant-dropdown-menu-item {
      padding: 4px 20px;
      font-size: 12px;
      line-height: 18px;
    }
  }
`;

const Pagination: React.FC<PaginationProps> = (props) => {
  const {
    current,
    count,
    onChange,
    size,
    onSizeChange,
    showTotal = true,
    className,
    selectorVisible = true,
  } = props;
  const sizeRef = useRef(size);
  const { t } = useParrotTranslation();

  useEffect(() => {
    if (sizeRef.current === size) return;
    sizeRef.current = size;
    onSizeChange?.(size);
  }, [count, size, onSizeChange]);

  const selectOptions = useMemo(() => {
    if (!selectorVisible) return [];
    return Array.from({ length: Math.ceil(count / size) }, (r, i) => {
      const value = i * size;
      const lastRange = value + size;
      return {
        value: i + 1,
        text: t("components.pagination_range", {
          range1: value + 1,
          range2: lastRange > count ? count : lastRange,
        }),
      };
    });
  }, [selectorVisible, count, size, t]);

  let lastRange = current * size;
  lastRange = lastRange > count ? count : lastRange;

  const renderLeft = () => {
    if (!showTotal) return null;
    const content = t("components.pagination_total", {
      range1: (current - 1) * size + 1,
      range2: lastRange,
      total: count,
    });
    if (selectorVisible) {
      return (
        <AntdDropdown
          placement="topLeft"
          overlayClassName={DropdownOverlayStyle}
          overlay={
            <Menu>
              <Menu.ItemGroup title={t("components.push_to")}>
                {selectOptions.map((option) => (
                  <Menu.Item
                    key={option.value}
                    onClick={() => onChange(option.value)}
                  >
                    {option.text}
                  </Menu.Item>
                ))}
              </Menu.ItemGroup>
            </Menu>
          }
        >
          <Icon
            alt={"arrowChevronDownSmall16Secondary"}
            className="pagination-left dropdown-trigger"
            src={ArrowChevronDownSmall16SecondaryIcon}
            hoverSrc={ArrowChevronDownSmall16BlueIcon}
            prefix={content}
          />
        </AntdDropdown>
      );
    }
    return <span className="pagination-left">{content}</span>;
  };

  if (count === 0) {
    // do not render when count is 0
    return null;
  }

  return (
    <div
      className={cs(
        PaginationStyle,
        "pagination-wrapper",
        className,
        selectorVisible && "has-selector"
      )}
    >
      {renderLeft()}
      <span className="pagination-right">
        {current > 1 && (
          <Button
            className="prev-btn"
            type="quiet"
            size="small"
            prefixIcon={
              <Icon
                alt={"arrowChevronLeftSmall16BoldBlue"}
                src={ArrowChevronLeftSmall16BoldBlueIcon}
              />
            }
            onClick={() => {
              onChange?.(current - 1);
            }}
          >
            {t("components.previous_items", { size })}
          </Button>
        )}
        {current * size < count && (
          <Button
            className="next-btn"
            type="quiet"
            size="small"
            suffixIcon={
              <Icon
                alt={"arrowChevronLeftSmall16BoldBlue"}
                src={ArrowChevronLeftSmall16BoldBlueIcon}
              />
            }
            onClick={() => {
              onChange?.(current + 1);
            }}
          >
            {t("components.next_items", { size })}
          </Button>
        )}
      </span>
    </div>
  );
};

export default Pagination;
