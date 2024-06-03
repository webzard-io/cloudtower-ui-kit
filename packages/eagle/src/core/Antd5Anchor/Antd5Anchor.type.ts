import { AnchorLinkProps, AnchorProps } from "antd5";
import { FC } from "react";

export type Antd5AnchorComponentType = FC<AnchorProps> & {
  Link: FC<AnchorLinkProps>;
};

export type Antd5AnchorProps = AnchorProps;
export type Antd5AnchorLinkProps = AnchorLinkProps;
