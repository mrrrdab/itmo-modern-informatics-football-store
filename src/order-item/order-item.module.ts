import { Module } from '@nestjs/common';

import { PrismaService } from '@/prisma.service';

import { OrderItemService } from './order-item.service';
import { OrderItemController } from './order-item.controller';

@Module({
  controllers: [OrderItemController],
  providers: [OrderItemService, PrismaService],
})
export class OrderItemModule {}
