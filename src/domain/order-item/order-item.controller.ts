import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { CreateOrderItemDTO, UpdateOrderItemDTO } from './dto';
import OrderItemService from './order-item.service';
import AuthGuard from '../auth/guards/auth.guard';
import RoleGuard from '../auth/guards/role.guard';
import UseRole from '@/utils/decorators/role.decorator';

@ApiTags('order-items')
@Controller('order-items')
@UseGuards(AuthGuard, RoleGuard)
@UseRole(Role.CUSTOMER)
class OrderItemController {
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
export default OrderItemController;
