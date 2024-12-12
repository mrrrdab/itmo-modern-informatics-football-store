import { IsNotEmpty, IsOptional, IsEnum, IsString, IsEmail, Matches, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';

import { userCreateConfig } from '../user.create.config';

export class UserCreateDTO {
  @ApiProperty({
    type: 'string',
    description: 'User email',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  public email: string;

  @ApiProperty({
    type: 'string',
    description: 'User password',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @Matches(userCreateConfig.passwordRule, {
    message: userCreateConfig.passwordMessage,
  })
  public password: string;

  @ApiProperty({
    type: 'enum',
    description: 'User role',
    enum: Role,
    required: true,
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
