import { ApiProperty } from '@nestjs/swagger';

export class CustomerGetDTO {
  @ApiProperty({
    type: 'string',
    description: 'Customer id',
  })
  public id: string;

  @ApiProperty({
    type: 'string',
    description: 'User first name',
  })
  public firstName: string;

  @ApiProperty({
    type: 'string',
    description: 'User last name',
  })
  public lastName: string;

  @ApiProperty({
    type: 'string',
    format: 'date',
    description: 'User birth date',
    required: false,
  })
  public birthDate: Date | null;

  @ApiProperty({
    type: 'string',
    description: 'User phone number',
    required: false,
  })
  public phoneNumber: string | null;

  @ApiProperty({
    type: 'string',
    description: 'User id',
  })
  public userId: string;
}
