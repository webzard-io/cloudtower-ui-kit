import React, { Fragment } from "react";

import { LoadingComponentType } from "../../spec";
import { FullView } from "../Styled";

const Loading: LoadingComponentType = ({ fullView = true }) => {
  const Wrapper = fullView ? FullView : Fragment;
  const props = fullView ? { className: "loading-full-view" } : {};
  return (
    <Wrapper {...props}>
      <div className="loading">
        <div className="loading__sugar"></div>
        <div className="loading__sugar"></div>
        <div className="loading__sugar"></div>
        <div className="loading__sugar"></div>
        <div className="loading__sugar"></div>
        <div className="loading__sugar"></div>
        <div className="loading__sugar"></div>
      </div>
    </Wrapper>
  );
};

export default Loading;
