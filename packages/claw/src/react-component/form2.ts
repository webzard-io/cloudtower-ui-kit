import { PluginFunction } from "@graphql-codegen/plugin-helpers";
import ejs from "ejs";
import { DocumentNode, InputValueDefinitionNode, visit } from "graphql";
import _ from "lodash";
import { pascalCase } from "pascal-case";
import * as path from "path";

import {
  ADD_NEW_LINE,
  camelcase,
  getDocumentNode,
  getTypename,
  isListField,
  SCALARS,
  TypeField,
  TypeMap,
} from "../common";

type Field = {
  key: string;
  path: string;
  value: string;
  isObject: boolean;
  isList: boolean;
  fields?: Field[];
  isEnum: boolean;
  enumType?: string;
  isScalar: boolean;
  scalarType?: string;
  isRequired?: boolean;
};

const formatFieldValue = (
  typeField: TypeField,
  typeMap: TypeMap,
  ancestor = ""
): string => {
  if (typeField.isEnum) {
    return typeField.isList
      ? `${typeField.name}[]`
      : camelcase(typeField.name, { pascalCase: true });
  }
  if (typeField.isScalar) {
    return typeField.isList
      ? `Scalars['${typeField.name}'][]`
      : typeField.name === "String" && typeField.isRequired
      ? `Scalars['${typeField.name}'] | undefined`
      : `Scalars['${typeField.name}']`;
  }

  // nested field
  const _ancestor = `${ancestor}${typeField.name}.`;
  const type = typeMap[typeField.name];
  const children: {
    key: string;
    type: TypeField;
  }[] = [];
  for (const [key, value] of Object.entries(type)) {
    if (ancestor.includes(`.${value.name}.`)) {
      console.warn(
        `Met circular reference: ${value.name} has already existed in ${_ancestor}`
      );
    } else {
      children.push({ key, type: value });
    }
  }
  if (!children.length) {
    /* istanbul ignore next */
    throw new Error(
      `Miss child field for object or array: ${JSON.stringify(typeField.name)}`
    );
  }

  const output = ["{"];
  for (const { key, type } of children) {
    output.push(
      type.isRequired
        ? `${key}: ${formatFieldValue(type, typeMap, _ancestor)};`
        : `${key}?: Maybe<${formatFieldValue(type, typeMap, _ancestor)}>;`
    );
  }
  if (typeField.isList) {
    output.push("}[]");
  } else {
    output.push("}");
  }
  return output.join("\r\n");
};

const getDefaultRender = (field: Field, enums: Record<string, string[]>) => {
  let render = "";
  if (field.isList || field.isObject) {
    return render;
  }
  if (field.isEnum) {
    const enumValues = (enums[field.scalarType || ""] || []).map((value) => {
      // use "pascal-case" according to https://github.com/dotansimha/graphql-code-generator/issues/3395#issuecomment-579166061
      const _value = pascalCase(value);
      return `${field.scalarType}.${_value}`;
    });
    return `defaultRender: FormKit.FieldProps<${
      field.value
    }>['render'] = props => {
      if (!this.context?.kit?.fields?.Enum) {
        return null
      }
      const Enum = this.context.kit.fields.Enum
      return <Enum {...props} enumValues={[${enumValues.join(",")}]} />
    }`;
  }
  switch (field.scalarType) {
    case "String":
    case "ID":
      render = "this.context?.kit?.fields?.String";
      break;
    case "Boolean":
      render = "this.context?.kit?.fields?.Boolean";
      break;
    case "Int":
      render = "this.context?.kit?.fields?.Int";
      break;
    case "Float":
      render = "this.context?.kit?.fields?.Float";
      break;
    case "DateTime":
      render = "this.context?.kit?.fields?.DateTime";
      break;
  }
  if (render) {
    return `defaultRender = ${render}`;
  }
  return "";
};

const formatFieldClass = (
  fields: Field[],
  form: string,
  enums: Record<string, string[]>
): string => {
  let output = "";
  for (const field of fields) {
    const $i = field.path.split(".").filter((p) => p === "$i").length;
    const indexType =
      $i > 1 ? "{ index: number[] }" : $i > 0 ? "{ index: number }" : "";
    if (field.isList) {
      const generics = _.compact([
        `FieldValue['${field.path}'][0]`,
        "FormValue",
        !!indexType &&
          `FormKit.FieldArrayProps<FieldValue['${field.path}'][0]> & ${indexType}`,
      ]);
      output += `static ${_.upperFirst(
        field.key
      )} = class extends FormKit.BaseFieldArray<${generics.join(",")}> {
          form = '${form}'
          path = '${field.path}'
          static contextType = FormContext
          ${
            field.fields?.length
              ? formatFieldClass(field.fields, form, enums)
              : ""
          }
        }
      `;
    } else {
      const generics = _.compact([
        `FieldValue['${field.path}']`,
        "FormValue",
        !!indexType &&
          `FormKit.FieldProps<FieldValue['${field.path}']> & ${indexType}`,
      ]);
      output += `
        static ${_.upperFirst(
          field.key
        )} = class extends FormKit.BaseField<${generics.join(",")}> {
          form = '${form}'
          path = '${field.path}'
          ${getDefaultRender(field, enums)}
          static contextType = FormContext
          ${
            field.fields?.length
              ? formatFieldClass(field.fields, form, enums)
              : ""
          }
        }
      `;
    }
  }
  return output;
};

const collect = (fields: Field[]) => {
  const collection: Field[] = [];
  for (const field of fields) {
    collection.push(field);
    if (field.fields?.length) {
      collection.push(...collect(field.fields));
    }
  }
  return _.uniqBy(collection, "path");
};
type Form = {
  key: string;
  value: string;
  fields: Field[];
  collection: Field[];
};
type ExtractFieldsArgs = {
  type: TypeField;
  pathPrefix?: string;
  ancestor?: string;
  typeMap: TypeMap;
};
const extractFields = (args: ExtractFieldsArgs): Field[] => {
  const { type, pathPrefix = "", ancestor = "", typeMap } = args;
  if (type.isList) {
    const _type = { ...type, isList: false };
    return [
      {
        key: "$i",
        path: `${pathPrefix}$i`,
        value: formatFieldValue(_type, typeMap, ancestor),
        isObject: !_type.isScalar,
        isList: _type.isList,
        isEnum: _type.isEnum,
        isScalar: _type.isScalar,
        scalarType: _type.isScalar ? _type.name : undefined,
        isRequired: _type.isRequired,
        fields: extractFields({
          type: _type,
          ancestor,
          pathPrefix: `${pathPrefix}$i.`,
          typeMap,
        }),
      },
    ];
  }
  if (type.isScalar) {
    return [];
  }
  const _ancestor = `${ancestor}${type.name}.`;
  const children: {
    key: string;
    path: string;
    type: TypeField;
  }[] = [];
  for (const [key, value] of Object.entries(typeMap[type.name])) {
    if (ancestor.includes(`.${value.name}.`)) {
      console.warn(
        `Met circular reference: ${
          value.name
        } has already existed in ${_ancestor};\npath: ${pathPrefix + key}`
      );
    } else {
      children.push({
        key,
        path: pathPrefix + key,
        type: value,
      });
    }
  }
  return children.map(({ key, path, type }) => {
    const scalarType = type.isScalar ? type.name : undefined;
    return {
      key,
      path,
      value: formatFieldValue(type, typeMap, _ancestor),
      isObject: !type.isScalar,
      isList: type.isList,
      isEnum: type.isEnum,
      isScalar: type.isScalar,
      scalarType,
      isRequired: type.isRequired,
      fields: extractFields({
        type,
        ancestor: _ancestor,
        pathPrefix: `${path}.`,
        typeMap,
      }),
    };
  });
};

export function getInputTypeMapAndEnums(
  node: DocumentNode
): [TypeMap, Record<string, string[]>] {
  const typeMap: TypeMap = {};
  const enums: Record<string, string[]> = {};
  const getTypeField = (field: InputValueDefinitionNode): TypeField => {
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
    InputObjectTypeDefinition: (node) => {
      const fields: Record<string, TypeField> = {};
      node.fields?.forEach((field: InputValueDefinitionNode): void => {
        fields[field.name.value] = getTypeField(field);
      });
      typeMap[node.name.value] = fields;
    },
  });

  return [typeMap, enums];
}

export const plugin: PluginFunction = async (schema) => {
  const astNode = getDocumentNode(schema);
  const [typeMap, enums] = getInputTypeMapAndEnums(astNode);

  const forms: Form[] = [];
  for (const [key, type] of Object.entries(typeMap.FormExporter)) {
    const form: Form = {
      key,
      value: formatFieldValue(type, typeMap),
      fields: extractFields({ type, typeMap }),
      collection: [],
    };
    form.collection = collect(form.fields);
    forms.push(form);
  }
  forms.sort((a, b) => a.key.localeCompare(b.key));
  const TEMPLATES = {
    CORE: path.resolve(__dirname, "../templates/react-component/Form2Core.ejs"),
    FORM: path.resolve(__dirname, "../templates/react-component/Form2.ejs"),
  };
  let output = await ejs.renderFile(TEMPLATES.CORE, {
    enums: Array.from(
      new Set(
        _.flatten(forms.map((f) => f.collection))
          .filter((f) => f.isEnum)
          .map((f) => f.scalarType)
      )
    ),
  });
  output += ADD_NEW_LINE;
  for (const form of forms) {
    const name = camelcase(form.key, { pascalCase: true });
    output += await ejs.renderFile(TEMPLATES.FORM, {
      ...form,
      name,
      field: formatFieldClass(form.fields, name, enums),
    });
    output += ADD_NEW_LINE;
  }

  return output;
};
