import { IsNotEmpty, IsOptional, IsEnum, IsString, IsEmail, Matches, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';

import { userCreateConfig } from './user.create.config';

export class UserCreateDTO {
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

  @ApiProperty({
    type: 'Role',
    description: 'User role',
  })
  @IsNotEmpty()
  @IsEnum(Role)
  public role: Role;

  @ApiProperty({
    type: 'boolean',
    description: 'User verification status',
  })
  @IsOptional()
  @IsBoolean()
  public isVerified?: boolean;
}
