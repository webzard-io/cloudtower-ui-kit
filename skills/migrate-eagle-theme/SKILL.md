---
name: migrate-eagle-theme
description: 将 CloudTower 应用或 Island 从 Eagle Sass 变量、固定色值迁移到运行时 Color／Effect token；处理 Sass 注入移除、等值映射、待确认颜色记录及主题验证。不用于修改 Eagle 色板或设计暗色主题。
---

# Eagle 运行时主题迁移

Eagle 不再发布 `dist/variables.scss`，内部 Sass 源码也不是替代导入入口。
保留接入方的无关改动、国际化、弹层容器及运行时配置。本 skill 仅在仓库维护，不随 Eagle 包发布。

## 先盘点消费方式

确认实际安装的 Eagle 版本、配套 `style.css`／`token.css`，以及依赖它的共享组件包。
检查源码与构建配置中的 `variables.scss`、Sass 全局注入／additionalData、变量、函数、mixin、
`Color`、直接 CSS 变量引用、内联／SVG 颜色和颜色计算。改变工具函数的返回值前，检查其全部调用方。

旧 Sass 入口还包含布局常量、z-index 和排版 mixin。移除注入前一并盘点；仅在定义等价时迁移到
现有布局体系、公开 `zIndices` 或 `Typo`，不能把所有缺失的 Sass 符号都当成颜色。

## 只做等值替换

先解析旧 Sass 表达式的最终值。替换必须保持 RGB、透明度及完整配方等价，包括渐变的方向、位置、
色标，以及阴影的偏移、模糊、扩散和叠放顺序。统一等价格式后再比较，在等值 token 中按用途选择。

语义相同但值不同，不属于等值替换。没有等值 token 时保留原值，记录位置、用途、候选及差异，交给
设计决定；不得自行改色或新增 token。Ant 主题映射同样遵守此规则，未对齐项保留原默认值或历史配置。

使用实际依赖版本的公开 `Color`／`Effect` 和 `docs/theme-tokens.md` 清单，不创建按组件、legacy、
编译结果或文件路径命名的另一套 token，不从 Eagle 私有源码导入兼容接口。

可参考的等价关系：

| 旧 Sass | 公开接口 | 使用条件 |
| --- | --- | --- |
| `$text-light-primary` | `Color.text.neutral.primary` | 主文字 |
| `$text-light-secondary` | `Color.text.neutral.tertiary` | 旧 secondary 为 60%，不等于新 secondary |
| `$text-light-on-tint` | `Color.text.neutral.ontint` | 彩色底上的文字 |
| `$backgrounds-light-primary` | `Color.pagebackground.primary` | 页面背景 |
| `$shadow-menu-light-default` | `Effect.shadow.menu.default` | 完整菜单 box-shadow |
| `$shadow-light-active`／`$shadow-light-focus` | `Effect.outline.activeFocus` | 以 box-shadow 绘制的焦点轮廓 |

不要全局替换 `$white`：表面背景和强调底上的文字用途不同。
不要把 `$text-primary-light` 映射到 `$text-light-primary`；前者为 #2D3A56，后者为 #00122E，需记录给设计确认。

## 接入运行时引用

- TS／Linaria：从 `@cloudtower/eagle` 导入公开 `Color`／`Effect`，确保产物保留运行时 `var(...)`，
  不在构建时展开为固定颜色；保留组件行为和无障碍能力。
- CSS／SCSS：将相关颜色声明迁入项目已有的 TS／Linaria，使用公开接口，保留无关样式。
  必须保留 SCSS 时，先评估现有构建扩展能否按公开映射做精确转换；变量名不带包名或版本前缀。
  没有合适扩展时记录接入决策，不另造通用插件、DSL、Sass 别名层或全局别名桥接。
  所有产物引用都须与实际加载的 `token.css` 声明对应。
- 在应用入口加载实际安装版本的 `style.css` 和 `token.css`。共享组件之前若输出固定 CSS，必须重新构建，
  仅升级运行时依赖无法使它们响应主题。
- 宿主统一拥有主题状态。接入方将自己的 ConfigProvider 连接到宿主／Runtime 主题；旧宿主默认浅色。
  Island 不创建偏好存储、不修改宿主根主题属性。宿主或独立预览可在根部调用一次 `useUIKitTheme(theme)`，
  并向 ConfigProvider 传入相同主题。

完成所有消费方迁移后，再移除 Eagle Sass 注入和导入。其他样式仍需要 Sass 时保留编译器，
不为本任务升级 Ant 或整套 lint 工具。

## 迁移非颜色能力

只有字体、字重、字号、行高及字体特性全部匹配时，才能使用完整 `Typo` 样式。
不能用无关的排版预设替换一个单独 mixin；否则在本地等价展开：

| 旧能力 | 迁移方式 |
| --- | --- |
| `Inter($weight, $style)` | `font-family: Inter; font-style: <style>; font-weight: <weight>`，默认均为 normal |
| `Uppercase()` | `text-transform: uppercase; font-feature-settings: 'cpsp' on` |
| `Monospace()` | `font-feature-settings: 'tnum' on, 'lnum' on, 'case' on`，不改变 font-family |
| `Slashed` | `font-feature-settings: 'zero' on` |
| `Autofill($background)` | 保留 autofill／focus 选择器及 inset 阴影，只在等值时替换背景色 |
| `FullScreenContrast` | 如有使用，将原图片及尺寸、重复方式保留为应用本地资源和样式 |
| z-index 常量 | 当前只有 `tableActionColumn: 10` 对应公开 `zIndices`；其余检查层叠上下文后保留本地定义 |

组合样式时保留层叠关系和字体特性覆盖顺序。不要为每个旧 mixin 新增公开接口，或重新导入私有 Sass。
Eagle 内部可保留 Sass，外部不得依赖其源码注入。

## 处理例外并记录缺口

`rgba`／`tint`／`shade`／`mix` 和渐变只能使用等价的完整 token，或以现有 token 组合出等价结果。
完整 box-shadow 配方不能直接传入 `filter: drop-shadow()`。

Canvas、xterm、颜色运算及仅接受具体色值的库，应在挂载后解析当前主题 token，并在主题变化时更新。
已迁移的位置不得通过 Raw 导出、私有色板或固定浅色 fallback 绕过主题。未找到等值 token 的旧字面量
可以保留，但必须标记为待迁移，不能宣称已支持主题。引用了现有 token 却解析失败，属于接入错误。
复用接入方已有的主题订阅和挂载后解析路径；能力缺失时先记录问题，不贸然新增 API。
终端适配还须覆盖搜索高亮和装饰，不能只处理背景、文字。

迁移报告记录文件／行号、旧表达式及最终值、用途、候选 token 及差异、是否需要具体色值，以及待决事项。
删除旧 Sass 名称时，无等值 token 的使用处可保留其原始解析值并上报；不得用新造 fallback、私有 Sass
导入、整组件 lint 排除或自动取最近色隐藏问题。先完成不依赖这些决策的等价迁移。

## 打包作用域与验收

Eagle 使用 `--text-neutral-primary` 等统一名称，不添加包名或版本号。
Tower 的 token 保留在文档根；Island 的 token 声明绑定到既有 Island 容器，不能生成 `.IslandName :root`。
主题条件保留在宿主根，例如 `:where(:root[data-theme="dark"]) :where(.IslandName)`；默认浅色规则保持低权重。
body 弹层必须进入所属作用域并继承 token。具体颜色从实际挂载元素读取，不固定读取文档根。
选择器加前缀本身不足以保证隔离，需验证不同 Eagle 版本及两种 CSS 加载顺序。
接入方待办见 [Notion 方案第 3.1.1 节](https://app.notion.com/p/40849a7f5c9481d7a5cbf7229f518640)。

运行接入方已有的单测、类型检查、构建和颜色 lint，复用共享 Stylelint／ast-grep 配置，
只声明必要的扫描排除。保持规则级别，并确认 ast-grep 安装后执行了 postinstall，实际扫描程序可用。

检查产物中的运行时引用和配套声明；验证浅色外观、hover／选中／禁用／错误、body 弹层及异步挂载。
没有正式暗色数据时，可用明确标记的测试主题验证传播，但必须说明暗色视觉验收仍待完成。
覆盖旧宿主浅色回退、多版本作用域隔离；未验证真实宿主／Island 组合时，不得以独立组件验证替代。

交付时报告依赖版本、构建入口变更、检查结果和未解决的映射。
