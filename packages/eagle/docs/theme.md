# Eagle 主题接入与维护

完整名称、默认值和 TS／Sass／CSS 对应关系见自动生成的 [token 清单](./theme-tokens.md)。
旧 Sass 接口迁移参考仓库中的 `skills/migrate-eagle-theme/SKILL.md`，不随 Eagle 包发布。

## 接入

```tsx
import "@cloudtower/eagle/dist/style.css";
import "@cloudtower/eagle/dist/token.css";
import { ConfigProvider, useUIKitTheme } from "@cloudtower/eagle";

function AppTheme({ theme, children }) {
  useUIKitTheme(theme);
  return <ConfigProvider theme={theme}>{children}</ConfigProvider>;
}
```

`theme` 为 `light | dark`，默认 light。宿主根部调用一次 `useUIKitTheme(theme)`，并向
ConfigProvider 传入相同的 theme；Island 只使用 Provider，不修改宿主根属性。
hook 不保存偏好，也不在卸载时恢复主题。原有 antd4Configs／antd5Configs 配置继续传入 Provider。

## 使用 token

- 通过 `Color` 引用文字、链接、填充、描边等语义色，通过 `Effect` 引用完整阴影或轮廓配方。
  例如 `Color.text.neutral.primary`、`Effect.shadow.menu.default`，返回同名 CSS var()（如 `var(--text-neutral-primary)`），不添加包名或版本号。
- 只做等值替换：颜色及透明度相同，渐变／阴影的完整配方也必须等价；在等值 token 中按用途选择。
  没有等值 token 时保留原值并记录，交给设计决定，不按语义或近似 RGB 改色，也不自动新增 token。
  内部 Sass 与公开 Color／Effect 使用相同键名，不另建组件变量系统。
- 不得绕过主题。Canvas、终端等仅接受具体色值的接口，应在挂载后从当前 Color token 解析，
  并在主题变化时更新；缺少 token 时报告接入问题，不以固定浅色色值回退。完整 box-shadow 不能直接用于 filter: drop-shadow()。
- 不再发布 `dist/variables.scss`。接入方移除 Sass 注入、重新构建共享消费包，并加载对应版本的 token.css。
- [待确认历史颜色](./theme-color-gaps.md) 暂时保留原值，尚未完成主题适配。图标包保持原有实现，组件内的颜色引用使用统一 token。

## 维护主题

当前尚无正式暗色色板；仅设置 dark 不代表 Eagle 所有组件已完成暗色设计。

1. 颜色维护在 `src/styles/token/sync-baseline.json`，效果维护在 `src/styles/effects.json`。
2. 运行 `yarn generate:theme`，以生成的 `src/styles/token/light.json` 为完整键集合，
   在 `src/styles/themes.json` 添加设计确认的主题值。生成的 token 文件和清单不手工编辑。
3. `src/styles/antd-theme-map.json` 将统一 token 映射到 Ant 4 Less 变量和 Ant 5 Design Token，
   仅接入与原值等价的映射；非等值的原始基础色及文字、禁用态、布局背景、边框、阴影配置维护在 `src/styles/antd-themes.json`，
   按主题及 antd4／antd5 分组，使用官方变量名，不导出为 Eagle Color token。等值映射优先于这份配置。
   配置保留当前浅色值；hover／active 状态色继续由官方算法生成，未定制的变量沿用官方默认值。
   显式配置的 alias（如文字透明度、描边和阴影）优先于算法派生结果；调整 seed 或新增主题时须同步检查这些 alias。
   后续正式主题先在 `themes.json` 声明，再在 `antd-themes.json` 的同名主题添加需要定制的原生 seed／alias；
   此次只提供 light，暗色值仍待设计确认。配置必须使用具体值，不能传入 var()。修改后重新构建，生成的 token/antd.ts 不手改。
   Ant 4 在构建时编译主题，Ant 5 由 Provider 应用算法；调用方的 Ant 5 theme 配置优先。
4. 运行根目录 `yarn build`、`yarn test:ci`，并检查交互状态、body 弹层及异步加载。
   同步 token 或修改 package version 后须重新构建。

## 检查

根 `yarn test:ci` 包含组件单测、颜色规则回归与 lint；主题完整性在构建时校验。
颜色硬编码使用 Stylelint／ast-grep 提示 warning，配置或语法错误仍会失败；没有历史 baseline。
独立排查可用 `test:colors`、`lint:colors`、`lint:colors:ts`；包内测试前须先构建。
安装 ast-grep 时须执行 postinstall，避免留下未真正扫描的占位程序。

## 接入方打包适配

Tower UI 保留根 token；Island 构建将 token 声明绑定到既有 Island 容器，不能生成 `.IslandName :root`。
主题条件保留在宿主根，例如 `:where(:root[data-theme="dark"]) :where(.IslandName)`；默认浅色规则须保持低权重。
body 弹层必须进入所属 Island 作用域并继承 token。具体色值从实际挂载元素读取，不固定读取文档根。
接入方须验证多版本加载顺序、弹层和异步模块；Eagle 本身不再通过变量版本号提供隔离。
Tower UI／Island 的适配待办见 [Notion 方案第 3.1.1 节](https://app.notion.com/p/40849a7f5c9481d7a5cbf7229f518640)。
