# 如何提交错误码

## 错误码定义

考虑到前端会在一个场景中调用到多个不同项目的错误码，且不同项目间可能存在相同的错误码定义（例如 NOT_FOUND / INVALID_PARAMS），不同项目的错误码请携带上项目名作为前缀，例如，launcherd 下的错误码 NOT_FOUND , INVALID_PARAMS 请在返回的时候，返回 LAUNCHERD_INVALID_PARAMS, LAUNCHERD_NOT_FOUND

## 选择分支

不区分版本， 往前推进和迭代， 提交到 main 分支上即可。请一定要确保向前兼容。

## 文案存放

对应的文案应该存放在哪里？

### 操作

- 存放位置

  http://gitlab.smartx.com/frontend/cloudtower-error-code

- 文件命名

  在 src 目录下， 根据项目新建文件夹，存放 zh-CN.json, en-US.json。 参考 src/demo_project

- 文件内容

  - 使用 JSON 格式，键（key）为 error code （即上述类型定义中的 code 和 reason），值（value）为 error code 的中文解释
  - (optional) 如需增加 HBS 文件的错误码，请参考 demo_project， 在对应 project 项目下增加 templates/zh-CN 和 templatess/en-US 文件夹，并文件级别的方式，添加单个错误码的翻译。

- 特殊情况
  - 对于需要格式化变量展示，处理复数词条等较为复杂的场景，请 @ 对应前端研发来进行相关协助或帮助补充

## 原则

- 错误码及其对应翻译应该向前兼容，考虑到版本搭配等复杂场景，对于已有的错误码，如果在后端新版本中已经移除，也不允许在词条中删除。
- 如果错误码定义发生了变更，且需要携带不的变量插入到词条翻译中的话，也不允许变更旧有词条，请新增错误码。
- cloudtower-error-code 中会对静态文案错 lint 解析，确保文案中没有 oem 变量，但是如果后端携带的变量中的文案是携带变量的，则无法检查到。请在设计变量名的时候考虑 OEM 的相关术语

## 提交 mr

提交 MR 后，等待团队 review 和合并。可以 @ 对应协作的 tower dev 进行 review。

## 如何发版

更新 package.json 中的版本，合并到 main 分支上即会自动触发相关 CI 并发版。

## TODO LIST

- [] add eslint
- [] lazy load
