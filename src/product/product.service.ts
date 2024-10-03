import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/prisma.service';

import { CreateProductDTO, UpdateProductDTO } from './dto';

@Injectable()
export class ProductService {
  constructor(private readonly prismaService: PrismaService) {}

  findAll() {
    return;
  }

  findOne(id: number) {
    return;
  }

  create(createProductDTO: CreateProductDTO) {
    return;
  }

  update(id: number, updateProductDTO: UpdateProductDTO) {
    return;
  }

  remove(id: number) {
    return;
  }
}
