import { IsOptional, IsString, IsEmail, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { userCreateConfig } from './user.create.config';

export class UserUpdateDTO {
  @ApiProperty({
    type: 'string',
    description: 'User email',
  })
  @IsOptional()
  @IsString()
  @IsEmail()
  public email?: string;

  @ApiProperty({
    type: 'string',
    description: 'User email',
  })
  @IsOptional()
  @IsString()
  @Matches(userCreateConfig.passwordRule, {
    message: userCreateConfig.passwordMessage,
  })
  public password?: string;
}
