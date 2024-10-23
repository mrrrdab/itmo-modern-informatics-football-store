import { IsNotEmpty, IsOptional, IsDate, IsString, IsEmail, IsPhoneNumber, Matches } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

import { IsEqual } from '@/utils';
import { userCreateConfig } from '@/domain/user/dto';

export class UserSignUpDTO {
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
    type: 'string',
    description: 'User password confirmation',
  })
  @IsNotEmpty()
  @IsString()
  @IsEqual('password')
  public confirmPassword: string;

  @ApiProperty({
    type: 'string',
    description: 'User first name',
  })
  @IsNotEmpty()
  @IsString()
  public firstName: string;

  @ApiProperty({
    type: 'string',
    description: 'User last name',
  })
  @IsNotEmpty()
  @IsString()
  public lastName: string;

  @ApiProperty({
    type: 'string',
    format: 'date',
    description: 'User birth date',
    required: false,
  })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  public birthDate?: string;

  @ApiProperty({
    type: 'string',
    description: 'User phone number',
    required: false,
  })
  @IsOptional()
  @IsPhoneNumber()
  public phoneNumber?: string;
}
