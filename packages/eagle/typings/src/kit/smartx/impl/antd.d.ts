import { Kit } from "@cloudtower/eagle/kit/specify";
import React from "react";
export declare const InputTagItem: import("@linaria/react").StyledMeta & React.FunctionComponent<React.ClassAttributes<HTMLSpanElement> & React.HTMLAttributes<HTMLSpanElement> & Record<string, unknown> & {
    as?: React.ElementType<any> | undefined;
}>;
export declare const InputStyle: import("@linaria/core").LinariaClassName;
export declare const LeftEndInputStyle: import("@linaria/core").LinariaClassName;
export declare const RightEndInputStyle: import("@linaria/core").LinariaClassName;
export declare const LeftEndSelectStyle: import("@linaria/core").LinariaClassName;
export declare const RightEndSelectStyle: import("@linaria/core").LinariaClassName;
interface FormattedResult {
    value: number;
    unit: string;
}
export declare function formatBits(bits: number, decimals?: number): FormattedResult;
export declare function getAntdKit(): Kit;
export declare const antdKit: Kit<any, HTMLElement>;
export {};
