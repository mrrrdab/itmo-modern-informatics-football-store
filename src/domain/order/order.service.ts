import { Injectable } from '@nestjs/common';
import { CreateOrderDTO, UpdateOrderDTO } from './dto';
import PrismaService from '@/database/prisma/prisma.service';

@Injectable()
class OrderService {
  constructor(private readonly prismaService: PrismaService) {}

  findAll() {
    return;
  }

  findOne(id: number) {
    return;
  }

  create(createOrderDTO: CreateOrderDTO) {
    return;
  }

  update(id: number, updateOrderDTO: UpdateOrderDTO) {
    return;
  }

  remove(id: number) {
    return;
  }
}
export default OrderService;
