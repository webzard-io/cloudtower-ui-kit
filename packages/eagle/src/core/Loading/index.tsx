import {
  LoadingLine1,
  LoadingLine2,
  LoadingLine3,
  LoadingWrapper,
} from "@src/core/Loading/style";
import { FullView } from "@src/core/Styled";
import React, { Fragment } from "react";
import cx from "classnames";

import { LoadingComponentType } from "./loading.type";

const Loading: LoadingComponentType = ({
  fullView = true,
  wrapperProps = {},
}) => {
  const Wrapper = fullView ? FullView : Fragment;
  const { className, ...restWrapperProps } = wrapperProps;
  const props = fullView ? { className: "loading-full-view" } : {};
  return (
    <Wrapper {...props} data-testid="loading">
      <div className={cx(LoadingWrapper, className)} {...restWrapperProps}>
        <div className={LoadingLine1}></div>
        <div className={LoadingLine2}></div>
        <div className={LoadingLine3}></div>
      </div>
    </Wrapper>
  );
};

export default Loading;

export * from "./loading.type";
