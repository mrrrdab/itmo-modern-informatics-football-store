import { Module } from '@nestjs/common';

import { JWTModule } from '@/utils';
import { PrismaModule } from '@/database/prisma';

import { UserModule } from '../user';

import { OrderItemController } from './order-item.controller';
import { OrderItemService } from './order-item.service';

@Module({
  imports: [PrismaModule, JWTModule, UserModule],
  controllers: [OrderItemController],
  providers: [OrderItemService],
})
export class OrderItemModule {}
