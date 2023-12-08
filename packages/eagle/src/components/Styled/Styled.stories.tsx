import React from "react";
import {
  CannotOperationInfo,
  ContentWrapper,
  Desc,
  LightDesc,
  RadioDesc,
  radioStyle,
} from ".";
import Radio from "../Radio";

const meta = {
  title: "Styled",
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
  return <div className={CannotOperationInfo}>CannotOperationInfoStory</div>;
};
