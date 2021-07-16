# ToDo App Frontend

## はじめに

[React](https://ja.reactjs.org/)を利用したToDoアプリケーションのフロントエンドです。  
バックエンドにはNestJS + DynamoDBを利用したREST APIを利用しています。

[バックエンド](https://github.com/himorishige/web-todo-app/tree/main/backend)

## インストール

```bash
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
$ yarn start
# or
$ npm run start
```

[http://localhost:3000](http://localhost:3000)

## Storybookの起動

各コンポーネントのデザインチェックのためにStorybookを用意しています。

```bash
$ yarn storybook
# or
$ npm run storybook
```

[http://localhost:6006](http://localhost:6006)

## Testの起動

```bash
$ yarn test
# or
$ npm run test
```
