# 浅色 computed style 迁移基准

基准来源为 v4110-dev 的 3a7177d7，迁移前的组件源码通过 Storybook 的 Vite、Linaria、Sass 配置渲染。浏览器版本由锁定的 Playwright 决定。

## 运行

在仓库根目录执行

```sh
yarn install --frozen-lockfile
yarn workspace @cloudtower/eagle exec playwright install chromium
yarn workspace @cloudtower/eagle test:styles
```

首次生成或经审阅更新基准时执行 `yarn workspace @cloudtower/eagle test:styles:update`。迁移分支应带入本目录的原始快照和相同测试场景，运行普通检查命令。等值迁移出现差异时修复代码，设计批准的视觉变化才更新基准。

快照只记录计算后的色值和透明度，包括文字、背景、边框、描边和 SVG 填充与渐变色。CSS 渐变、阴影和滤镜只保留其中的色值及透明度，尺寸、偏移、排版和布局属性不进入快照。元素通过测试标识和 DOM 子节点路径关联，包含实际生成的 before/after 伪元素。DOM 结构变更仍会触发差异。

固定浏览器、视口、语言和时间，等待字体加载及错误提示入场完成；静态场景禁用过渡及动画，Ant 弹层保留入场动画并等待最终透明度，避免中断 rc-motion。原有场景列在 baseline.pw.cjs，包括按钮默认、悬浮、聚焦、按下、禁用，错误表单、选中标签、Ant 4/5 输入框和 body 选择菜单。

[component-scenarios.cjs](./component-scenarios.cjs) 按 story 登记组件、目标 DOM 和可选的准备动作。清单测试从 Eagle 的公开类型入口递归查找 React 组件和静态子组件，包括公开别名和 Ant Design 转导出的组件。每个条目应登记一次，同一 story 可覆盖多个组件。

运行场景时，先执行准备动作，再断言目标节点可见且该节点确实被采集。依赖父级的组件应在实际父级内验证，例如通过可排序 Table 验证 ColumnTitle。声明式组件（如 AntdSelect.Option）检查父组件生成的选项。只返回空 Fragment 的 EmptyRowMenu 单独断言空输出。

组件覆盖率按公开 React 条目计，每个条目至少验证一个有效场景。色值比较限定 Chromium 浅色模式下场景实际渲染的状态。新增公开组件或补充状态时，复用现有 story 或补充专用样例，并从迁移前代码生成基准。

## Canvas 与非 DOM 绘制清单

| 组件                                      | 绘制入口和影响                                                                                             | 后续验证方式                                                          |
| ----------------------------------------- | ---------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| LogView                                   | `src/core/LogView/LogView.tsx` 的 Terminal theme，background 为 #00122E，foreground 为 #FFFFFF             | 比较传给 Terminal 的最终 theme 配置                                   |
| LogView 搜索                              | 同文件 SearchAddon decorations 的 activeMatchBackground、matchBackground，以及两个黑色 overview ruler 配置 | 比较 findNext/findPrevious 收到的 decorations，覆盖当前命中和其他命中 |
| LineChart、Metric、DonutChart             | 使用 Recharts SVG 绘制，涉及 fill、stroke、渐变及图例                                                      | DOM/SVG computed style，可增加固定图表数据的场景                      |
| BarChart、ChartWithTooltip、UnitWithChart | DOM 样式或 SVG 图表，提示浮层也属于 DOM                                                                    | 覆盖对应元素与展开浮层                                                |

源码搜索未发现 Eagle 直接调用 Canvas getContext 的业务组件。xterm 自身的渲染实现和内部画布由依赖管理，外层 DOM 样式快照无法证明终端文字、搜索装饰和 overview ruler 的绘制色一致。此处先记录影响入口，未新增渲染器配置测试。

TableForm 和 Timeline 改用直接导入，解除 Storybook 循环依赖；快照仍使用颜色迁移前的组件样式。
