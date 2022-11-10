import ejs from "ejs";
import { DocumentNode, visit } from "graphql";
import _ from "lodash";
import * as path from "path";

import {
  ADD_NEW_LINE,
  camelcase,
  getConfig,
  getDocumentNode,
  setPluralize,
  upperFirst,
} from "../common";
import { PluginFunction } from "../types";

const TEMPLATES = {
  SELECT: path.resolve(__dirname, "../../templates/react-component/Select.ejs"),
};

const getAsyncResourceMap = (ast: DocumentNode) => {
  const map: { [key: string]: boolean } = {};
  visit(ast, {
    ObjectTypeDefinition: (node) => {
      map[node.name.value] = (node.fields || []).some(
        (field) => field.name.value === "entityAsyncStatus"
      );
    },
  });
  return map;
};

export const plugin: PluginFunction = async (schema, documents, config) => {
  const astNode = getDocumentNode(schema);
  const asyncResourceMap = getAsyncResourceMap(astNode);
  const { selects, pluralizes } = getConfig(config);
  const pluralize = setPluralize(pluralizes);
  const hasEnableCreate = selects.some((select) => !!select.enableCreate);
  const hasAsyncField = selects.some(
    (select) =>
      Boolean(select.enableCreate) &&
      asyncResourceMap[camelcase(select.type, { pascalCase: true })]
  );
  let output = _.compact([
    // FIXME: share header
    "/* eslint-disable",
    "@typescript-eslint/no-unused-vars,",
    "@typescript-eslint/no-explicit-any,",
    "@typescript-eslint/no-non-null-assertion,",
    "@typescript-eslint/no-unnecessary-type-assertion,",
    "react-hooks/rules-of-hooks,",
    "import/first",
    "*/",
    'import React, { useEffect, useContext, useRef, useState, useMemo } from "react";',
    "import { useTranslation } from 'react-i18next';",
    "import _ from 'lodash';",
    "import { kitContext } from '../ui-kit';",
    "import { KitSelectProps } from '../ui-kit/base';",
    "import { SingleSelectProps, MultipleSelectProps, SelectProps } from '../common/types';",
    "import FailedLoad from '../components/FailedLoad';",
    hasEnableCreate &&
      "import { CreatingSelectDropdownStyle, CreateResourceDropdownRender } from '../components/DropdownRender';",
    hasEnableCreate && "import cs from 'classnames';",
    hasAsyncField && "import { client } from '../graphql'",
    "import { WatchQueryFetchPolicy } from 'apollo-boost';",
  ]).join("\r\n");
  output += ADD_NEW_LINE;

  for (const select of selects) {
    const selectName = upperFirst(select.name || select.type);
    const query = camelcase([selectName, "select", "query"]);
    const document = camelcase([selectName, "select", "document"]);
    const nonIdFirstField = select.fields.filter((field) => field !== "id")[0];

    output += await ejs.renderFile(TEMPLATES.SELECT, {
      hook: camelcase(["use", selectName, "select", "lazy", "query"]),
      query: upperFirst(query),
      document: upperFirst(document),
      variables: camelcase([query, "variables"], { pascalCase: true }),
      selectName: camelcase([selectName, "select"], { pascalCase: true }),
      pluralized: pluralize(select.type),
      base: select.type,
      type: select.type,
      dataIndex: `'${nonIdFirstField}'`,
      fields: select.fields,
      inputField: select.inputField || `${nonIdFirstField}_contains`,
      enableCreate: Boolean(select.enableCreate),
      isAsyncResource:
        asyncResourceMap[camelcase(select.type, { pascalCase: true })],
    });
  }

  return output;
};
