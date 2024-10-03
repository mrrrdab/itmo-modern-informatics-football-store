import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/prisma.service';

import { CreateOrderItemDTO, UpdateOrderItemDTO } from './dto';

@Injectable()
export class OrderItemService {
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
