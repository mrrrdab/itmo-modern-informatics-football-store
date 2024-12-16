import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, Product } from '@prisma/client';

import { PrismaService } from '@/database/prisma';

@Injectable()
export class ProductService {
  constructor(private readonly prismaService: PrismaService) {}

  public async getAll(filterOptions: Prisma.ProductFindManyArgs): Promise<Product[]> {
    const products = await this.prismaService.product.findMany(filterOptions);
    return products;
  }

  public async findByUniqueParams(uniqueParams: Prisma.ProductFindUniqueArgs): Promise<Product> {
    const product = await this.prismaService.product.findUnique(uniqueParams);
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  public async create(productCreateData: Prisma.ProductCreateArgs): Promise<Product> {
    const newProduct = await this.prismaService.product.create(productCreateData);
    return newProduct;
  }

  public async update(productUpdateData: Prisma.ProductUpdateArgs): Promise<Product> {
    const updatedProduct = await this.prismaService.product.update(productUpdateData);
    return updatedProduct;
  }
}
