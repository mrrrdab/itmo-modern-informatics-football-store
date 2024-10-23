import { Controller, Get, Param, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { Role } from '@prisma/client';

import { AuthGuard, RoleGuard } from '@/domain/auth/guards';
import { UseRole } from '@/utils';

import { CustomerService } from './customer.service';

@ApiTags('Customers')
@Controller('api/customers')
@UseGuards(AuthGuard)
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @ApiOperation({ summary: 'Get all Customers' })
  @ApiResponse({ status: 200, description: 'Successful Response' })
  @ApiResponse({ status: 401, description: 'Not Authorized' })
  @ApiResponse({ status: 403, description: 'Not Authorized as Administrator' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @UseGuards(RoleGuard)
  @UseRole(Role.ADMINISTRATOR)
  @Get()
  public async getAll(@Res() res: Response): Promise<void> {
    const customers = await this.customerService.getMany({});
    res.status(200).json(customers);
  }

  @ApiOperation({ summary: 'Get Customer by Id' })
  @ApiResponse({ status: 200, description: 'Successful Response' })
  @ApiResponse({ status: 401, description: 'Not Authorized' })
  @ApiResponse({ status: 403, description: 'Not Authorized as Administrator' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiParam({
    name: 'customerId',
    type: 'string',
    format: 'uuid',
    required: true,
    description: 'User id',
  })
  @UseGuards(RoleGuard)
  @UseRole(Role.ADMINISTRATOR)
  @Get(':customerId')
  public async getUniqueById(@Param('customerId') customerId: string, @Res() res: Response): Promise<void> {
    const customer = await this.customerService.getByUniqueParams({
      where: {
        id: customerId,
      },
    });

    res.status(200).json(customer);
  }
}
