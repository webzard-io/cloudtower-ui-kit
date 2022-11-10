import React from "react";
import { ImagesType } from "../../../../generated/images-type";
declare const Icon: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLSpanElement> & {
    type: ImagesType;
    active?: boolean | undefined;
    hoverType?: ImagesType | undefined;
    activeType?: ImagesType | undefined;
    className?: string | undefined;
    alt?: string | undefined;
    iconWidth?: number | undefined;
    iconHeight?: number | "auto" | undefined;
    cursor?: string | undefined;
    isRotate?: boolean | undefined;
    fileFormat?: "svg" | "jpg" | "png" | undefined;
    prefix?: React.ReactNode;
    suffixType?: {
        type: ImagesType;
        hoverType?: ImagesType | undefined;
        activeType?: ImagesType | undefined;
    } | undefined;
} & React.RefAttributes<HTMLSpanElement>>;
export default Icon;
