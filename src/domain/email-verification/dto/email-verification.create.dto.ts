import { IsNotEmpty, IsUUID, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class EmailVerifCreateDTO {
  @ApiProperty({
    type: 'string',
    description: 'User verification token',
  })
  @IsNotEmpty()
  @IsString()
  public verifToken: string;

  @ApiProperty({
    type: 'string',
    description: 'User id',
  })
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  public userId: string;
}
