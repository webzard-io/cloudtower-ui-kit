import { TabItem } from "@src/core/Tab/Tab.type";
import { isEqual } from "lodash";
import { RefObject, useCallback, useEffect, useState } from "react";

/**
 * 计算元素的实际占用宽度（包括 margin）
 */
const getPlacementWidth: (el: HTMLElement | null) => number = (el) => {
  if (!el) {
    return 0;
  }
  const computedStyle = window.getComputedStyle(el);
  const width = el.offsetWidth;
  const marginLeft = parseInt(computedStyle.marginLeft || "0");
  const marginRight = parseInt(computedStyle.marginRight || "0");
  return width + marginLeft + marginRight;
};

/**
 * Tab 自适应布局 Hook
 *
 * 根据可用空间自动计算哪些 tab 需要隐藏到"更多"菜单中。
 * 当容器尺寸变化、tabs 列表变化或 selectedKey 变化时，会自动重新计算布局。
 *
 * @param tabs - Tab 列表
 * @param tabsRef - Tab 容器的 ref
 * @param extraSlotRef - 额外插槽的 ref（用于计算可用宽度）
 * @param selectedKey - 当前选中的 tab key（用于触发重新计算，当选中项在"更多"菜单中时会影响按钮宽度）
 *
 * @returns moreTabs - 需要隐藏到"更多"菜单的 tabs 列表
 *
 * @example
 * ```tsx
 * const tabsRef = useRef<HTMLDivElement>(null);
 * const extraSlotRef = useRef<HTMLDivElement>(null);
 * const moreTabs = useTabAdaptiveLayout(tabs, tabsRef, extraSlotRef, selectedKey);
 * ```
 */
export const useTabAdaptiveLayout = (
  tabs: TabItem[],
  tabsRef: RefObject<HTMLDivElement>,
  extraSlotRef: RefObject<HTMLDivElement>,
  selectedKey?: string,
) => {
  const [moreTabs, setMoreTabs] = useState<Array<TabItem>>([]);

  /**
   * 自适应布局函数：根据可用空间计算哪些 tab 需要隐藏到"更多"菜单中
   *
   * 逻辑：
   * 1. 先移除所有 tab 的隐藏状态，让它们都显示出来以便测量宽度
   * 2. 计算可用宽度 = 父容器宽度 - extraSlot 宽度 - "更多"按钮宽度 - 安全边距(24px)
   * 3. 从左到右遍历所有 tab，累加宽度，当超过可用宽度时，将后续的 tab 隐藏
   * 4. 将需要隐藏的 tab 添加到 moreTabs 状态中，用于在"更多"下拉菜单中显示
   */
  const doAdapt = useCallback(() => {
    if (!tabsRef.current) return;

    const tabBarEl = tabsRef.current;
    const tabNodeList = tabBarEl.querySelectorAll(".tab-item-title.common");
    const moreTabNode: HTMLSpanElement | null = tabBarEl.querySelector(
      ".tab-item-title.more",
    );
    const moreTabPlacementWidth = getPlacementWidth(moreTabNode);

    tabNodeList.forEach((tab) => tab.classList.remove("__hidden"));

    const maxContentWidth =
      getPlacementWidth(tabBarEl.parentElement) -
      getPlacementWidth(extraSlotRef.current) -
      moreTabPlacementWidth;

    // More than Icon safe margin is 24px
    let tabsTotalWidth = 24;
    const hiddenItems: Array<TabItem> = [];
    let endIndex: number | null = Infinity;
    for (let i = 0; i < tabNodeList.length; i++) {
      const tab = tabNodeList[i] as HTMLSpanElement;
      const tabWidth = getPlacementWidth(tab);
      if (maxContentWidth >= tabsTotalWidth + tabWidth) {
        tabsTotalWidth += tabWidth;
      } else {
        endIndex = i;
        break;
      }
    }
    while (endIndex <= tabNodeList.length - 1) {
      tabNodeList[endIndex].classList.add("__hidden");
      hiddenItems.push(tabs[endIndex]);
      endIndex++;
    }

    setMoreTabs((prevMoreTabs) => {
      if (!isEqual(hiddenItems, prevMoreTabs)) {
        return hiddenItems;
      }
      return prevMoreTabs;
    });
  }, [tabs, tabsRef, extraSlotRef]);

  /**
   * 当 tabs 列表变化或 selectedKey 变化时，重新计算布局
   *
   * selectedKey 变化会影响布局的原因：
   * 当选中项在"更多"菜单中时，"更多"按钮会显示选中项的标题，这会改变按钮的宽度，
   * 从而影响可用空间的计算，需要重新执行自适应布局。
   */
  useEffect(() => {
    doAdapt();
  }, [doAdapt, selectedKey]);

  /**
   * 监听父容器尺寸变化
   *
   * 当窗口大小改变、父容器尺寸变化时，自动重新计算 tab 的布局，确保响应式适配。
   *
   * 为什么监听父元素而不是 tabsRef：
   * 因为可用宽度 = 父容器宽度 - extraSlot 宽度 - "更多"按钮宽度，
   * 所以需要监听父容器的尺寸变化，而不是 tab-bar 本身。
   */
  useEffect(() => {
    const parentElement = tabsRef.current?.parentElement;
    if (!parentElement) return;

    const resizeObserver = new ResizeObserver(() => {
      doAdapt();
    });

    resizeObserver.observe(parentElement);

    return () => {
      resizeObserver.disconnect();
    };
  }, [doAdapt, tabsRef]);

  return moreTabs;
};
