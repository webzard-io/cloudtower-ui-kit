import React from "react";

export type LoadingComponentType = React.FunctionComponent<{
  fullView?: boolean;
  wrapperProps?: React.HTMLAttributes<HTMLDivElement>;
}>;
