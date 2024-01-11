import { css } from "@linaria/core";
import React from "react";

import { ParrotTrans } from "../../core/ParrotTrans";
import { I18nNameTagType } from "../../spec";
import Tag from "../../components/Tag";

const tagStyle = css`
  margin: 0 2px;
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
