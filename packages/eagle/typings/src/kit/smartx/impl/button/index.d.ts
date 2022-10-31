import React from "react";
declare const Button: React.ForwardRefExoticComponent<{
    prefixIcon?: import("@cloudtower/eagle/kit/specify").ImagesType | undefined;
    hoverPrefixIcon?: import("@cloudtower/eagle/kit/specify").ImagesType | undefined;
    suffixIcon?: import("@cloudtower/eagle/kit/specify").ImagesType | undefined;
    hoverSuffixIcon?: import("@cloudtower/eagle/kit/specify").ImagesType | undefined;
    type?: "link" | "default" | "text" | "ghost" | "primary" | "dashed" | "secondary" | "tertiary" | "ordinary" | "ordinary-onTint" | "quiet" | undefined;
} & Omit<Partial<{
    href: string;
    target?: string | undefined;
    onClick?: React.MouseEventHandler<HTMLElement> | undefined;
} & import("antd/lib/button/button").BaseButtonProps & import("antd/lib/_util/type").Omit<React.AnchorHTMLAttributes<any>, "type" | "onClick"> & {
    htmlType?: "reset" | "submit" | "button" | undefined;
    onClick?: React.MouseEventHandler<HTMLElement> | undefined;
} & import("antd/lib/_util/type").Omit<React.ButtonHTMLAttributes<any>, "type" | "onClick">>, "type"> & React.RefAttributes<HTMLButtonElement>>;
export default Button;
