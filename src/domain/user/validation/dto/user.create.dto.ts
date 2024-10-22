import {
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsString,
  IsEmail,
  Matches,
  IsBoolean
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { userCreateConfig } from '../config/user.create.config';

class UserCreateDTO {
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

  @ApiProperty({
    type: 'Role',
    description: "Роль пользователя"
  })
  @IsNotEmpty()
  @IsEnum(Role)
  public role: Role;

  @ApiProperty({
    type: 'boolean',
    description: "Верификация пользователя"
  })
  @IsOptional()
  @IsBoolean()
  public isVerified?: boolean;
}
export default UserCreateDTO;
