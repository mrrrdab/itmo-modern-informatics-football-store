import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateOrderItemDTO, UpdateOrderItemDTO } from './dto';
import OrderItemService from './order-item.service';

@Controller('order-items')
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