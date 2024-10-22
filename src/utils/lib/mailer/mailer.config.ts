import { Injectable } from '@nestjs/common';
import TransporterSettings from './transporter.settings';
import NodeConfig from '@/utils/node/node.config';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

@Injectable()
class MailerConfig {
  constructor(
    private readonly transporterSettings: TransporterSettings,
    private readonly nodeConfig: NodeConfig
  ) {}

  public getTransporterSettings(): SMTPTransport.Options {
    return this.transporterSettings.getSettings(this.nodeConfig.getNodeENV());
  }
}
export default MailerConfig;
