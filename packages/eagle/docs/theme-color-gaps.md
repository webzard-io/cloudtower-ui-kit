# 颜色迁移待确认项

迁移仅做等值替换：RGB、透明度和完整配方均须等价。没有等值 token 的位置保留原值，交给设计决定；不按语义改色，不自动新增变量。以下是待决事项，不是 token 源或 lint baseline。

透明度也逐项比较：例如 rgba(...,.1) 与八位十六进制 ...1A（约 .101961）并非严格等值，保留原透明度，不将精度差异视为设计确认。

## Eagle 保留值

同值多处使用合并列出；设计需确认其用途及是否改用候选 token。候选仅说明差异，不表示已获确认。

| 保留原值／表达式 | 使用文件（相对 `src/`） | 此前候选及差异 |
| --- | --- | --- |
| `rgba(0, 128, 255, 0.1)` | `core/AccordionCard/index.tsx`、`core/Steps/style.ts`、`coreX/CronPlan/index.tsx`、`coreX/TabMenu/index.tsx`、`styles/component/menu.scss` | `$fill-outstanding-light → rgba(0, 136, 255, 0.1019607843)` |
| `var(--color, #06101f)` | `core/Button/index.tsx` | `var(--color, $text-neutral-primary) → var(--color, #00122E)` |
| `var(--border-color, #d9d9d9)` | `core/Button/index.tsx` | `var(--border-color, $stroke-neutral-trans-2) → var(--border-color, rgba(211, 218, 235, 0.6))` |
| `rgba(255, 187, 0, 0.1)` | `core/Button/index.tsx`、`core/Styled/index.tsx`、`core/Token/index.tsx`、`styles/override.scss` | `#{$fill-notice-light} → rgba(254, 160, 8, 0.1019607843)`；`$fill-notice-light → rgba(254, 160, 8, 0.1019607843)` |
| `rgba(255, 187, 0, 0.16)` | `core/Button/index.tsx`、`core/StatusCapsule/index.tsx`、`styles/override.scss` | `#{$fill-notice-lighthover} → rgba(254, 160, 8, 0.1607843137)`；`$fill-notice-lighthover → rgba(254, 160, 8, 0.1607843137)` |
| `rgba(255, 187, 0, 0.2)` | `core/Button/index.tsx` | `#{$fill-notice-lightactive} → rgba(254, 160, 8, 0.2)` |
| `drop-shadow(0px 2px 8px rgba(255, 187, 0, 0.1))` | `core/Button/index.tsx` | `drop-shadow(0px 2px 8px $fill-notice-light) → drop-shadow(0px 2px 8px rgba(254, 160, 8, 0.1019607843))` |
| `#ff4d4f !important` | `core/FormItem/index.tsx` | `$stroke-serious-base !important → #F0483E !important` |
| `#0096ff` | `core/InputInteger/index.tsx`、`core/Styled/index.tsx`、`core/Table/index.tsx`、`coreX/CronCalendar/index.tsx`、`coreX/CronPlan/index.tsx` | `$stroke-outstanding-base → #0080FF`；`$text-colorful-outstanding → #0080FF`；`$fill-outstanding-base → #0080FF` |
| `#e75a3a` | `core/InputInteger/index.tsx`、`core/Styled/index.tsx`、`styles/override.scss` | `$stroke-serious-base → #F0483E`；`$text-colorful-serious → #F0483E` |
| `rgba(235, 239, 245, 0.6)` | `core/InputTagItem/index.tsx`、`styles/override.scss` | `$fill-neutral-trans-2 → rgba(225, 230, 241, 0.6)`；`$stroke-neutral-trans-1 → rgba(225, 230, 241, 0.6)` |
| `1px solid rgba(223, 228, 235, 0.6)` | `core/InputTagItem/index.tsx` | `1px solid $stroke-neutral-trans-2 → 1px solid rgba(211, 218, 235, 0.6)` |
| `rgba(0, 0, 0, 0.75)` | `core/Metric/styled.ts` | `$fill-neutral-trans-8 → rgba(23, 38, 64, 0.8)` |
| `1px solid #e1e5eb` | `core/Styled/index.tsx` | `1px solid $stroke-neutral-trans-1 → 1px solid rgba(225, 230, 241, 0.6)` |
| `rgba(213, 219, 227, 0.6)` | `core/Styled/index.tsx`、`core/Table/index.tsx`、`styles/component/menu.scss` | `$stroke-neutral-trans-1 → rgba(225, 230, 241, 0.6)`；`$fill-neutral-trans-3 → rgba(211, 218, 235, 0.6)` |
| `rgba(240, 243, 247, 0.6)` | `core/Styled/index.tsx` | `$fill-neutral-trans-1 → rgba(237, 241, 250, 0.6)` |
| `1px solid rgba(213, 219, 227, 0.6)` | `core/Styled/index.tsx`、`coreX/CronPlan/index.tsx`、`styles/override.scss` | `1px solid $stroke-neutral-trans-2 → 1px solid rgba(211, 218, 235, 0.6)`；`1px solid $stroke-neutral-trans-1 → 1px solid rgba(225, 230, 241, 0.6)` |
| `#f2f4f6` | `core/Styled/index.tsx` | `$fill-neutral-opaque-1 → #F2F5FA` |
| `#8e9aa9` | `core/Styled/index.tsx` | `$text-neutral-tertiary → rgba(44, 56, 82, 0.6)` |
| `1px solid #e75a3a` | `core/Styled/index.tsx` | `1px solid $stroke-serious-base → 1px solid #F0483E` |
| `rgba(0, 0, 0, 0.25)` | `core/Styled/index.tsx` | `$text-neutral-quaternary → rgba(0, 21, 64, 0.3019607843)` |
| `rgba(0, 0, 0, 0.45)` | `core/Styled/index.tsx` | `$text-neutral-tertiary → rgba(44, 56, 82, 0.6)` |
| `#3e4652` | `core/Styled/index.tsx`、`coreX/CronCalendar/index.tsx`、`styles/override.scss` | `$text-neutral-primary → #00122E` |
| `1px solid rgba(204, 212, 227, 0.18)` | `core/Table/TableWidget.tsx` | `1px solid $stroke-neutral-trans-1 → 1px solid rgba(225, 230, 241, 0.6)` |
| `#FFA500` | `core/TableForm/const.ts` | `Color.text.colorful.notice → #FEA008` |
| `#ffa500` | `core/TableForm/style.ts` | `$text-colorful-notice → #FEA008` |
| `#f5f7fa` | `coreX/BarChart/index.tsx`、`coreX/CronPlan/index.tsx`、`styles/override.scss` | `$fill-neutral-opaque-1 → #F2F5FA` |
| `rgba(245, 247, 250, 0.6)` | `coreX/CronCalendar/index.tsx` | `$fill-neutral-trans-1 → rgba(237, 241, 250, 0.6)` |
| `rgba(62, 70, 82, 0.6)` | `coreX/CronCalendar/index.tsx`、`coreX/CronPlan/index.tsx`、`styles/override.scss` | `$text-neutral-tertiary → rgba(44, 56, 82, 0.6)` |
| `rgba(129, 138, 153, 0.6)` | `coreX/CronCalendar/index.tsx`、`coreX/CronPlan/index.tsx`、`styles/component/menu.scss` | `$text-neutral-tertiary → rgba(44, 56, 82, 0.6)` |
| `1px solid rgba(129, 138, 153, 0.6)` | `coreX/CronPlan/index.tsx` | `1px solid $stroke-neutral-trans-4 → 1px solid rgba(107, 128, 167, 0.6)` |
| `2px solid rgba(129, 138, 153, 0.6)` | `coreX/CronPlan/index.tsx` | `2px solid $stroke-neutral-trans-4 → 2px solid rgba(107, 128, 167, 0.6)` |
| `#d9d9d9` | `coreX/CronPlan/index.tsx` | `$stroke-neutral-trans-2 → rgba(211, 218, 235, 0.6)` |
| `#e6f4ff` | `coreX/DateRangePicker/DateRangePicker.style.ts` | `$fill-outstanding-light → rgba(0, 136, 255, 0.1019607843)` |
| `rgba(0, 0, 0, 0.25) !important` | `coreX/Sider/index.tsx` | `$text-neutral-quaternary !important → rgba(0, 21, 64, 0.3019607843) !important` |
| `rgba(0, 128, 255, 0.16)` | `coreX/TabMenu/index.tsx` | `$fill-outstanding-lighthover → rgba(0, 136, 255, 0.1607843137)` |
| `rgba(0, 128, 255, 0.2)` | `coreX/TabMenu/index.tsx` | `$fill-outstanding-lightactive → rgba(0, 136, 255, 0.2)` |
| `rgba(45, 58, 86, 0.6)` | `coreX/TabMenu/index.tsx` | `$text-neutral-tertiary → rgba(44, 56, 82, 0.6)` |
| `1px solid #dfe4eb` | `styles/component/menu.scss` | `1px solid $stroke-neutral-trans-2 → 1px solid rgba(211, 218, 235, 0.6)` |
| `rgba(240, 72, 62, 0.1)` | `styles/component/menu.scss` | `$fill-serious-light → rgba(255, 74, 74, 0.1019607843)` |
| `rgba(223, 228, 235, 0.6)` | `styles/override.scss` | `$fill-neutral-trans-3 → rgba(211, 218, 235, 0.6)` |
| `#d9d9d9 !important` | `styles/override.scss` | `$stroke-neutral-trans-2 !important → rgba(211, 218, 235, 0.6) !important` |
| `#29adff` | `styles/override.scss` | `$stroke-outstanding-base → #0080FF` |
| `1px dashed rgba(129, 138, 153, 0.6)` | `styles/override.scss` | `1px dashed $stroke-neutral-trans-4 → 1px dashed rgba(107, 128, 167, 0.6)` |
| `rgba(107, 125, 153, 0.3)` | `styles/override.scss` | `$dim-single-dialogmask → rgba(16, 26, 41, 0.4)` |
| `drop-shadow(0px 2px 8px 0px rgba(255, 187, 0, 0.1))` | `styles/override.scss` | `drop-shadow(0px 2px 8px 0px $fill-notice-light) → drop-shadow(0px 2px 8px 0px rgba(254, 160, 8, 0.1019607843))` |
| `rgba(0, 21, 64, 0.3)` | `core/BlankState/style.ts`、`core/DetailCard/index.tsx`、`core/LocalUpload/LocalUpload.style.ts`、`core/Select/select.style.ts`、`core/Styled/index.tsx`、`coreX/DateRangePicker/DateRangePicker.style.ts`、`coreX/GoBackButton/index.tsx`、`coreX/InfoRowList/InfoRowList.tsx` | `$text-neutral-quaternary → rgba(0, 21, 64, 0.3019607843)` |
| `rgba(0, 136, 255, 0.16)` | `core/Button/index.tsx`、`core/StatusCapsule/index.tsx`、`core/TimeZoneSelect/index.tsx`、`coreX/DateRangePicker/DateRangePicker.style.ts`、`styles/override.scss` | `#{$stroke-outstanding-light} → rgba(0, 136, 255, 0.1607843137)`；`#{$fill-outstanding-lighthover} → rgba(0, 136, 255, 0.1607843137)`；`$fill-outstanding-lighthover → rgba(0, 136, 255, 0.1607843137)`；`$stroke-outstanding-light → rgba(0, 136, 255, 0.1607843137)` |
| `rgba(255, 74, 74, 0.16)` | `core/Button/index.tsx`、`core/StatusCapsule/index.tsx`、`styles/override.scss` | `#{$stroke-serious-light} → rgba(255, 74, 74, 0.1607843137)`；`#{$fill-serious-lighthover} → rgba(255, 74, 74, 0.1607843137)`；`$fill-serious-lighthover → rgba(255, 74, 74, 0.1607843137)` |
| `rgba(0, 136, 255, 0.1)` | `core/Button/index.tsx`、`core/ExpandableList/RoundOrder.tsx`、`core/LocalUpload/LocalUpload.style.ts`、`core/Radio/index.tsx`、`core/Steps/style.ts`、`core/Styled/index.tsx`、`core/Tab/Tab.style.ts`、`core/Table/index.tsx`、`core/TableForm/style.ts`、`core/TimeZoneSelect/index.tsx`、`core/Token/index.tsx`、`styles/override.scss` | `#{$fill-outstanding-light} → rgba(0, 136, 255, 0.1019607843)`；`$fill-outstanding-light → rgba(0, 136, 255, 0.1019607843)`；`$blue-blue-a10-50 → rgba(0, 136, 255, 0.1019607843)` |
| `rgba(255, 74, 74, 0.1)` | `core/Button/index.tsx`、`core/LocalUpload/LocalUpload.style.ts`、`core/Token/index.tsx`、`styles/override.scss` | `#{$fill-serious-light} → rgba(255, 74, 74, 0.1019607843)`；`$fill-serious-light → rgba(255, 74, 74, 0.1019607843)` |
| `drop-shadow(0px 2px 8px rgba(0, 136, 255, 0.1))` | `core/Button/index.tsx`、`core/ButtonGroup/index.tsx` | `drop-shadow(0px 2px 8px $fill-outstanding-light) → drop-shadow(0px 2px 8px rgba(0, 136, 255, 0.1019607843))` |
| `drop-shadow(0px 2px 8px rgba(255, 74, 74, 0.1))` | `core/Button/index.tsx` | `drop-shadow(0px 2px 8px $fill-serious-light) → drop-shadow(0px 2px 8px rgba(255, 74, 74, 0.1019607843))` |
| `rgba(44, 56, 82, 0.75)` | `core/SegmentControl/index.tsx`、`core/Steps/style.ts` | `$text-neutral-secondary → rgba(44, 56, 82, 0.7490196078)` |
| `rgba(30, 201, 127, 0.16)` | `core/StatusCapsule/index.tsx`、`styles/override.scss` | `$fill-positive-lighthover → rgba(30, 201, 127, 0.1607843137)` |
| `rgba(0, 136, 255, 0.1) !important` | `core/Steps/style.ts` | `$fill-outstanding-light !important → rgba(0, 136, 255, 0.1019607843) !important` |
| `rgba(30, 201, 127, 0.1)` | `core/Token/index.tsx`、`styles/override.scss` | `$fill-positive-light → rgba(30, 201, 127, 0.1019607843)` |
| `drop-shadow(0px 2px 8px 0px rgba(0, 136, 255, 0.1))` | `styles/override.scss` | `drop-shadow(0px 2px 8px 0px $fill-outstanding-light) → drop-shadow(0px 2px 8px 0px rgba(0, 136, 255, 0.1019607843))` |
| `drop-shadow(0px 2px 8px 0px rgba(30, 201, 127, 0.1))` | `styles/override.scss` | `drop-shadow(0px 2px 8px 0px $fill-positive-light) → drop-shadow(0px 2px 8px 0px rgba(30, 201, 127, 0.1019607843))` |
| `drop-shadow(0px 2px 8px 0px rgba(255, 74, 74, 0.1))` | `styles/override.scss` | `drop-shadow(0px 2px 8px 0px $fill-serious-light) → drop-shadow(0px 2px 8px 0px rgba(255, 74, 74, 0.1019607843))` |
| `drop-shadow(0px 0px 0px 4px rgba(0, 136, 255, 0.16))` | `styles/override.scss` | `drop-shadow(0px 0px 0px 4px $fill-outstanding-lighthover) → drop-shadow(0px 0px 0px 4px rgba(0, 136, 255, 0.1607843137))` |
| `drop-shadow(0px 0px 0px 4px rgba(255, 74, 74, 0.16))` | `styles/override.scss` | `drop-shadow(0px 0px 0px 4px $stroke-serious-light) → drop-shadow(0px 0px 0px 4px rgba(255, 74, 74, 0.1607843137))` |
| `rgba(126, 65, 255, 0.1)` | `styles/override.scss` | `$fill-purple-light → rgba(126, 65, 255, 0.1019607843)` |
| `rgba(126, 65, 255, 0.16)` | `styles/override.scss` | `$fill-purple-lighthover → rgba(126, 65, 255, 0.1607843137)` |

另有以下完整配方或专用值继续保留：

| 使用位置 | 保留值／配方及待确认差异 |
| --- | --- |
| `core/Card/CardWrapper.tsx` | 原默认八层阴影、hover 两层阴影；与 Effect.shadow.dashboardCard 的层数、偏移、模糊及颜色不同。 |
| `styles/component/menu.scss`、`styles/override.scss` 的 menu／panel／card 阴影辅助类 | 原完整阴影及叠放顺序；部分与 Effect 的半径、偏移或层顺序不同。 |
| `core/Styled/index.tsx`、`coreX/CronCalendar/index.tsx`、`coreX/DateRangePicker/DateRangePicker.style.ts`、`coreX/InfoRowList/InfoRow.tsx`、`styles/override.scss` | inset 描边／焦点阴影的旧颜色及透明度；不能换成数值不同的 stroke／fill token。 |
| `core/Loading/style.ts` | 保留渐变尾端 rgba(0,128,255,.16)，候选 blue-a16-50 的 G 通道为 136；起点 #0080FF 已等值引用 token。 |
| `core/LineChart/RenderChart.tsx`、`core/LineChart/ThresholdIntersectionLayer.tsx` | 阈值色 #FF4D4F；stroke.serious.base 为 #F0483E。 |
| `core/LogView/LogView.theme.ts`、`core/LogView/LogView.style.ts` | overview ruler #000000、滚动条 hover #4A607A；没有等值 token，不能换成主文字色或相邻灰阶。 |
| `coreX/DateRangePicker/DateRangePicker.style.ts` | 范围高亮背景／描边 #E6F4FF、pinned header 外阴影和 inset 描边；不透明浅蓝不能换成透明填充。 |
| `core/Styled/index.tsx`、`styles/override.scss`、`coreX/KubeConfigModal/KubeConfigModal.style.ts` | TagSpan 三组线性渐变、badge 三组径向渐变、211.41° 灰色渐变；端点、角度、半径和位置按原式保留。 |
| `styles/override.scss` 的 `*-filter` 类 | 原 drop-shadow 配方；不能直接套用 box-shadow token。 |
| `core/LineChart/styled.ts`、`core/Metric/styled.ts`、`coreX/ChartWithTooltip/index.tsx`、`core/Styled/index.tsx` | 图例／辅助文字 #B4BECA、#CCCCCC 以及 Dot #8E9AA9（opacity .4）；保留原灰色，不推断语义层级。 |

Avatar／Nav 的 previewPanel 阴影及其余等价 Effect 替换保留。TableLoading 空占位背景使用等值不透明 token 加原透明度；LogView 遮罩使用原基色 token 加原透明度。

## Ant Design 保留值

Ant 4／5 的原始基础色集中在 `src/styles/antd-themes.json`，保留历史值；未定制项及 hover／active 等派生值继续由官方主题生成。Ant 5 保留调用方覆盖。抽取配置不代表已对齐 Eagle token，也不改变原始浅色。下表候选仍待设计确认，不加入等值映射。

| 版本／变量 | 保留值 | 待确认候选及差异 |
| --- | --- | --- |
| antd5 `colorPrimary` | `#1677ff` | `fill-outstanding-base` = `#0080FF` |
| antd5 `colorLink` | `#1677ff` | `link-outstandingnormal` = `#0080FF` |
| antd4 `link-hover-color` | `#299bff` | `link-outstandinghover` = `#009DFF` |
| antd5 `colorLinkHover` | `#69b1ff` | `link-outstandinghover` = `#009DFF` |
| antd4 `link-active-color` | `#0065d9` | `link-outstandingactive` = `#005ED1` |
| antd5 `colorLinkActive` | `#0958d9` | `link-outstandingactive` = `#005ED1` |
| antd4 `primary-5` | `#299bff` | `fill-outstanding-bright` = `#009DFF` |
| antd5 `colorPrimaryHover` | `#4096ff` | `fill-outstanding-bright` = `#009DFF` |
| antd4 `primary-7` | `#0065d9` | `fill-outstanding-dark` = `#005ED1` |
| antd5 `colorPrimaryActive` | `#0958d9` | `fill-outstanding-dark` = `#005ED1` |
| antd4 `success-color` | `#25C764` | `fill-positive-base` = `#00BA5D` |
| antd5 `colorSuccess` | `#52c41a` | `fill-positive-base` = `#00BA5D` |
| antd4 `warning-color` | `#faad14` | `fill-notice-base` = `#FEA008` |
| antd5 `colorWarning` | `#faad14` | `fill-notice-base` = `#FEA008` |
| antd4 `error-color` | `#ff4d4f` | `fill-serious-base` = `#F0483E` |
| antd5 `colorError` | `#ff4d4f` | `fill-serious-base` = `#F0483E` |
| antd5 `colorInfo` | `#1677ff` | `fill-outstanding-base` = `#0080FF` |
| antd4 `text-color` | `#06101F` | `text-neutral-primary` = `#00122E` |
| antd5 `colorText` | `rgba(0, 0, 0, 0.88)` | `text-neutral-primary` = `#00122E` |
| antd4 `text-color-secondary` | `rgba(0, 0, 0, 0.45)` | `text-neutral-secondary` = `#2C3852BF` |
| antd5 `colorTextSecondary` | `rgba(0, 0, 0, 0.65)` | `text-neutral-secondary` = `#2C3852BF` |
| antd4 `heading-color` | `rgba(0, 0, 0, 0.85)` | `text-neutral-primary` = `#00122E` |
| antd5 `colorTextHeading` | `rgba(0, 0, 0, 0.88)` | `text-neutral-primary` = `#00122E` |
| antd4 `disabled-color` | `rgba(0, 0, 0, 0.25)` | `text-neutral-quaternary` = `#0015404D` |
| antd5 `colorTextDisabled` | `rgba(0, 0, 0, 0.25)` | `text-neutral-quaternary` = `#0015404D` |
| antd5 `colorBgLayout` | `#f5f5f5` | `pagebackground-primary` = `#FFFFFF` |
| antd4 `border-color-base` | `#d9d9d9` | `stroke-neutral-trans-2` = `#D3DAEB99` |
| antd5 `colorBorder` | `#d9d9d9` | `stroke-neutral-trans-2` = `#D3DAEB99` |
| antd4 `border-color-split` | `#f0f0f0` | `stroke-neutral-trans-1` = `#E1E6F199` |
| antd5 `colorBorderSecondary` | `#f0f0f0` | `stroke-neutral-trans-1` = `#E1E6F199` |
| antd4 `box-shadow-base` | `0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05)` | `effect-shadow-menu-default` = `0px 0px 10px 0px rgba(107,125,153,0.18), 0px 12px 40px 0px rgba(45,58,86,0.3)` |
| antd5 `boxShadowSecondary` | `0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05)` | `effect-shadow-menu-default` = `0px 0px 10px 0px rgba(107,125,153,0.18), 0px 12px 40px 0px rgba(45,58,86,0.3)` |
| antd5 `colorTextBase` | `#000` | `text-neutral-primary` = `#00122E` |

2026-11-03：以上保留值尚未完成主题映射，不能宣称完整暗色适配；设计确认后再逐项修改。颜色格式不同但等值（例如 #fff 与 #FFFFFF）无需记录为缺口。
