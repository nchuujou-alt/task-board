# CLAUDE.md

このファイルは、Claude Code（claude.ai/code）がこのリポジトリで作業する際のガイドラインです。

## プロジェクト概要

タスクボードアプリケーション。テキスト入力でタスクを追加し、チェックボックスで完了・未完了を切り替え、削除できる。完了済みタスクはグレー表示になる。

### 技術スタック

- React 19 + TypeScript
- Vite（開発サーバー・ビルド）
- oxlint（Lint）
- 状態はブラウザの `localStorage` に保存（バックエンド・DBなし）

### ディレクトリ構成

- `src/App.tsx` — アプリのルート。タスクの状態管理（追加・トグル・削除）と `localStorage` への永続化
- `src/types.ts` — `Task` 型定義
- `src/components/TaskForm.tsx` — タスク追加用の入力フォーム
- `src/components/TaskList.tsx` — タスク一覧の描画
- `src/components/TaskItem.tsx` — タスク1件分の表示（チェックボックス・削除ボタン）
- `src/App.css` — タスクボードのスタイル

### コマンド

- `npm run dev` — 開発サーバー起動
- `npm run build` — 型チェック + 本番ビルド
- `npm run lint` — oxlintによるLint
- `npm run preview` — ビルド結果のプレビュー

## Git運用ルール

### コードを変更したら都度GitHubにプッシュする

**このプロジェクトでは、コードに変更を加えるたびに、コミットしてGitHubへプッシュすることをルールとします。**

- 1つの変更（機能追加・修正・リファクタリングなど）が完了するごとに、区切りの良い単位でコミットを作成する。
- 変更を溜め込まず、こまめにコミット＆プッシュする。作業内容が中途半端な状態で長時間放置しない。
- プッシュ先は `origin` の現在のブランチ（通常は作業用ブランチ、必要に応じて `main`）とする。
- コミットメッセージは変更内容が分かるように簡潔に記述する（「何を」より「なぜ」を意識する）。
- プッシュ前に `git status` / `git diff` で差分を確認し、意図しないファイル（`.env` や認証情報など秘密情報を含むファイル）が含まれていないことを確認する。
- force push（`git push --force`）や `git reset --hard` などの破壊的操作は、ユーザーの明示的な許可なしに行わない。

### 基本フロー

1. コードを変更する
2. `git status` / `git diff` で変更内容を確認する
3. 関連するファイルのみを `git add` でステージングする
4. コミットを作成する（メッセージは変更内容が分かるように）
5. `git push` でGitHubにプッシュする

### リポジトリ情報

- GitHub: https://github.com/nchuujou-alt/task-board
- 既定ブランチ: `main`

### GitHub Pages

- 公開URL: https://nchuujou-alt.github.io/task-board/
- `main` へのpushをトリガーに `.github/workflows/deploy.yml` がビルドして自動デプロイする
- プロジェクトページ（リポジトリ名がパスに入る）のため、`vite.config.ts` の `base` は `/task-board/` に設定している。リポジトリ名を変更する場合はここも合わせて変更すること
- リポジトリ設定の Settings > Pages > Source を「GitHub Actions」にする初回設定が必要（未設定の場合は初回pushでワークフローは動くが公開はされない）

### 未設定の項目

- コミットメッセージの規約（Conventional Commits など）を採用する場合はここに追記してください。
