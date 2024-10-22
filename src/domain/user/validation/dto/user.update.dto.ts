import {
  IsOptional,
  IsString,
  IsEmail,
  Matches
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { userCreateConfig } from '../config/user.create.config';

class UserUpdateDTO {
  @ApiProperty({
    type: 'string',
    description: "Почта пользователя"
  })
  @IsOptional()
  @IsString()
  @IsEmail()
  public email?: string;

  @ApiProperty({
    type: 'string',
    description: "Пароль пользователя"
  })
  @IsOptional()
  @IsString()
  @Matches(userCreateConfig.passwordRule, {
    message: userCreateConfig.passwordMessage
  })
  public password?: string;
}
export default UserUpdateDTO;
