import { css } from "@linaria/core";
import { ParrotTrans } from "@src/core/ParrotTrans";
import Tag from "@src/core/Tag";
import React from "react";

import { I18nNameTagType } from "./i18nNameTag.type";

const tagStyle = css`
  @at-root {
    span#{&} {
      margin: 0 2px;
    }
  }
`;

// TODO: strict i18nKey type
const I18nNameTag: React.FC<I18nNameTagType> = (props) => {
  const { name, i18nKey, ...otherOption } = props;
  return (
    <ParrotTrans i18nKey={i18nKey} tOptions={otherOption}>
      h<Tag.NameTag className={tagStyle}>{{ name }}</Tag.NameTag>
    </ParrotTrans>
  );
};

export default I18nNameTag;

export * from "./i18nNameTag.type";
