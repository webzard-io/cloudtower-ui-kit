import { PluginFunction as RawPluginFunction } from "@graphql-codegen/plugin-helpers";
import ejs from "ejs";
import * as path from "path";

import {
  ADD_NEW_LINE,
  camelcase,
  getConfig,
  getDocumentNode,
  getField,
  getTypeMap,
  TypeField,
  TypeMap,
} from "../common";
import {
  BasicExtraField,
  Field as FieldConfig,
  RootExtraField as ExtraFieldConfig,
} from "../types";

function checkField(field: string) {
  if (!field) {
    /* istanbul ignore next */
    throw new Error("Field invalid: empty string");
  }
  if (/\.|\[/.test(field)) {
    /* istanbul ignore next */
    throw new Error("Field invalid: include '.' or '['");
  }
}

type Field = {
  key: string;
  value: string;
  error: string;
  isObject: boolean;
  isList: boolean;
  fields?: Field[];
  isEnum: boolean;
  enumType?: string;
  isScalar: boolean;
  scalarType?: string;
  isRequired?: boolean;
};

const extractField = ({
  collection,
  typeMap,
  field,
  pre = "",
  type,
}: {
  collection: Field[];
  typeMap: TypeMap;
  field: FieldConfig | BasicExtraField;
  pre?: string;
  type: string;
}): Field => {
  const formatFieldValue = function formatFieldValue(
    typeField: TypeField,
    filter?: (FieldConfig | BasicExtraField)[]
  ): string {
    if (typeField.isEnum) {
      return camelcase(typeField.name, { pascalCase: true });
    }
    if (typeField.isScalar) {
      return typeField.isList
        ? `Scalars['${typeField.name}'][]`
        : typeField.name === "String" && typeField.isRequired
        ? `Scalars['${typeField.name}'] | undefined`
        : `Scalars['${typeField.name}']`;
    }
    // nested field
    const output = ["{"];
    if (!filter?.length) {
      /* istanbul ignore next */
      throw new Error(
        `Miss child field for object or array: ${JSON.stringify(
          typeField.name
        )}`
      );
    }
    for (const childField of filter) {
      if (typeof childField === "string") {
        const childTypeField = typeMap[typeField.name][childField];
        output.push(
          childTypeField.isRequired
            ? `${childField}: ${formatFieldValue(childTypeField)};`
            : `${childField}?: Maybe<${formatFieldValue(childTypeField)}>;`
        );
      } else if ("fields" in childField) {
        const childTypeField = typeMap[typeField.name][childField.key];
        output.push(
          childTypeField.isRequired
            ? `${childField.key}: ${formatFieldValue(childTypeField, [
                ...childField.fields,
                ...(childField.extraFields || []),
              ])};`
            : `${childField.key}?: Maybe<${formatFieldValue(childTypeField, [
                ...childField.fields,
                ...(childField.extraFields || []),
              ])}>;`
        );
      } else {
        // inline extra field
        output.push(
          childField.isRequired
            ? `${childField.key}: Scalars['${childField.type}'];`
            : `${childField.key}?: Maybe<Scalars['${childField.type}']>;`
        );
      }
    }
    if (typeField.isList) {
      output.push("}[]");
    } else {
      output.push("}");
    }
    return output.join("\r\n");
  };

  function formatFieldError(
    typeField: TypeField,
    filter?: (FieldConfig | BasicExtraField)[]
  ): string {
    if (typeField.isEnum) {
      return "string";
    }
    if (typeField.isScalar) {
      return typeField.isList ? "string | (string | null)[]" : "string";
    }
    // object or array
    const output = ["string | ({"];
    if (!filter?.length) {
      /* istanbul ignore next */
      throw new Error(
        `Miss child field for object or array: ${JSON.stringify(
          typeField.name
        )}`
      );
    }
    for (const childField of filter) {
      if (typeof childField === "string") {
        output.push(`${childField}?: string;`);
      } else if ("fields" in childField) {
        const childTypeField = typeMap[typeField.name][childField.key];
        output.push(
          `${childField.key}?: ${formatFieldError(
            childTypeField,
            childField.fields
          )};`
        );
      } else {
        // inline extra field
        output.push(`${childField.key}?: string;`);
      }
    }
    if (typeField.isList) {
      output.push("} | null)[] & { 'FINAL_FORM/array-error'?: string }");
    } else {
      output.push("})");
    }
    return output.join("");
  }

  checkField(typeof field === "string" ? field : field.key);
  const key =
    (pre ? `${pre}.` : "") + (typeof field === "string" ? field : field.key);

  // inline extra field
  if (typeof field !== "string" && "type" in field) {
    const output = {
      key,
      value: `Scalars['${field.type}']`,
      error: "string",
      isObject: false,
      isList: false,
      isEnum: false,
      isScalar: true,
      scalarType: field.type,
      isRequired: field.isRequired,
    };
    collection.push(output);
    return output;
  }

  // common field
  const fieldType = getField(typeMap, type, key);
  const subfields =
    typeof field === "string"
      ? []
      : [...field.fields, ...(field.extraFields || [])];
  const scalarType = fieldType.isScalar ? fieldType.name : undefined;
  const output = {
    key,
    value: formatFieldValue(fieldType, subfields),
    error: formatFieldError(fieldType, subfields),
    isObject: !fieldType.isScalar,
    isList: fieldType.isList,
    isEnum: fieldType.isEnum,
    isScalar: fieldType.isScalar,
    scalarType,
    fields: subfields?.map((f) => {
      const output = extractField({
        collection,
        field: f,
        pre: key,
        type,
        typeMap,
      });
      return {
        ...output,
        key: typeof f === "string" ? f : f.key,
      };
    }),
    isRequired: fieldType.isRequired,
  };
  collection.push(output);
  return output;
};

const extractExtraField = ({
  collection,
  field,
  pre = "",
}: {
  collection: Field[];
  field: ExtraFieldConfig;
  pre?: string;
}): Field => {
  type FormatField = Omit<Field, "value" | "error">;
  function formatFieldValue(field: FormatField): string {
    if (field.isEnum) {
      if (!field.enumType) {
        /* istanbul ignore next */
        throw new Error(`EnumType is undefined: ${field.key}`);
      }
      return camelcase(field.enumType, { pascalCase: true });
    }
    if (field.isScalar) {
      return field.isList
        ? `Scalars['${field.scalarType}'][]`
        : field.scalarType === "String" && field.isRequired
        ? `Scalars['${field.scalarType}'] | undefined`
        : `Scalars['${field.scalarType}']`;
    }
    const output = ["{"];
    // nested field
    // FIXME recursive calling
    if (!field.fields?.length) {
      /* istanbul ignore next */
      throw new Error(`Miss child field for object or array: ${field.key}`);
    }
    for (const childField of field.fields) {
      output.push(
        childField.isRequired
          ? `${childField.key}: ${formatFieldValue(childField)};`
          : `${childField.key}?: Maybe<${formatFieldValue(childField)}>;`
      );
    }
    if (field.isList) {
      output.push("}[]");
    } else {
      output.push("}");
    }
    return output.join("\r\n");
  }
  function formatFieldError(field: FormatField): string {
    if (field.isEnum) {
      return "string";
    }
    if (field.isScalar) {
      return field.isList ? "string | (string | null)[]" : "string";
    }
    // object or array
    // FIXME recursive calling
    const output = ["string | ({"];
    if (!field.fields?.length) {
      /* istanbul ignore next */
      throw new Error(`Miss child field for object or array: ${field.key}`);
    }
    for (const childField of field.fields) {
      output.push(`${childField.key}?: string;`);
    }
    if (field.isList) {
      output.push("} | null)[] & { 'FINAL_FORM/array-error': string }");
    } else {
      output.push("})");
    }
    return output.join("");
  }

  checkField(field.key);
  const onlyFormValue = field.onlyFormValue || false;
  const key = (pre ? `${pre}.` : "") + field.key;
  const subfields = "fields" in field ? field.fields : [];
  const isScalar = field.type !== "Object" && field.type !== "Array";
  const scalarType = isScalar
    ? "scalarType" in field
      ? field.scalarType
      : field.type
    : undefined;
  const formatField = {
    key,
    isObject:
      field.type === "Object" ||
      field.type === "Array" ||
      field.type === "ScalarArray",
    isList: field.type === "Array" || field.type === "ScalarArray",
    isEnum: "isEnum" in field ? field.isEnum : false,
    enumType: "isEnum" in field ? field.type : undefined,
    isScalar,
    scalarType,
    fields: subfields.map((field) => {
      const output = extractExtraField({
        collection: onlyFormValue ? [] : collection,
        field,
        pre: key,
      });
      return { ...output, key: field.key };
    }),
    isRequired: field.isRequired,
  };
  const output = {
    value: formatFieldValue(formatField),
    error: onlyFormValue ? "string" : formatFieldError(formatField),
    ...formatField,
    key,
  };
  collection.push(output);
  return output;
};

type Config = {
  path: string;
  imagesPath: string;
  generateTypes?: boolean;
  enumSrcFile?: string;
};
type PluginFunction = RawPluginFunction<Config>;
type FormConfigs = {
  name: string;
  formValueFields: Field[];
  baseFields: Field[];
  baseFieldArrays: Field[];
  fields: Field[];
  type: Record<string, string>;
}[];

export const generateTypes = async (
  forms: FormConfigs,
  enums: { values: string[]; src: string }
) => {
  const TEMPLATES = {
    CORE: path.resolve(
      __dirname,
      "../templates/react-component/FormTypesCore.ejs"
    ),
    FORM: path.resolve(__dirname, "../templates/react-component/FormTypes.ejs"),
  };
  let output = [
    "/* eslint-disable",
    "@typescript-eslint/no-empty-interface,",
    "@typescript-eslint/no-unused-vars,",
    "@typescript-eslint/no-explicit-any,",
    "@typescript-eslint/no-non-null-assertion,",
    "@typescript-eslint/no-unnecessary-type-assertion,",
    "import/first",
    "*/",
  ].join("\r\n");
  output += ADD_NEW_LINE;
  output += `import { Scalars, Maybe, ${enums.values.join(", ")} } from './${
    enums.src
  }';`;
  output += ADD_NEW_LINE;
  output += await ejs.renderFile(TEMPLATES.CORE);
  for (const form of forms) {
    output += ADD_NEW_LINE;
    output += await ejs.renderFile(TEMPLATES.FORM, {
      ...form,
    });
  }

  return output;
};

export const generate = async (forms: FormConfigs) => {
  const TEMPLATES = {
    CORE: path.resolve(__dirname, "../templates/react-component/FormCore.ejs"),
    FORM: path.resolve(__dirname, "../templates/react-component/Form.ejs"),
    UTILS: path.resolve(
      __dirname,
      "../templates/react-component/FormUtils.ejs"
    ),
  };

  let output = [
    "/* eslint-disable",
    "@typescript-eslint/no-empty-interface,",
    "@typescript-eslint/no-unused-vars,",
    "@typescript-eslint/no-explicit-any,",
    "@typescript-eslint/no-non-null-assertion,",
    "@typescript-eslint/no-unnecessary-type-assertion,",
    "@typescript-eslint/no-namespace,",
    "react-hooks/rules-of-hooks,",
    "import/first",
    "*/",
  ].join("\r\n");
  output += ADD_NEW_LINE;
  output += await ejs.renderFile(TEMPLATES.CORE);
  for (const form of forms) {
    const formName = form.name;
    for (const [key, value] of Object.entries(form.type)) {
      form.type[key] = `FT.${value}`;
    }
    output += ADD_NEW_LINE;
    output += await ejs.renderFile(TEMPLATES.FORM, {
      ...form,
      name: {
        rawName: camelcase(formName, { pascalCase: true }),
        form: camelcase([formName, "form"], { pascalCase: true }),
        baseForm: camelcase([formName, "baseForm"], { pascalCase: true }),
        baseFormContext: camelcase([formName, "baseFormContext"], {
          pascalCase: true,
        }),
        baseFields: camelcase([formName, "baseFields"]),
        baseFieldArrays: camelcase([formName, "baseFieldArrays"]),
        baseFormSpy: camelcase([formName, "baseFormSpy"], { pascalCase: true }),
        fields: camelcase([formName, "fields"], { pascalCase: true }),
        useForm: camelcase(["use", formName, "form"]),
        useField: camelcase(["use", formName, "field"]),
        useFieldValue: camelcase(["use", formName, "fieldValue"]),
        useFieldArray: camelcase(["use", formName, "fieldArray"]),
        useFieldArrayValue: camelcase(["use", formName, "fieldArrayValue"]),
        useFormState: camelcase(["use", formName, "formState"]),
      },
    });
  }

  output += ADD_NEW_LINE;
  output += await ejs.renderFile(TEMPLATES.UTILS);
  return output;
};

export const plugin: PluginFunction = (schema, documents, config) => {
  const { forms } = getConfig(config);
  const astNode = getDocumentNode(schema);
  const typeMap = getTypeMap(astNode);
  const formConfigs = [];
  const enums: { values: string[]; src: string } = {
    values: [],
    src: config.enumSrcFile || "react-hooks",
  };
  for (const form of forms) {
    const fields: Field[] = [];
    const mutation = getField(typeMap, "Mutation", camelcase(form.type));
    const args = mutation.arguments || {};
    for (const [key, value] of Object.entries(args)) {
      if ("fields" in form && form.fields[key]?.length) {
        for (const field of form.fields[key]) {
          extractField({ collection: fields, field, type: value, typeMap });
        }
      }
    }

    (form.extraFields || []).forEach((field) => {
      extractExtraField({ collection: fields, field });
    });

    for (const f of fields) {
      if (f.isEnum) {
        const enumName = camelcase(f.value, { pascalCase: true });
        if (!enums.values.includes(enumName)) {
          enums.values.push(enumName);
        }
      }
    }

    const formName = form.name || form.type;
    formConfigs.push({
      name: formName,
      formValueFields: fields.filter((f) => !f.key.includes(".")),
      baseFields: fields.filter((f) => !f.isList),
      baseFieldArrays: fields.filter((f) => f.isList),
      fields,
      type: {
        formValue: camelcase([formName, "formValue"], { pascalCase: true }),
        formError: camelcase([formName, "formError"], { pascalCase: true }),
        validation: camelcase([formName, "formValidation"], {
          pascalCase: true,
        }),
        validators: camelcase([formName, "formValidators"], {
          pascalCase: true,
        }),
        baseFieldKeys: camelcase([formName, "baseFieldKeys"], {
          pascalCase: true,
        }),
        baseFields: camelcase([formName, "baseFields"], { pascalCase: true }),
        baseFieldArrayKeys: camelcase([formName, "baseFieldArrayKeys"], {
          pascalCase: true,
        }),
        baseFieldArrays: camelcase([formName, "baseFieldArrays"], {
          pascalCase: true,
        }),
        baseFieldArrayChildFields: camelcase(
          [formName, "baseFieldArrayChildFields"],
          { pascalCase: true }
        ),
        baseFormOnChange: camelcase([formName, "FormOnChange"], {
          pascalCase: true,
        }),
        baseFormProps: camelcase([formName, "baseFormProps"], {
          pascalCase: true,
        }),
      },
    });
  }

  return config.generateTypes
    ? generateTypes(formConfigs, enums)
    : generate(formConfigs);
};
