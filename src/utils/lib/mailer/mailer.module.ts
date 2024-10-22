import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import MailerConfig from './mailer.config';
import MailerProvider from './mailer.provider';
import TransporterSettings from './transporter.settings';
import NodeModule from '@/utils/node/node.module';

@Module({
  imports : [ ConfigModule, NodeModule ],
  providers: [
    TransporterSettings,
    MailerConfig,
    MailerProvider
  ],
  exports: [ MailerProvider ]
})
class MailerModule { }
export default MailerModule;
