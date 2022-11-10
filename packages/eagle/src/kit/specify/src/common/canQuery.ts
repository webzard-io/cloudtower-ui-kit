import { pluralizeMap, Resources } from "../../../../generated/global-search";

export const tableCanClearQuery = (base: string) => {
  return Boolean(pluralizeMap[base as Resources]);
};
