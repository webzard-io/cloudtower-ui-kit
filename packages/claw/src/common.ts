import camelcase from "camelcase";
import * as fs from "fs";
import {
  DocumentNode,
  FieldDefinitionNode,
  GraphQLSchema,
  InputValueDefinitionNode,
  parse,
  printSchema,
  TypeNode,
  visit,
} from "graphql";
import * as path from "path";
import pluralize from "pluralize";

import { Column, Config, RawConfig } from "./types";

export { constantCase } from "constant-case";
export function getConfig(config: RawConfig): Config {
  return JSON.parse(
    fs.readFileSync(path.resolve(process.cwd(), config.path), "utf8")
  );
}

export const SCALARS = [
  "ID",
  "Int",
  "Float",
  "DateTime",
  "Json",
  "Enum",
  "String",
  "Boolean",
];

export const setPluralize = (data?: Record<string, string>) => {
  for (const key of Object.keys(data || {})) {
    const reg = new RegExp(key);
    pluralize.addPluralRule(reg, data![key]);
  }
  return pluralize;
};

export const setSingularize = (data?: Record<string, string>) => {
  for (const key of Object.keys(data || {})) {
    const reg = new RegExp(key);
    pluralize.addSingularRule(reg, data![key]);
  }
  return pluralize.singular;
};

export { camelcase };

export const upperFirst = (s: string): string => {
  return s.replace(/^\w/, (c) => c.toUpperCase());
};

export const lowerFirst = (s: string): string => {
  return s.replace(/^\w/, (c) => c.toLowerCase());
};

export const ADD_NEW_LINE = "\r\n\r\n";

export function getTypename(
  node: TypeNode | FieldDefinitionNode | InputValueDefinitionNode
): string {
  let nameNode: TypeNode | FieldDefinitionNode | InputValueDefinitionNode =
    node;
  while ("type" in nameNode) {
    nameNode = nameNode.type;
  }
  const typename = nameNode.name.value;

  if (!typename) {
    /* istanbul ignore next */
    console.log(node);
    /* istanbul ignore next */
    throw new Error("failed to get typename");
  }

  return typename;
}

export function isNullableField(node: FieldDefinitionNode): boolean {
  return node.type.kind !== "NonNullType";
}

export function isListField(
  node: FieldDefinitionNode | InputValueDefinitionNode
): boolean {
  if (node.type.kind === "ListType") {
    return true;
  }
  if (node.type.kind === "NonNullType") {
    return node.type.type.kind === "ListType";
  }
  return false;
}

export function notScalar(node: FieldDefinitionNode): boolean {
  const typename = getTypename(node);
  return !SCALARS.includes(typename);
}

export function getLastKey(type: string): string {
  const fragments = type.split(".");
  return fragments[fragments.length - 1];
}

export function tableFilterQuery(
  tableType: string,
  filterType: string
): string {
  return camelcase([tableType, filterType, "filter"]);
}

export function getDocumentNode(schema: GraphQLSchema): DocumentNode {
  const printedSchema = printSchema(schema);
  return parse(printedSchema);
}

export interface TypeMap {
  [key: string]: Record<string, TypeField>;
}
export type TypeField = {
  name: string;
  isList: boolean;
  isScalar: boolean;
  isEnum: boolean;
  arguments?: Record<string, string>;
  isRequired?: boolean;
};
export function getTypeMap(node: DocumentNode): TypeMap {
  const typeMap: TypeMap = {};
  const enums: Record<string, string[]> = {};
  const getTypeField = (
    field: InputValueDefinitionNode | FieldDefinitionNode
  ): TypeField => {
    const name = getTypename(field.type);
    return {
      name,
      isList: isListField(field),
      isScalar: SCALARS.includes(name) || name in enums,
      isEnum: name in enums,
      isRequired: field.type.kind === "NonNullType",
    };
  };

  visit(node, {
    EnumTypeDefinition: (node) => {
      enums[node.name.value] = (node.values || []).map((v) => v.name.value);
    },
  });

  visit(node, {
    ObjectTypeDefinition: (node) => {
      const fields: Record<string, TypeField> = {};
      node.fields?.forEach((field: FieldDefinitionNode): void => {
        fields[field.name.value] = getTypeField(field);
        if (field.arguments?.length) {
          const args: Record<string, string> = {};
          field.arguments.forEach(
            (arg) => (args[arg.name.value] = getTypename(arg))
          );
          fields[field.name.value].arguments = args;
        }
      });
      typeMap[node.name.value] = fields;
    },
    InputObjectTypeDefinition: (node) => {
      const fields: Record<string, TypeField> = {};
      node.fields?.forEach((field: InputValueDefinitionNode): void => {
        fields[field.name.value] = getTypeField(field);
      });
      typeMap[node.name.value] = fields;
    },
  });

  return typeMap;
}

export function getSchemaTypes(node: DocumentNode): string[] {
  const types: string[] = [];

  visit(node, {
    ObjectTypeDefinition: (objNode) => {
      const type = objNode.name.value;
      const testResult = /^(\w+)Connection$/.exec(type);
      if (testResult) {
        visit(objNode, {
          FieldDefinition: (fieldNode) => {
            if (fieldNode.name.value === "aggregate") {
              types.push(testResult[1]);
            }
          },
        });
      }
    },
  });

  return types;
}

export const getRequestPaths = (node: DocumentNode) => {
  const queryPaths: string[] = [];
  const mutationPaths: string[] = [];

  visit(node, {
    ObjectTypeDefinition: (objNode) => {
      if (objNode.name.value === "Query") {
        visit(objNode, {
          FieldDefinition: (fieldNode) => {
            queryPaths.push(fieldNode.name.value);
          },
        });
      }
      if (objNode.name.value === "Mutation") {
        visit(objNode, {
          FieldDefinition: (fieldNode) => {
            mutationPaths.push(fieldNode.name.value);
          },
        });
      }
    },
  });

  return { queryPaths, mutationPaths };
};

export const getDatamodelTypes = (document: DocumentNode) => {
  const types: string[] = [];

  visit(document, {
    ObjectTypeDefinition: (objNode) => {
      const type = objNode.name.value;
      types.push(type);
    },
  });

  return types;
};

export function getField(map: TypeMap, type: string, key: string): TypeField {
  const fragments = key.split(".");
  type = upperFirst(type);

  let typePointer = map[type];
  let childType: TypeField | null = null;

  while (typePointer && fragments.length) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const fragment = fragments.shift()!;
    childType = typePointer[fragment];
    typePointer = map[childType?.name];
  }

  if (!childType) {
    throw new Error(`failed to get child type, key: ${key}, type: ${type}`);
  }
  return childType;
}

export function getFieldForGlobalSearch(
  map: TypeMap,
  type: string,
  key: string
): TypeField {
  const fragments = key.split(".");
  type = upperFirst(type);

  let typePointer = map[type];
  let childType: TypeField | null = null;

  while (typePointer && fragments.length) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const fragment = fragments.shift()!;
    childType = typePointer[camelcase(fragment)];
    typePointer = map[childType?.name];
  }

  if (!childType) {
    throw new Error(`failed to get child type, key: ${key}, type: ${type}`);
  }
  return childType;
}

export function getDataIndex(
  map: TypeMap,
  {
    column,
    tableType,
  }: {
    column: Column;
    tableType: string;
  }
): (string | number)[] {
  const dataIndex: (string | number)[] = [];
  if (typeof column === "string") {
    const accumulate: string[] = [];
    column.split("__").forEach((fragment) => {
      accumulate.push(fragment);
      const field = getField(map, tableType, accumulate.join("."));
      if (field.isList) {
        dataIndex.push(`"${fragment}"`, 0);
      } else {
        dataIndex.push(`"${fragment}"`);
      }
    });
    return dataIndex;
  }
  const accumulate = [];
  for (const [idx, _fragment] of column.key
    .split(".")
    .concat(column.fields[0])
    .entries()) {
    accumulate.push(_fragment);
    const field = getField(map, tableType, accumulate.join("."));
    const fragment = idx === 0 && column.alias ? column.alias : _fragment;
    if (field.isList) {
      dataIndex.push(`"${fragment}"`, 0);
    } else {
      dataIndex.push(`"${fragment}"`);
    }
  }
  return dataIndex;
}

export function getEnums(node: DocumentNode): Record<string, string[]> {
  const enums: Record<string, string[]> = {};
  visit(node, {
    EnumTypeDefinition: (type) => {
      const enumName = type.name.value;
      enums[enumName] = [];
      type.values?.forEach((value) => {
        enums[enumName].push(value.name.value);
      });
    },
  });
  return enums;
}

export function isSchemaType(type: string, typeMap: TypeMap): boolean {
  const typename = upperFirst(type);
  // check id is tricky but fast
  return typename in typeMap && "id" in typeMap[typename];
}
