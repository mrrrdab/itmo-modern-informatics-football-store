import { Module } from '@nestjs/common';
import PrismaModule from '@/database/prisma/prisma.module';
import CustomerController from './customer.controller';
import CustomerService from './customer.service';

@Module({
  imports: [ PrismaModule ],
  controllers: [CustomerController],
  providers: [CustomerService],
})
class CustomerModule {}
export default CustomerModule;
