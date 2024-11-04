import { Controller, Get, Post, Res, Req, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { Role } from '@prisma/client';

import { UseRole } from '@/utils';

import { AuthGuard, RoleGuard } from '../auth';

import { OrderService } from './order.service';
import { CreateOrderDTO, UpdateOrderDTO } from './dto';

@ApiTags('Orders')
@Controller('api/orders')
@UseGuards(AuthGuard, RoleGuard)
@UseRole(Role.CUSTOMER)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  findAll(@Res() res: Response) {
    res.status(200).send({});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }

  @Post()
  create(@Body() createOrderDTO: CreateOrderDTO) {
    return this.orderService.create(createOrderDTO);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDTO: UpdateOrderDTO) {
    return this.orderService.update(+id, updateOrderDTO);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}
