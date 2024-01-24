import { DotIntervalSeparation16TertiaryIcon } from "@cloudtower/icons-react";
import { css } from "@linaria/core";
import { styled } from "@linaria/react";
import Link from "@src/core/Link";
import { Description, IconField, Title } from "@src/core/Progress/components";
import {
  ComponentType,
  DescriptionProps,
  IconFieldProps,
  Items,
} from "@src/core/Progress/progress.type";
import Tag from "@src/core/Tag";
import { LinkProps, TagProps } from "@src/spec";
import { TitleProps } from "antd/lib/typography/Title";
import React from "react";

const splitMap: Record<string, React.ReactElement> = {
  dot: <DotIntervalSeparation16TertiaryIcon />,
};

const titleAreaStyle = css`
  width: 100%;
  .tag {
    flex: 0 0 auto;
  }
  .progress-title {
    flex: 2;
    flex-basis: calc(2 / 3 * 100%);
  }
  .progress-description {
    flex: 1;
    flex-basis: calc(1 / 3 * 100%);
  }
`;

export const TitleArea: React.FC<{
  title: string;
  tag?: TagProps;
  subtitle?: string;
}> = ({ title, tag, subtitle }) => {
  const items: Items = [];
  if (tag) {
    items[0] = {
      type: "tag",
      ...tag,
    };
  }
  items.push({
    type: "title",
    content: title,
  });
  if (subtitle) {
    items.push({
      type: "description",
      content: subtitle,
    });
  }

  return <Area classname={titleAreaStyle} items={items} />;
};

const AreaWrapper = styled.div<{ gap: number }>`
  display: flex;
  align-items: center;
  column-gap: ${(props) => props.gap}px;
`;

export const Area: React.FC<{
  gap?: number;
  split?: string;
  classname?: string;
  items: Items;
}> = ({ items, gap = 6, split, classname }) => {
  return (
    <AreaWrapper className={classname} gap={gap}>
      {items.map((item, idx) => {
        const { type, ...props } = item;

        return (
          <React.Fragment key={idx}>
            {getComponent(type, props)}
            {split && idx < items.length - 1 && splitMap[split]}
          </React.Fragment>
        );
      })}
    </AreaWrapper>
  );
};

function getComponent(type: ComponentType, props: unknown): React.ReactElement {
  switch (type) {
    case "description":
      return <Description {...(props as DescriptionProps)} />;
    case "title":
      return <Title {...(props as TitleProps)} />;
    case "iconField":
      return <IconField {...(props as IconFieldProps)} />;
    case "link":
      return <Link {...(props as LinkProps)} />;
    case "tag":
      return <Tag {...(props as TagProps)} />;
  }
}
