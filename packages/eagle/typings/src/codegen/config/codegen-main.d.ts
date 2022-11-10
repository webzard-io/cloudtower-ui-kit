declare const config: {
    schema: string;
    documents: string[];
    hooks: {
        afterAllFileWrite: string[];
    };
    generates: {
        "src/generated/react-hooks.ts": {
            plugins: string[];
            config: {
                scalars: {
                    DateTime: string;
                    JSON: string;
                };
                withComponent: boolean;
                withHOC: boolean;
                withHooks: boolean;
                maybeValue: string;
            };
        };
        "src/generated/tables.tsx": {
            plugins: string[];
        };
        "src/generated/selects.tsx": {
            plugins: string[];
        };
        "src/generated/forms-types.tsx": {
            plugins: string[];
            config: {
                generateTypes: boolean;
            };
        };
        "src/generated/forms.tsx": {
            plugins: string[];
        };
        "src/generated/forms2.tsx": {
            schema: string;
            plugins: string[];
        };
        "src/generated/type-dependencies-map.ts": {
            plugins: string[];
        };
        "src/generated/global-search.ts": {
            plugins: string[];
        };
        "src/generated/images-type.ts": {
            plugins: string[];
        };
    };
    config: {
        path: string;
        imagesPath: string;
    };
};
export default config;
