import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdministratorModule } from './administrator/administrator.module';
import { ModeratorModule } from './moderator/moderator.module';
import { CustomerModule } from './customer/customer.module';
import { EmailVerificationModule } from './email-verification/email-verification.module';
import { CartModule } from './cart/cart.module';
import { OrderItemModule } from './order-item/order-item.module';
import { OrderModule } from './order/order.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AdministratorModule,
    ModeratorModule,
    CustomerModule,
    EmailVerificationModule,
    CartModule,
    OrderItemModule,
    OrderModule,
    ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
