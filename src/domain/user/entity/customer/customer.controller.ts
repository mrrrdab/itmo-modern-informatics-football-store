import { Controller, Get, Param, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import CustomerService from './customer.service';
import AuthGuard from '../../../auth/guards/auth.guard';
import RoleGuard from '@/domain/auth/guards/role.guard';
import UseRole from '@/utils/decorators/role.decorator';

@ApiTags('customers')
@Controller('customers')
@UseGuards(AuthGuard)
class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @ApiOperation({ summary: "Получить всех покупателей" })
  @ApiResponse({ status: 200, description: 'Список всех покупателей' })
  @ApiResponse({ status: 401, description: 'Пользователь не авторизирован в системе' })
  @ApiResponse({ status: 403, description: 'Пользователь не авторизирован в системе как администратор' })
  @ApiResponse({ status: 500, description: 'Внутренняя ошибка сервера' })
  @UseGuards(RoleGuard)
  @UseRole(Role.ADMINISTRATOR)
  @Get()
  public async getAll(@Res() res: Response): Promise<void> {
    const customers = await this.customerService.getMany({});
    res.status(200).json(customers);
  }

  @ApiOperation({ summary: "Получить покупателя по его id" })
  @ApiResponse({ status: 200, description: 'Детали покупателя' })
  @ApiResponse({ status: 401, description: 'Пользователь не авторизирован в системе' })
  @ApiResponse({ status: 403, description: 'Пользователь не авторизирован в системе как администратор' })
  @ApiResponse({ status: 404, description: 'Покупатель не найден' })
  @ApiResponse({ status: 500, description: 'Внутренняя ошибка сервера' })
  @ApiParam({
    name: 'customerId',
    type: 'string',
    format: 'uuid',
    required: true,
    description: "id покупателя"
  })
  @UseGuards(RoleGuard)
  @UseRole(Role.ADMINISTRATOR)
  @Get(':customerId')
  public async getUniqueById(@Param('customerId') customerId: string, @Res() res: Response): Promise<void> {
    const customer = await this.customerService.getByUniqueParams({
      where: {
        id: customerId
      }
    });

    res.status(200).json(customer);
  }
}
export default CustomerController;
