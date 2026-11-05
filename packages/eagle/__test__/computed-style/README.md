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

快照记录颜色、透明度、背景渐变、边框、阴影、SVG 绘制属性和排版属性。元素通过测试标识和 DOM 子节点路径关联，包含有 content 的 before/after。类名、CSS 自定义属性、随机 ID 不进入快照。DOM 结构变更仍会触发差异，需要审阅。

固定浏览器、视口、语言和时间，等待字体加载及错误提示入场完成；静态场景禁用过渡及动画，Ant 弹层保留入场动画并等待最终透明度，避免中断 rc-motion。场景明确列在 baseline.pw.cjs，包括按钮默认、悬浮、聚焦、按下、禁用，错误表单、选中标签、Ant 4/5 输入框和 body 选择菜单。其他列出的 Story 覆盖初始状态，后续迁移触及未覆盖状态时补充场景并从迁移前代码生成对应基准。

此套检查限定浅色等价性。完整动画时序、元素几何尺寸及 Canvas 内部像素不在快照中。

## Canvas 与非 DOM 绘制清单

| 组件                                      | 绘制入口和影响                                                                                             | 后续验证方式                                                          |
| ----------------------------------------- | ---------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| LogView                                   | `src/core/LogView/LogView.tsx` 的 Terminal theme，background 为 #00122E，foreground 为 #FFFFFF             | 比较传给 Terminal 的最终 theme 配置                                   |
| LogView 搜索                              | 同文件 SearchAddon decorations 的 activeMatchBackground、matchBackground，以及两个黑色 overview ruler 配置 | 比较 findNext/findPrevious 收到的 decorations，覆盖当前命中和其他命中 |
| LineChart、Metric、DonutChart             | 使用 Recharts SVG 绘制，涉及 fill、stroke、渐变及图例                                                      | DOM/SVG computed style，可增加固定图表数据的场景                      |
| BarChart、ChartWithTooltip、UnitWithChart | DOM 样式或 SVG 图表，提示浮层也属于 DOM                                                                    | 覆盖对应元素与展开浮层                                                |

源码搜索未发现 Eagle 直接调用 Canvas getContext 的业务组件。xterm 自身的渲染实现和内部画布由依赖管理，外层 DOM 样式快照无法证明终端文字、搜索装饰和 overview ruler 的绘制色一致。此处先记录影响入口，未新增渲染器配置测试。

覆盖缺口：基线分支的 TableForm Story 触发 `Cannot access TableForm before initialization`（legacy-antd 循环依赖），本次未修改业务代码；修复后需从迁移前源码补录基准。
