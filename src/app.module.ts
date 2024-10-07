import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import AppController from './app.controller';
import AppService from './app.service';
import AppAllExceptionsFilter from './filters/app.all.exceptions.filter';
import DatabaseModule from './database/database.module';
import DomainModule from './domain/domain.module';
import UtilsModule from './utils/utils.module';
import appConfig from './app.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig],
      envFilePath: ['.env', `.env.${process.env.NODE_ENV}`]
    }),
    DatabaseModule,
    UtilsModule,
    DomainModule
  ],
  controllers: [ AppController ],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: AppAllExceptionsFilter
    }
  ],
})
class AppModule {}
export default AppModule;
