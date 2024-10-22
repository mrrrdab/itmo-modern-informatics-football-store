import { Module } from '@nestjs/common';
import UserController from './user.controller';
import UserService from './user.service';
import UserAggregate from './user.aggregate';
import PrismaModule from '@/database/prisma/prisma.module';
import CryptoModule from '@/utils/lib/crypto/crypto.module';
import JWTModule from '@/utils/lib/jwt/jwt.module';

@Module({
  imports: [
    PrismaModule,
    CryptoModule,
    JWTModule
  ],
  controllers: [UserController],
  providers: [UserService, UserAggregate],
  exports: [UserService, UserAggregate]
})
class UserModule { }
export default UserModule;
