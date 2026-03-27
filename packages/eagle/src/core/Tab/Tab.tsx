import {
  MoreMenu16BlueIcon,
  MoreMenu16GrayIcon,
} from "@cloudtower/icons-react";
import { css, cx } from "@linaria/core";
import { Dropdown, Menu } from "antd";
import React, { useLayoutEffect, useMemo, useRef, useState } from "react";

import Icon from "../Icon";
import { Typo } from "../Typo";
import {
  IconStyle,
  MoreThanTooltipStyle,
  TabMenuWrapper,
  TabTitleElStyle,
} from "./Tab.style";
import { ActiveTabType, TabItem, TabProps } from "./Tab.type";
import { useTabAdaptiveLayout } from "./useTabAdaptiveLayout";

const getSelectedStyle: (
  key: string,
  type: ActiveTabType,
  selectedKey: string,
  activeTabType?: ActiveTabType,
) => string[] = (key, type, selectedKey, activeTabType) => {
  return key === selectedKey && activeTabType === type
    ? ["__selected", Typo.Label.l1_bold_title]
    : [Typo.Label.l1_regular];
};

export const Tab = (props: TabProps) => {
  const {
    className,
    contentClassName,
    tabs,
    onChange,
    selectedKey,
    extraSlot,
    size = "medium",
    "data-testid": dataTestId,
  } = props;
  const tabsRef = useRef<HTMLDivElement>(null);
  const extraSlotRef = useRef<HTMLDivElement>(null);
  const [isClickedMoreTabItem, setIsClickedMoreTabItem] = useState(false);

  const allTabs = useMemo(() => {
    return tabs.reduce<Map<string, TabItem>>((map, tab) => {
      map.set(tab.key, tab);
      return map;
    }, new Map([]));
  }, [tabs]);

  const selectedTab = useMemo(
    () => allTabs.get(selectedKey),
    [allTabs, selectedKey],
  );

  const moreTabs = useTabAdaptiveLayout(
    tabs,
    tabsRef,
    extraSlotRef,
    selectedKey,
  );

  const activeTabType = useMemo(() => {
    if (moreTabs?.find((tab: TabItem) => tab.key === selectedTab?.key)) {
      return ActiveTabType.More;
    }
    if (selectedTab?.key && allTabs.get(selectedTab.key)) {
      return ActiveTabType.Common;
    }
  }, [moreTabs, allTabs, selectedTab?.key]);

  /**
   * 当传入的 selectedKey 在当前 tabs 列表中不存在时（可能是 tabs 变化导致之前的 key 失效），
   * 自动选择第一个 tab 作为默认选中项，确保始终有一个 tab 处于选中状态。
   */
  useLayoutEffect(() => {
    if (!allTabs.get(selectedKey) && tabs?.[0]?.key) {
      onChange?.(tabs[0].key);
    }
  }, [allTabs, onChange, selectedKey, tabs]);

  return (
    <TabMenuWrapper data-testid={dataTestId} className={cx(className, size)}>
      <div className="tab-bar">
        <div ref={tabsRef} className="common-tab-bar">
          {
            /* tab items */
            tabs.map((tab) => (
              <span
                className={cx(
                  "tab-item-title",
                  "common",
                  ...getSelectedStyle(
                    tab.key,
                    ActiveTabType.Common,
                    selectedKey,
                    activeTabType,
                  ),
                )}
                key={tab.key}
                data-testid={tab["data-testid"]}
                onClick={() => onChange?.(tab.key)}
              >
                {typeof tab.title === "function"
                  ? tab.title({ isActive: tab.key === selectedKey })
                  : tab.title}
              </span>
            ))
          }
          {
            /* more tab items */
            moreTabs.length > 0 && (
              <>
                <Dropdown
                  trigger={["click"]}
                  overlayClassName={MoreThanTooltipStyle}
                  onVisibleChange={(visible) =>
                    setIsClickedMoreTabItem(visible)
                  }
                  getPopupContainer={(triggerNode) =>
                    document.querySelector(".tab-bar") || triggerNode
                  }
                  overlay={
                    <Menu
                      className="menu-wrapper"
                      onClick={(params) => {
                        setIsClickedMoreTabItem(false);
                        onChange?.(params.key as string);
                      }}
                    >
                      {moreTabs.map((tab: TabItem) => {
                        return (
                          <Menu.Item
                            className={cx(
                              "tab-menu-item",
                              ...getSelectedStyle(
                                tab.key,
                                ActiveTabType.More,
                                selectedKey,
                                activeTabType,
                              ),
                            )}
                            key={tab.key}
                            data-testid={tab["data-testid"]}
                          >
                            {typeof tab.title === "function"
                              ? tab.title({
                                  isActive: tab.key === selectedKey,
                                })
                              : tab.title}
                          </Menu.Item>
                        );
                      })}
                    </Menu>
                  }
                >
                  <span
                    className={cx(
                      "tab-item-title",
                      "more",
                      TabTitleElStyle,
                      activeTabType === ActiveTabType.More && "__selected",
                      activeTabType === ActiveTabType.More
                        ? Typo.Label.l1_bold_title
                        : Typo.Label.l1_regular,
                    )}
                    data-testid={dataTestId ? `${dataTestId}-more` : undefined}
                  >
                    <Icon
                      className={IconStyle}
                      hoverSrc={MoreMenu16BlueIcon}
                      src={MoreMenu16GrayIcon}
                      active={isClickedMoreTabItem}
                    />

                    {activeTabType === ActiveTabType.More && (
                      <span className="tab-title-text">
                        {typeof selectedTab?.title === "function"
                          ? selectedTab?.title({ isActive: true })
                          : selectedTab?.title}
                      </span>
                    )}
                  </span>
                </Dropdown>
                {/* 有额外内容才展示分隔符 */}
                {extraSlot && (
                  <span
                    className={css`
                      background: #acbad399;
                      content: "";
                      height: 100%;
                      margin: 0 6px;
                      width: 1px;
                    `}
                  />
                )}
              </>
            )
          }
        </div>
        {extraSlot && <div ref={extraSlotRef}>{extraSlot}</div>}
      </div>
      {tabs.map((tab) => (
        <div
          style={{ display: tab.key === selectedKey ? "block" : "none" }}
          key={tab.key}
          className={contentClassName}
        >
          {tab?.children}
        </div>
      ))}
    </TabMenuWrapper>
  );
};
