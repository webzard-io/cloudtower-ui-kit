import {
  LoadingLine1,
  LoadingLine2,
  LoadingLine3,
  LoadingWrapper,
} from "@src/components/Loading/style";
import { FullView } from "@src/components/Styled";
import { LoadingComponentType } from "@src/spec";
import React, { Fragment } from "react";

const Loading: LoadingComponentType = ({ fullView = true }) => {
  const Wrapper = fullView ? FullView : Fragment;
  const props = fullView ? { className: "loading-full-view" } : {};
  return (
    <Wrapper {...props} data-testid="loading">
      <div className={LoadingWrapper}>
        <div className={LoadingLine1}></div>
        <div className={LoadingLine2}></div>
        <div className={LoadingLine3}></div>
      </div>
    </Wrapper>
  );
};

export default Loading;
