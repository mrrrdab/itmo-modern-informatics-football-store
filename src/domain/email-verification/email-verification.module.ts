import { Module } from '@nestjs/common';
import PrismaModule from '@/database/prisma/prisma.module';
import EmailVerifController from './email-verification.controller';
import EmailVerifService from './email-verification.service';
import JWTModule from '@/utils/lib/jwt/jwt.module';
import UserModule from '../user/user.module';

@Module({
  imports: [
    PrismaModule,
    JWTModule,
    UserModule
  ],
  controllers: [ EmailVerifController ],
  providers: [ EmailVerifService ],
  exports: [ EmailVerifService ]
})
class EmailVerifModule {}
export default EmailVerifModule;
