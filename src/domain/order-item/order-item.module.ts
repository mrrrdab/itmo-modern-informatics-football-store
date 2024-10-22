import { Module } from '@nestjs/common';
import PrismaModule from '@/database/prisma/prisma.module';
import OrderItemController from './order-item.controller';
import OrderItemService from './order-item.service';
import JWTModule from '@/utils/lib/jwt/jwt.module';
import UserModule from '../user/user.module';

@Module({
  imports: [
    PrismaModule,
    JWTModule,
    UserModule
  ],
  controllers: [OrderItemController],
  providers: [OrderItemService],
})
class OrderItemModule { }
export default OrderItemModule;
