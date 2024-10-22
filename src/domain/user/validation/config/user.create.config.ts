import IUserCreateConfig from '../../types/interface/user.create.interface';

export const userCreateConfig: IUserCreateConfig = {
  passwordRule: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{10,}$/,
  passwordMessage: "Пароль должен быть длиной не менее 10 символов, содержать заглавные буквы, строчные буквы, цифры и специальные символы (@$!%*#?&)"
}

export function testUserPassword(password: string): void | never {
  if (!userCreateConfig.passwordRule.test(password)) {
    throw new Error(userCreateConfig.passwordMessage);
  }
}
