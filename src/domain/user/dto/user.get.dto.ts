import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';

export class UserGetDTO {
  @ApiProperty({
    type: 'string',
    description: 'User id',
  })
  public id: string;

  @ApiProperty({
    type: 'string',
    description: 'User email',
  })
  public email: string;

  @ApiProperty({
    type: 'string',
    description: 'User password',
  })
  public password: string;

  @ApiProperty({
    enum: Role,
    description: 'User role',
  })
  public role: Role;

  @ApiProperty({
    type: 'boolean',
    description: 'User verification status',
  })
  public isVerified?: boolean;

  @ApiProperty({
    type: Date,
    description: 'User created at date',
  })
  public createdAt?: Date;

  @ApiProperty({
    type: Date,
    description: 'User updated at date',
  })
  public updatedAt?: Date;
}
