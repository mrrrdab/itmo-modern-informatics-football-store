import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import MailerConfig from './mailer.config';
import MailerProvider from './mailer.provider';

@Module({
  imports : [ ConfigModule ],
  providers: [
    MailerConfig,
    MailerProvider
  ],
  exports: [ MailerProvider ]
})
class MailerModule { }
export default MailerModule;
