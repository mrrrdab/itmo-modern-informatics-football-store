import { Injectable, NotFoundException } from '@nestjs/common';

import { Prisma, OrderItem } from '@prisma/client';
import { PrismaService } from '@/database/prisma';

import { OrderItemCreateDTO } from './dto';

@Injectable()
export class OrderItemService {
  constructor(private readonly prismaService: PrismaService) {}

  public async getByUniqueParams(uniqueParams: Prisma.OrderItemFindUniqueArgs): Promise<OrderItem> {
    const orderItem = await this.prismaService.orderItem.findUnique(uniqueParams);

    if (!orderItem) {
      throw new NotFoundException('Order Item Not Found');
    }

    return orderItem;
  }

  public async create(cartId: string, orderItemCreateData: OrderItemCreateDTO): Promise<OrderItem> {
    const newOrderItem = await this.prismaService.orderItem.create({
      data: {
        ...orderItemCreateData,
        cartId: cartId
      }
    });

    return newOrderItem;
  }

  public async update(orderItemUpdateData: Prisma.OrderItemUpdateArgs): Promise<OrderItem> {
    const updatedOrderItem = await this.prismaService.orderItem.update(orderItemUpdateData);
    return updatedOrderItem;
  }
}
