import { Module } from '@nestjs/common';

import { PrismaModule } from '@/database/prisma';
import { JWTModule } from '@/utils';

import { UserModule } from '../user';

import { CartController } from './cart.controller';
import { CartService } from './cart.service';

@Module({
  imports: [PrismaModule, JWTModule, UserModule],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
