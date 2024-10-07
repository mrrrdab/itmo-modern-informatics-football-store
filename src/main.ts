import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import AppModule from './app.module';

const bootstrap = async () => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get('port');

  const options = new DocumentBuilder()
    .setTitle('REST API для работы с основной базой данных')
    .setVersion('1.0')
    .addServer(
      `${configService.get('protocol')}://${configService.get('host')}:${port}`,
      `${configService.get('nodeENV')} environment`
    )
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(port);
};

bootstrap();
