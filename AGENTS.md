# AGENTS.md

このリポジトリで作業する人間・AIエージェント向けの運用ルールです。

## ブランチ運用

- `main` に直接 commit / push しない。すべての変更は Pull Request 経由でマージする。
- 作業用ブランチを切って PR を作成し、CI (`.github/workflows/build.yml`) が通ってからマージする。
- 1つの PR はバージョンを上げない。バージョンアップとリリースは別プロセスとして扱う。

## リリース運用 (npm publish)

バージョンは **git タグ** で管理する。PR ごとに `package.json` の version を上げることはしない。

リリース手順:

1. 複数の PR が `main` にマージされ、リリースしたい状態になったら、リリース担当者がローカルまたは `main` ブランチ上で以下を実行する。

   ```sh
   npm version patch   # または minor / major
   git push origin main --follow-tags
   ```

   これにより `package.json` の version が更新され、`vX.Y.Z` タグが作成・push される。

2. `vX.Y.Z` 形式のタグが push されると `.github/workflows/release.yml` が起動し、
   ビルド・テスト後に `npm publish` を実行して npm レジストリに公開する。

3. バージョニングは [Semantic Versioning](https://semver.org/) に従う。
   - `patch`: バグ修正のみ
   - `minor`: 後方互換性のある機能追加
   - `major`: 破壊的変更

## その他

- CIワークフロー:
  - `build.yml`: 全ブランチへの push で build/test を実行
  - `gh-page.yml`: `main` への push で GitHub Pages をデプロイ
  - `release.yml`: `v*` タグの push で npm publish を実行
