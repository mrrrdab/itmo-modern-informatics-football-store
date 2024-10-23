import { IsNotEmpty, IsString, IsEmail, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { userCreateConfig } from '@/domain/user';

export class UserSignInDTO {
  @ApiProperty({
    type: 'string',
    description: 'User email',
  })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  public email: string;

  @ApiProperty({
    type: 'string',
    description: 'User password',
  })
  @IsNotEmpty()
  @IsString()
  @Matches(userCreateConfig.passwordRule, {
    message: userCreateConfig.passwordMessage,
  })
  public password: string;
}
