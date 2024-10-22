import { Module } from '@nestjs/common';
import PrismaModule from '@/database/prisma/prisma.module';
import OrderController from './order.controller';
import OrderService from './order.service';
import JWTModule from '@/utils/lib/jwt/jwt.module';
import UserModule from '../user/user.module';

@Module({
  imports: [
    PrismaModule,
    JWTModule,
    UserModule
  ],
  controllers: [OrderController],
  providers: [OrderService]
})
class OrderModule {}
export default OrderModule;
