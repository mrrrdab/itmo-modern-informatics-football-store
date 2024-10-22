import { Module, ValidationPipe } from '@nestjs/common';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import AppController from './app.controller';
import AppService from './app.service';
import AppAllExceptionsFilter from './filters/app.all.exceptions.filter';
import NodeModule from '@/utils/node/node.module';
import AuthModule from '../auth/auth.module';
import AdminModule from '../user/entity/administrator/admin.module';
import ModeratorModule from '../user/entity/moderator/moderator.module';
import CartModule from '../cart/cart.module';
import OrderItemModule from '../order-item/order-item.module';
import OrderModule from '../order/order.module';
import ProductModule from '../product/product.module';
import appConfig from './app.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig],
      envFilePath: ['.env', `.env.${process.env.NODE_ENV}`]
    }),
    NodeModule,
    AuthModule,
    AdminModule,
    ModeratorModule,
    CartModule,
    OrderItemModule,
    OrderModule,
    ProductModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe
    },
    {
      provide: APP_FILTER,
      useClass: AppAllExceptionsFilter
    }
  ],
})
class AppModule { }
export default AppModule;
