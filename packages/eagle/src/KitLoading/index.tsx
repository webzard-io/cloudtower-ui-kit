import React, { Fragment } from "react";

import { FullView, Loading } from "../components";
import { KitLoadingComponentType } from "../spec";

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
