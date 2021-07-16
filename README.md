# Web ToDoアプリ

# フロントエンド

## はじめに

[React](https://ja.reactjs.org/)を利用したToDoアプリケーションのフロントエンドです。  
バックエンドにはNestJS + DynamoDBを利用したREST APIを利用しています。

[バックエンド](https://github.com/himorishige/web-todo-app/tree/main/backend)

## インストール

```bash
$ cd frontend

$ yarn install
# or
$ npm install
```

## アプリケーションの準備

アプリケーションの動作にはあらかじめバックエンドの準備と環境変数を記載したファイル（`.env`）の用意が必要です。  

[バックエンド](https://github.com/himorishige/web-todo-app/tree/main/backend)

`.env`

```bash
SKIP_PREFLIGHT_CHECK=true # Storybook用の記述
REACT_APP_API_URL=ADD_API_ENDPOINT_URL # 生成されたAPIエンドポイントURL ex) https://${APIエンドポイント}/dev/v1/tasks
REACT_APP_API_KEY=ADD_API_KEY # 生成されたAPI KEY
```

## アプリケーションの起動

```bash
$ cd frontend

$ yarn start
# or
$ npm run start
```

[http://localhost:3000](http://localhost:3000)

## Storybookの起動

各コンポーネントのデザインチェックのためにStorybookを用意しています。

```bash
$ cd frontend

$ yarn storybook
# or
$ npm run storybook
```

[http://localhost:6006](http://localhost:6006)

## Testの起動

```bash
$ cd frontend

$ yarn test
# or
$ npm run test
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
$ cd backend

$ yarn build && serverless deploy
# or
$ npm run build && serverless deploy
```

### オフラインでの起動

```bash
$ cd backend

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
