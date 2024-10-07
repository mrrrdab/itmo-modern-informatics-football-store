import { Module } from '@nestjs/common';
import PrismaModule from '@/database/prisma/prisma.module';
import OrderItemController from './order-item.controller';
import OrderItemService from './order-item.service';

@Module({
  imports: [ PrismaModule ],
  controllers: [OrderItemController],
  providers: [OrderItemService],
})
class OrderItemModule {}
export default OrderItemModule;
