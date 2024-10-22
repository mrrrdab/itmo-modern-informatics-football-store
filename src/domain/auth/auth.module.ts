import { Module } from '@nestjs/common';
import AuthController from './auth.controller';
import AuthEmailTemplate from './auth.email.template';
import AuthService from './auth.service';
import PrismaModule from '@/database/prisma/prisma.module';
import CryptoModule from '@/utils/lib/crypto/crypto.module';
import MailerModule from '@/utils/lib/mailer/mailer.module';
import JWTModule from '@/utils/lib/jwt/jwt.module';
import UserModule from '../user/user.module';
import CustomerModule from '../user/entity/customer/customer.module';
import EmailVerifModule from '../email-verification/email-verification.module';

@Module({
  imports: [
    PrismaModule,
    CryptoModule,
    MailerModule,
    JWTModule,
    UserModule,
    CustomerModule,
    EmailVerifModule
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthEmailTemplate]
})
class AuthModule { }
export default AuthModule;
