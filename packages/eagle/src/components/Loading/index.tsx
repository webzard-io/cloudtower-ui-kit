import React, { Fragment } from "react";

import { LoadingComponentType } from "../../spec";
import { FullView } from "../Styled";

const Loading: LoadingComponentType = ({ fullView = true }) => {
  const Wrapper = fullView ? FullView : Fragment;
  const props = fullView ? { className: "loading-full-view" } : {};
  return (
    <Wrapper {...props}>
      <div className="loading">
        <div className="loading-indicator__line1"></div>
        <div className="loading-indicator__line2"></div>
        <div className="loading-indicator__line3"></div>
      </div>
    </Wrapper>
  );
};

export default Loading;
