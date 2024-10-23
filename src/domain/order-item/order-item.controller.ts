import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Role } from '@prisma/client';

import { UseRole } from '@/utils';

import { AuthGuard, RoleGuard } from '../auth';

import { OrderItemService } from './order-item.service';
import { CreateOrderItemDTO, UpdateOrderItemDTO } from './dto';

@ApiTags('Order Items')
@Controller('api/order-items')
@UseGuards(AuthGuard, RoleGuard)
@UseRole(Role.CUSTOMER)
export class OrderItemController {
  constructor(private readonly orderItemService: OrderItemService) {}

  @Get()
  findAll() {
    return this.orderItemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderItemService.findOne(+id);
  }

  @Post()
  create(@Body() createOrderItemDTO: CreateOrderItemDTO) {
    return this.orderItemService.create(createOrderItemDTO);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderItemDTO: UpdateOrderItemDTO) {
    return this.orderItemService.update(+id, updateOrderItemDTO);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderItemService.remove(+id);
  }
}
