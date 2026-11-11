import { css } from "@linaria/core";
import { styled } from "@linaria/react";
import Link, { LinkProps } from "@src/core/Link";
import { IconField, Info } from "@src/core/Progress/components";
import {
  AreaProps,
  ComponentPropsMap,
  ComponentType,
  IconFieldProps,
  InfoProps,
  Items,
  TitleAreaProps,
} from "@src/core/Progress/progress.type";
import Tag from "@src/core/Tag";
import { Color } from "@src/styles/token/color";
import { splitMap } from "@src/utils/constants";
import React from "react";

import { TagProps } from "../Tag/tag.type";

const titleAreaStyle = css`
  min-width: 0;
  flex: 1;
  .tag {
    flex: 0 0 auto;
  }
  .progress-title {
    flex: 2;
    max-width: fit-content;
    color: ${Color.text.neutral.primary};
  }
  .progress-desc {
    flex: 1;
    max-width: fit-content;
  }
`;

const AreaWrapper = styled.div<{ gap: number }>`
  display: flex;
  align-items: center;
  column-gap: ${(props) => props.gap}px;
`;

export const Area: React.FC<AreaProps> = ({
  items,
  gap = 6,
  split,
  className,
}) => {
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

export const TitleArea: React.FC<TitleAreaProps> = ({
  title,
  tag,
  subtitle,
}) => {
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

  return <Area gap={6} className={titleAreaStyle} items={items} />;
};

function getComponent(type: ComponentType, props: unknown): React.ReactElement {
  switch (type) {
    case "description":
    case "title":
      return <Info {...(props as InfoProps)} type={type} />;
    case "iconField":
      return <IconField {...(props as IconFieldProps)} />;
    case "link":
      const { linkType, ...restLinkProps } = props as ComponentPropsMap["link"];
      const defaultLinkType = restLinkProps.prefixIcon
        ? "secondary"
        : "default";
      return (
        <Link
          {...(restLinkProps as LinkProps)}
          type={linkType || defaultLinkType}
        />
      );
    case "tag":
      const { color, ...restTagProps } = props as TagProps;
      return <Tag {...restTagProps} color={color || "blue"} />;
    default:
      return <></>;
  }
}
