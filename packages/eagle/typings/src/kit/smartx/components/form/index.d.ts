import { Kit } from "@cloudtower/eagle/kit/specify";
import { FormApi, FormState, FormSubscription, MutableState, SubmissionErrors, Tools } from "@smartx/final-form";
import { FieldMetaState, FieldRenderProps, FormProps, FormRenderProps, UseFormStateParams } from "@smartx/react-final-form";
import { FieldArrayRenderProps } from "@smartx/react-final-form-arrays";
import { ColProps } from "antd/lib/col";
import { Component, ReactElement, ReactNode } from "react";
declare type FormItemLayout = {
    label?: ColProps;
    control?: ColProps;
};
export declare type LayoutProps = {
    compact?: boolean;
    formItem?: FormItemLayout;
};
export declare const DEFAULT_LAYOUT: {
    formItem: Required<FormItemLayout>;
};
declare type SetValuesMutator = ([mutate]: [(prevValues: Readonly<any>) => any], state: MutableState<any>) => void;
export declare const setValuesMutator: SetValuesMutator;
export declare const arrayMutators: {
    replace: ([name, value]: [string, any[]], state: MutableState<any>, { changeValue }: Tools<any>) => void;
    insert: import("@smartx/final-form").Mutator<any>;
    concat: import("@smartx/final-form").Mutator<any>;
    move: import("@smartx/final-form").Mutator<any>;
    pop: import("@smartx/final-form").Mutator<any>;
    push: import("@smartx/final-form").Mutator<any>;
    removeBatch: import("@smartx/final-form").Mutator<any>;
    remove: import("@smartx/final-form").Mutator<any>;
    shift: import("@smartx/final-form").Mutator<any>;
    swap: import("@smartx/final-form").Mutator<any>;
    update: import("@smartx/final-form").Mutator<any>;
    unshift: import("@smartx/final-form").Mutator<any>;
};
export declare type UseFormApi<T> = FormApi<T> & {
    setValues: (callback: (prev: Readonly<T>) => T) => void;
};
export declare type BaseFormProps<T, V, O = {}> = {
    initialValues?: T;
    keepDirtyOnReinitialize?: boolean;
    onSubmit: (values: T, form: FormApi<T>, callback?: (errors?: SubmissionErrors) => void) => SubmissionErrors | Promise<SubmissionErrors | undefined> | undefined | void;
    subscription?: FormSubscription;
    validation?: V;
    onChanges?: O;
    render: (props: Omit<FormRenderProps<T>, "form"> & {
        form: UseFormApi<T>;
    }) => ReactElement;
    layout?: LayoutProps;
    debug?: FormProps["debug"];
};
export declare type FormContextType<Validators = {}, OnChanges = {}> = {
    layout: LayoutProps;
    kit: Kit;
    validators: Validators;
    onChanges: OnChanges;
};
declare type BaseFieldState<T> = FieldMetaState<T> & {
    value: T;
};
export declare type FieldProps<T> = {
    defaultValue?: T;
    initialValue?: T;
    format?: (value: T, name: string) => any;
    parse?: (value: any, name: string) => T;
    label?: ((props: BaseFieldState<T>) => ReactElement | null) | ReactNode;
    error?: ((props: BaseFieldState<T>) => ReactElement | null) | ReactNode;
    extra?: ((props: BaseFieldState<T>) => ReactElement | null) | ReactNode;
    render?: ((props: FieldRenderProps<T>) => ReactElement | null) | ReactNode;
    className?: string;
    autoFocus?: boolean;
    layout?: {
        label?: ColProps;
        control?: ColProps;
    };
    index?: number | number[];
};
export declare type FieldOnChange<T, FV> = (args: {
    name?: string;
    value: T | undefined;
    setValues: UseFormApi<FV>["setValues"];
}) => void;
export declare type FieldListenerProps<T, FV> = {
    name: string;
    onChange: FieldOnChange<T, FV>;
};
export declare class BaseField<T, FV, P extends FieldProps<T> = FieldProps<T>> extends Component<P> {
    path: string;
    form: string;
    defaultRender?: FieldProps<T>["render"];
    render(): JSX.Element | null;
}
export declare type FieldArrayRenderPropsFields<T> = FieldArrayRenderProps<T, HTMLElement>["fields"] & {
    replace: (value: T[]) => void;
};
export declare type FieldArrayRender<T> = (props: {
    fields: FieldArrayRenderPropsFields<T>;
    meta: FieldArrayRenderProps<T, HTMLElement>["meta"];
}) => ReactElement | null;
declare type BaseFieldArrayState<T> = FieldArrayRenderProps<T, HTMLElement>["meta"] & {
    value?: T[];
};
export declare type FieldArrayProps<T> = {
    defaultValue?: T[];
    initialValue?: T[];
    format?: (value: T[], name: string) => any;
    parse?: (value: any, name: string) => T[];
    label?: ((props: BaseFieldArrayState<T>) => ReactElement | null) | ReactNode;
    error?: ((props: BaseFieldArrayState<T>) => ReactElement | null) | ReactNode;
    extra?: FieldArrayRender<T> | ReactNode;
    render?: FieldArrayRender<T> | ReactNode;
    className?: string;
    autoFocus?: boolean;
    layout?: {
        label?: ColProps;
        control?: ColProps;
    };
    index?: number | number[];
};
export declare class BaseFieldArray<T, FV, P extends FieldArrayProps<T> = FieldArrayProps<T>> extends Component<P> {
    path: string;
    form: string;
    render(): JSX.Element | null;
}
export declare function useEnterToSubmit(handleSubmit: FormRenderProps["handleSubmit"]): void;
export declare function useMemoInitialValues<T>(initialValues: T, keepDirtyOnReinitialize: boolean | undefined): T;
declare type FormItemProps = {
    autoFocus?: boolean;
    className: string;
    children: ReactNode;
};
export declare function FormItem({ autoFocus, ...props }: FormItemProps): JSX.Element;
export declare type FormSpyComponent<T> = (props: UseFormStateParams<T> & {
    children: ReactElement | null | ((props: FormState<T> & {
        form: UseFormApi<T>;
    }) => ReactElement | null);
}) => ReactElement;
declare type Form1FormLayout = "general" | "compact";
declare type Form1LabelAlign = "left" | "right";
declare type Form1LayoutProps = {
    layout?: Form1FormLayout;
    labelCol?: ColProps;
    wrapperCol?: ColProps;
    labelAlign?: Form1LabelAlign;
};
export declare const InfoField: (props: {
    label?: ReactNode;
    children: ReactNode;
    className?: string | undefined;
    layoutProps?: Form1LayoutProps | undefined;
}) => JSX.Element;
export declare type OnSubmit<T> = (values: T, form: FormApi<T>, callback?: (errors?: SubmissionErrors) => void) => SubmissionErrors | Promise<SubmissionErrors | undefined> | undefined | void;
export declare const usePreventSubmitOnModalClose: <T>(onSubmit: OnSubmit<T>) => OnSubmit<T>;
export {};
