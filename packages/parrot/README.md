# `@tower/i18n`

## Usage

```js
// common uage
import { i18next } from '@tower/i18n'

// for static string variable, use  t function directly
i18n.t('title.host')

// for dynamic string, as if you want to use a variable as key, use td function
i18n.td(`title.${name}`)

// react
import { useTranslation } from 'react-i18next
const { t, i18n } = useTranslation()


// static usage
t('title.host')

// dynamic usage
i18n.td(`title.${name}`)
```

## EsLint

add `src/declarations/i18next.d.ts` , and the file content as follow:

```js
// eslint-disable-next-line
import * as i18next from '@tower/i18n/src/declaraions/i18next';
```

## Scripts

* `yarn scan:mark` 
```ssh
yarn scan:mark  src/locales/zh-CN/auditLog.json
```
这个脚本会扫描文本内容，并将词条中的标点符号转换为对应语言的标点符号。目前处理中英文下的句号，逗号，冒号，单双引号，英文还处理了顿号转逗号。

## Locales Loader 
由于不同的文件可能有各自的词条使用使用，如果共用一套词条的话，可能会造成加载词条过大。
目前可以通过配置的方式，来指定加载区间。配置类型如下：
```typescript
type LocalesConfig = {
  locales?: { namespace: string, select?: '*' : [] } | '*',
  templates?: { namespace: string, select?: '*' : [] } | '*',
}
```
loader.config.json
``` typescript
{
  ZONE_1: LocalesConfig,
  ZONE_2: LocalesConfig
}
```
其中， locales 为词条文件， templates 为 ejs 文件。如果不传的话，则不会加载任何词条。全选可以填入 `*`。
namespace 为指定的 locales json 文件名， select 填入 json 中期望被选取的词条。填入 `*` 或不填为全选。
ZONE_1,ZONE_2 为 build 结束后，会划分出来的词条区域，打包结束后，会在 `lib/` 中生成  `ZONE_1-locales/` 文件夹。
在加载词条处使用该词条文件夹即可。
## recommend

* vscode-extension: [i18next](https://marketplace.visualstudio.com/items?itemName=jackie-onai.i18next)
* ejs language support: [ejs](https://marketplace.visualstudio.com/items?itemName=DigitalBrainstem.javascript-ejs-support)
