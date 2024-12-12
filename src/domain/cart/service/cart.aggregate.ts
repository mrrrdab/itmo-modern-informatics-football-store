import { Injectable } from '@nestjs/common';
import { PrismaClient, Cart, OrderItem } from '@prisma/client';
import { ITXClientDenyList } from '@prisma/client/runtime/library';

import { PrismaService } from '@/database/prisma';
import { OrderItemCreateDTO, OrderItemUpdateDTO } from '@/domain/order-item';
import { OrderItemRelations } from '@/domain/order-item/types/order-item.relations.type';

@Injectable()
export class CartAggregate {
  constructor(private readonly prismaService: PrismaService) {}

  public async applyAddItemToCartTransaction(cart: Cart, orderItemCreateData: OrderItemCreateDTO): Promise<void> {
    await this.prismaService.$transaction(async (prisma: Omit<PrismaClient, ITXClientDenyList>) => {
      const orderItem = (await prisma.orderItem.create({
        data: {
          ...orderItemCreateData,
          cartId: cart.id,
        },
        include: {
          product: true,
        },
      })) as OrderItemRelations;

      if (!orderItem.product) {
        throw new Error('Order item must contain product');
      }

      await prisma.cart.update({
        where: {
          id: cart.id,
        },
        data: {
          total: Number(cart.total) + Number(orderItem.product.price),
          quantity: cart.quantity + orderItem.quantity,
        },
      });
    });
  }

  public async applyUpdateItemInCartTransaction(
    cart: Cart,
    orderItem: OrderItem,
    orderItemUpdateData: OrderItemUpdateDTO,
  ): Promise<void> {
    await this.prismaService.$transaction(async (prisma: Omit<PrismaClient, ITXClientDenyList>) => {
      const updatedOrderItem = (await prisma.orderItem.update({
        where: {
          id: orderItem.id,
        },
        data: orderItemUpdateData,
        include: {
          product: true,
        },
      })) as OrderItemRelations;

      if (!updatedOrderItem.product) {
        throw new Error('Order item must contain product');
      }

      const oldPrice: number = Number(updatedOrderItem.product.price) * orderItem.quantity;
      const newPrice: number = Number(updatedOrderItem.product.price) * updatedOrderItem.quantity;

      const quantityDiff: number = Math.abs(orderItem.quantity - updatedOrderItem.quantity);
      const priceDiff: number = Math.abs(newPrice - oldPrice);

      let newCartQunatity: number = cart.quantity;
      let newCartTotal: number = Number(cart.total);

      if (orderItem.quantity > updatedOrderItem.quantity) {
        newCartQunatity = cart.quantity - quantityDiff;
        newCartTotal = Number(cart.total) - priceDiff;
      } else if (orderItem.quantity < updatedOrderItem.quantity) {
        newCartQunatity = cart.quantity + quantityDiff;
        newCartTotal = Number(cart.total) + priceDiff;
      }

      await prisma.cart.update({
        where: {
          id: cart.id,
        },
        data: {
          total: newCartTotal,
          quantity: newCartQunatity,
        },
      });
    });
  }

  public async applyRemoveItemFromCartTransaction(orderItem: OrderItem, cart: Cart): Promise<void> {
    await this.prismaService.$transaction(async (prisma: Omit<PrismaClient, ITXClientDenyList>) => {
      const deletedOrderItem = (await this.prismaService.orderItem.delete({
        where: {
          id: orderItem.id,
        },
        include: {
          product: true,
        },
      })) as OrderItemRelations;

      if (!deletedOrderItem.product) {
        throw new Error('Order item must contain product');
      }

      await this.prismaService.cart.update({
        where: {
          id: cart.id,
        },
        data: {
          total: Number(cart.total) - Number(deletedOrderItem.product.price) * orderItem.quantity,
          quantity: cart.quantity - orderItem.quantity,
        },
      });
    });
  }
}
