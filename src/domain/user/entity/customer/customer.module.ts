import { Module, forwardRef } from '@nestjs/common';
import PrismaModule from '@/database/prisma/prisma.module';
import JWTModule from '@/utils/lib/jwt/jwt.module';
import UserModule from '../../user.module';
import CustomerController from './customer.controller';
import CustomerService from './customer.service';

@Module({
  imports: [
    PrismaModule,
    JWTModule,
    UserModule
  ],
  controllers: [CustomerController],
  providers: [CustomerService],
  exports: [CustomerService]
})
class CustomerModule { }
export default CustomerModule;
