import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';

import { OrderService } from './order.service';
import { CreateOrderDTO, UpdateOrderDTO } from './dto';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  findAll() {
    return this.orderService.findAll();
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
