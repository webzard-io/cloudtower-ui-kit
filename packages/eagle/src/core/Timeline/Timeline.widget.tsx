import React from "react";
import { cx } from "@linaria/core";
import { splitMap } from "@src/utils/constants";
import Link from "@src/core/Link";
import { Typo } from "@src/core/Typo";
import OverflowTooltip from "@src/coreX/OverflowTooltip";
import Tag from "@src/core/Tag";
import { Flex } from "antd5";
import cls from "classnames";
import { InfoTextWrapper, SubInfoTextWrapper } from "./Timeline.style";
import {
  TimelineAreaProps,
  TimelineInfoProps as InfoProps,
  TimelineLinkProps as LinkProps,
  TimelineTagProps as TagProps,
} from "./Timeline.type";
import { Show } from "@src/coreX";

const TimelineBasicText: React.FC<InfoProps> = ({
  children,
  className,
  multiLines,
}) => {
  return (
    <OverflowTooltip
      className={className}
      multiLines={multiLines ?? 2}
      content={children}
    />
  );
};

export const TimelineArea: React.FC<
  TimelineAreaProps & { compact?: boolean }
> = ({ items, gap = 1, split, suffix, className, compact }) => {
  const splitNode =
    typeof split === "string" ? splitMap[split] || split : split;

  const rendetItem = <T extends TimelineAreaProps["items"][number]["category"]>(
    category: T,
    props: Extract<TimelineAreaProps["items"][number], { category: T }>,
    compact?: boolean,
  ) => {
    const { className, ...restProps } = props;
    switch (category) {
      case "subinfo_label":
        return (
          <TimelineBasicText
            className={cx(SubInfoTextWrapper, Typo.Label.l4_regular, className)}
            {...(restProps as InfoProps)}
          />
        );
      case "info":
        return (
          <TimelineBasicText
            className={cls(
              InfoTextWrapper,
              {
                [Typo.Label.l4_regular]: compact,
                [Typo.Label.l2_regular]: !compact,
              },
              className,
            )}
            {...(restProps as InfoProps)}
          />
        );
      case "info_bold":
        return (
          <TimelineBasicText
            className={cls(
              InfoTextWrapper,
              {
                [Typo.Label.l4_bold]: compact,
                [Typo.Label.l2_bold]: !compact,
              },
              className,
            )}
            {...(restProps as InfoProps)}
          />
        );
      case "link":
        return <Link {...(props as LinkProps)} />;
      case "tag":
        return <Tag {...(props as TagProps)} />;
    }
  };
  return (
    <Flex justify="space-between" align="center" className={className}>
      <Flex align="center" gap={gap}>
        {items.map((item, idx) => {
          const { category } = item;
          return (
            <React.Fragment key={idx}>
              {rendetItem(category, item, compact)}
              <Show condition={Boolean(split)}>
                <Show condition={idx < items.length - 1}>{splitNode}</Show>
              </Show>
            </React.Fragment>
          );
        })}
      </Flex>
      <Show condition={Boolean(suffix)}>
        <Show condition={Boolean(split)}>{splitNode}</Show>
        {suffix}
      </Show>
    </Flex>
  );
};
