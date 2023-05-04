import React, { ReactElement } from "react";
import { styled } from "linaria/react";
import {
  useField,
  useFormState,
  FieldRenderProps,
  FormSpy,
} from "@smartx/react-final-form";
import {
  ValidationErrors,
  SubmissionErrors,
  getIn,
  FORM_ERROR,
  ARRAY_ERROR,
} from "@smartx/final-form";
import _ from "lodash";
import { useTranslation } from "react-i18next";
import { i18n as I18nType } from "i18next";
import { tryToExtractError } from "../common/task"; /** ../modules/task/common */

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

export const extractHostNameAndPlatform = (msg: string) => {
  const hostNameAndPlatformReg = /\(host_name: (.+), platform_name: (.+)\)/;
  const matched = msg.match(hostNameAndPlatformReg) || [];
  return {
    name: matched[1] || "",
    platform: matched[2] || "",
  };
};
export const extractHostName = (msg: string) => {
  const hostNameReg = /\(host_name: (.+)\)/;
  const matched = msg.match(hostNameReg) || [];
  return {
    name: matched[1] || "",
  };
};

export function analyzeFallbackError(
  fallback: unknown,
  i18n: I18nType,
  promptAbstract: Boolean | undefined = false,
  useOriginalMsg: Boolean | undefined = false
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
  if (promptAbstract) {
    return {
      msg: tryToExtractError(code, msg, i18n).msg,
      originalMsg: msg,
    };
  }

  const originalMsg = (fallback as MaybeGraphqlError).graphQLErrors?.find(
    (e) => e.message
  )?.message;

  // handle error codes for adding host pre-check, TOWER-7534
  switch (code) {
    case "CREATE_HOST_PRECHECK_HYPERVISOR_ACCOUNT_FAILED": {
      const { name, platform } = extractHostNameAndPlatform(msg);
      return {
        msg: i18n.t("error.CREATE_HOST_PRECHECK_HYPERVISOR_ACCOUNT_FAILED", {
          name,
          platform,
        }),
        originalMsg: originalMsg || String(fallback),
      };
    }
    case "CREATE_HOST_PRECHECK_IPMI_ACCOUNT_FAILED": {
      const { name } = extractHostName(msg);
      return {
        msg: i18n.t("error.CREATE_HOST_PRECHECK_IPMI_ACCOUNT_FAILED", {
          name,
        }),
        originalMsg: originalMsg || String(fallback),
      };
    }
    case "CREATE_HOST_PRECHECK_IP_FAILED": {
      const { name } = extractHostName(msg);
      return {
        msg: i18n.t("error.CREATE_HOST_PRECHECK_IP_FAILED", {
          name,
        }),
        originalMsg: originalMsg || String(fallback),
      };
    }
    case "CREATE_HOST_PRECHECK_IP_FAILED_SAN": {
      const { name } = extractHostName(msg);
      return {
        msg: i18n.t("error.CREATE_HOST_PRECHECK_IP_FAILED_SAN", {
          name,
        }),
        originalMsg: originalMsg || String(fallback),
      };
    }
    case "CREATE_HOST_PRECHECK_RDMA_FAILED": {
      const { name } = extractHostName(msg);
      return {
        msg: i18n.t("error.CREATE_HOST_PRECHECK_RDMA_FAILED", {
          name,
        }),
        originalMsg: originalMsg || String(fallback),
      };
    }
  }

  const codeTrans = i18n.td(`error.${code}`);
  if (code && code !== codeTrans) {
    msg = codeTrans;

    // 'ELF_ERROR' is a fallback error code provided by connector,
    // which may need to be extracted to get the expected message
    if (code === "ELF_ERROR") {
      const extractResult = tryToExtractError(code, originalMsg, i18n).msg;
      if (extractResult !== msg) msg = extractResult;
    }
  } else if (originalMsg) {
    msg =
      code && !useOriginalMsg ? `${originalMsg}(code: ${code})` : originalMsg;
  } else if (/network error/i.test(msg)) {
    msg = i18n.t("error.NETWORK_ERROR");
  }

  return { msg, originalMsg: originalMsg || String(fallback) };
}

export const SubmitError: React.FC<{
  className?: string;
  fallback?: unknown;
  useOriginalMsg?: boolean;
}> = (props) => {
  const { className, fallback, useOriginalMsg } = props;
  const { t, i18n } = useTranslation();
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
          const error = analyzeFallbackError(
            fallback,
            i18n,
            false,
            useOriginalMsg
          );
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
          msg = t(err[FORM_ERROR], params);
          return <FormError className={className}>{msg}</FormError>;
        }
        if (isArray) {
          if (err["msg"][ARRAY_ERROR]) {
            msg = t(err["msg"][ARRAY_ERROR], params);
            return <FormError className={className}>{msg}</FormError>;
          } else {
            const field = err["msg"].find((item: unknown) => item !== null);
            if (!field) {
              return null;
            }
            const msg = deepGetErrorKey(field);
            return msg ? (
              <FormError className={className}>
                {i18n.td(`validation.${msg}`)}
              </FormError>
            ) : null;
          }
        } else {
          msg = t(err["msg"], params);
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
  const { i18n } = useTranslation();

  const error = analyzeFallbackError(fallback, i18n);
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
  const { t } = useTranslation();
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
    <FormError>{t(fieldError, param) || extract(submitError)}</FormError>
  ) : null;
};

export default FieldError;
