import { DotIntervalSeparation16TertiaryIcon } from "@cloudtower/icons-react";
import { css } from "@linaria/core";
import { styled } from "@linaria/react";
import Link from "@src/core/Link";
import { IconField, Info } from "@src/core/Progress/components";
import {
  ComponentType,
  IconFieldProps,
  InfoProps,
  Items,
} from "@src/core/Progress/progress.type";
import Tag from "@src/core/Tag";
import { LinkProps, TagProps } from "@src/spec";
import React from "react";

const splitMap: Record<string, React.ReactElement> = {
  dot: <DotIntervalSeparation16TertiaryIcon />,
};

const titleAreaStyle = css`
  min-width: 0;
  flex: 1;
  .tag {
    flex: 0 0 auto;
  }
  .progress-title {
    flex: 2;
    max-width: fit-content;
  }
  .progress-desc {
    flex: 1;
    max-width: fit-content;
  }
`;

export const InfoArea: React.FC<{
  title: string;
  tag?: TagProps;
  subtitle?: string;
}> = ({ title, tag, subtitle }) => {
  const items: Items = [];
  if (tag) {
    items.push({
      type: "tag",
      ...tag,
    });
  }
  items.push({
    type: "title",
    children: title,
  });
  if (subtitle) {
    items.push({
      type: "description",
      children: subtitle,
    });
  }

  return <Area className={titleAreaStyle} items={items} />;
};

const AreaWrapper = styled.div<{ gap: number }>`
  display: flex;
  align-items: center;
  column-gap: ${(props) => props.gap}px;
`;

export const Area: React.FC<{
  gap?: number;
  split?: React.ReactNode;
  className?: string;
  items: Items;
}> = ({ items, gap = 6, split, className }) => {
  const splitNode =
    typeof split === "string" ? splitMap[split] || split : split;
  return (
    <AreaWrapper className={className} gap={gap}>
      {items.map((item, idx) => {
        const { type, ...props } = item;

        return (
          <React.Fragment key={idx}>
            {getComponent(type, props)}
            {split && idx < items.length - 1 && splitNode}
          </React.Fragment>
        );
      })}
    </AreaWrapper>
  );
};

function getComponent(type: ComponentType, props: unknown): React.ReactElement {
  switch (type) {
    case "description":
    case "title":
      return <Info {...(props as InfoProps)} type={type} />;
    case "iconField":
      return <IconField {...(props as IconFieldProps)} />;
    case "link":
      return <Link {...(props as LinkProps)} />;
    case "tag":
      const { color, ...restProps } = props as TagProps;
      return <Tag {...restProps} color={color || "blue"} />;
  }
}
