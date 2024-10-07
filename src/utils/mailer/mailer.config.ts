import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import NodeConfig from '@/node/node.config';
import ITransporterSettings from './types/interface/transporter.config.interface';
import NodeENV from '@/node/node.env.enum';

@Injectable()
class MailerConfig extends NodeConfig {
  protected readonly nodeENV: NodeENV;
  private readonly transporterSettings: ITransporterSettings = {
    dev: {
      secure: false,
      requireTLS: true,
      tls: {
        rejectUnauthorized: false
      }
    },
    prod: {
      secure: true,
      tls: {
        rejectUnauthorized: true
      }
    }
  };

  constructor(private readonly configService: ConfigService) {
    super();
    this.nodeENV = this.configService.get('nodeENV') as NodeENV;
    this.initConfig();
  }

  protected override initConfig(): void {
    this.transporterSettings[this.nodeENV].host = this.configService.get('EMAIL_HOST');
    this.transporterSettings[this.nodeENV].service = this.configService.get('EMAIL_SERVICE');
    this.transporterSettings[this.nodeENV].auth = {
      user: this.configService.get('EMAIL_USERNAME'),
      pass: this.configService.get('EMAIL_PASSWORD')
    };
  }

  public getTransporterConfig(): SMTPTransport.Options {
    return this.transporterSettings[this.nodeENV];
  }
}
export default MailerConfig;
