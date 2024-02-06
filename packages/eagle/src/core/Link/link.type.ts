import { PropsWithChildren } from "react";

import { ButtonProps } from "../Button/button.type";

export type LinkProps = Omit<ButtonProps, "type"> & {
  type?: "default" | "primary" | "secondary";
};

export type LinkComponentType = React.ForwardRefExoticComponent<
  PropsWithChildren<LinkProps> & React.RefAttributes<HTMLButtonElement>
>;
