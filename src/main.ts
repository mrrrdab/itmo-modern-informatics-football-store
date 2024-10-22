import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import AppModule from './domain/app/app.module';
import CookieSerializer from 'cookie-parser';

const bootstrap = async () => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get('port');

  configService.set('uri', `${configService.get('protocol')}://${configService.get('host')}:${port}`);
  const options = new DocumentBuilder()
    .setTitle('REST API для работы с основной базой данных')
    .setVersion('1.0')
    .addServer(
      configService.get('uri') as string,
      `${configService.get('nodeENV')} environment`
    )
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  app.use(CookieSerializer());

  await app.listen(port);
};

bootstrap();
