import { Module } from '@nestjs/common';

import { PrismaModule } from '@/database/prisma';
import { JWTModule } from '@/utils';

import { UserModule } from '../user/user.module';
import { CustomerModule } from '../user/entity/customer/customer.module';
import { CartModule } from '../cart/cart.module';

import { OrderService } from './service/order.service';
import { OrderFilter } from './service/order.filter';
import { OrderAggregate } from './service/order.aggregate';
import { OrderController } from './order.controller';

@Module({
  imports: [PrismaModule, JWTModule, UserModule, CustomerModule, CartModule],
  controllers: [OrderController],
  providers: [OrderService, OrderFilter, OrderAggregate],
  exports: [OrderService],
})
export class OrderModule {}
