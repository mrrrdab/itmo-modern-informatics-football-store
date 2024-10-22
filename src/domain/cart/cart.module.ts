import { Module } from '@nestjs/common';
import PrismaModule from '@/database/prisma/prisma.module';
import CartController from './cart.controller';
import CartService from './cart.service';
import JWTModule from '@/utils/lib/jwt/jwt.module';
import UserModule from '../user/user.module';

@Module({
  imports: [
    PrismaModule,
    JWTModule,
    UserModule
  ],
  controllers: [CartController],
  providers: [CartService],
})
class CartModule { }
export default CartModule;
