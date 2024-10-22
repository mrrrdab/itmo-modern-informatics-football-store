import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import NodeENV from '@/utils/node/types/enum/node.env.enum';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

@Injectable()
class TransporterSettings {
  private readonly settings: Record<NodeENV, SMTPTransport.Options> = {
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

  constructor(private readonly configService: ConfigService) { }

  getSettings(nodeENV: NodeENV): SMTPTransport.Options {
    return {
      ...this.settings[nodeENV],
      host: this.configService.get('EMAIL_HOST'),
      service: this.configService.get('EMAIL_SERVICE'),
      auth: {
        user: this.configService.get('EMAIL_USERNAME'),
        pass: this.configService.get('EMAIL_PASSWORD')
      }
    };
  }
}
export default TransporterSettings;
