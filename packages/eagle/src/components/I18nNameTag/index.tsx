import { styled } from "@linaria/react";
import React from "react";
import { Trans } from "react-i18next";

export const NameTag = styled.span`
  font-size: 90%;
  font-weight: bold;
  background-color: rgba(240, 243, 247, 0.6);
  padding: 1px 4px 1px;
  margin-left: 2px;
  margin-right: 2px;
  border: 1px solid rgba(213, 219, 227, 0.6);
  border-radius: 4px;
  word-break: break-all;
`;

// TODO: strict i18nKey type
const I18nNameTag: React.FC<{
  name: string;
  i18nKey: string;
  [key: string]: unknown;
}> = (props) => {
  const { name, i18nKey, ...otherOption } = props;
  return (
    <Trans i18nKey={i18nKey} tOptions={otherOption}>
      h<NameTag>{name}</NameTag>
    </Trans>
  );
};

export default I18nNameTag;
