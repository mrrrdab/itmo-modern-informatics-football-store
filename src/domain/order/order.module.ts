import { Module } from '@nestjs/common';

import { PrismaModule } from '@/database/prisma';
import { JWTModule } from '@/utils';

import { UserModule } from '../user';

import { OrderService } from './order.service';
import { OrderController } from './order.controller';

@Module({
  imports: [PrismaModule, JWTModule, UserModule],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
