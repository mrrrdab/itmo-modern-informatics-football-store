import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/database/prisma';

import { CreateCartDTO, UpdateCartDTO } from './dto';

@Injectable()
export class CartService {
  constructor(private readonly prismaService: PrismaService) {}

  findAll() {
    return;
  }

  findOne(id: number) {
    return;
  }

  create(createCartDTO: CreateCartDTO) {
    return;
  }

  update(id: number, updateCartDTO: UpdateCartDTO) {
    return;
  }

  remove(id: number) {
    return;
  }
}
