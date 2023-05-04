import i18next, { Callback, InitOptions, StringMap, TOptions } from "i18next";
import merge from "lodash.merge";

import locales from "./locales";

export type DynamicTFunction = {
  // basic usage
  <
    TResult = string,
    TKeys = string,
    TInterpolationMap extends object = StringMap
  >(
    key: TKeys | TKeys[],
    options?: TOptions<TInterpolationMap> | string
  ): TResult;
  // overloaded usage
  <
    TResult = string,
    TKeys = string,
    TInterpolationMap extends object = StringMap
  >(
    key: TKeys | TKeys[],
    defaultValue?: string,
    options?: TOptions<TInterpolationMap> | string
  ): TResult;
};

declare module "i18next" {
  export interface i18n {
    td: DynamicTFunction;
  }
}

const defaultOptions = {
  lng: "zh-CN",
  fallbackLng: "en-US",
  interpolation: {
    prefix: "{",
    suffix: "}",
  },
  resources: {
    "en-US": {
      translation: {
        ...locales["en-US"],
      },
    },
    "zh-CN": {
      translation: {
        ...locales["zh-CN"],
      },
    },
  },
};

const parrotI18n = i18next.createInstance(defaultOptions);

parrotI18n.td = parrotI18n.t;

export default parrotI18n;

export const initParrotI18n = (
  options?: InitOptions,
  callback?: Callback | undefined
) => {
  parrotI18n.init(merge(defaultOptions, options), callback);
};
