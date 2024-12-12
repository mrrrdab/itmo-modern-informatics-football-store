/* eslint-disable max-len */

import { IUserCreateConfig } from './types';

export const userCreateConfig: IUserCreateConfig = {
  passwordRule: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{10,}$/,
  passwordMessage:
    'The password must be at least 10 characters long and contain uppercase letters, lowercase letters, numbers and special characters (@$!%*#?&)',
  testPassword: function (password: string): void | never {
    if (!this.passwordRule.test(password)) {
      throw new Error(userCreateConfig.passwordMessage);
    }
  },
};
