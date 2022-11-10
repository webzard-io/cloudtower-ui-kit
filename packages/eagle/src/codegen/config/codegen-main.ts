const config = {
  schema: "../../../tower/packages/server/src/generated/schema.graphql",
  documents: [
    "./src/generated/query.graphql",
    "./src/generated/global-search.graphql",
    "./src/generated/fetch-by-ids.graphql",
    "./src/codegen/graphql/*.graphql",
  ],
  hooks: { afterAllFileWrite: ["prettier --write"] },
  generates: {
    "src/generated/react-hooks.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
      config: {
        scalars: {
          DateTime: "string",
          JSON: "{ [key: string]: any }",
        },
        withComponent: false,
        withHOC: false,
        withHooks: true,
        maybeValue: "T | null | undefined",
      },
    },
    "src/generated/tables.tsx": {
      plugins: ["../claw/dist/src/react-component/table.js"],
    },
    // "src/generated/selects.tsx": {
    //   plugins: ["../codegen/lib/react-component/select.js"],
    // },
    "src/generated/forms-types.tsx": {
      plugins: ["../claw/dist/react-component/form.js"],
      config: {
        generateTypes: true,
      },
    },
    "src/generated/forms.tsx": {
      plugins: ["../claw/dist/react-component/form.js"],
    },
    "src/generated/forms2.tsx": {
      schema: "src/codegen/config/form-schema.graphql",
      plugins: ["../claw/dist/react-component/form2.js"],
    },
    // "src/generated/type-dependencies-map.ts": {
    //   plugins: ["../claw/dist/src/graphql/type-dependencies-map.js"],
    // },
    "src/generated/global-search.ts": {
      plugins: ["../claw/dist/src/typescript/global-search.js"],
    },
    "src/generated/images-type.ts": {
      plugins: ["../claw/dist/src/typescript/images-type.js"],
    },
    // "src/generated/audit-log-action-options.ts": {
    //   plugins: ["../claw/dist/src/typescript/audit-log-action-options.js"],
    // },
    // "src/generated/system-audit-log-action-options.ts": {
    //   plugins: ["../claw/dist/src/typescript/system-audit-log-action-options.js"],
    // },
    // "src/generated/fetch-by-ids.ts": {
    //   plugins: ["../claw/dist/src/typescript/fetch-by-ids.js"],
    // },
  },
  config: {
    path: "src/codegen/config/codegen-config.json",
    imagesPath: "src/kit/specify/images",
  },
};

export default config;
