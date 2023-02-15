import { parrotI18n } from "@cloudtower/parrot";
import { css } from "@linaria/core";
import _ from "lodash";
import React, { useRef } from "react";

import { BaseEnumProps, IntProps, StringProps } from "../../spec";
import { EMPTY_FUNCTION, FormatUnit, getFormatValue } from "../../utils";
import fields from "../Fields";
import InputGroup from "../InputGroup";

const AffixWrapper = css`
  height: 32px;
`;

type FieldProps<T, V = T[keyof T]> = {
  where?: T;
  setWhere: (updates: Array<{ key: keyof T; value: V | undefined }>) => void;
  name: keyof T;
  __rawWhere?: T;
};

export const StringField = <T extends Record<string, unknown>>(
  props: FieldProps<T> & StringProps
) => {
  const { where, setWhere, __rawWhere, ...restProps } = props;
  const name = String(props.name);

  const defaultKey =
    _.get(where, `${name}_contains`) || !_.get(where, `${name}_not_contains`)
      ? `${name}_contains`
      : `${name}_not_contains`;
  const refWhere = useRef<{ key: keyof T; value: T[keyof T] | undefined }>({
    key: defaultKey,
    value: _.get(where, defaultKey),
  });

  return (
    <InputGroup compact>
      <fields.Enum
        input={{
          onChange: (key) => {
            setWhere([
              {
                key,
                value: refWhere.current.value,
              },
              {
                key: refWhere.current.key,
                value: undefined,
              },
            ]);
            refWhere.current.key = key;
          },
          name: `${name} select`,
        }}
        meta={{}}
        enumValues={[
          { value: `${name}_contains`, text: parrotI18n.t("common.contains") },
          {
            value: `${name}_not_contains`,
            text: parrotI18n.t("common.not_contains"),
          },
        ]}
        defaultValue={refWhere.current.key as string}
      />
      <fields.String
        input={{
          value: refWhere.current.value || "",
          onChange: (e) => {
            refWhere.current.value = e.currentTarget.value || undefined;
            setWhere([refWhere.current]);
          },
          name: `${name} string`,
          onBlur: EMPTY_FUNCTION,
          onFocus: EMPTY_FUNCTION,
        }}
        meta={{}}
        {...restProps}
      />
    </InputGroup>
  );
};

export const BooleanField = <T extends Record<string, unknown>>(
  props: FieldProps<T, boolean> & Partial<BaseEnumProps>
) => {
  const { where, setWhere, __rawWhere, ...restProps } = props;
  const name = String(props.name);
  const value = _.get(where, name);
  const parseValue = typeof value === "boolean" ? `${value}` : "all";

  return (
    <fields.Enum
      input={{
        value: parseValue,
        onChange: (e) =>
          setWhere([
            {
              key: name,
              value: e === "true" ? true : e === "false" ? false : undefined,
            },
          ]),
        name: `${name} boolean`,
        onBlur: EMPTY_FUNCTION,
        onFocus: EMPTY_FUNCTION,
      }}
      defaultValue={parseValue}
      enumValues={[
        { value: "all", text: parrotI18n.t("common.all") },
        { value: "true", text: parrotI18n.t("common.enable") },
        { value: "false", text: parrotI18n.t("common.not_enable") },
      ]}
      meta={{}}
      {...restProps}
    />
  );
};

export const IntField = <T extends Record<string, unknown>>(
  props: FieldProps<T> & IntProps
) => {
  const { where, setWhere, __rawWhere, ...restProps } = props;
  const name = String(props.name);
  const enumValues = [
    { value: "gte", text: ">=" },
    { value: "gt", text: ">" },
    { value: "lte", text: "<=" },
    { value: "lt", text: "<" },
    { value: "eq", text: "=" },
  ];

  // TODO: only when mounted
  let defaultKey = "gte";
  for (const it of enumValues) {
    if (_.get(where, `${name}_${it.value}`) !== undefined) {
      defaultKey = it.value;
    }
  }
  if (_.get(where, name) !== undefined) {
    defaultKey = "eq";
  }
  const refWhere = useRef<{ key: keyof T; value: T[keyof T] | undefined }>({
    key: defaultKey === "eq" ? name : `${name}_${defaultKey}`,
    value:
      defaultKey === "eq"
        ? _.get(where, name)
        : _.get(where, `${name}_${defaultKey}`),
  });

  return (
    <InputGroup compact>
      <fields.Enum
        input={{
          onChange: (val) => {
            const key = val === "eq" ? name : (`${name}_${val}` as keyof T);
            setWhere([
              {
                key,
                value: refWhere.current.value,
              },
              {
                key: refWhere.current.key,
                value: undefined,
              },
            ]);
            refWhere.current.key = key;
          },
          name: `${name} select`,
        }}
        meta={{}}
        enumValues={enumValues}
        defaultValue={defaultKey}
      />
      <fields.Int
        input={{
          value: refWhere.current.value,
          onChange: (e) => {
            refWhere.current.value = e;
            setWhere([refWhere.current]);
          },
          name: `${name} int`,
          onBlur: EMPTY_FUNCTION,
          onFocus: EMPTY_FUNCTION,
        }}
        meta={{}}
        {...restProps}
      />
    </InputGroup>
  );
};

export const FormatIntField = <T extends Record<string, unknown>>(
  props: FieldProps<T> &
    IntProps & {
      formatUnit: FormatUnit;
    }
) => {
  const { where, setWhere, formatUnit, __rawWhere, ...restProps } = props;
  const name = String(props.name);
  const formatValue = getFormatValue(formatUnit);

  const enumValues = [
    { value: "gte", text: ">=" },
    { value: "gt", text: ">" },
    { value: "lte", text: "<=" },
    { value: "lt", text: "<" },
    { value: "eq", text: "=" },
  ];

  // TODO: only when mounted
  let defaultKey = "gte";
  for (const it of enumValues) {
    if (_.get(where, `${name}_${it.value}`) !== undefined) {
      defaultKey = it.value;
    }
  }
  if (_.get(where, name) !== undefined) {
    defaultKey = "eq";
  }
  const refWhere = useRef<{ key: keyof T; value: T[keyof T] | undefined }>({
    key: defaultKey === "eq" ? name : `${name}_${defaultKey}`,
    value:
      defaultKey === "eq"
        ? _.get(where, name)
        : _.get(where, `${name}_${defaultKey}`),
  });

  return (
    <InputGroup compact>
      <fields.Enum
        input={{
          onChange: (val) => {
            const key = val === "eq" ? name : (`${name}_${val}` as keyof T);
            setWhere([
              {
                key,
                value: refWhere.current.value,
              },
              {
                key: refWhere.current.key,
                value: undefined,
              },
            ]);
            refWhere.current.key = key;
          },
          name: `${name} select`,
        }}
        meta={{}}
        enumValues={enumValues}
        defaultValue={defaultKey}
      />
      <fields.Int
        className={AffixWrapper}
        input={{
          value: !_.isNil(refWhere.current.value)
            ? (refWhere.current.value as number) / formatValue
            : "",
          onChange: (e) => {
            refWhere.current.value = e ? e * formatValue : e;
            setWhere([refWhere.current]);
          },
          name: `${name} int`,
          onBlur: EMPTY_FUNCTION,
          onFocus: EMPTY_FUNCTION,
        }}
        suffix={formatUnit}
        meta={{}}
        {...restProps}
      />
    </InputGroup>
  );
};

export const EnumField = <T extends Record<string, unknown>>(
  props: FieldProps<T, string[]> & BaseEnumProps
) => {
  const { where, setWhere, enumValues, placeholder, __rawWhere, ...restProps } =
    props;
  const name = String(props.name);
  const key = `${name}_in`;

  return (
    <fields.Enum
      emptyLabel={parrotI18n.t("common.all")}
      input={{
        value: _.get(where, key) || "",
        onChange: (e: string[]) =>
          setWhere([
            {
              key,
              value: e.length ? e : undefined,
            },
          ]),
        name: `${name} enum`,
        onBlur: EMPTY_FUNCTION,
        onFocus: EMPTY_FUNCTION,
      }}
      enumValues={enumValues}
      meta={{}}
      placeholder={placeholder}
      multiple
      {...restProps}
    />
  );
};
