import { Kit } from "@cloudtower/eagle/kit/specify";
import {
  FieldState,
  FieldValidator,
  FormApi,
  FormState,
  FormSubscription,
  MutableState,
  SubmissionErrors,
  Tools,
} from "@smartx/final-form";
import _arrayMutators from "@smartx/final-form-arrays";
import {
  Field,
  FieldMetaState,
  FieldRenderProps,
  FormProps,
  FormRenderProps,
  useForm,
  UseFormStateParams,
} from "@smartx/react-final-form";
import {
  FieldArray,
  FieldArrayRenderProps,
} from "@smartx/react-final-form-arrays";
import { Col, Row } from "antd";
import { ColProps } from "antd/lib/col";
import cs from "classnames";
import _ from "lodash";
import React, {
  Component,
  ReactElement,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { useSelector } from "react-redux";
import { CSSTransition } from "react-transition-group";

import { FormItemDiv } from "../../../../styles";
import FieldError from "../../components/FormError";
import { RootState } from "../../store";

type FormItemLayout = {
  label?: ColProps;
  control?: ColProps;
};

export type LayoutProps = {
  compact?: boolean;
  formItem?: FormItemLayout;
};

export const DEFAULT_LAYOUT: { formItem: Required<FormItemLayout> } = {
  formItem: {
    label: { span: 8 },
    control: { span: 16 },
  },
};

const getFormItemLayout = (
  layout: LayoutProps["formItem"],
  globalLayout: LayoutProps,
  hasLabel: boolean
): {
  className: string;
  label: ColProps;
  control: ColProps;
} => {
  const { label, control } = {
    ...DEFAULT_LAYOUT.formItem,
    ..._.pickBy(globalLayout.formItem, _.identity),
    ..._.pickBy(layout, _.identity),
  };
  return {
    className: `form-item-${globalLayout.compact ? "compact" : "general"}`,
    label,
    control: hasLabel ? control : { span: 24 },
  };
};

/* eslint-disable @typescript-eslint/no-explicit-any */
type SetValuesMutator = (
  [mutate]: [(prevValues: Readonly<any>) => any],
  state: MutableState<any>
) => void;

export const setValuesMutator: SetValuesMutator = ([mutate], state) => {
  const values = _.cloneDeep(state.formState.values);
  const newValues = mutate(values);
  if (!_.isEqual(state.formState.values, newValues)) {
    state.formState.values = newValues;
  }
};

export const arrayMutators = {
  ..._arrayMutators,
  replace: (
    [name, value]: [string, any[]],
    state: MutableState<any>,
    { changeValue }: Tools<any>
  ) => {
    changeValue(state, name, (current: any[]): any[] => {
      if (!_.isEqual(current, value)) {
        return value;
      }
      return current;
    });
  },
};

/* eslint-enable @typescript-eslint/no-explicit-any */

export type UseFormApi<T> = FormApi<T> & {
  setValues: (callback: (prev: Readonly<T>) => T) => void;
};

export type BaseFormProps<T, V, O = {}> = {
  initialValues?: T;
  keepDirtyOnReinitialize?: boolean;
  onSubmit: (
    values: T,
    form: FormApi<T>,
    callback?: (errors?: SubmissionErrors) => void
  ) =>
    | SubmissionErrors
    | Promise<SubmissionErrors | undefined>
    | undefined
    | void;
  subscription?: FormSubscription;
  validation?: V;
  onChanges?: O;
  render: (
    props: Omit<FormRenderProps<T>, "form"> & { form: UseFormApi<T> }
  ) => ReactElement;
  layout?: LayoutProps;
  debug?: FormProps["debug"];
};

const parseFieldname = (path: string, index: number | number[] = []) => {
  const _indexes = typeof index === "number" ? [index] : [...index];
  if (_indexes.some((index) => index < 0 || !_.isInteger(index))) {
    console.error(`index: ${_indexes.join(", ")} invalid for ${path}`);
    return;
  }
  const name = path
    .split(".")
    .map((p) => (p === "$i" ? _indexes.shift() || 0 : p))
    .join(".");
  return name;
};

export type FormContextType<Validators = {}, OnChanges = {}> = {
  layout: LayoutProps;
  kit: Kit;
  validators: Validators;
  onChanges: OnChanges;
};

type BaseFieldState<T> = FieldMetaState<T> & { value: T };
export type FieldProps<T> = {
  defaultValue?: T;
  initialValue?: T;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  format?: (value: T, name: string) => any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

export type FieldOnChange<T, FV> = (args: {
  name?: string;
  value: T | undefined;
  setValues: UseFormApi<FV>["setValues"];
}) => void;

export type FieldListenerProps<T, FV> = {
  name: string;
  onChange: FieldOnChange<T, FV>;
};

const FieldListener = function <T, FV>(props: FieldListenerProps<T, FV>) {
  const { name, onChange } = props;
  const form = useForm() as UseFormApi<FV>;
  const previousRef = useRef<T>();
  useEffect(
    () =>
      form.registerField(
        name,
        (state) => {
          let { value } = state as FieldState<T>;
          if (typeof value === "string" && value === "") {
            // In final-form, empty will be formatted to undefined
            // However, this conversion misses in initializing
            // If we init a field with empty string,
            // it triggers unexpected onChange since '' not equal to undefined.
            // So we need to convert empty string to undefined here.
            value = undefined;
          }
          if (_.isEqual(previousRef.current, value)) {
            return;
          }
          previousRef.current = value;
          onChange({
            name,
            value,
            setValues: form.mutators.setValues,
          });
        },
        { value: true },
        { isEqual: _.isEqual, silent: true }
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [name]
  );

  return null;
};

export class BaseField<
  T,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  FV,
  P extends FieldProps<T> = FieldProps<T>
> extends Component<P> {
  path = "";
  form = "";
  defaultRender?: FieldProps<T>["render"];
  render() {
    const {
      layout: globalLayout,
      validators,
      onChanges,
    } = this.context as FormContextType;
    const validate = (validators as Record<string, FieldValidator<T>>)[
      this.path
    ];
    const onChange = (onChanges as Record<string, FieldOnChange<T, FV>>)[
      this.path
    ];
    const {
      index,
      label,
      error,
      extra,
      render = this.defaultRender,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      children,
      className = "",
      autoFocus = false,
      layout: _layout,
      ...props
    } = this.props;
    const name = parseFieldname(this.path, index);
    if (!name) {
      return null;
    }

    const layoutConfig = getFormItemLayout(_layout, globalLayout, !!label);

    const OnChange = onChange ? (
      <FieldListener<T, FV> name={name} onChange={onChange} />
    ) : null;

    return (
      <>
        <Field<T> {...props} name={name} validate={validate}>
          {({ input, meta }) => {
            const classes = {
              "form-item": cs(
                "form-item",
                "form-base-field",
                className,
                layoutConfig.className
              ),
              "form-item-control": cs(
                "form-item-control",
                meta.touched &&
                  (meta.error ||
                    (!meta.dirtySinceLastSubmit && meta.submitError))
                  ? "field-error"
                  : ""
              ),
            };
            return (
              <FormItem
                data-form-field={name}
                autoFocus={autoFocus}
                className={classes["form-item"]}
              >
                <Row className="form-item-main">
                  {/* Label */}
                  {label ? (
                    <Col
                      {...layoutConfig.label}
                      className={cs("form-item-label")}
                    >
                      <label>
                        {typeof label === "function"
                          ? label({ ...meta, value: input.value })
                          : label}
                      </label>
                    </Col>
                  ) : null}
                  <Col
                    {...layoutConfig.control}
                    className={classes["form-item-control"]}
                  >
                    {/* Children */}
                    <div className="form-item-children">
                      {render
                        ? typeof render === "function"
                          ? render({ meta, input })
                          : render
                        : JSON.stringify(input.value)}
                    </div>
                    {/* Error */}
                    {error === null ? null : (
                      <CSSTransition
                        in={Boolean(meta.touched && meta.invalid)}
                        timeout={200}
                        classNames="form-item-error"
                      >
                        <div className="form-item-error">
                          {typeof error === "function"
                            ? error({ ...meta, value: input.value })
                            : error || <FieldError name={name} />}
                        </div>
                      </CSSTransition>
                    )}
                  </Col>
                </Row>
                {/* Extra */}
                {extra ? (
                  typeof extra === "function" ? (
                    extra({ ...meta, value: input.value })
                  ) : (
                    <div className="form-item-extra">{extra}</div>
                  )
                ) : null}
              </FormItem>
            );
          }}
        </Field>
        {OnChange}
      </>
    );
  }
}

export type FieldArrayRenderPropsFields<T> = FieldArrayRenderProps<
  T,
  HTMLElement
>["fields"] & {
  replace: (value: T[]) => void;
};
export type FieldArrayRender<T> = (props: {
  fields: FieldArrayRenderPropsFields<T>;
  meta: FieldArrayRenderProps<T, HTMLElement>["meta"];
}) => ReactElement | null;
type BaseFieldArrayState<T> = FieldArrayRenderProps<T, HTMLElement>["meta"] & {
  value?: T[];
};
export type FieldArrayProps<T> = {
  defaultValue?: T[];
  initialValue?: T[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  format?: (value: T[], name: string) => any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

export class BaseFieldArray<
  T,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  FV,
  P extends FieldArrayProps<T> = FieldArrayProps<T>
> extends Component<P> {
  path = "";
  form = "";
  render() {
    const {
      layout: globalLayout,
      validators,
      onChanges,
    } = this.context as FormContextType;
    const validate = (validators as Record<string, FieldValidator<T[]>>)[
      this.path
    ];
    const onChange = (onChanges as Record<string, FieldOnChange<T[], FV>>)[
      this.path
    ];
    const {
      index,
      label,
      error,
      extra,
      render,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      children,
      className = "",
      autoFocus = false,
      layout: _layout,
      ...props
    } = this.props;
    const name = parseFieldname(this.path, index);
    if (!name) {
      return null;
    }

    const layoutConfig = getFormItemLayout(_layout, globalLayout, !!label);

    const OnChange = onChange ? (
      <FieldListener<T[], FV> name={name} onChange={onChange} />
    ) : null;

    return (
      <>
        <FieldArray<T> {...props} name={name} validate={validate}>
          {({ fields, meta }) => {
            const classes = {
              "form-item": cs(
                "form-item",
                "form-base-field",
                "form-base-field-array",
                layoutConfig.className,
                className
              ),
              "form-item-control": cs(
                "form-item-control",
                meta.touched &&
                  (meta.error ||
                    (!meta.dirtySinceLastSubmit && meta.submitError))
                  ? "field-error"
                  : ""
              ),
            };
            return (
              <FormItem
                data-form-field={name}
                autoFocus={autoFocus}
                className={classes["form-item"]}
              >
                <Row className="form-item-main">
                  {/* Label */}
                  {label ? (
                    <Col
                      {...layoutConfig.label}
                      className={cs("form-item-label")}
                    >
                      <label>
                        {typeof label === "function"
                          ? label({ ...meta, value: fields.value })
                          : label}
                      </label>
                    </Col>
                  ) : null}
                  <Col
                    {...layoutConfig.control}
                    className={classes["form-item-control"]}
                  >
                    {/* Children */}
                    <div className="form-item-children">
                      {render
                        ? typeof render === "function"
                          ? render({
                              fields: fields as FieldArrayRenderPropsFields<T>,
                              meta,
                            })
                          : render
                        : JSON.stringify(fields.value)}
                    </div>
                    {/* Error */}
                    {error === null ? null : (
                      <CSSTransition
                        in={Boolean(meta.touched && meta.invalid)}
                        timeout={200}
                        classNames="form-item-error"
                      >
                        <div className="form-item-error">
                          {typeof error === "function"
                            ? error({ ...meta, value: fields.value })
                            : error || <FieldError name={name} />}
                        </div>
                      </CSSTransition>
                    )}
                  </Col>
                </Row>
                {/* Extra */}
                {extra ? (
                  typeof extra === "function" ? (
                    extra({
                      fields: fields as FieldArrayRenderPropsFields<T>,
                      meta,
                    })
                  ) : (
                    <div className="form-item-extra">{extra}</div>
                  )
                ) : null}
              </FormItem>
            );
          }}
        </FieldArray>
        {OnChange}
      </>
    );
  }
}

export function useEnterToSubmit(
  handleSubmit: FormRenderProps["handleSubmit"]
) {
  useEffect(() => {
    const onKeydown = async (e: KeyboardEvent) => {
      // when press Enter during typing Pinyin,
      // a keydown event with key 'Enter' and keyCode 229 fires,
      // we need to prevent that keydown event triggers submit
      if (e.key === "Enter" && e.keyCode === 13) {
        // do not trigger submit in textarea
        if (e.target && (e.target as HTMLElement).tagName === "TEXTAREA") {
          return;
        }
        if (
          document.querySelectorAll(
            ".modal-footer-btn-group .ant-btn-loading-icon"
          ).length
        ) {
          return;
        }
        // disable page reload on enter key-pressed on form textfield
        e.preventDefault();
        await handleSubmit();
      }
    };
    document.addEventListener("keydown", onKeydown);
    return () => document.removeEventListener("keydown", onKeydown);
  }, [handleSubmit]);
}

export function useMemoInitialValues<T>(
  initialValues: T,
  keepDirtyOnReinitialize: boolean | undefined
): T {
  const initialValuesRef = useRef<T>();
  const _initialValues = useMemo(() => {
    if (
      !keepDirtyOnReinitialize &&
      initialValuesRef.current &&
      _.isEqual(initialValuesRef.current, initialValues)
    ) {
      return initialValuesRef.current;
    } else {
      initialValuesRef.current = initialValues;
      return initialValues;
    }
  }, [initialValues, keepDirtyOnReinitialize]);
  return _initialValues;
}

type FormItemProps = {
  autoFocus?: boolean;
  className: string;
  children: ReactNode;
};
export function FormItem({ autoFocus, ...props }: FormItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!autoFocus) {
      return;
    }
    const formItem = ref.current;
    if (!formItem) {
      return;
    }
    const children = formItem.querySelector(
      ".form-item-control .form-item-children"
    );
    const target = children || formItem;
    const input = target.querySelector("input, textarea, .select, .switch");
    if (input) {
      (input as HTMLElement).tabIndex = 0;
      (input as HTMLElement).focus();
      return;
    }
    (target as HTMLElement).tabIndex = 0;
    (target as HTMLElement).focus();
    return;
  }, [autoFocus]);
  return <FormItemDiv ref={ref} {...props} />;
}

export type FormSpyComponent<T> = (
  props: UseFormStateParams<T> & {
    children:
      | ReactElement
      | null
      | ((
          props: FormState<T> & {
            form: UseFormApi<T>;
          }
        ) => ReactElement | null);
  }
) => ReactElement;

type Form1FormLayout = "general" | "compact";
type Form1LabelAlign = "left" | "right";
type Form1LayoutProps = {
  layout?: Form1FormLayout;
  labelCol?: ColProps;
  wrapperCol?: ColProps;
  labelAlign?: Form1LabelAlign;
};

export const InfoField = (props: {
  label?: ReactNode;
  children: ReactNode;
  className?: string;
  layoutProps?: Form1LayoutProps;
}) => {
  const { label, children, className, layoutProps = {} } = props;
  const { labelCol, wrapperCol, labelAlign } = layoutProps;
  const {
    layout = "general",
    labelCol: contextLabelCol = { span: 8 },
    wrapperCol: contextWrapperCol = { span: 16 },
    labelAlign: contextLabelAlign = "left",
  } = useContext(Form1LayoutContext);
  const classes = {
    "form-item": cs(
      "form-item",
      "form-base-field",
      `form-item-${layout}`,
      className
    ),
    "form-item-control": "form-item-control",
  };
  const Label = () =>
    label ? (
      <Col
        {...(labelCol || contextLabelCol)}
        className={cs(
          "form-item-label",
          `label-${labelAlign || contextLabelAlign}`
        )}
      >
        <label>{label}</label>
      </Col>
    ) : null;
  const Children = () => (
    <div className="form-item-children">{children || null}</div>
  );
  return (
    <FormItem className={classes["form-item"]}>
      <Row className="form-item-main">
        <Label />
        <Col
          {...(wrapperCol
            ? wrapperCol
            : label
            ? contextWrapperCol
            : { span: 24 })}
          className={classes["form-item-control"]}
        >
          <Children />
        </Col>
      </Row>
    </FormItem>
  );
};

export type OnSubmit<T> = (
  values: T,
  form: FormApi<T>,
  callback?: (errors?: SubmissionErrors) => void
) =>
  | SubmissionErrors
  | Promise<SubmissionErrors | undefined>
  | undefined
  | void;
export const usePreventSubmitOnModalClose = <T,>(onSubmit: OnSubmit<T>) => {
  const stack = useSelector<RootState, RootState["modal"]["stack"]>(
    (state) => state.modal.stack
  );
  const id = useSelector<RootState, RootState["modal"]["closeId"]>(
    (state) => state.modal.closeId
  );
  const idRef = useRef(stack[stack.length - 1]?.id);

  const _onSubmit = useCallback<OnSubmit<T>>(
    (...args) => (idRef.current === id ? undefined : onSubmit(...args)),
    [id, onSubmit]
  );

  return _onSubmit;
};
