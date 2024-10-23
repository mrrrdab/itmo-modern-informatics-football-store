import { Controller, Post, Get, Param, Body, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { Role } from '@prisma/client';
import { ApiTags, ApiOperation, ApiParam, ApiBody, ApiResponse } from '@nestjs/swagger';

import { UseRole } from '@/utils';

import { AuthGuard, RoleGuard } from '../auth/guards';

import { UserService } from './user.service';
import { UserCreateDTO, UserGetDTO } from './dto';

@ApiTags('Users')
@Controller('api/users')
@UseGuards(AuthGuard, RoleGuard)
@UseRole(Role.ADMINISTRATOR)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Get all Users' })
  @ApiResponse({ status: 200, description: 'Successful Response', type: [UserGetDTO] })
  @ApiResponse({ status: 401, description: 'Not Authorized' })
  @ApiResponse({ status: 403, description: 'Not Authorized as Administrator' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @Get()
  public async getAll(@Res() res: Response): Promise<UserGetDTO[]> {
    const users = await this.userService.getMany({});
    return users;
  }

  @ApiOperation({ summary: 'Get User by Id' })
  @ApiParam({
    name: 'userId',
    required: true,
    description: 'User id',
  })
  @ApiResponse({ status: 200, description: 'User Details', type: UserGetDTO })
  @ApiResponse({ status: 401, description: 'Not Authorized' })
  @ApiResponse({ status: 403, description: 'Not Authorized as Administrator' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @Get(':userId')
  public async getUniqueById(@Param('userId') userId: string, @Res() res: Response): Promise<UserGetDTO> {
    const user = await this.userService.getByUniqueParams({
      where: {
        id: userId,
      },
    });

    return user;
  }

  @ApiOperation({ summary: 'Register User' })
  @ApiResponse({ status: 200, description: 'Successful Response' })
  @ApiResponse({ status: 401, description: 'Not Authorized' })
  @ApiResponse({ status: 403, description: 'Not Authorized as Administrator' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiBody({
    type: UserCreateDTO,
    examples: {
      'User - Moderator': {
        value: {
          email: 'st1035@mail.ru',
          password: 'lejklgHKJS9018!?',
          role: 'MODERATOR',
        },
      },
    },
  })
  @Post()
  public async create(@Body() userCreateData: UserCreateDTO, @Res() res: Response): Promise<Response | void> {
    if (userCreateData.role !== Role.MODERATOR) {
      return res.status(400).send('You can only register a moderator');
    }

    userCreateData.isVerified = true;
    const newUser = await this.userService.create(userCreateData);

    res.status(200).json({
      data: newUser,
      message: 'User registered successfully',
    });
  }
}
