/* eslint-disable max-len */
import { Injectable } from '@nestjs/common';

import { testUserPassword } from '../user/dto';

import { EmailSubject, IEmailBasic } from './types';
import { TokenVerifDTO } from './dto';

@Injectable()
export class AuthEmailTemplate {
  private readonly emailBasicHTML: IEmailBasic = {
    greet:
      '<p>Hello, this is <strong>Bundestore!</strong> We are pleased to welcome you as a customer in our store!</p><br>',
    warn: '<p><strong>If you do not understand why you received this email, please ignore it.</strong></p>',
  };

  private readonly emailBasicSubjects = {
    activateAccount: 'Activate Account',
    recoverPassword: 'Recover Password',
  };

  private emailConstructor(mainPart: string): string {
    return this.emailBasicHTML.greet + mainPart + this.emailBasicHTML.warn;
  }

  public getEmailSubject(emailSubject: EmailSubject) {
    return this.emailBasicSubjects[emailSubject];
  }

  public createActivationEmail(verifData: TokenVerifDTO): string {
    return this.emailConstructor(
      `<p>Please use this token to activate your account: <strong>${verifData.token}</strong></p>`,
    );
  }

  public createRecoverEmail(password: string): string {
    testUserPassword(password);

    return this.emailConstructor(
      `<p>Please use this temporary password to log in: <strong>${password}</strong></p>
      <p><strong>We strongly recommend that you change your password immediately after you log in.</strong></p>`,
    );
  }
}
