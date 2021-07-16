# ToDo App Backend

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
$ yarn build && sls deploy
# or
$ npm run build && sls deploy
```

デプロイ後に表示されるエンドポイントとAPI KEYをフロントエンドで利用します。

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
