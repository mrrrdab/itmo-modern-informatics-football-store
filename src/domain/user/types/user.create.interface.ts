export interface IUserCreateConfig {
  passwordRule: RegExp;
  passwordMessage: string;
  testPassword: (password: string) => void | never;
}
