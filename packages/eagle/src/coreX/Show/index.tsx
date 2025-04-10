import React from "react";

import { ShowProps } from "./show.type";

export const Show: React.FC<ShowProps> = ({
  condition,
  children,
  fallback,
}) => {
  if (typeof condition === "function") {
    condition = condition();
  }
  return condition ? <>{children}</> : fallback ?? <></>;
};
