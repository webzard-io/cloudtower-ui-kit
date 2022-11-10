/* istanbul ignore file */
import { PluginFunction as RawPluginFUnction } from "@graphql-codegen/plugin-helpers";

import { Relation } from "./graphql/type-dependencies-map";

type ColumnKey = string;
export type Column =
  | string
  | {
      name?: string;
      key: string;
      alias?: string;
      fields: string[];
      appendId?: boolean;
    };
export type Table = {
  name?: string;
  type: string;
  fields: Column[];
  invisibleFields?: Column[];
  disabledColumnKeys?: ColumnKey[];
};

export type Select = {
  type: string;
  // FIXME: can be object
  fields: string[];
  inputField: string; // for search
  // optional component name
  name?: string;
  enableCreate?: boolean; // for search
};

export type Field =
  | string
  | { key: string; fields: Field[]; extraFields?: BasicExtraField[] };
export type BasicExtraField = {
  key: string;
  type: "String" | "Int" | "Float" | "Boolean";
  isRequired?: boolean;
};
export type ExtraField =
  | BasicExtraField
  | {
      key: string;
      isEnum: true;
      type: string;
      isRequired?: boolean;
    }
  | {
      key: string;
      type: "Object";
      fields: ExtraField[];
      isRequired?: boolean;
    }
  | {
      key: string;
      type: "ScalarArray";
      scalarType: "String" | "Int" | "Float" | "Boolean";
      isRequired?: boolean;
    }
  | {
      key: string;
      type: "Array";
      fields: ExtraField[];
      isRequired?: boolean;
    };
export type RootExtraField = ExtraField & { onlyFormValue?: boolean };
export type Form =
  | {
      name?: string;
      type: string;
      fields: Record<string, Field[]>;
      extraFields?: RootExtraField[];
    }
  | {
      name?: string;
      type: string;
      extraFields: RootExtraField[];
    };

export type RawConfig = {
  path: string;
  imagesPath: string;
};

export type GlobalSearch = { type: string; fields: Column[] };
export type FetchByIds = { type: string; alias: string; fields: Column[] };

export type Config = {
  tables: Table[];
  selects: Select[];
  forms: Form[];
  excludeFormRuntimeCode: boolean;
  extraRelations: Relation[];
  connectorTypesPath: string;
  prismaSdkClientPathForAggregation: string;
  prismaSdkClientPathForPrismaOrm: string;
  prismaSdkClientPathForQueryResolver: string;
  customOrmClientPathForQueryResolver: string;
  queryBuilderDataPathForQueryResolver: string;
  customOrderBy: Record<string, string[]>;
  datamodelPathForQueryResolver: string;
  pluralizes: Record<string, string>;
  singlularizes: Record<string, string>;
  resource_to_cluster_path: Record<string, string[]>;
  globalSearch: GlobalSearch[];
  fetchByIds: FetchByIds[];
  userAuditActionsTypePath: string;
  systemAuditActionsTypePath: string;
};

export type PluginFunction = RawPluginFUnction<RawConfig>;
