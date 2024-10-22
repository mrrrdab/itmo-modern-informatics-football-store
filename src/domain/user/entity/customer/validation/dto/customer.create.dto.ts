import {
  IsNotEmpty,
  IsOptional,
  IsUUID,
  IsDate,
  IsString,
  IsPhoneNumber
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

class CustomerCreateDTO {
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

  @ApiProperty({
    type: 'string',
    description: "id пользователя"
  })
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  public userId: string;
}
export default CustomerCreateDTO;
