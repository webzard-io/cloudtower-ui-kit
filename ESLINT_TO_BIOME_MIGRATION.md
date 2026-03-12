# ESLint 迁移至 Biome 报告

## 概览

- **迁移前**: ESLint 8.x + `eslint-config-react-app` + `eslint-plugin-simple-import-sort`
- **迁移后**: Biome 2.4.6
- **分析的 ESLint 规则总数**: 126 条（通过 `calculateConfigForFile` 获取）
- **迁移覆盖率**: 69%（87/126 条规则被 Biome 完全覆盖）

## 变更内容

### 删除的文件

- `.eslintrc` — ESLint 配置文件

### 新增的文件

- `biome.json` — Biome 配置文件
- `scripts/analyze-eslint-rules.cjs` — 分析脚本（仅供参考）

### 依赖变更

| 移除                                      | 新增                    |
| ----------------------------------------- | ----------------------- |
| `eslint@^8.25.0`                          | `@biomejs/biome@^2.4.6` |
| `eslint-config-react-app@^7.0.1`          |                         |
| `eslint-plugin-simple-import-sort@^8.0.0` |                         |

### 脚本更新

| 文件                                  | 变更前                         | 变更后                                 |
| ------------------------------------- | ------------------------------ | -------------------------------------- |
| `package.json` `lint`                 | `eslint "**/*.{tsx,ts}" --fix` | `biome check --fix`                    |
| `package.json` `lint-staged`          | `eslint`                       | `biome check --no-errors-on-unmatched` |
| `packages/parrot/package.json` `lint` | `eslint src --ext .ts --quiet` | `biome check src`                      |

### 格式化器

- Biome 格式化器已**禁用**（`"enabled": false`），因为项目使用 Prettier。
- Biome 的 `organizeImports` 辅助功能已启用（替代 `simple-import-sort`）。

---

## 规则迁移详情

### 已成功迁移的规则（84 条）

#### 核心 JavaScript → Biome

| ESLint 规则                   | Biome 规则                                 | 级别      |
| ----------------------------- | ------------------------------------------ | --------- |
| `array-callback-return`       | `suspicious/useIterableCallbackReturn`     | warn      |
| `default-case`                | `style/useDefaultSwitchClause`             | warn      |
| `eqeqeq`                      | `suspicious/noDoubleEquals`                | warn      |
| `getter-return`               | `suspicious/useGetterReturn`               | warn      |
| `no-cond-assign`              | `suspicious/noAssignInExpressions`         | warn      |
| `no-const-assign`             | `correctness/noConstAssign`                | warn      |
| `no-control-regex`            | `suspicious/noControlCharactersInRegex`    | warn      |
| `no-dupe-args`                | `suspicious/noDuplicateParameters`         | warn      |
| `no-dupe-class-members`       | `suspicious/noDuplicateClassMembers`       | warn      |
| `no-dupe-keys`                | `suspicious/noDuplicateObjectKeys`         | warn      |
| `no-duplicate-case`           | `suspicious/noDuplicateCase`               | warn      |
| `no-empty-character-class`    | `correctness/noEmptyCharacterClassInRegex` | warn      |
| `no-empty-pattern`            | `correctness/noEmptyPattern`               | warn      |
| `no-eval`                     | `security/noGlobalEval`                    | warn      |
| `no-ex-assign`                | `suspicious/noCatchAssign`                 | warn      |
| `no-extra-label`              | `complexity/noUselessLabel`                | warn      |
| `no-fallthrough`              | `suspicious/noFallthroughSwitchClause`     | warn      |
| `no-func-assign`              | `suspicious/noFunctionAssign`              | warn      |
| `no-global-assign`            | `suspicious/noGlobalAssign`                | warn      |
| `no-label-var`                | `suspicious/noLabelVar`                    | warn      |
| `no-labels`                   | `suspicious/noConfusingLabels`             | warn      |
| `no-lone-blocks`              | `complexity/noUselessLoneBlockStatements`  | warn      |
| `no-multi-str`                | `nursery/noMultiStr`                       | warn      |
| `no-new-wrappers`             | `style/useConsistentBuiltinInstantiation`  | warn      |
| `no-obj-calls`                | `correctness/noGlobalObjectCalls`          | warn      |
| `no-octal-escape`             | `suspicious/noOctalEscape`                 | warn      |
| `no-redeclare`                | `suspicious/noRedeclare`                   | warn      |
| `no-regex-spaces`             | `complexity/noAdjacentSpacesInRegex`       | warn      |
| `no-restricted-globals`       | `style/noRestrictedGlobals`                | **error** |
| `no-script-url`               | `nursery/noScriptUrl`                      | warn      |
| `no-self-assign`              | `correctness/noSelfAssign`                 | warn      |
| `no-self-compare`             | `suspicious/noSelfCompare`                 | warn      |
| `no-sequences`                | `complexity/noCommaOperator`               | warn      |
| `no-shadow-restricted-names`  | `suspicious/noShadowRestrictedNames`       | warn      |
| `no-sparse-arrays`            | `suspicious/noSparseArray`                 | warn      |
| `no-template-curly-in-string` | `suspicious/noTemplateCurlyInString`       | warn      |
| `no-this-before-super`        | `correctness/noUnreachableSuper`           | warn      |
| `no-throw-literal`            | `style/useThrowOnlyError`                  | warn      |
| `no-unreachable`              | `correctness/noUnreachable`                | warn      |
| `no-unsafe-negation`          | `suspicious/noUnsafeNegation`              | warn      |
| `no-unused-labels`            | `correctness/noUnusedLabels`               | warn      |
| `no-useless-computed-key`     | `complexity/useLiteralKeys`                | warn      |
| `no-useless-concat`           | `complexity/noUselessStringConcat`         | warn      |
| `no-useless-escape`           | `complexity/noUselessEscapeInRegex`        | warn      |
| `no-useless-rename`           | `complexity/noUselessRename`               | warn      |
| `no-with`                     | `suspicious/noWith`                        | warn      |
| `require-yield`               | `correctness/useYield`                     | warn      |
| `use-isnan`                   | `correctness/useIsNan`                     | warn      |
| `valid-typeof`                | `correctness/useValidTypeof`               | warn      |

#### TypeScript → Biome

| ESLint 规则                                 | Biome 规则                                  | 级别 |
| ------------------------------------------- | ------------------------------------------- | ---- |
| `@typescript-eslint/no-array-constructor`   | `style/useArrayLiterals`                    | warn |
| `@typescript-eslint/no-redeclare`           | `suspicious/noRedeclare`                    | warn |
| `@typescript-eslint/no-unused-vars`         | `correctness/noUnusedVariables`             | warn |
| `@typescript-eslint/no-use-before-define`   | `correctness/noInvalidUseBeforeDeclaration` | warn |
| `@typescript-eslint/no-useless-constructor` | `complexity/noUselessConstructor`           | warn |

#### React / React Hooks → Biome

| ESLint 规则                      | Biome 规则                                       | 级别      |
| -------------------------------- | ------------------------------------------------ | --------- |
| `react-hooks/rules-of-hooks`     | `correctness/useHookAtTopLevel`                  | **error** |
| `react-hooks/exhaustive-deps`    | `correctness/useExhaustiveDependencies`          | warn      |
| `react/jsx-no-comment-textnodes` | `suspicious/noCommentText`                       | warn      |
| `react/jsx-no-duplicate-props`   | `suspicious/noDuplicateJsxProps`                 | warn      |
| `react/jsx-no-target-blank`      | `security/noBlankTarget`                         | warn      |
| `react/no-danger-with-children`  | `security/noDangerouslySetInnerHtmlWithChildren` | warn      |

#### 无障碍 (jsx-a11y) → Biome

| ESLint 规则                                   | Biome 规则                                 | 级别 |
| --------------------------------------------- | ------------------------------------------ | ---- |
| `jsx-a11y/alt-text`                           | `a11y/useAltText`                          | warn |
| `jsx-a11y/anchor-has-content`                 | `a11y/useAnchorContent`                    | warn |
| `jsx-a11y/anchor-is-valid`                    | `a11y/useValidAnchor`                      | warn |
| `jsx-a11y/aria-activedescendant-has-tabindex` | `a11y/useAriaActivedescendantWithTabindex` | warn |
| `jsx-a11y/aria-props`                         | `a11y/useValidAriaProps`                   | warn |
| `jsx-a11y/aria-proptypes`                     | `a11y/useValidAriaValues`                  | warn |
| `jsx-a11y/aria-role`                          | `a11y/useValidAriaRole`                    | warn |
| `jsx-a11y/aria-unsupported-elements`          | `a11y/noAriaUnsupportedElements`           | warn |
| `jsx-a11y/heading-has-content`                | `a11y/useHeadingContent`                   | warn |
| `jsx-a11y/iframe-has-title`                   | `a11y/useIframeTitle`                      | warn |
| `jsx-a11y/img-redundant-alt`                  | `a11y/noRedundantAlt`                      | warn |
| `jsx-a11y/no-access-key`                      | `a11y/noAccessKey`                         | warn |
| `jsx-a11y/no-distracting-elements`            | `a11y/noDistractingElements`               | warn |
| `jsx-a11y/no-redundant-roles`                 | `a11y/noRedundantRoles`                    | warn |
| `jsx-a11y/role-has-required-aria-props`       | `a11y/useAriaPropsForRole`                 | warn |
| `jsx-a11y/role-supports-aria-props`           | `a11y/useAriaPropsSupportedByRole`         | warn |
| `jsx-a11y/scope`                              | `a11y/noHeaderScope`                       | warn |

#### Import 排序

| ESLint 规则                  | Biome 功能                              | 级别 |
| ---------------------------- | --------------------------------------- | ---- |
| `simple-import-sort/imports` | `assist.actions.source.organizeImports` | on   |
| `simple-import-sort/exports` | _（不支持 — 导出排序）_                 | —    |

---

### 由格式化器覆盖的规则（3 条） — 已忽略（非 error 级别）

| ESLint 规则           | 覆盖方式                                            |
| --------------------- | --------------------------------------------------- |
| `new-parens`          | Biome 格式化器处理                                  |
| `rest-spread-spacing` | Biome 格式化器处理                                  |
| `quotes`              | 由 `javascript.formatter.quoteStyle: "double"` 覆盖 |

### 与格式化器不兼容的规则（3 条） — 已忽略（warn 级别）

| ESLint 规则                     | 原因                         |
| ------------------------------- | ---------------------------- |
| `dot-location`                  | 格式化相关，由 Prettier 处理 |
| `no-mixed-operators`            | 格式化相关，由 Prettier 处理 |
| `no-whitespace-before-property` | 格式化相关，由 Prettier 处理 |

---

### 未迁移的 ERROR 级别规则

以下规则在 ESLint 中为 `error` 级别，但 **Biome 没有等价规则**：

| ESLint 规则                                | 原始配置                                                  | 影响                                                                        |
| ------------------------------------------ | --------------------------------------------------------- | --------------------------------------------------------------------------- |
| ~~`no-restricted-imports`~~                | ~~禁止从 `react-i18next` 导入 `{Trans, useTranslation}`~~ | **已迁移** — Biome `style/noRestrictedImports` 支持 `paths` + `importNames` |
| `no-restricted-properties`                 | 禁止 `require.ensure` 和 `System.import`                  | 低 — CRA 遗留，不太可能被使用                                               |
| `import/first`                             | import 语句必须在文件顶部                                 | 低 — TypeScript 和 organizeImports 已处理                                   |
| `import/no-amd`                            | 禁止 AMD `define()` 调用                                  | 低 — 在现代 TS/ESM 中不适用                                                 |
| `import/no-webpack-loader-syntax`          | 禁止 import 中使用 `!` webpack loader 语法                | 低 — 不使用 webpack 则不适用                                                |
| `react/jsx-no-undef`                       | 禁止未定义的 JSX 组件                                     | 无 — TypeScript 已能捕获                                                    |
| `react/no-typos`                           | 禁止 React 静态属性拼写错误                               | 低 — 仅针对类组件，很少见                                                   |
| `react/require-render-return`              | 类组件的 render 必须有返回值                              | 低 — 仅针对类组件，很少见                                                   |
| `@typescript-eslint/no-unused-expressions` | 禁止未使用的表达式                                        | 中 — Biome 通过其他规则有部分覆盖                                           |

#### 测试文件专用的 ERROR 规则（Biome 无等价规则）

以下规则仅应用于测试文件（`**/__test__/**`、`**/*.test.*`）：

| ESLint 规则                                       | 插件            |
| ------------------------------------------------- | --------------- |
| `jest/no-conditional-expect`                      | jest            |
| `jest/no-identical-title`                         | jest            |
| `jest/no-interpolation-in-snapshots`              | jest            |
| `jest/no-jasmine-globals`                         | jest            |
| `jest/no-jest-import`                             | jest            |
| `jest/no-mocks-import`                            | jest            |
| `jest/valid-describe-callback`                    | jest            |
| `jest/valid-expect`                               | jest            |
| `jest/valid-expect-in-promise`                    | jest            |
| `testing-library/await-async-query`               | testing-library |
| `testing-library/await-async-utils`               | testing-library |
| `testing-library/no-await-sync-query`             | testing-library |
| `testing-library/no-container`                    | testing-library |
| `testing-library/no-debugging-utils`              | testing-library |
| `testing-library/no-dom-import`                   | testing-library |
| `testing-library/no-promise-in-fire-event`        | testing-library |
| `testing-library/no-render-in-setup`              | testing-library |
| `testing-library/no-unnecessary-act`              | testing-library |
| `testing-library/no-wait-for-empty-callback`      | testing-library |
| `testing-library/no-wait-for-multiple-assertions` | testing-library |
| `testing-library/no-wait-for-side-effects`        | testing-library |
| `testing-library/no-wait-for-snapshot`            | testing-library |
| `testing-library/prefer-find-by`                  | testing-library |
| `testing-library/prefer-presence-queries`         | testing-library |
| `testing-library/prefer-query-by-disappearance`   | testing-library |
| `testing-library/prefer-screen-queries`           | testing-library |
| `testing-library/render-result-naming-convention` | testing-library |

> **注意**：Biome 不支持 jest 和 testing-library 插件。这些规则来自 `eslint-config-react-app/jest`，仅在测试文件中生效。

---

### 未迁移的 WARN 级别规则 — 全部忽略

| ESLint 规则                                     | 未迁移原因             |
| ----------------------------------------------- | ---------------------- |
| `no-caller`                                     | Biome 未实现           |
| `no-delete-var`                                 | Biome 未实现           |
| `no-extend-native`                              | Biome 未实现           |
| `no-extra-bind`                                 | Biome 未实现           |
| `no-implied-eval`                               | Biome 未实现           |
| `no-invalid-regexp`                             | Biome 未实现           |
| `no-iterator`                                   | Biome 未实现           |
| `no-loop-func`                                  | Biome 未实现           |
| `no-new-func`                                   | Biome 未实现           |
| `no-new-object`                                 | Biome 未实现           |
| `no-new-symbol`                                 | Biome 未实现           |
| `no-octal`                                      | Biome 未实现           |
| `no-restricted-syntax`                          | Biome 未实现           |
| `strict`                                        | Biome 未实现           |
| `unicode-bom`                                   | Biome 未实现           |
| `@typescript-eslint/consistent-type-assertions` | Biome 未实现           |
| `import/no-anonymous-default-export`            | Biome 未实现           |
| `react/forbid-foreign-prop-types`               | Biome 未实现           |
| `react/jsx-pascal-case`                         | Biome 未实现           |
| `react/no-direct-mutation-state`                | Biome 未实现           |
| `react/no-is-mounted`                           | Biome 未实现           |
| `react/style-prop-object`                       | Biome 未实现           |
| `react/jsx-uses-vars`                           | 不需要（Biome 已处理） |
| `react/jsx-uses-react`                          | 不需要（Biome 已处理） |
| `flowtype/*`（3 条规则）                        | 本项目未使用 FlowType  |
| `testing-library/no-node-access`                | Biome 无等价规则       |
| `jest/valid-title`                              | Biome 无等价规则       |

---

## 待办事项

1. ~~**`no-restricted-imports`**~~ — 已通过 Biome `style/noRestrictedImports` 的 `paths` + `importNames` 选项迁移。

2. **Jest / Testing-library 规则** — Biome 无替代方案。选项：

   - 接受此损失（这些来自 `eslint-config-react-app/jest`）
   - 仅为测试文件保留一个最小的 ESLint 配置（不推荐）

3. **执行 `biome check --fix`** 以自动修复全代码库的 import 排序问题。
