# CERTIFICATE MANAGER REST API

## インストール

```
npm install
```

## VS Code から実行

左側の虫のマークでデバッグビューに切り替え、「▷」ボタンを押下する

## コンソールから実行

```
npm start
```

## 実行

1. 環境変数設定
   1. linux
   ```bash
   export NODE_ENV=development
   ```
   1. windows
   ```powershell
   $env:NODE_ENV="development"
   ```
1. サーバ立ち上げ(linux,windows 共通)
```bash
npm start
```

## Swagger の確認

`http://localhost:3000/api-docs`にブラウザから接続
