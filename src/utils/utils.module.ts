import { Module } from '@nestjs/common';
import CryptoModule from './crypto/crypto.module';
import MailerModule from './mailer/mailer.module';
import JWTModule from './jwt/jwt.module';

@Module({
  imports: [
    CryptoModule,
    MailerModule,
    JWTModule
  ]
})
class UtilsModule {}
export default UtilsModule;
