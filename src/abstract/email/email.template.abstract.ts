import { EmailBasicSubjects, IEmailBasic } from './types';

export abstract class EmailTemplate {
  protected abstract emailBasicSubjects: EmailBasicSubjects;

  protected readonly emailBasicHTML: IEmailBasic = {
    greet: '<p>Hello, this is <strong>Bundestore!</strong></p><br>',
    warn: '<p><strong>If you do not understand why you received this email, please ignore it.</strong></p>',
  };

  public abstract getEmailSubject(emailSubject: string): string;

  protected emailConstructor(mainPart: string): string {
    return this.emailBasicHTML.greet + mainPart + this.emailBasicHTML.warn;
  }
}
