import { PluginFunction } from "@graphql-codegen/plugin-helpers";
import ejs from "ejs";
import { visit } from "graphql";
import * as path from "path";
import { getConfig, getDocumentNode, getSchemaTypes } from "../common";

export interface Relation {
  typename: string;
  dependentTypes: string[];
  dependentQueries: string[];
}

export const mergeRelations = (
  baseRelation: Relation[],
  extraRelation: Relation[]
): Relation[] => {
  const finalRelation: Relation[] = JSON.parse(JSON.stringify(baseRelation));
  const baseTypeIndexMap: Map<string, number> = new Map();
  baseRelation.forEach((v, idx) => {
    baseTypeIndexMap.set(v.typename, idx);
  });
  for (const relation of extraRelation) {
    const { typename, dependentTypes, dependentQueries } = relation;
    const idx = baseTypeIndexMap.get(typename);
    if (idx !== undefined) {
      finalRelation[idx].dependentTypes.push(...dependentTypes);
      finalRelation[idx].dependentQueries.push(...dependentQueries);
    } else {
      finalRelation.push(relation);
    }
  }
  return finalRelation;
};

const TEMPLATES = {
  TYPE_DEPENDENCIES_MAP: path.resolve(
    __dirname,
    "../../templates/TypeDependenciesMap.ejs"
  ),
};

const TopLevelTypes = new Set(["Query", "Mutation", "Subscription"]);

export const plugin: PluginFunction = async (schema, documents, config) => {
  const { extraRelations } = getConfig(config);
  const relations: Relation[] = [];

  const doc = getDocumentNode(schema);
  const types = getSchemaTypes(doc);

  const cache: Record<
    string,
    {
      dependentTypes: Set<string>;
      dependentQueries: Set<string>;
    }
  > = {};
  const reverseDepIndex: Record<string, Set<string>> = {};

  // collect dependentTypes
  visit(doc, {
    ObjectTypeDefinition(objectNode) {
      const currentTypeName = objectNode.name.value;
      if (TopLevelTypes.has(currentTypeName)) {
        return;
      }
      cache[currentTypeName] = {
        dependentTypes: new Set([currentTypeName]),
        dependentQueries: new Set(),
      };
      if (!reverseDepIndex[currentTypeName]) {
        reverseDepIndex[currentTypeName] = new Set();
      }
      reverseDepIndex[currentTypeName].add(currentTypeName);
      if (types.includes(currentTypeName)) {
        const connectionTypename = `${currentTypeName}Connection`;
        cache[currentTypeName].dependentTypes.add(connectionTypename);
        if (!reverseDepIndex[connectionTypename]) {
          reverseDepIndex[connectionTypename] = new Set();
        }
        reverseDepIndex[connectionTypename].add(currentTypeName);
      }
    },
  });
  visit(doc, {
    ObjectTypeDefinition(objectNode) {
      const currentTypeName = objectNode.name.value;
      if (TopLevelTypes.has(currentTypeName) || !objectNode.fields) {
        return;
      }
      for (const field of objectNode.fields) {
        visit(field, {
          NamedType(namedTypeNode) {
            const targetTypename = namedTypeNode.name.value;
            if (targetTypename in cache) {
              cache[targetTypename].dependentTypes.add(currentTypeName);
              reverseDepIndex[currentTypeName].add(targetTypename);
            }
          },
        });
      }
    },
  });
  // collect dependent queries
  visit(doc, {
    ObjectTypeDefinition(objectNode) {
      const currentTypeName = objectNode.name.value;
      if (currentTypeName !== "Query" || !objectNode.fields) {
        return;
      }
      for (const field of objectNode.fields) {
        visit(field, {
          NamedType(namedTypeNode) {
            const targetTypename = namedTypeNode.name.value;
            const typenames = reverseDepIndex[targetTypename];
            for (const typename of typenames || []) {
              const { dependentTypes } = cache[typename];
              if (dependentTypes.has(targetTypename)) {
                cache[typename].dependentQueries.add(field.name.value);
              }
            }
          },
        });
      }
    },
  });

  visit(doc, {
    ObjectTypeDefinition(objectNode) {
      const currentTypeName = objectNode.name.value;
      if (!["Query", "Mutation", "Subscription"].includes(currentTypeName)) {
        const dependentTypes = Array.from(
          cache[currentTypeName].dependentTypes
        );
        const dependentQueries = Array.from(
          cache[currentTypeName].dependentQueries
        );
        relations.push({
          typename: currentTypeName,
          dependentTypes,
          dependentQueries,
        });
      }
    },
  });

  let finalRelations: Relation[] = relations;

  if (extraRelations) {
    finalRelations = mergeRelations(relations, extraRelations);
  }

  const output = await ejs.renderFile(TEMPLATES.TYPE_DEPENDENCIES_MAP, {
    finalRelations,
  });

  return output;
};
