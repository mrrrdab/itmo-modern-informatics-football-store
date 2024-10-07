import SMTPTransport from 'nodemailer/lib/smtp-transport';

interface ITransporterSettings {
  dev: SMTPTransport.Options;
  prod: SMTPTransport.Options;
}
export default ITransporterSettings;
