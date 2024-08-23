import React from "react";

export type LoadingComponentType = React.FunctionComponent<
  React.HTMLAttributes<HTMLDivElement> & { fullView?: boolean }
>;
