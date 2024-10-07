import { Module } from '@nestjs/common';
import PrismaModule from '@/database/prisma/prisma.module';
import CartController from './cart.controller';
import CartService from './cart.service';

@Module({
  imports: [ PrismaModule ],
  controllers: [CartController],
  providers: [CartService ],
})
class CartModule {}
export default CartModule;
