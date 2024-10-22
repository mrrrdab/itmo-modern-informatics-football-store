import { Controller, Post, Get, Param, Body, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { Role } from '@prisma/client';
import { ApiTags, ApiOperation, ApiParam, ApiBody, ApiResponse } from '@nestjs/swagger';
import ModeratorService from './moderator.service';
import UserService from '../../user.service';
import AdminService from '../administrator/admin.service';
import ModeratorCreateDTO from './validation/dto/moderator.create.dto';
import AuthGuard from '@/domain/auth/guards/auth.guard';
import RoleGuard from '@/domain/auth/guards/role.guard';
import UseRole from '@/utils/decorators/role.decorator';

@ApiTags('moderators')
@Controller('moderators')
@UseGuards(AuthGuard, RoleGuard)
@UseRole(Role.ADMINISTRATOR)
class ModeratorController {
  constructor(
    private readonly moderatorService: ModeratorService,
    private readonly userService: UserService,
    private readonly adminService: AdminService
  ) {}

  @ApiOperation({ summary: "Получить всех модераторов" })
  @ApiResponse({ status: 200, description: 'Список всех модераторов' })
  @ApiResponse({ status: 401, description: 'Пользователь не авторизирован в системе' })
  @ApiResponse({ status: 403, description: 'Пользователь не авторизирован в системе как администратор' })
  @ApiResponse({ status: 500, description: 'Внутренняя ошибка сервера' })
  @Get()
  public async getAll(@Res() res: Response): Promise<void> {
    const moderators = await this.moderatorService.getMany({});
    res.status(200).json(moderators);
  }

  @ApiOperation({ summary: "Получить модератора по его id" })
  @ApiParam({
    name: 'moderatorId',
    type: 'string',
    format: 'uuid',
    required: true,
    description: "id модератора"
  })
  @ApiResponse({ status: 200, description: 'Детали модератора' })
  @ApiResponse({ status: 401, description: 'Пользователь не авторизирован в системе' })
  @ApiResponse({ status: 403, description: 'Пользователь не авторизирован в системе как администратор' })
  @ApiResponse({ status: 404, description: 'Модератор не найден' })
  @ApiResponse({ status: 500, description: 'Внутренняя ошибка сервера' })
  @Get(':moderatorId')
  public async getUniqueById(@Param('moderatorId') moderatorId: string, @Res() res: Response): Promise<void> {
    const moderator = await this.moderatorService.getByUniqueParams({
      where: {
        id: moderatorId
      }
    });

    res.status(200).json(moderator);
  }

  @ApiOperation({ summary: "Зарегистрировать модератора" })
  @ApiBody({
    type: ModeratorCreateDTO,
    examples: {
      "User - Moderator": {
        value: {
          userId: '43062bf6-ac66-4c37-8d39-bf212f62aec3',
          administratorId: '9a7e5c92-e0b1-4fda-a8c3-1f2d3c4e5f67'
        }
      }
    }
  })
  @ApiResponse({ status: 200, description: 'Модератор успешно зарегистрирован' })
  @ApiResponse({ status: 401, description: 'Пользователь не авторизирован в системе' })
  @ApiResponse({ status: 403, description: 'Пользователь не авторизирован в системе как администратор' })
  @ApiResponse({ status: 404, description: 'Пользователь или администратор не найден' })
  @ApiResponse({ status: 500, description: 'Внутренняя ошибка сервера' })
  @Post()
  public async create(
    @Body() moderatorCreateData: ModeratorCreateDTO,
    @Res() res: Response
  ): Promise<void> {
    await this.userService.getByUniqueParams({
      where: {
        id: moderatorCreateData.userId
      }
    });

    await this.adminService.getByUniqueParams({
      where: {
        id: moderatorCreateData.administratorId
      }
    });

    const newModerator = await this.moderatorService.create(moderatorCreateData);
    res.status(200).json({
      data: newModerator,
      message: "Модератор успешно зарегистрирован"
    });
  }
}
export default ModeratorController;
