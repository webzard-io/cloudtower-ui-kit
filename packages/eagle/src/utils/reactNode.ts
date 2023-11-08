import { Fragment, isValidElement } from "react";

// copy from antd
export function isFragment(child: any): boolean {
  return child && isValidElement(child) && child.type === Fragment;
}
