# Web ToDoアプリ

WIP...

# フロントエンド

React.js

```bash:.env
SKIP_PREFLIGHT_CHECK=true # Storybook用
REACT_APP_API_URL=ADD_API_ENDPOINT_URL # APIエンドポイントURL
REACT_APP_API_KEY=ADD_API_KEY # API KEY（現在未使用）
```

```bash
$ cd frontend
$ yarn install
$ yarn start
```

## Storybook

```bash
$ cd frontend
$ yarn storybook
```

## Test

```bash
$ cd frontend
$ yarn test
```

# バックエンド

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

## はじめに

[NestJS](https://github.com/nestjs/nest)を利用したToDoアプリケーション用のREST APIサーバーです。  
データベースにはAWS DynamoDBを利用しています。

## インストール

```bash
$ cd backend
$ yarn install
# or
$ npm install
```

## アプリケーションの起動

アプリケーションの動作にはDynamoDBが必要になります。  
[serverless framework](https://www.serverless.com/)を利用しているためAWSアカウントと紐付けたservelesss frameworkを利用できる環境が必要となります。

```bash
$ yarn build && serverless deploy
# or
$ npm run build && serverless deploy
```

### オフラインでの起動

```bash
$ serverless dynamodb install # 初回のみ
$ yarn build && sls offline start
# or
$ npm run build && sls offline start
```

### API用ドキュメント

APIの情報についてはデプロイ後に発行されるエンドポイント`+/dev/api`でSwaggerドキュメントが確認できます。  

- オンライン
`https://${APIエンドポイント}/dev/api`
- オフライン
`http://localhost:3000/dev/api`
