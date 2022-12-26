import { parrotI18n } from "@cloudtower/parrot";
import { styled } from "@linaria/react";
import {
  ARRAY_ERROR,
  FORM_ERROR,
  getIn,
  SubmissionErrors,
  ValidationErrors,
} from "@smartx/final-form";
import {
  FieldRenderProps,
  FormSpy,
  useField,
  useFormState,
} from "@smartx/react-final-form";
import { i18n } from "i18next";
import _ from "lodash";
import React, { ReactElement } from "react";

export const FormError = styled.span`
  font-size: 13px;
  line-height: 20px;
  color: $red-60;
  margin-top: -4px;
  margin-bottom: 8px;
`;

const param = { ns: "validation" };

export function deepGetErrorKey(value: string | object): string | undefined {
  if (typeof value === "string") {
    return value;
  }
  if (typeof value === "object") {
    for (const key in value) {
      return deepGetErrorKey((value as Record<string, string>)[key]);
    }
  }
}

export const findFirstError = (
  fields: string[],
  errors?: ValidationErrors | SubmissionErrors
) => {
  if (!errors) {
    return undefined;
  }
  for (const field of fields) {
    const res = getIn(errors, field);
    if (!_.isEmpty(res) || _.isArray(res)) {
      return { msg: res, payload: errors["payload"] };
    }
  }
  return errors;
};

export const SubmitError: React.FC<{
  className?: string;
  fallback?: unknown;
  analyzeFallbackError(fallback: unknown): {
    msg: string;
    originalMsg: string;
  } | null;
}> = (props) => {
  const { className, fallback, analyzeFallbackError } = props;
  return (
    <FormSpy
      subscription={{
        errors: true,
        hasValidationErrors: true,
        submitFailed: true,
        submitErrors: true,
      }}
    >
      {({ errors, hasValidationErrors, submitFailed, submitErrors }) => {
        const err = findFirstError(
          [FORM_ERROR],
          hasValidationErrors ? errors : submitErrors
        );
        if (!err || !submitFailed) {
          const error = analyzeFallbackError(fallback);
          if (!error) {
            return null;
          }
          return (
            <FormError
              title={error.originalMsg || String(fallback)}
              className={className}
            >
              {error.msg}
            </FormError>
          );
        }
        let msg = "";
        const { payload } = err;
        const params = payload ? { ...payload, ...param } : param;
        const isArray = _.isArray(err["msg"]);
        if (FORM_ERROR in err) {
          msg = parrotI18n.t(err[FORM_ERROR], params);
          return <FormError className={className}>{msg}</FormError>;
        }
        if (isArray) {
          if (err["msg"][ARRAY_ERROR]) {
            msg = parrotI18n.t(err["msg"][ARRAY_ERROR], params);
            return <FormError className={className}>{msg}</FormError>;
          } else {
            const field = err["msg"].find((item: unknown) => item !== null);
            if (!field) {
              return null;
            }
            const msg = deepGetErrorKey(field);
            return msg ? (
              <FormError className={className}>
                {parrotI18n.t(`validation.${msg}`)}
              </FormError>
            ) : null;
          }
        } else {
          msg = parrotI18n.t(err["msg"], params);
          return <FormError className={className}>{msg}</FormError>;
        }
      }}
    </FormSpy>
  );
};

export const V2AnalyzedError: React.FC<{
  className?: string;
  fallback?: unknown;
  analyzeFallbackError(fallback: unknown): {
    msg: string;
    originalMsg: string;
  } | null;
}> = (props) => {
  const { className, fallback, analyzeFallbackError } = props;

  const error = analyzeFallbackError(fallback);
  if (!error) {
    return null;
  }

  return (
    <FormError
      title={error.originalMsg || String(fallback)}
      className={className}
    >
      {error.msg}
    </FormError>
  );
};

const FieldError: <T>(props: {
  name: string;
  children?: (props: FieldRenderProps<T>) => ReactElement;
}) => ReactElement | null = ({ name, children }) => {
  const info = useField(name, {
    subscription: {
      touched: true,
      error: true,
      submitError: true,
      dirtySinceLastSubmit: true,
    },
  });
  const { submitFailed } = useFormState({
    subscription: { submitFailed: true },
  });
  if (typeof children === "function") {
    return children({ ...info });
  }
  const {
    meta: { touched, error: fieldError, submitError, dirtySinceLastSubmit },
  } = info;
  const extract = (submitError: unknown) => {
    return Array.isArray(submitError)
      ? _.compact(submitError.map((err) => deepGetErrorKey(err)))[0]
      : deepGetErrorKey(submitError as object);
  };
  return ((touched || submitFailed) &&
    fieldError &&
    typeof fieldError === "string") ||
    (!dirtySinceLastSubmit && submitError) ? (
    <FormError>
      {parrotI18n.t(fieldError, param) || extract(submitError)}
    </FormError>
  ) : null;
};

export default FieldError;
