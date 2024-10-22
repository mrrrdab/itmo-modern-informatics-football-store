import { Controller, Post, Get, Param, Body, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { Role } from '@prisma/client';
import { ApiTags, ApiOperation, ApiParam, ApiBody, ApiResponse } from '@nestjs/swagger';
import UserService from './user.service';
import UserCreateDTO from './validation/dto/user.create.dto';
import AuthGuard from '../auth/guards/auth.guard';
import RoleGuard from '../auth/guards/role.guard';
import UseRole from '@/utils/decorators/role.decorator';

@ApiTags('users')
@Controller('users')
@UseGuards(AuthGuard, RoleGuard)
@UseRole(Role.ADMINISTRATOR)
class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: "Получить всех пользователей" })
  @ApiResponse({ status: 200, description: 'Список всех пользователей' })
  @ApiResponse({ status: 401, description: 'Пользователь не авторизирован в системе' })
  @ApiResponse({ status: 403, description: 'Пользователь не авторизирован в системе как администратор' })
  @ApiResponse({ status: 500, description: 'Внутренняя ошибка сервера' })
  @Get()
  public async getAll(@Res() res: Response): Promise<void> {
    const users = await this.userService.getMany({});
    res.status(200).json(users);
  }

  @ApiOperation({ summary: "Получить пользователя по его id" })
  @ApiParam({
    name: 'userId',
    required: true,
    description: "id пользователя"
  })
  @ApiResponse({ status: 200, description: 'Детали пользователя' })
  @ApiResponse({ status: 401, description: 'Пользователь не авторизирован в системе' })
  @ApiResponse({ status: 403, description: 'Пользователь не авторизирован в системе как администратор' })
  @ApiResponse({ status: 404, description: 'Пользователь не найден' })
  @ApiResponse({ status: 500, description: 'Внутренняя ошибка сервера' })
  @Get(':userId')
  public async getUniqueById(@Param('userId') userId: string, @Res() res: Response): Promise<void> {
    const user = await this.userService.getByUniqueParams({
      where: {
        id: userId
      }
    });

    res.status(200).json(user);
  }

  @ApiOperation({ summary: "Зарегистрировать пользователя" })
  @ApiResponse({ status: 200, description: 'Пользователь успешно зарегистрирован' })
  @ApiResponse({ status: 401, description: 'Пользователь не авторизирован в системе' })
  @ApiResponse({ status: 403, description: 'Пользователь не авторизирован в системе как администратор' })
  @ApiResponse({ status: 500, description: 'Внутренняя ошибка сервера' })
  @ApiBody({
    type: UserCreateDTO,
    examples: {
      "User - Moderator": {
        value: {
          email: "st1035@mail.ru",
          password: 'lejklgHKJS9018!?',
          role: 'MODERATOR'
        }
      }
    }
  })
  @Post()
  public async create(
    @Body() userCreateData: UserCreateDTO,
    @Res() res: Response
  ): Promise<Response | void> {
    if (userCreateData.role !== Role.MODERATOR) {
      return res.status(400).send("Вы можете зарегистрировать только модератора");
    }

    userCreateData.isVerified = true;
    const newUser = await this.userService.create(userCreateData);

    res.status(200).json({
      data: newUser,
      message: "Пользователь успешно зарегистрирован"
    });
  }
}
export default UserController;
