import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '@/database/prisma';

import { CreateProductDTO, UpdateProductDTO } from './dto';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.product.findMany();
  }

  async findOne(id: string) {
    try {
      const product = await this.prisma.product.findUnique({
        where: { id },
      });

      if (!product) {
        throw new NotFoundException('Product with not found');
      }

      return product;
    } catch (e) {
      throw new BadRequestException('Invalid Parameter');
    }
  }

  async create(createProductDTO: CreateProductDTO) {
    return await this.prisma.product.create({
      data: createProductDTO,
    });
  }

  async update(id: string, updateProductDTO: UpdateProductDTO) {
    try {
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
    } catch (e) {
      throw new BadRequestException('Invalid Parameter');
    }
  }

  async delete(id: string) {
    try {
      const product = await this.prisma.product.findUnique({
        where: { id },
      });

      if (!product) {
        throw new NotFoundException(`Product with ID ${id} not found`);
      }

      return await this.prisma.product.delete({
        where: { id },
      });
    } catch (e) {
      throw new BadRequestException('Invalid Parameter');
    }
  }
}
