import { Injectable } from '@nestjs/common';
import { CreateOrderItemDTO, UpdateOrderItemDTO } from './dto';
import PrismaService from '@/database/prisma/prisma.service';

@Injectable()
class OrderItemService {
  constructor(private readonly prismaService: PrismaService) {}

  findAll() {
    return;
  }

  findOne(id: number) {
    return;
  }

  create(createOrderItemDTO: CreateOrderItemDTO) {
    return;
  }

  update(id: number, updateOrderItemDTO: UpdateOrderItemDTO) {
    return;
  }

  remove(id: number) {
    return;
  }
}
export default OrderItemService;
