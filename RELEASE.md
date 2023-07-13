# 如何发版

## Patch 版本

1. 切换 `main` 分支

   ```
   git switch main
   ```

2. 使用 lerna 更新版本，并推送相关 tag

   ```
   yarn lerna version patch --exact --force-publish
   ```

## Minor 版本

1. 从 `main` 创建分支，如 `v0.22.x`

   ```
   git checkout main
   git pull
   git switch -c v0.22.x
   ```

2. 使用 lerna 更新版本，并推送相关 tag

   ```
   yarn lerna version minor --exact --force-publish
   ```

3. 等待 CI 结果，发布完成后创建 PR 合入 `main` 分支
