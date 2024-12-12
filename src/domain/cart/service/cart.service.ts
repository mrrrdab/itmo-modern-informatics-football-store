import { Injectable, NotFoundException } from '@nestjs/common';

import { Prisma, Cart } from '@prisma/client';
import { PrismaService } from '@/database/prisma';

import { UpdateCartDTO } from '../dto';

@Injectable()
export class CartService {
  constructor(private readonly prismaService: PrismaService) {}

  public async findAll() {
    return;
  }

  public async getByUniqueParams(uniqueParams: Prisma.CartFindUniqueArgs): Promise<Cart> {
    const cart = await this.prismaService.cart.findUnique(uniqueParams);

    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    return cart;
  }

  public async update(cartUpdateData: Prisma.CartUpdateArgs): Promise<Cart> {
    const updatedCart = await this.prismaService.cart.update(cartUpdateData);
    return updatedCart;
  }
}
