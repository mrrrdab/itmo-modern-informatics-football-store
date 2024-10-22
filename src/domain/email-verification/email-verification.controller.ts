import { Controller, Get, Param, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import EmailVerifService from './email-verification.service';
import AuthGuard from '../auth/guards/auth.guard';
import RoleGuard from '../auth/guards/role.guard';
import UseRole from '@/utils/decorators/role.decorator';

@ApiTags('emailVerification')
@Controller('emailVerification')
@UseGuards(AuthGuard, RoleGuard)
@UseRole(Role.ADMINISTRATOR)
class EmailVerifController {
  constructor(private readonly emailVerifService: EmailVerifService) {}

  @ApiOperation({ summary: "Получить все записи о верификации" })
  @ApiResponse({ status: 200, description: 'Список всех верификаций' })
  @ApiResponse({ status: 401, description: 'Пользователь не авторизирован в системе' })
  @ApiResponse({ status: 403, description: 'Пользователь не авторизирован в системе как администратор' })
  @ApiResponse({ status: 500, description: 'Внутренняя ошибка сервера' })
  @Get()
  public async getAll(@Res() res: Response): Promise<void> {
    const emailVerifications = await this.emailVerifService.getMany({});
    res.status(200).json(emailVerifications);
  }

  @ApiOperation({ summary: "Получить запись о верификации по ее id" })
  @ApiParam({
    name: 'emailVerifId',
    type: 'string',
    format: 'uuid',
    required: true,
    description: "id верификации"
  })
  @ApiResponse({ status: 200, description: 'Детали верификации' })
  @ApiResponse({ status: 401, description: 'Пользователь не авторизирован в системе' })
  @ApiResponse({ status: 403, description: 'Пользователь не авторизирован в системе как администратор' })
  @ApiResponse({ status: 404, description: 'Верификация не найдена' })
  @ApiResponse({ status: 500, description: 'Внутренняя ошибка сервера' })
  @Get(':emailVerifId')
  public async getUniqueById(@Param('emailVerifId') emailVerifId: string, @Res() res: Response): Promise<void> {
    const emailVerification = await this.emailVerifService.getByUniqueParams({
      where: {
        id: emailVerifId
      }
    });

    res.status(200).json(emailVerification);
  }
}
export default EmailVerifController;
