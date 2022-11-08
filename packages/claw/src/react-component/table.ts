import camelcase from "camelcase";
import ejs from "ejs";
import {
  EnumTypeDefinitionNode,
  FieldDefinitionNode,
  ObjectTypeDefinitionNode,
  visit,
} from "graphql";
import _ from "lodash";
import * as path from "path";

import {
  ADD_NEW_LINE,
  getConfig,
  getDataIndex,
  getDocumentNode,
  getField,
  getLastKey,
  getTypeMap,
  getTypename,
  isListField,
  isNullableField,
  isSchemaType,
  lowerFirst,
  notScalar,
  setPluralize,
  tableFilterQuery,
  upperFirst,
} from "../common";
import { Column, PluginFunction } from "../types";

const TEMPLATES = {
  TABLE: path.resolve(__dirname, "../../templates/react-component/Table.ejs"),
  SELECT: path.resolve(__dirname, "../../templates/react-component/Select.ejs"),
};

export function formatObjectWhereInput(
  column: Column,
  isList: boolean,
  isObject: boolean
): { key: string; value: string } {
  const fragments =
    typeof column === "string" ? [column] : column.key.split(".");
  let key = "";

  for (let i = 0; i < fragments.length; i++) {
    let fragment = fragments[i];
    const isLast = i === fragments.length - 1;

    if (isList && isLast) {
      fragment = fragment + "_some";
    }
    if (i === 0) {
      key = fragment;
    } else {
      key += `.${fragment}`;
    }
    if (isLast) {
      key += isObject ? ".id_in" : ".id";
    }
  }

  return {
    key,
    value: isObject ? "ids.length ? ids : undefined" : "id",
  };
}

export function getFieldWidth(type: string, index: number): number {
  switch (type) {
    case "Datetime":
    case "Enum":
    case "Int":
    case "Float":
      return 150;
    case "String":
      return index === 0 ? 300 : 200;
    case "Object":
      return 200;
    case "Boolean":
      return 70;
    default:
      return 100;
  }
}

export const plugin: PluginFunction = async (schema, documents, config) => {
  const { tables, pluralizes } = getConfig(config);
  const pluralize = setPluralize(pluralizes);
  const astNode = getDocumentNode(schema);
  const typeMap = getTypeMap(astNode);

  let output = [
    "/* eslint-disable",
    "@typescript-eslint/no-unused-vars,",
    "@typescript-eslint/no-explicit-any,",
    "@typescript-eslint/no-non-null-assertion,",
    "@typescript-eslint/no-unnecessary-type-assertion,",
    "react-hooks/rules-of-hooks,",
    "import/first,",
    "no-useless-computed-key",
    "*/",
    `import { i18next, SupportLanguage } from "@tower/i18n";
    import { Menu } from "antd";
    import {
      ApolloError,
      ApolloQueryResult,
      NetworkStatus,
      WatchQueryFetchPolicy,
    } from "apollo-boost";
    import cs from "classnames";
    import _ from "lodash";
    import getScrollBarSize from "rc-util/lib/getScrollBarSize";
    import React, {
      memo,
      useContext,
      useEffect,
      useMemo,
      useRef,
      useState,
    } from "react";
    import { useTranslation } from "react-i18next";
    import { useDispatch } from "react-redux";
    
    import {
      BLANK_COLUMN,
      eventStopPropagation,
      handleColumnsByKeys,
      TableRenderer,
      tableScrollToTop,
      useTransformScrollAndColumns,
    } from "@cloudtower/eagle/kit/smartx";
    import {
      CustomizeColumnType,
      useCustomizeColumn,
      useEqualAllColumnKeys,
    } from "@cloudtower/eagle/kit/smartx";
    import { CustomizeColumn } from "@cloudtower/eagle/kit/smartx";
    import { HeaderCell } from "@cloudtower/eagle/kit/smartx";
    import { PendingTable } from "@cloudtower/eagle/kit/smartx";
    import { BooleanField, EnumField, IntField, StringField } from "@cloudtower/eagle/kit/smartx";
    import { SidebarTable } from "@cloudtower/eagle/kit/smartx";
    import { useTableSelection } from "@cloudtower/eagle/kit/smartx";
    import {
      AuxiliaryLine,
      EmptyRowMenu,
      TableEmpty,
      TablePagination,
      usePosition,
    } from "@cloudtower/eagle/kit/smartx";
    import { TableActions } from "@cloudtower/eagle/kit/smartx";
    import { EMPTY_FUNCTION } from "@cloudtower/eagle/kit/specify";
    import { useElementsSize } from "@cloudtower/eagle/kit/specify";
    import { useSearch } from "@cloudtower/eagle/kit/specify";
    import { ExcludeMaybe } from "@cloudtower/eagle/kit/specify";
    import {
      MultipleSelectProps,
      SelectProps,
      SingleSelectProps,
    } from "@cloudtower/eagle/kit/specify";
    import { FailedLoad } from "@cloudtower/eagle/kit/specify";
    import { Icon } from "@cloudtower/eagle/kit/specify";
    import { kitContext } from "@cloudtower/eagle/kit/specify";
    import {
      DateTimeRangeProps,
      EnumProps,
      FloatProps,
      InputSize,
      IntProps,
      Kit,
      RequiredColumnProps,
      KitSelectProps,
      StringProps,
      TableProps,
    } from "@cloudtower/eagle/kit/specify";
    `,
  ].join("\r\n");
  output += ADD_NEW_LINE;

  const types: Record<
    string,
    {
      name: string;
      fields: {
        name: string;
        type: string;
        isScalarList: boolean;
        values?: string[];
        typeTypename: string;
        enumName?: string;
        alias?: string;
      }[];
    }
  > = {};
  const enums: Record<string, string[]> = {};
  const typeNodes: Record<string, ObjectTypeDefinitionNode> = {};

  visit(astNode, {
    EnumTypeDefinition: (node: EnumTypeDefinitionNode) => {
      enums[node.name.value] = (node.values || []).map((v) => v.name.value);
    },
    ObjectTypeDefinition: (node) => {
      typeNodes[node.name.value] = node;
    },
  });

  function findField(
    typename: string,
    type: string,
    delimiter: "__" | "."
  ): FieldDefinitionNode | undefined {
    const fragments = type.split(delimiter);

    let fields = typeNodes[typename].fields || [];
    let field: FieldDefinitionNode | undefined;

    for (const fragment of fragments) {
      field = fields.find((field) => field.name.value === fragment);
      if (!field) {
        /* istanbul ignore next */
        throw new Error(`failed at ${fragment} of ${fragments}/${typename}`);
      }
      const fieldTypename = getTypename(field);
      fields = typeNodes[fieldTypename]?.fields || [];
    }

    return field;
  }

  for (const table of tables) {
    const typename = upperFirst(table.type);
    const tableName = upperFirst(table.name || table.type);
    const columns = table.fields;
    types[tableName] = {
      name: camelcase([tableName, "fields"]),
      fields: columns.map((column, index) => {
        let field!: FieldDefinitionNode | undefined;
        let childTypename!: string;
        if (typeof column === "string") {
          field = findField(typename, column, "__");
          childTypename = column;
        } else {
          // sub query
          field = findField(typename, column.key, ".");
          childTypename = column.key;
        }
        if (!field) {
          /* istanbul ignore next */
          throw new Error(
            `Could not find type for column: ${JSON.stringify(column)}`
          );
        }

        const typeTypename = getTypename(field);
        const isEnum = typeTypename in enums;
        const nullable = isNullableField(field);
        const isList = isListField(field);
        const isObject = !isEnum && notScalar(field);
        const isScalarList = isList && !notScalar(field);
        const isDeepField = typeof column === "string" && column.includes("__");

        let sortable = true;
        if (isObject) {
          sortable = false;
        }
        if (isDeepField) {
          sortable = false;
        }
        if (isList && !isEnum) {
          sortable = false;
        }

        let columnAlias: string | undefined;
        const whereIndexFragments = [];
        if (typeof column === "string") {
          whereIndexFragments.push(column);
        } else {
          columnAlias = column.alias;
          whereIndexFragments.push(...column.key.split("."));
        }
        if (isList && isObject) {
          const lastFragment =
            whereIndexFragments[whereIndexFragments.length - 1];
          whereIndexFragments[whereIndexFragments.length - 1] =
            lastFragment + "_some";
        }
        const type = isEnum ? "Enum" : isObject ? "Object" : typeTypename;
        const dataIndex = getDataIndex(typeMap, {
          column,
          tableType: table.type,
        });
        const name = isDeepField ? column : field.name.value;

        return {
          name,
          alias: columnAlias,
          dataIndex,
          multidimensionalDataIndex: dataIndex.reduce((p, c) => {
            p += `[${c}]`;
            return p;
          }, ""),
          whereIndex: whereIndexFragments.join("?."),
          type,
          nullable,
          isObject,
          enumName: isEnum ? typeTypename : undefined,
          values: isEnum ? enums[typeTypename] : undefined,
          asc: camelcase([field.name.value, "asc"], { pascalCase: true }),
          desc: camelcase([field.name.value, "desc"], {
            pascalCase: true,
          }),
          sortable,
          filterSelectName: isObject
            ? camelcase(
                [
                  tableFilterQuery(
                    table.name || table.type,
                    columnAlias || childTypename
                  ),
                  "select",
                ],
                {
                  pascalCase: true,
                }
              )
            : undefined,
          objectWhereInput: isObject
            ? formatObjectWhereInput(column, isList, isObject)
            : undefined,
          width: getFieldWidth(type, index),
          typeTypename,
          isScalarList,
        };
      }),
    };
  }

  const importedSet = new Set<string>();
  for (const table of tables) {
    const pluralized = pluralize(table.type);
    const typename = upperFirst(table.type);
    const tableName = upperFirst(table.name || table.type);
    const query = camelcase([table.name || pluralized, "query"], {
      pascalCase: true,
    });

    const columns = table.fields;
    for (const column of columns) {
      if (typeof column === "object") {
        const childKey = getLastKey(column.key);
        const field = getField(typeMap, table.type, column.key);
        const pluralized = pluralize(lowerFirst(field.name));
        const filterQuery = tableFilterQuery(
          table.name || table.type,
          column.alias || column.key
        );

        if (!isSchemaType(field.name, typeMap)) {
          continue;
        }

        const deepGetDataIndex = () => {
          const filterFields: (
            fields: (string | { fields: string[] })[]
          ) => string = (fields) => {
            const firstField = fields.filter((field) => field !== "id")[0];

            return typeof firstField === "object"
              ? filterFields(firstField.fields)
              : firstField;
          };
          return filterFields(column.fields);
        };

        output += await ejs.renderFile(TEMPLATES.SELECT, {
          base: childKey,
          type: lowerFirst(field.name),
          pluralized,
          hook: camelcase(["use", filterQuery, "lazyQuery"]),
          query: camelcase([filterQuery, "query"], { pascalCase: true }),
          document: camelcase([filterQuery, "document"], { pascalCase: true }),
          variables: camelcase([filterQuery, "queryVariables"], {
            pascalCase: true,
          }),
          selectName: camelcase([filterQuery, "select"], {
            pascalCase: true,
          }),
          dataIndex: `'${deepGetDataIndex()}'`,
          inputField: `${deepGetDataIndex()}_contains`,
          enableCreate: false,
          isAsyncResource: false,
        });

        output += ADD_NEW_LINE;
      }
    }

    const visibleFields = types[tableName].fields.filter(
      (f) => f.name !== "id"
    );
    const filterableFields = visibleFields.filter((f) => {
      if (f.isScalarList) {
        return false;
      }
      // FIXME: support deep field in filter
      if (f.name.includes("__")) {
        return false;
      }
      if (f.type !== "Object") {
        return true;
      }
      return isSchemaType(f.typeTypename, typeMap);
    });

    const fields = types[tableName].fields;
    const hook = camelcase(["use", query]);
    const variable = camelcase([query, "variables"], {
      pascalCase: true,
    });
    const importOrderByInput = !table.name || !types[typename];
    const orderByInput = camelcase([table.type, "orderByInput"], {
      pascalCase: true,
    });
    const positionQueryHook = camelcase(["use", typename, "positionQuery"]);
    const queryImport = Array.from(
      new Set([
        importOrderByInput ? orderByInput : "",
        hook,
        variable,
        query,
        ..._.compact(
          fields
            .filter((field) => field.enumName)
            .map((field) => field.enumName)
        ),
        positionQueryHook,
      ])
    )
      .filter((v) => {
        const willImport = Boolean(v) && !importedSet.has(v);
        if (willImport) {
          importedSet.add(v);
        }
        return willImport;
      })
      .join(",");

    output += await ejs.renderFile(TEMPLATES.TABLE, {
      base: table.name || table.type,
      type: table.type,
      fields,
      visibleFields,
      filterableFields,
      typename,
      tableName: camelcase([tableName, "table"], { pascalCase: true }),
      filtersName: camelcase([tableName, "filters"]),
      hook,
      variable,
      query,
      requiredWhere: camelcase(["required", query, "where"]),
      entityType: `${query}["${pluralized}"][0]`,
      orderByInput,
      fieldsVariable: camelcase([table.type, "fields"]),
      pluralized,
      connection: camelcase([pluralized, "connection"]),
      entity: camelcase([tableName, "tableEntity"], { pascalCase: true }),
      renderer: camelcase([tableName, "tableRenderer"], { pascalCase: true }),
      props: camelcase([tableName, "tableProps"], { pascalCase: true }),
      filterProps: camelcase([tableName, "filterFieldProps"], {
        pascalCase: true,
      }),
      columnKeys: camelcase([tableName, "columnKeys"], { pascalCase: true }),
      inputColumnKeys: camelcase([tableName, "inputColumnKeys"], {
        pascalCase: true,
      }),
      disabledColumnKeys: table.disabledColumnKeys || [],
      queryImport,
      positionQueryHook,
    });

    output += ADD_NEW_LINE;
  }

  return output;
};
