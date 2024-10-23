import { Injectable, NotFoundException } from '@nestjs/common';
import { Moderator } from '@prisma/client';

import { PrismaService } from '@/database/prisma';

import { CreateProductDTO, UpdateProductDTO } from './dto';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.product.findMany();
  }

  async findOne(id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  async create(moderator: Moderator, createProductDTO: CreateProductDTO) {
    return await this.prisma.product.create({
      data: {
        ...createProductDTO,
        moderatorId: moderator.id,
      },
    });
  }

  async update(id: string, updateProductDTO: UpdateProductDTO) {
    const existingProduct = await this.prisma.product.findUnique({
      where: { id },
    });

    if (!existingProduct) {
      throw new NotFoundException('Product with not found');
    }

    return await this.prisma.product.update({
      where: { id },
      data: updateProductDTO,
    });
  }

  async delete(id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return await this.prisma.product.delete({
      where: { id },
    });
  }
}
