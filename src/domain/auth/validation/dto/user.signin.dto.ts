import {
  IsNotEmpty,
  IsString,
  IsEmail,
  Matches
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { userCreateConfig } from '@/domain/user/validation/config/user.create.config';

class UserSigninDTO {
  @ApiProperty({
    type: 'string',
    description: "Почта пользователя"
  })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  public email: string;

  @ApiProperty({
    type: 'string',
    description: "Пароль пользователя"
  })
  @IsNotEmpty()
  @IsString()
  @Matches(userCreateConfig.passwordRule, {
    message: userCreateConfig.passwordMessage
  })
  public password: string;
}
export default UserSigninDTO;
