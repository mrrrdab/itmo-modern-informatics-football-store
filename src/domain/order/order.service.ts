import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/database/prisma';

import { CreateOrderDTO, UpdateOrderDTO } from './dto';

@Injectable()
export class OrderService {
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
