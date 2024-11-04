import { Module } from '@nestjs/common';

import { PrismaModule } from '@/database/prisma';
import { JWTModule } from '@/utils';

import { UserModule } from '../../user.module';

import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';

@Module({
  imports: [PrismaModule, JWTModule, UserModule],
  controllers: [CustomerController],
  providers: [CustomerService],
  exports: [CustomerService],
})
export class CustomerModule {}
