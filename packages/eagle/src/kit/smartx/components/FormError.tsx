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
import { i18n, i18n as I18nType, TOptions } from "i18next";
import _ from "lodash";
import React, { ReactElement } from "react";

// TODO handle this by better error code from connector
const UNSAFE_EXTRACT_DATA_REG = /message:\s*?({.+})/;
const UNSAFE_EXTRACT_ERROR_REG = /"error":\s*?"([^"]+)"/;

function extractJsonError(msg: string, parrotI18n: i18n): string | false {
  try {
    const data = JSON.parse(msg);
    const ec = data["ec"];
    if (ec === "EOK") {
      return false;
    }
    if (data[parrotI18n.language]) {
      return data[parrotI18n.language];
    } else if (ec) {
      return parrotI18n.exists(`error.${`EC_${ec}`}`)
        ? parrotI18n.t(`error.${`EC_${ec}`}`)
        : parrotI18n.exists(`error.${ec}`)
        ? parrotI18n.t(`error.${ec}`)
        : ec;
    } else {
      return false;
    }
  } catch {
    return false;
  }
}

export function tryToExtractError(
  error_code: string | null | undefined,
  msg: string | null | undefined,
  i18n: i18n
): { msg: string; key?: string; options?: TOptions } {
  if (!msg) {
    return { msg: "" };
  }

  if (msg.startsWith("EC_")) {
    return { msg: parrotI18n.t(`error.${msg}`) };
  }

  const errorInJson = extractJsonError(msg, i18n);
  if (typeof errorInJson === "string") {
    return { msg: errorInJson };
  }

  const matched = msg.match(UNSAFE_EXTRACT_DATA_REG);
  if (!matched) {
    const matched2 = msg.match(UNSAFE_EXTRACT_ERROR_REG);
    if (matched2?.[1]) {
      if (
        matched2[1].includes("SVT_SET_USER_PASSWD_FAILED") &&
        matched2[1].includes("guest-set-user-password")
      ) {
        const reg = /'guest-set-user-password':\s+(.+)/;
        const [, info = ""] = matched2[1].match(reg) || [];
        if (info) {
          return {
            msg: parrotI18n.t("error.EC_GUEST_SET_USER_PASSWORD_FAILED", {
              info: info.trim(),
            }),
          };
        }
      }

      if (matched2[1].startsWith("SVT_")) {
        const reg = /^([A-Z_]+)/;
        const [error_code] = matched2[1].match(reg) || [];
        if (i18n.exists(`error.${error_code}`)) {
          return {
            key: error_code,
            msg: parrotI18n.t(`error.${error_code}`),
          };
        }
      }

      return {
        msg: matched2[1],
      };
    }
    if (
      msg.includes("connect ETIMEDOUT") ||
      msg.includes("TimeoutError") ||
      msg.includes("connect EHOSTUNREACH")
    ) {
      return {
        msg: parrotI18n.t("error.EC_TIME_OUT"),
      };
    }
    if (i18n.exists(`error.${error_code}`)) {
      return {
        msg: parrotI18n.t(`error.${error_code}`),
      };
    }
    return {
      msg,
    };
  }

  try {
    let elfJobData;
    try {
      elfJobData = JSON.parse(matched[1]);
    } catch {
      // ignore
    }
    if (elfJobData?.job?.error_code) {
      const key = `error.${elfJobData.job.error_code}`;
      const options = {
        error_msg: elfJobData.job.error_msg,
        interpolation: {
          escapeValue: false,
        },
      };
      return { msg: parrotI18n.t(key, options), key, options };
    }
    if (elfJobData?.job?.task_list) {
      const errorTask = elfJobData.job.task_list
        .filter((t: { error_code?: string }) => t.error_code)
        .sort((t: { error_code?: string }) => {
          return t.error_code === "JOB_FOLLOWER_FAILED_DUE_TO_DEPENDENCY"
            ? 1
            : -1;
        })[0];
      if (errorTask) {
        const { error_code, error_msg } = errorTask;
        const key = `error.${error_code}`;
        const options = {
          error_msg,
          interpolation: {
            escapeValue: false,
          },
        };
        return { msg: parrotI18n.t(key, options), key, options };
      }
    }
    if (elfJobData?.ec) {
      const key = `error.EC_${elfJobData.ec}`;
      const options = {
        error_msg: elfJobData.error?.msg || "",
        interpolation: {
          escapeValue: false,
        },
      };
      return { msg: parrotI18n.t(key, options), key, options };
    }
    if (i18n.exists(`error.${error_code}`)) {
      return { msg: parrotI18n.t(`error.${error_code}`) };
    }
    return { msg: "parsed" };
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("extract elf error failed", error);
    }
    return { msg };
  }
}

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

type MaybeGraphqlError = {
  graphQLErrors?: {
    message?: string;
    code?: string;
  }[];
};

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

export function analyzeFallbackError(
  fallback: unknown,
  parrotI18n: i18n
): {
  msg: string;
  originalMsg: string;
} | null {
  if (!fallback) {
    return null;
  }
  let msg = String(fallback);
  const code = (fallback as MaybeGraphqlError).graphQLErrors?.find(
    (e) => e.code
  )?.code;
  const codeTrans = parrotI18n.t(`error.${code}`);
  const originalMsg = (fallback as MaybeGraphqlError).graphQLErrors?.find(
    (e) => e.message
  )?.message;
  if (code && code !== codeTrans) {
    msg = codeTrans;

    // 'ELF_ERROR' is a fallback error code provided by connector,
    // which may need to be extracted to get the expected message
    if (code === "ELF_ERROR") {
      const extractResult = tryToExtractError(
        code,
        originalMsg,
        parrotI18n
      ).msg;
      if (extractResult !== msg) msg = extractResult;
    }
  } else if (originalMsg) {
    msg = code ? `${originalMsg}(code: ${code})` : originalMsg;
  }
  return { msg, originalMsg: originalMsg || String(fallback) };
}

export const SubmitError: React.FC<{
  className?: string;
  fallback?: unknown;
}> = (props) => {
  const { className, fallback } = props;
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
          const error = analyzeFallbackError(fallback, parrotI18n);
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
}> = (props) => {
  const { className, fallback } = props;

  const error = analyzeFallbackError(fallback, parrotI18n);
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
