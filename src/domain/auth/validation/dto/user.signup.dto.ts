import {
  IsNotEmpty,
  IsOptional,
  IsDate,
  IsString,
  IsEmail,
  IsPhoneNumber,
  Matches
} from 'class-validator';
import { Type } from 'class-transformer';
import { IsEqual } from '@/utils/decorators/match.decorator';
import { ApiProperty } from '@nestjs/swagger';
import { userCreateConfig } from '@/domain/user/validation/config/user.create.config';

class UserSignupDTO {
  @ApiProperty({
    type: 'string',
    description: "Почта покупателя"
  })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  public email: string;

  @ApiProperty({
    type: 'string',
    description: "Пароль покупателя"
  })
  @IsNotEmpty()
  @IsString()
  @Matches(userCreateConfig.passwordRule, {
    message: userCreateConfig.passwordMessage
  })
  public password: string;

  @ApiProperty({
    type: 'string',
    description: "Подтверждение пароля"
  })
  @IsNotEmpty()
  @IsString()
  @IsEqual('password')
  public confirmPassword: string;

  @ApiProperty({
    type: 'string',
    description: "Имя покупателя"
  })
  @IsNotEmpty()
  @IsString()
  public firstName: string;

  @ApiProperty({
    type: 'string',
    description: "Фамилия покупателя"
  })
  @IsNotEmpty()
  @IsString()
  public lastName: string;

  @ApiProperty({
    type: 'string',
    format: 'date',
    description: "День рождения покупателя",
    required: false
  })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  public birthDate?: string;

  @ApiProperty({
    type: 'string',
    description: "Номер телефона покупателя",
    required: false
  })
  @IsOptional()
  @IsPhoneNumber()
  public phoneNumber?: string;
}
export default UserSignupDTO;
