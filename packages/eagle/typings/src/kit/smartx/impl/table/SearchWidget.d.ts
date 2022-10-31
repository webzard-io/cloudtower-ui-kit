/// <reference types="react" />
import { EnumProps, FormatUnit, IntProps, StringProps } from "@cloudtower/eagle/kit/specify";
declare type FieldProps<T, V = T[keyof T]> = {
    where?: T;
    setWhere: (updates: Array<{
        key: keyof T;
        value: V | undefined;
    }>) => void;
    name: keyof T;
    __rawWhere?: T;
};
export declare const StringField: <T extends Record<string, unknown>>(props: FieldProps<T, T[keyof T]> & StringProps) => JSX.Element;
export declare const BooleanField: <T extends Record<string, unknown>>(props: FieldProps<T, boolean> & Partial<EnumProps>) => JSX.Element;
export declare const IntField: <T extends Record<string, unknown>>(props: FieldProps<T, T[keyof T]> & IntProps) => JSX.Element;
export declare const FormatIntField: <T extends Record<string, unknown>>(props: FieldProps<T, T[keyof T]> & IntProps & {
    formatUnit: FormatUnit;
}) => JSX.Element;
export declare const EnumField: <T extends Record<string, unknown>>(props: FieldProps<T, string[]> & EnumProps) => JSX.Element;
export {};
