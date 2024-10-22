import {
  IsNotEmpty,
  IsUUID,
  IsString
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

class ModeratorCreateDTO {
  @ApiProperty({
    type: 'string',
    description: "id пользователя"
  })
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  public userId: string;

  @ApiProperty({
    type: 'string',
    description: "id администратора"
  })
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  public administratorId: string;
}
export default ModeratorCreateDTO;
