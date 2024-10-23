import { Module } from '@nestjs/common';

import { PrismaModule, PrismaService } from '@/database/prisma';
import { JWTModule } from '@/utils';

import { UserModule } from '../user';

import { ProductService } from './product.service';
import { ProductController } from './product.controller';

@Module({
  imports: [PrismaModule, JWTModule, UserModule],
  controllers: [ProductController],
  providers: [ProductService, PrismaService],
})
export class ProductModule {}
