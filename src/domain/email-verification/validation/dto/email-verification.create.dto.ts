import {
  IsNotEmpty,
  IsUUID,
  IsString
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

class EmailVerifCreateDTO {
  @ApiProperty({
    type: 'string',
    description: "Токен верификации пользователя"
  })
  @IsNotEmpty()
  @IsString()
  public verifToken: string;

  @ApiProperty({
    type: 'string',
    description: "id пользователя"
  })
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  public userId: string;
}
export default EmailVerifCreateDTO;
