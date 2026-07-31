import { cx } from "@linaria/core";
import { Antd5PrefixCls } from "@src/utils";
import { Tree as BaseAntd5Tree } from "antd5";
import React from "react";

import { Antd5TreeStyle } from "./Antd5Tree.style";
import { Antd5TreeProps } from "./Antd5Tree.type";

const InternalAntd5Tree = React.forwardRef<
  React.ComponentRef<typeof BaseAntd5Tree>,
  Antd5TreeProps
>(({ className, ...props }, ref) => (
  <BaseAntd5Tree
    {...props}
    className={cx(Antd5TreeStyle, className)}
    prefixCls={`${Antd5PrefixCls}-tree`}
    ref={ref}
  />
));

const InternalAntd5DirectoryTree = React.forwardRef<
  React.ComponentRef<typeof BaseAntd5Tree.DirectoryTree>,
  React.ComponentPropsWithoutRef<typeof BaseAntd5Tree.DirectoryTree>
>(({ className, ...props }, ref) => (
  <BaseAntd5Tree.DirectoryTree
    {...props}
    className={cx(Antd5TreeStyle, className)}
    prefixCls={`${Antd5PrefixCls}-tree`}
    ref={ref}
  />
));

export const Antd5Tree = Object.assign(InternalAntd5Tree, {
  DirectoryTree:
    InternalAntd5DirectoryTree as typeof BaseAntd5Tree.DirectoryTree,
  TreeNode: BaseAntd5Tree.TreeNode,
}) as typeof BaseAntd5Tree;
