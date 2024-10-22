import {
  IsNotEmpty,
  IsUUID,
  IsString
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

class AdminCreateDTO {
  @ApiProperty({
    type: 'string',
    description: "id пользователя"
  })
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  public userId: string;
}
export default AdminCreateDTO;
