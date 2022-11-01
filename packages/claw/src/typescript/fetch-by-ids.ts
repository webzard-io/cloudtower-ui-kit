import { PluginFunction } from "@graphql-codegen/plugin-helpers";
import { getConfig, setPluralize, upperFirst } from "../common";

export const plugin: PluginFunction = (schema, documents, config) => {
  const { fetchByIds, pluralizes } = getConfig(config);
  const pluralize = setPluralize(pluralizes);

  let output = 'import { client } from "../graphql";';
  output += "\n\n";
  output += "import {";

  fetchByIds.forEach((r) => {
    const up = upperFirst(r.type);
    output += `Fetch${up}ByIdsQuery, Fetch${up}ByIdsQueryVariables, Fetch${up}ByIdsDocument,`;
  });
  output += '} from "./react-hooks";';

  output += "\n\n";

  const resources = fetchByIds.map((r) => `'${r.alias || r.type}'`).join(" | ");
  output += `export type Resources = ${resources}`;
  output += "\n\n";

  output += "export const singularMap: Record<string, Resources> = {";
  output += fetchByIds
    .map((r) => `${pluralize(r.alias || r.type)}: '${r.alias || r.type}'`)
    .join(",");
  output += "}";

  fetchByIds.forEach((r) => {
    const pl = pluralize(r.type);
    const up = upperFirst(r.type);
    output += `
       export const fetch${up}ByIds = async (ids: string[]) => {
        const { data } = await client.query<
          Fetch${up}ByIdsQuery,
          Fetch${up}ByIdsQueryVariables
        >({
          query: Fetch${up}ByIdsDocument,
          variables: { where: { id_in: ids } },
        });
        return data.${pl};
      };
    `;
  });

  return output;
};
