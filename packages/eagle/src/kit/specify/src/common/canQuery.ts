import {
  pluralizeMap,
  Resources,
} from "@cloudtower/eagle/generated/global-search";

export const tableCanClearQuery = (base: string) => {
  return Boolean(pluralizeMap[base as Resources]);
};
