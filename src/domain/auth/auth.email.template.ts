import { Injectable } from '@nestjs/common';
import IEmailBasic from './types/interface/email.basic.interface';
import EmailSubject from './types/enum/email.subject';
import TokenVerifDTO from './validation/dto/token.verif.dto';
import { testUserPassword } from '../user/validation/config/user.create.config';

@Injectable()
class AuthEmailTemplate {
  private readonly emailBasicHTML: IEmailBasic = {
    greet: '<p>Привет, это <strong>Bundestore!</strong> Мы рады привествовать вас в качестве покупателя в нашем магазине!</p><br>',
    warn: '<p><strong>Если вы не понимаете почему получили этот email, пожалуйста, проигнорируйте его.</strong></p>'
  };

  private readonly emailBasicSubjects = {
    activateAccount: "Активация аккаунта",
    recoverPassword: "Восстановление пароля"
  };

  private emailConstructor(mainPart: string): string {
    return this.emailBasicHTML.greet + mainPart + this.emailBasicHTML.warn;
  }

  public getEmailSubject(emailSubject: EmailSubject) {
    return this.emailBasicSubjects[emailSubject];
  }

  public createActivationEmail(verifData: TokenVerifDTO): string {
    return this.emailConstructor(`<p>Пожалуйста, используйте этот токен для активации аккаунта: <strong>${verifData.token}</strong></p>`);
  }

  public createRecoverEmail(password: string): string {
    testUserPassword(password);

    return this.emailConstructor(
      `<p>Пожалуйста, используйте этот временный пароль для входа в систему: <strong>${password}</strong></p>
      <p><strong>Мы настоятельно рекомендуем сразу изменить пароль, когда вы войдете в систему.</strong></p>`
    );
  }
}
export default AuthEmailTemplate;
