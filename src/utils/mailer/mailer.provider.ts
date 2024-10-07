import { Injectable } from '@nestjs/common';
import { Transporter, createTransport } from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import MailerConfig from './mailer.config';

@Injectable()
class MailerProvider {
  private readonly mailerTransporter: Transporter;
  private readonly transporterConfig: SMTPTransport.Options;

  constructor(private readonly mailerConfig: MailerConfig) {
    this.transporterConfig = this.mailerConfig.getTransporterConfig();
    this.mailerTransporter = createTransport(this.transporterConfig);
  }

  public getMailerTransporter(): Transporter {
    return this.mailerTransporter;
  }
}
export default MailerProvider;
