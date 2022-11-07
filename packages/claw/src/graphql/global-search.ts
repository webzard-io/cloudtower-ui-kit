import { PluginFunction } from "@graphql-codegen/plugin-helpers";
import {
  getConfig,
  camelcase,
  setPluralize,
  upperFirst,
  getDocumentNode,
  getTypeMap,
  getFieldForGlobalSearch,
  isSchemaType,
  lowerFirst,
} from "../common";
import { stringifyColumns } from "./document";
import { Column } from "../types";

export const plugin: PluginFunction = (schema, documents, config) => {
  const { globalSearch, pluralizes } = getConfig(config);
  const pluralize = setPluralize(pluralizes);
  const astNode = getDocumentNode(schema);
  const typeMap = getTypeMap(astNode);

  let output = "query searchAll(";

  globalSearch.forEach((r) => {
    output += `
    $${r.type}Where: ${camelcase([r.type, "whereInput"], {
      pascalCase: true,
    })}
    $include${upperFirst(r.type)}: Boolean = true
    $${r.type}First: Int = 6
    $${r.type}Skip: Int = 0
    `;
  });
  output += ") { ";

  globalSearch.forEach((r) => {
    const pl = pluralize(r.type);
    const where = `$${r.type}Where`;
    const include = `@include(if: $include${upperFirst(r.type)})`;
    let childType = "";
    try {
      childType = lowerFirst(
        getFieldForGlobalSearch(typeMap, "Query", r.type).name
      );
    } catch {
      //  handle
    }

    const getFieldType = (field: Column): any => {
      if (typeof field === "object") {
        let childKey = "";
        try {
          childKey = lowerFirst(
            getFieldForGlobalSearch(typeMap, "Query", field.key).name
          );
        } catch {
          //  handle
        }
        return {
          ...field,
          appendId: isSchemaType(childKey, typeMap),
          fields: field.fields.map((field) => getFieldType(field)),
        };
      }
      return field;
    };

    const fields = r.fields.map((field) => {
      return getFieldType(field);
    });

    output += `
      ${pl}(where: ${where}, first: $${r.type}First, skip: $${
      r.type
    }Skip) ${include} {
        ${stringifyColumns(fields, isSchemaType(childType, typeMap))}
      } 
      ${camelcase([pl, "connection"])}(where: ${where}) ${include} {
        aggregate { 
          count
        }
      }`;
  });
  output += "}";

  return output;
};
