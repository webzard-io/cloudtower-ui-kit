import { SubmissionErrors, ValidationErrors } from "@smartx/final-form";
import { FieldRenderProps } from "@smartx/react-final-form";
import { i18n as I18nType } from "i18next";
import React, { ReactElement } from "react";
export declare const FormError: import("@linaria/react").StyledMeta & React.FunctionComponent<React.ClassAttributes<HTMLSpanElement> & React.HTMLAttributes<HTMLSpanElement> & Record<string, unknown> & {
    as?: React.ElementType<any> | undefined;
}>;
export declare function deepGetErrorKey(value: string | object): string | undefined;
export declare const findFirstError: (fields: string[], errors?: ValidationErrors | SubmissionErrors) => SubmissionErrors | undefined;
export declare function analyzeFallbackError(fallback: unknown, i18n: I18nType): {
    msg: string;
    originalMsg: string;
} | null;
export declare const SubmitError: React.FC<{
    className?: string;
    fallback?: unknown;
}>;
export declare const V2AnalyzedError: React.FC<{
    className?: string;
    fallback?: unknown;
}>;
declare const FieldError: <T>(props: {
    name: string;
    children?: (props: FieldRenderProps<T>) => ReactElement;
}) => ReactElement | null;
export default FieldError;
