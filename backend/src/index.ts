import { APIGatewayProxyHandler } from 'aws-lambda';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Server } from 'http';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as serverless from 'aws-serverless-express';
import * as express from 'express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

let cachedServer: Server;

const setupSwagger = (app: INestApplication) => {
  const options = new DocumentBuilder()
    .setTitle('Web App ToDo')
    .setDescription('The API documentation for the ToDo app')
    .setVersion('1.0')
    .build();
  const additionalOptions = {
    swaggerOptions: {
      supportedSubmitMethods: [],
    },
  };
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document, additionalOptions);
};

const bootstrapServer = async (): Promise<Server> => {
  const expressApp = express();
  const adapter = new ExpressAdapter(expressApp);
  const app = await NestFactory.create(AppModule, adapter);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  setupSwagger(app);
  app.init();
  return serverless.createServer(expressApp);
};

export const handler: APIGatewayProxyHandler = async (event, context) => {
  if (event.path === '/api') {
    event.path = '/api/';
  }
  event.path = event.path.includes('swagger-ui')
    ? `/api${event.path}`
    : event.path;

  if (!cachedServer) {
    cachedServer = await bootstrapServer();
  }

  const result = await serverless.proxy(cachedServer, event, context, 'PROMISE')
    .promise;
  return result;
};
