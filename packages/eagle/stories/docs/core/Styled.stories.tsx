import Radio from "@src/core/Radio";
import {
  CannotOperationInfo,
  ContentWrapper,
  Desc,
  LightDesc,
  RadioDesc,
  radioStyle,
} from "@src/core/Styled";
import React from "react";
const meta = {
  title: "Core/Styled",
};

export default meta;

export const ContentWrapperStory = () => {
  return <ContentWrapper>ContentWrapperStory</ContentWrapper>;
};

export const DescStory = () => {
  return <Desc>DescStory</Desc>;
};

export const LightDescStory = () => {
  return <LightDesc>LightDescStory</LightDesc>;
};

export const RadioDescStory = () => {
  return <RadioDesc>RadioDescStory</RadioDesc>;
};

export const RadioStyleStory = () => {
  return <Radio className={radioStyle} />;
};

export const CannotOperationInfoStory = () => {
  return (
    <div>
      desc
      <div className={CannotOperationInfo}>
        <div className="title">CannotOperationInfoStory Title</div>
        <div>content</div>
      </div>
    </div>
  );
};
