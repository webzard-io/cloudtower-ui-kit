import _ from "lodash";
import {
  ADD_NEW_LINE,
  camelcase,
  tableFilterQuery,
  getConfig,
  getTypeMap,
  getDocumentNode,
  getField,
  isSchemaType,
  lowerFirst,
  setPluralize,
} from "../common";
import { PluginFunction, Column } from "../types";
import pluralize from "pluralize";

interface Tree {
  [key: string]: Tree;
}

function stringifyStringColumns(columns: string[]): string {
  const tree: Tree = {};
  for (const column of columns) {
    let cursor = tree;
    for (const fragment of column.split("__")) {
      if (!cursor[fragment]) {
        cursor[fragment] = {};
      }
      cursor = cursor[fragment];
    }
  }
  const subQuery: string[] = [];
  const walk = (node: Tree) => {
    for (const key in node) {
      const value = node[key];
      if (Object.keys(value).length === 0) {
        subQuery.push(key);
      } else {
        subQuery.push(`${key} {`);
        walk(value);
        subQuery.push("}");
      }
    }
  };
  walk(tree);
  return subQuery.join("\r\n");
}

export function stringifyColumns(columns: Column[], appendId = false): string {
  const queries: string[] = [];
  const stringColumns: string[] = [];
  if (appendId && !columns.includes("id")) {
    columns.push("id");
  }
  for (const column of columns) {
    if (typeof column === "string") {
      stringColumns.push(column);
      continue;
    }
    const fragments = column.key.split(".");
    const subQuery: string[] = [];
    if (column.alias) {
      subQuery.push(`${column.alias}: `);
    }
    for (let i = 0; i < fragments.length; i++) {
      subQuery.push(`${fragments[i]} {`);
      if (i === fragments.length - 1) {
        subQuery.push(
          stringifyColumns(
            column.fields,
            column.appendId === false ? false : appendId
          )
        );
      } else {
        subQuery.push("id");
      }
    }
    fragments.forEach(() => subQuery.push("}"));
    queries.push(subQuery.join("\r\n"));
  }
  /* istanbul ignore next */
  if (stringColumns.length === 0) {
    console.log("no string column found in:", columns);
    throw new Error("no string column found");
  }
  return [stringifyStringColumns(stringColumns)].concat(queries).join("\r\n");
}

function formatListQuery(
  pl: typeof pluralize,
  type: string,
  columns: Column[],
  needCount: boolean,
  name?: string,
  withExtra?: boolean
): string {
  const pluralizedType = pl(type);

  const lines = _.compact([
    `query ${name || pluralizedType}(`,
    `$where: ${camelcase([type, "whereInput"], { pascalCase: true })}`,
    `$orderBy: ${camelcase([type, "orderByInput"], { pascalCase: true })}`,
    "$skip: Int",
    "$first: Int",
    withExtra && "$extraIds: [ID!]",
    withExtra && "$skipExtra: Boolean!",
    `){`,
    `${pluralizedType}(where: $where, orderBy: $orderBy, skip: $skip, first: $first) {`,
    stringifyColumns(columns),
    "}",
  ]);

  if (needCount) {
    lines.push(
      `${camelcase([pluralizedType, "connection"])}(where: $where) {`,
      "aggregate { count }",
      "}"
    );
  }

  if (withExtra) {
    lines.push(
      `extra: ${pluralizedType}(where: { id_in: $extraIds }) @skip(if: $skipExtra) {`,
      stringifyColumns(columns),
      "}"
    );
  }

  lines.push("}");

  return lines.join("\r\n");
}

const formatPositonQuery = (
  pl: typeof pluralize,
  name: string,
  type: string
) => {
  const pluralizedType = pl(type);
  const lines = [
    `query ${name}Position(`,
    `$where: ${camelcase([type, "whereInput"], {
      pascalCase: true,
    })}`,
    `$orderBy: ${camelcase([type, "orderByInput"], { pascalCase: true })}`,
    "$before: String",
    ") {",
    `${camelcase([
      pluralizedType,
      "connection",
    ])}(where: $where, orderBy: $orderBy, before: $before){`,
    "aggregate {",
    "count",
    "}",
    "}",
    "}",
  ];
  return lines.join("\r\n");
};

export const plugin: PluginFunction = (schema, documents, config) => {
  const { tables, selects, pluralizes } = getConfig(config);
  const pluralize = setPluralize(pluralizes);
  const astNode = getDocumentNode(schema);
  const typeMap = getTypeMap(astNode);

  let output = "";

  // table query
  for (const table of tables) {
    const { type, fields, invisibleFields = [] } = table;
    const name = table.name || type;

    const columns = fields.concat(invisibleFields);
    output += `# queries for ${name} table\r\n`;
    output += formatListQuery(pluralize, type, columns, true, table.name);

    output += ADD_NEW_LINE;
    output += formatPositonQuery(pluralize, table.name || type, type);

    for (const column of columns) {
      // table filter query
      if (typeof column === "object" && !invisibleFields.includes(column)) {
        const childKey = column.key;
        const childAlias = column.alias;
        const childType = lowerFirst(getField(typeMap, type, childKey).name);

        if (!isSchemaType(childType, typeMap)) {
          continue;
        }

        output += formatListQuery(
          pluralize,
          childType,
          column.fields,
          false,
          tableFilterQuery(name, childAlias || childKey),
          true
        );
      }
    }

    output += ADD_NEW_LINE;
  }

  // select query
  for (const select of selects) {
    const { name, type, fields } = select;
    output += `# queries for ${name || type} select\r\n`;
    output += formatListQuery(
      pluralize,
      type,
      fields,
      false,
      camelcase([name || type, "select"]),
      true
    );

    output += ADD_NEW_LINE;
  }

  return output;
};
