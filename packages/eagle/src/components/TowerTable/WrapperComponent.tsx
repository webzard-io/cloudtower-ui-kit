import React, { PropsWithChildren } from "react";

import { SidebarTable } from "../Table";

const WrapperComponent = (
  props: PropsWithChildren<{
    sidebar?: boolean;
    initLoading: boolean;
    wrapper: React.MutableRefObject<HTMLDivElement | null>;
  }>
) => {
  const { children, sidebar, initLoading, wrapper } = props;

  return sidebar ? (
    <SidebarTable
      isRender={!initLoading}
      children={children}
      wrapper={wrapper}
    />
  ) : (
    <React.Fragment>{children}</React.Fragment>
  );
};

export default WrapperComponent;
