import {
  ArrowChevronDown16SecondaryIcon,
  MoreEllipsis316BoldBlueIcon,
  XmarkRemove16BlueIcon,
  XmarkRemove16SecondaryIcon,
} from "@cloudtower/icons-react";
import { css } from "@linaria/core";
import Button from "@src/core/Button";
import Icon from "@src/core/Icon";
import { ExtraOverflow } from "@src/core/Overflow";
import Tooltip from "@src/core/Tooltip";
import { Typo } from "@src/core/Typo";
import useParrotTranslation from "@src/hooks/useParrotTranslation";
import { Action } from "@src/spec/type";
import { Dropdown as AntdDropdown, Menu as AntdMenu } from "antd";
import cs from "classnames";
import React, { useCallback, useMemo } from "react";

const SelectToolbar = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: $backgrounds-light-grouped;
  padding: 8px 12px;
  position: sticky;
  top: 0;
  z-index: 1;
  margin-bottom: -52px;

  .select-total {
    display: flex;
    align-items: center;
    font-weight: 700;
    flex-shrink: 0;

    .icon-wrapper {
      cursor: pointer;
      margin-left: 8px;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      justify-content: center;

      &:hover {
        background: $fills-light-trans-2;
      }
    }
  }
  .action-group {
    flex: 1;
    margin-left: 88px;
    white-space: nowrap;
    text-align: right;
    position: relative;
    padding: 4px 0;
    margin-top: -4px;
    overflow: hidden;
    .sub-menu-delete {
      transform: translateY(-4px);
    }
    button {
      border: none;
    }
    > *:not(:last-child) {
      margin-right: 8px;
    }

    > button:last-child {
      margin-right: 4px;
    }
    .more-btn {
      cursor: pointer;
      width: 32px;
      height: 32px;
      justify-content: center;
      border-radius: 50%;

      &:hover {
        background: $white;
      }
    }
  }
`;

export const renderBatchOperationMenuItem = (act: Action, idx = 0) => {
  if (act === "divider") {
    return <AntdMenu.Divider key={`divider-${idx}`} />;
  }
  if ("children" in act) {
    return (
      <AntdMenu.SubMenu
        className={cs(Typo.Label.l4_regular)}
        key={act.key}
        title={
          act?.icon ? (
            React.cloneElement(act.icon, {}, act.title)
          ) : (
            <span>{act.title}</span>
          )
        }
      >
        {act.children.map(renderBatchOperationMenuItem)}
      </AntdMenu.SubMenu>
    );
  }
  const Inner: React.FC = (props) => {
    return (
      <span {...props}>
        {act.icon ? React.cloneElement(act.icon, {}, act.title) : null}
        {act?.count && <span>{act.count}</span>}
      </span>
    );
  };
  return (
    <AntdMenu.Item
      key={act.key}
      onClick={act.onClick}
      danger={act.danger}
      disabled={!!act?.disabled}
      className={act?.danger && act.disabled ? "item-danger-disabled" : ""}
    >
      {"tooltip" in act && act.tooltip ? (
        <Tooltip title={act.tooltip}>
          <Inner />
        </Tooltip>
      ) : (
        <Inner />
      )}
    </AntdMenu.Item>
  );
};

const BatchOperation: React.FC<{
  count: number;
  onClearSelection: () => void;
  actions: Action[];
}> = (props) => {
  const { count, onClearSelection, actions } = props;
  const { t } = useParrotTranslation();

  const els = useMemo(() => {
    return actions.map((act, idx) => {
      if (act === "divider") {
        return <AntdMenu.Divider key={`divider-${idx}`} />;
      }
      if ("children" in act) {
        return (
          <AntdDropdown
            key={act.key}
            trigger={["click"]}
            placement="bottomRight"
            overlay={
              <AntdMenu>
                {act.children.map(renderBatchOperationMenuItem)}
              </AntdMenu>
            }
          >
            <Button
              key={act.key}
              type="ordinary-onTint"
              prefixIcon={act.icon != null ? act.icon : undefined}
              danger={act?.danger}
              className={`sub-menu-${act.key}`}
              suffixIcon={<Icon src={ArrowChevronDown16SecondaryIcon} />}
            >
              {act.title}
            </Button>
          </AntdDropdown>
        );
      }
      if (act.tooltip) {
        return (
          <Tooltip title={act.tooltip}>
            <Button
              key={act.key}
              type="ordinary-onTint"
              danger={act.danger}
              onClick={act.onClick}
              disabled={act.disabled}
              prefixIcon={act.icon != null ? act.icon : undefined}
            >
              {act.title}
            </Button>
          </Tooltip>
        );
      }
      return (
        <Button
          key={act.key}
          type="ordinary-onTint"
          danger={act.danger}
          onClick={act.onClick}
          disabled={act.disabled}
          prefixIcon={act.icon != null ? act.icon : undefined}
        >
          {act.title}
        </Button>
      );
    });
  }, [actions]);

  const getExtraEl = useCallback(
    (end) => (
      <AntdDropdown
        overlay={
          <AntdMenu>
            {actions.slice(end).map((act, idx) => {
              return act === "divider" ? (
                <AntdMenu.Divider key={`divider-${idx}`} />
              ) : "children" in act ? (
                <AntdMenu.SubMenu
                  className={cs(Typo.Label.l4_regular)}
                  key={act.key}
                  title={
                    act?.icon ? (
                      React.cloneElement(act.icon, {}, act.title)
                    ) : (
                      <span>{act.title}</span>
                    )
                  }
                >
                  {act.children.map(renderBatchOperationMenuItem)}
                </AntdMenu.SubMenu>
              ) : (
                renderBatchOperationMenuItem(act)
              );
            })}
          </AntdMenu>
        }
      >
        <Icon className="more-btn" src={MoreEllipsis316BoldBlueIcon} />
      </AntdDropdown>
    ),
    [actions],
  );

  return (
    <div className={SelectToolbar}>
      <span className="select-total">
        {t("components.selected_item_with_count", { count })}
        <Icon
          src={XmarkRemove16SecondaryIcon}
          hoverSrc={XmarkRemove16BlueIcon}
          onClick={onClearSelection}
        />
      </span>
      <ExtraOverflow
        className="action-group"
        reverse
        els={els}
        extraEl={getExtraEl}
      />
    </div>
  );
};

export default BatchOperation;
