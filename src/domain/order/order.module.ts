import { Module } from '@nestjs/common';
import PrismaModule from '@/database/prisma/prisma.module';
import OrderController from './order.controller';
import OrderService from './order.service';

@Module({
  imports: [ PrismaModule ],
  controllers: [OrderController],
  providers: [OrderService],
})
class OrderModule {}
export default OrderModule;
