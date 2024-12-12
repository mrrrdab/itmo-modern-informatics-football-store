import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ITXClientDenyList } from '@prisma/client/runtime/library';

import { PrismaService } from '@/database/prisma';

import { OrderCreateDTO } from '../dto';

@Injectable()
export class OrderAggregate {
  constructor(private readonly prismaService: PrismaService) {}

  public async applyCreateOrderTransaction(cartId: string, orderCreateData: OrderCreateDTO): Promise<void> {
    await this.prismaService.$transaction(async (prisma: Omit<PrismaClient, ITXClientDenyList>) => {
      const order = await prisma.order.create({
        data: orderCreateData,
      });

      await prisma.cart.update({
        where: {
          id: cartId,
        },
        data: {
          total: 0,
          quantity: 0,
        },
      });

      await prisma.orderItem.updateMany({
        where: {
          cartId: cartId,
        },
        data: {
          cartId: null,
          orderId: order.id,
        },
      });
    });
  }
}
