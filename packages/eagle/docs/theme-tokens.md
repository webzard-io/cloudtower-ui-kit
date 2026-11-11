# Eagle 统一主题 token 清单

由 `yarn generate:theme` 生成，不手工编辑。Color、Effect 和 CSS 使用同一键名；变量名不带包名或版本号；由接入方既有作用域负责隔离。样式中直接使用 CSS 自定义属性。
基础色板与语义色均来自设计系统。只做等值替换，并在等值 token 中按用途选择 text/link/fill/stroke/pagebackground/dim 或已有基础色板；无等值项时保留原值，记录给设计确认。

| TypeScript API | CSS 自定义属性 | 默认浅色值 |
| --- | --- | --- |
| `Color.text.neutral.primary` | `--text-neutral-primary` | `#00122E` |
| `Color.text.neutral.secondary` | `--text-neutral-secondary` | `#2C3852BF` |
| `Color.text.neutral.tertiary` | `--text-neutral-tertiary` | `#2C385299` |
| `Color.text.neutral.quaternary` | `--text-neutral-quaternary` | `#0015404D` |
| `Color.text.neutral.ontint` | `--text-neutral-ontint` | `#FFFFFF` |
| `Color.text.neutral.super` | `--text-neutral-super` | `#1D326C` |
| `Color.text.colorful.outstanding` | `--text-colorful-outstanding` | `#0080FF` |
| `Color.text.colorful.serious` | `--text-colorful-serious` | `#F0483E` |
| `Color.text.colorful.notice` | `--text-colorful-notice` | `#FEA008` |
| `Color.text.colorful.noticedark` | `--text-colorful-noticedark` | `#E07F00` |
| `Color.text.colorful.positive` | `--text-colorful-positive` | `#00BA5D` |
| `Color.text.colorful.positivedark` | `--text-colorful-positivedark` | `#008F4C` |
| `Color.text.colorful.purple` | `--text-colorful-purple` | `#7E41FF` |
| `Color.link.outstandingnormal` | `--link-outstandingnormal` | `#0080FF` |
| `Color.link.outstandinghover` | `--link-outstandinghover` | `#009DFF` |
| `Color.link.outstandingactive` | `--link-outstandingactive` | `#005ED1` |
| `Color.link.neutralnormal` | `--link-neutralnormal` | `#2C3852BF` |
| `Color.link.neutralhover` | `--link-neutralhover` | `#2C385299` |
| `Color.link.neutralactive` | `--link-neutralactive` | `#172640CC` |
| `Color.link.seriousnormal` | `--link-seriousnormal` | `#F0483E` |
| `Color.link.serioushover` | `--link-serioushover` | `#FF5252` |
| `Color.link.seriousactive` | `--link-seriousactive` | `#C73D31` |
| `Color.fill.neutral.lightwhite` | `--fill-neutral-lightwhite` | `#FFFFFF99` |
| `Color.fill.neutral["trans-1"]` | `--fill-neutral-trans-1` | `#EDF1FA99` |
| `Color.fill.neutral["trans-2"]` | `--fill-neutral-trans-2` | `#E1E6F199` |
| `Color.fill.neutral["trans-3"]` | `--fill-neutral-trans-3` | `#D3DAEB99` |
| `Color.fill.neutral["trans-4"]` | `--fill-neutral-trans-4` | `#C0CBE099` |
| `Color.fill.neutral["trans-5"]` | `--fill-neutral-trans-5` | `#ACBAD399` |
| `Color.fill.neutral["trans-7"]` | `--fill-neutral-trans-7` | `#0A255599` |
| `Color.fill.neutral["trans-8"]` | `--fill-neutral-trans-8` | `#172640CC` |
| `Color.fill.neutral.white` | `--fill-neutral-white` | `#FFFFFF` |
| `Color.fill.neutral["opaque-1"]` | `--fill-neutral-opaque-1` | `#F2F5FA` |
| `Color.fill.neutral["opaque-2"]` | `--fill-neutral-opaque-2` | `#EDF0F7` |
| `Color.fill.neutral["opaque-3"]` | `--fill-neutral-opaque-3` | `#E4E9F2` |
| `Color.fill.neutral["opaque-4"]` | `--fill-neutral-opaque-4` | `#D8DEEB` |
| `Color.fill.neutral["opaque-5"]` | `--fill-neutral-opaque-5` | `#CCD4E3` |
| `Color.fill.neutral["opaque-6"]` | `--fill-neutral-opaque-6` | `#A3B4CC` |
| `Color.fill.neutral["opaque-7"]` | `--fill-neutral-opaque-7` | `#6B7D99` |
| `Color.fill.neutral["opaque-8"]` | `--fill-neutral-opaque-8` | `#2D3A56` |
| `Color.fill.purple.base` | `--fill-purple-base` | `#7E41FF` |
| `Color.fill.purple.lightactive` | `--fill-purple-lightactive` | `#7E41FF33` |
| `Color.fill.purple.lighthover` | `--fill-purple-lighthover` | `#7E41FF29` |
| `Color.fill.purple.light` | `--fill-purple-light` | `#7E41FF1A` |
| `Color.fill.outstanding.deep` | `--fill-outstanding-deep` | `#1D326C` |
| `Color.fill.outstanding.dark` | `--fill-outstanding-dark` | `#005ED1` |
| `Color.fill.outstanding.base` | `--fill-outstanding-base` | `#0080FF` |
| `Color.fill.outstanding.bright` | `--fill-outstanding-bright` | `#009DFF` |
| `Color.fill.outstanding.lightactive` | `--fill-outstanding-lightactive` | `#0088FF33` |
| `Color.fill.outstanding.lighthover` | `--fill-outstanding-lighthover` | `#0088FF29` |
| `Color.fill.outstanding.light` | `--fill-outstanding-light` | `#0088FF1A` |
| `Color.fill.outstanding.thin` | `--fill-outstanding-thin` | `#0088FF0A` |
| `Color.fill.serious.deep` | `--fill-serious-deep` | `#7D2126` |
| `Color.fill.serious.dark` | `--fill-serious-dark` | `#C73D31` |
| `Color.fill.serious.base` | `--fill-serious-base` | `#F0483E` |
| `Color.fill.serious.bright` | `--fill-serious-bright` | `#FF5252` |
| `Color.fill.serious.lightactive` | `--fill-serious-lightactive` | `#FF4A4A33` |
| `Color.fill.serious.lighthover` | `--fill-serious-lighthover` | `#FF4A4A29` |
| `Color.fill.serious.light` | `--fill-serious-light` | `#FF4A4A1A` |
| `Color.fill.serious.thin` | `--fill-serious-thin` | `#FF4A4A0A` |
| `Color.fill.notice.deep` | `--fill-notice-deep` | `#8E671B` |
| `Color.fill.notice.dark` | `--fill-notice-dark` | `#E07F00` |
| `Color.fill.notice.base` | `--fill-notice-base` | `#FEA008` |
| `Color.fill.notice.bright` | `--fill-notice-bright` | `#FEBA33` |
| `Color.fill.notice.lightactive` | `--fill-notice-lightactive` | `#FEA00833` |
| `Color.fill.notice.lighthover` | `--fill-notice-lighthover` | `#FEA00829` |
| `Color.fill.notice.light` | `--fill-notice-light` | `#FEA0081A` |
| `Color.fill.notice.thin` | `--fill-notice-thin` | `#FEA0080A` |
| `Color.fill.positive.deep` | `--fill-positive-deep` | `#18544F` |
| `Color.fill.positive.dark` | `--fill-positive-dark` | `#008F4C` |
| `Color.fill.positive.base` | `--fill-positive-base` | `#00BA5D` |
| `Color.fill.positive.bright` | `--fill-positive-bright` | `#23CF6D` |
| `Color.fill.positive.lightactive` | `--fill-positive-lightactive` | `#1EC97F33` |
| `Color.fill.positive.lighthover` | `--fill-positive-lighthover` | `#1EC97F29` |
| `Color.fill.positive.light` | `--fill-positive-light` | `#1EC97F1A` |
| `Color.fill.positive.thin` | `--fill-positive-thin` | `#1EC97F0A` |
| `Color.stroke.neutral.lightwhite` | `--stroke-neutral-lightwhite` | `#FFFFFF99` |
| `Color.stroke.neutral["trans-1"]` | `--stroke-neutral-trans-1` | `#E1E6F199` |
| `Color.stroke.neutral["trans-2"]` | `--stroke-neutral-trans-2` | `#D3DAEB99` |
| `Color.stroke.neutral["trans-3"]` | `--stroke-neutral-trans-3` | `#ACBAD399` |
| `Color.stroke.neutral["trans-4"]` | `--stroke-neutral-trans-4` | `#6B80A799` |
| `Color.stroke.neutral.white` | `--stroke-neutral-white` | `#FFFFFF` |
| `Color.stroke.neutral["opaque-1"]` | `--stroke-neutral-opaque-1` | `#EDF0F7` |
| `Color.stroke.neutral["opaque-2"]` | `--stroke-neutral-opaque-2` | `#E4E9F2` |
| `Color.stroke.neutral["opaque-3"]` | `--stroke-neutral-opaque-3` | `#CCD4E3` |
| `Color.stroke.neutral["opaque-4"]` | `--stroke-neutral-opaque-4` | `#A3B4CC` |
| `Color.stroke.outstanding.base` | `--stroke-outstanding-base` | `#0080FF` |
| `Color.stroke.outstanding.light` | `--stroke-outstanding-light` | `#0088FF29` |
| `Color.stroke.serious.base` | `--stroke-serious-base` | `#F0483E` |
| `Color.stroke.serious.light` | `--stroke-serious-light` | `#FF4A4A29` |
| `Color.stroke.serious.thin` | `--stroke-serious-thin` | `#FF4A4A1A` |
| `Color.pagebackground.primary` | `--pagebackground-primary` | `#FFFFFF` |
| `Color.pagebackground.grouped` | `--pagebackground-grouped` | `#EDF0F7` |
| `Color.dim.undermenu` | `--dim-undermenu` | `#3F63941A` |
| `Color.dim["single-dialogmask"]` | `--dim-single-dialogmask` | `#101A2966` |
| `Color.dim["double-dialogmask"]` | `--dim-double-dialogmask` | `#101A2999` |
| `Color.chart.blue["blue-1"]` | `--chart-blue-blue-1` | `#ADE5FF` |
| `Color.chart.blue["blue-2"]` | `--chart-blue-blue-2` | `#7FD2FF` |
| `Color.chart.blue["blue-3"]` | `--chart-blue-blue-3` | `#51BCFF` |
| `Color.chart.blue["blue-4"]` | `--chart-blue-blue-4` | `#19A3FF` |
| `Color.chart.blue["blue-5"]` | `--chart-blue-blue-5` | `#008CFF` |
| `Color.chart.blue["blue-6"]` | `--chart-blue-blue-6` | `#0775F2` |
| `Color.chart.blue["blue-7"]` | `--chart-blue-blue-7` | `#1064DA` |
| `Color.chart.blue["blue-8"]` | `--chart-blue-blue-8` | `#0F53C1` |
| `Color.chart.blue["blue-9"]` | `--chart-blue-blue-9` | `#0C3FA6` |
| `Color.chart.blue["blue-10"]` | `--chart-blue-blue-10` | `#05318D` |
| `Color.chart.green["green-1"]` | `--chart-green-green-1` | `#A2F0D5` |
| `Color.chart.green["green-2"]` | `--chart-green-green-2` | `#80E4BC` |
| `Color.chart.green["green-3"]` | `--chart-green-green-3` | `#62D9A4` |
| `Color.chart.green["green-4"]` | `--chart-green-green-4` | `#47CD8A` |
| `Color.chart.green["green-5"]` | `--chart-green-green-5` | `#21BE6A` |
| `Color.chart.green["green-6"]` | `--chart-green-green-6` | `#06AC53` |
| `Color.chart.green["green-7"]` | `--chart-green-green-7` | `#0C9646` |
| `Color.chart.green["green-8"]` | `--chart-green-green-8` | `#0C8137` |
| `Color.chart.green["green-9"]` | `--chart-green-green-9` | `#0A6B29` |
| `Color.chart.green["green-10"]` | `--chart-green-green-10` | `#05551B` |
| `Color.chart.purple["purple-1"]` | `--chart-purple-purple-1` | `#E1C1FF` |
| `Color.chart.purple["purple-2"]` | `--chart-purple-purple-2` | `#CFA3FF` |
| `Color.chart.purple["purple-3"]` | `--chart-purple-purple-3` | `#BE89FF` |
| `Color.chart.purple["purple-4"]` | `--chart-purple-purple-4` | `#A66BFF` |
| `Color.chart.purple["purple-5"]` | `--chart-purple-purple-5` | `#8E51FF` |
| `Color.chart.purple["purple-6"]` | `--chart-purple-purple-6` | `#753BF1` |
| `Color.chart.purple["purple-7"]` | `--chart-purple-purple-7` | `#612FD4` |
| `Color.chart.purple["purple-8"]` | `--chart-purple-purple-8` | `#4E27B9` |
| `Color.chart.purple["purple-9"]` | `--chart-purple-purple-9` | `#3D1D9F` |
| `Color.chart.purple["purple-10"]` | `--chart-purple-purple-10` | `#2B1385` |
| `Color.chart.red["red-1"]` | `--chart-red-red-1` | `#FFBCC1` |
| `Color.chart.red["red-2"]` | `--chart-red-red-2` | `#FFA8A9` |
| `Color.chart.red["red-3"]` | `--chart-red-red-3` | `#FF8989` |
| `Color.chart.red["red-4"]` | `--chart-red-red-4` | `#FC726E` |
| `Color.chart.red["red-5"]` | `--chart-red-red-5` | `#F4554C` |
| `Color.chart.red["red-6"]` | `--chart-red-red-6` | `#DE433B` |
| `Color.chart.red["red-7"]` | `--chart-red-red-7` | `#BB3935` |
| `Color.chart.red["red-8"]` | `--chart-red-red-8` | `#992F2D` |
| `Color.chart.red["red-9"]` | `--chart-red-red-9` | `#782725` |
| `Color.chart.red["red-10"]` | `--chart-red-red-10` | `#571E1E` |
| `Color.chart.yellow["yellow-1"]` | `--chart-yellow-yellow-1` | `#FFDE6C` |
| `Color.chart.yellow["yellow-2"]` | `--chart-yellow-yellow-2` | `#FED158` |
| `Color.chart.yellow["yellow-3"]` | `--chart-yellow-yellow-3` | `#FEC444` |
| `Color.chart.yellow["yellow-4"]` | `--chart-yellow-yellow-4` | `#FEB630` |
| `Color.chart.yellow["yellow-5"]` | `--chart-yellow-yellow-5` | `#FEA819` |
| `Color.chart.yellow["yellow-6"]` | `--chart-yellow-yellow-6` | `#E79305` |
| `Color.chart.yellow["yellow-7"]` | `--chart-yellow-yellow-7` | `#BB7A03` |
| `Color.chart.yellow["yellow-8"]` | `--chart-yellow-yellow-8` | `#926102` |
| `Color.chart.yellow["yellow-9"]` | `--chart-yellow-yellow-9` | `#6B4803` |
| `Color.chart.yellow["yellow-10"]` | `--chart-yellow-yellow-10` | `#483100` |
| `Color.chart.pink["pink-1"]` | `--chart-pink-pink-1` | `#FED1FE` |
| `Color.chart.pink["pink-2"]` | `--chart-pink-pink-2` | `#FDBCFD` |
| `Color.chart.pink["pink-3"]` | `--chart-pink-pink-3` | `#F99BF8` |
| `Color.chart.pink["pink-4"]` | `--chart-pink-pink-4` | `#F573F2` |
| `Color.chart.pink["pink-5"]` | `--chart-pink-pink-5` | `#ED5BE5` |
| `Color.chart.pink["pink-6"]` | `--chart-pink-pink-6` | `#E136C6` |
| `Color.chart.pink["pink-7"]` | `--chart-pink-pink-7` | `#CF23A9` |
| `Color.chart.pink["pink-8"]` | `--chart-pink-pink-8` | `#B5158D` |
| `Color.chart.pink["pink-9"]` | `--chart-pink-pink-9` | `#910B6E` |
| `Color.chart.pink["pink-10"]` | `--chart-pink-pink-10` | `#64054B` |
| `Color.chart.cyan["cyan-1"]` | `--chart-cyan-cyan-1` | `#A0ECEC` |
| `Color.chart.cyan["cyan-2"]` | `--chart-cyan-cyan-2` | `#83E2E3` |
| `Color.chart.cyan["cyan-3"]` | `--chart-cyan-cyan-3` | `#67D8D9` |
| `Color.chart.cyan["cyan-4"]` | `--chart-cyan-cyan-4` | `#3AC4C6` |
| `Color.chart.cyan["cyan-5"]` | `--chart-cyan-cyan-5` | `#1AACB4` |
| `Color.chart.cyan["cyan-6"]` | `--chart-cyan-cyan-6` | `#048BA1` |
| `Color.chart.cyan["cyan-7"]` | `--chart-cyan-cyan-7` | `#00728E` |
| `Color.chart.cyan["cyan-8"]` | `--chart-cyan-cyan-8` | `#00607B` |
| `Color.chart.cyan["cyan-9"]` | `--chart-cyan-cyan-9` | `#005068` |
| `Color.chart.cyan["cyan-10"]` | `--chart-cyan-cyan-10` | `#004155` |
| `Color.white.white` | `--white-white` | `#FFFFFF` |
| `Color.white["white-a60"]` | `--white-white-a60` | `#FFFFFF99` |
| `Color.gray["gray-10"]` | `--gray-gray-10` | `#F2F5FA` |
| `Color.gray["gray-20"]` | `--gray-gray-20` | `#EDF0F7` |
| `Color.gray["gray-30"]` | `--gray-gray-30` | `#E4E9F2` |
| `Color.gray["gray-40"]` | `--gray-gray-40` | `#D8DEEB` |
| `Color.gray["gray-50"]` | `--gray-gray-50` | `#CCD4E3` |
| `Color.gray["gray-60"]` | `--gray-gray-60` | `#A3B4CC` |
| `Color.gray["gray-70"]` | `--gray-gray-70` | `#6B7D99` |
| `Color.gray["gray-80"]` | `--gray-gray-80` | `#2D3A56` |
| `Color.gray["gray-90"]` | `--gray-gray-90` | `#172640` |
| `Color.gray["gray-100"]` | `--gray-gray-100` | `#0D1B36` |
| `Color.gray["gray-110"]` | `--gray-gray-110` | `#0A1833` |
| `Color.gray["gray-120"]` | `--gray-gray-120` | `#00122E` |
| `Color.gray["gray-a60-1"]` | `--gray-gray-a60-1` | `#EDF1FA99` |
| `Color.gray["gray-a60-2"]` | `--gray-gray-a60-2` | `#E1E6F199` |
| `Color.gray["gray-a60-3"]` | `--gray-gray-a60-3` | `#D3DAEB99` |
| `Color.gray["gray-a60-4"]` | `--gray-gray-a60-4` | `#C0CBE099` |
| `Color.gray["gray-a60-5"]` | `--gray-gray-a60-5` | `#ACBAD399` |
| `Color.gray["gray-a60-6"]` | `--gray-gray-a60-6` | `#6B80A799` |
| `Color.gray["gray-a80-6"]` | `--gray-gray-a80-6` | `#6B80A7CC` |
| `Color.gray["gray-a60-7"]` | `--gray-gray-a60-7` | `#0A255599` |
| `Color.gray["gray-a60-8"]` | `--gray-gray-a60-8` | `#2C385299` |
| `Color.gray["gray-a75-8"]` | `--gray-gray-a75-8` | `#2C3852BF` |
| `Color.gray["gray-a80-9"]` | `--gray-gray-a80-9` | `#172640CC` |
| `Color.gray["gray-a30-10"]` | `--gray-gray-a30-10` | `#0015404D` |
| `Color.blue["blue-90"]` | `--blue-blue-90` | `#1D326C` |
| `Color.blue["blue-60"]` | `--blue-blue-60` | `#005ED1` |
| `Color.blue["blue-50"]` | `--blue-blue-50` | `#0080FF` |
| `Color.blue["blue-40"]` | `--blue-blue-40` | `#009DFF` |
| `Color.blue["blue-a20-50"]` | `--blue-blue-a20-50` | `#0088FF33` |
| `Color.blue["blue-a16-50"]` | `--blue-blue-a16-50` | `#0088FF29` |
| `Color.blue["blue-a10-50"]` | `--blue-blue-a10-50` | `#0088FF1A` |
| `Color.blue["blue-a04-50"]` | `--blue-blue-a04-50` | `#0088FF0A` |
| `Color.red["red-90"]` | `--red-red-90` | `#7D2126` |
| `Color.red["red-60"]` | `--red-red-60` | `#C73D31` |
| `Color.red["red-50"]` | `--red-red-50` | `#F0483E` |
| `Color.red["red-40"]` | `--red-red-40` | `#FF5252` |
| `Color.red["red-a20-50"]` | `--red-red-a20-50` | `#FF4A4A33` |
| `Color.red["red-a16-50"]` | `--red-red-a16-50` | `#FF4A4A29` |
| `Color.red["red-a10-50"]` | `--red-red-a10-50` | `#FF4A4A1A` |
| `Color.red["red-a04-50"]` | `--red-red-a04-50` | `#FF4A4A0A` |
| `Color.yellow["yellow-90"]` | `--yellow-yellow-90` | `#8E671B` |
| `Color.yellow["yellow-60"]` | `--yellow-yellow-60` | `#E07F00` |
| `Color.yellow["yellow-50"]` | `--yellow-yellow-50` | `#FEA008` |
| `Color.yellow["yellow-40"]` | `--yellow-yellow-40` | `#FEBA33` |
| `Color.yellow["yellow-a20-50"]` | `--yellow-yellow-a20-50` | `#FEA00833` |
| `Color.yellow["yellow-a16-50"]` | `--yellow-yellow-a16-50` | `#FEA00829` |
| `Color.yellow["yellow-a10-50"]` | `--yellow-yellow-a10-50` | `#FEA0081A` |
| `Color.yellow["yellow-a04-50"]` | `--yellow-yellow-a04-50` | `#FEA0080A` |
| `Color.green["green-90"]` | `--green-green-90` | `#18544F` |
| `Color.green["green-60"]` | `--green-green-60` | `#008F4C` |
| `Color.green["green-50"]` | `--green-green-50` | `#00BA5D` |
| `Color.green["green-40"]` | `--green-green-40` | `#23CF6D` |
| `Color.green["green-a20-50"]` | `--green-green-a20-50` | `#1EC97F33` |
| `Color.green["green-a16-50"]` | `--green-green-a16-50` | `#1EC97F29` |
| `Color.green["green-a10-50"]` | `--green-green-a10-50` | `#1EC97F1A` |
| `Color.green["green-a04-50"]` | `--green-green-a04-50` | `#1EC97F0A` |
| `Color.purple["purple-50"]` | `--purple-purple-50` | `#7E41FF` |
| `Color.purple["purple-a20-50"]` | `--purple-purple-a20-50` | `#7E41FF33` |
| `Color.purple["purple-a16-50"]` | `--purple-purple-a16-50` | `#7E41FF29` |
| `Color.purple["purple-a10-50"]` | `--purple-purple-a10-50` | `#7E41FF1A` |
| `Color.gradient.loading` | `--gradient-loading` | `linear-gradient(90deg, #0080ff 0%, #9ecfff 50%, #0080ff 100%)` |
| `Color.gradient["light-blue"]` | `--gradient-light-blue` | `linear-gradient(180deg,rgba(0, 136, 255, 0.2) 0%,rgba(0, 136, 255, 0.6) 100%)` |
| `Color.gradient["dark-blue"]` | `--gradient-dark-blue` | `radial-gradient(133.15% 133.15% at 4.69% 7.03%, #5BCAFF 0%, #06F 100%)` |
| `Effect.shadow.dashboardCard.normal` | `--effect-shadow-dashboardCard-normal` | `0px 0px 16px 0px rgba(107,125,153,0.08), 0px 0px 2.003px 0px rgba(107,125,153,0.15)` |
| `Effect.shadow.dashboardCard.hoverFloat` | `--effect-shadow-dashboardCard-hoverFloat` | `0px 0px 4px -2px rgba(10,37,85,0.18), 0px 8px 16px 0px rgba(10,37,85,0.18)` |
| `Effect.shadow.listItem.hover` | `--effect-shadow-listItem-hover` | `0px 0px 4px 0px rgba(235,239,245,0.6), 0px 8px 16px 0px rgba(129,138,153,0.18)` |
| `Effect.shadow.listItem.selected` | `--effect-shadow-listItem-selected` | `0px 1px 2px 0px rgba(184,192,204,0.6)` |
| `Effect.shadow.menu.default` | `--effect-shadow-menu-default` | `0px 0px 10px 0px rgba(107,125,153,0.18), 0px 12px 40px 0px rgba(45,58,86,0.3)` |
| `Effect.shadow.menu.above` | `--effect-shadow-menu-above` | `0px 0px 10px 0px rgba(107,125,153,0.18), 0px -12px 40px 0px rgba(45,58,86,0.3)` |
| `Effect.shadow.button.cta` | `--effect-shadow-button-cta` | `0px 1px 2px 0px rgba(44,56,82,0.18)` |
| `Effect.shadow.button.ordinary` | `--effect-shadow-button-ordinary` | `0px 1px 2px -1px rgba(44,56,82,0.18)` |
| `Effect.shadow.previewPanel.default` | `--effect-shadow-previewPanel-default` | `0px 0px 20px 0px rgba(107,125,153,0.18), 0px 25px 80px 0px rgba(45,58,86,0.3)` |
| `Effect.shadow.previewPanel.above` | `--effect-shadow-previewPanel-above` | `0px 0px 20px 0px rgba(107,125,153,0.18), 0px -25px 80px 0px rgba(45,58,86,0.3)` |
| `Effect.shadow.tooltip` | `--effect-shadow-tooltip` | `0px 1px 4px 0px rgba(29,50,108,0.6)` |
| `Effect.glow.toast.blue` | `--effect-glow-toast-blue` | `0px 2px 12px -4px rgba(0,128,255,0.6)` |
| `Effect.glow.toast.red` | `--effect-glow-toast-red` | `0px 2px 12px -4px rgba(240,72,62,0.6)` |
| `Effect.glow.toast.green` | `--effect-glow-toast-green` | `0px 2px 12px -4px rgba(0,186,93,0.6)` |
| `Effect.glow.toast.yellow` | `--effect-glow-toast-yellow` | `0px 2px 12px -4px rgba(254,160,8,0.6)` |
| `Effect.outline.hover` | `--effect-outline-hover` | `0px 0px 0px 4px rgba(225,230,241,0.6)` |
| `Effect.outline.activeFocus` | `--effect-outline-activeFocus` | `0px 0px 0px 4px rgba(0,136,255,0.16)` |
| `Effect.outline.error` | `--effect-outline-error` | `0px 0px 0px 4px rgba(255,74,74,0.16)` |
| `Effect.outline.notice` | `--effect-outline-notice` | `0px 0px 0px 4px rgba(254,160,8,0.16)` |
