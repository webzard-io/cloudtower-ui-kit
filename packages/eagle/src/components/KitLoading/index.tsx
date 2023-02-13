import React, { Fragment } from "react";

import { KitLoadingComponentType } from "../../spec";
import { FullView, Loading } from "..";

const KitLoading: KitLoadingComponentType = ({ fullView = true }) => {
  const Wrapper = fullView ? FullView : Fragment;
  const props = fullView ? { className: "loading-full-view" } : {};
  return (
    <Wrapper {...props}>
      <Loading />
    </Wrapper>
  );
};

export default KitLoading;
