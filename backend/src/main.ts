import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder()
    .setTitle('ToDo Application API')
    .setDescription('The API documentation for the ToDo app')
    .setVersion('1.0')
    .addApiKey({
      type: 'apiKey',
      name: 'x-api-key',
    })
    .build();
  const additionalOptions = {
    swaggerOptions: {
      supportedSubmitMethods: [],
    },
  };
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document, additionalOptions);

  app.enableCors();
  app.enableVersioning();
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
