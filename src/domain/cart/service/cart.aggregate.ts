import { Injectable } from '@nestjs/common';
import { PrismaClient, Cart, OrderItem } from '@prisma/client';
import { ITXClientDenyList } from '@prisma/client/runtime/library';

import { PrismaService } from '@/database/prisma';
import { OrderItemCreateDTO, OrderItemUpdateDTO } from '@/domain/order-item';
import { OrderItemRelations } from '@/domain/order-item/types/order-item.relations.type';

import { ICartQuantity } from '../types';

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
    transactionData: ICartQuantity,
    orderItemUpdateData: OrderItemUpdateDTO,
  ): Promise<void> {
    await this.prismaService.$transaction(async (prisma: Omit<PrismaClient, ITXClientDenyList>) => {
      const updatedOrderItem = await prisma.orderItem.update({
        where: {
          id: transactionData.orderItemId,
        },
        data: orderItemUpdateData,
      });

      const oldPrice: number = Number(transactionData.productPrice) * transactionData.orderItemQuantity;
      const newPrice: number = Number(transactionData.productPrice) * updatedOrderItem.quantity;

      const quantityDiff: number = Math.abs(transactionData.orderItemQuantity - updatedOrderItem.quantity);
      const priceDiff: number = Math.abs(newPrice - oldPrice);

      let newCartQunatity: number = transactionData.cartQuantity;
      let newCartTotal: number = Number(transactionData.cartTotal);

      if (transactionData.orderItemQuantity > updatedOrderItem.quantity) {
        newCartQunatity = transactionData.cartQuantity - quantityDiff;
        newCartTotal = Number(transactionData.cartTotal) - priceDiff;
      } else if (transactionData.orderItemQuantity < updatedOrderItem.quantity) {
        newCartQunatity = transactionData.cartQuantity + quantityDiff;
        newCartTotal = Number(transactionData.cartTotal) + priceDiff;
      }

      await prisma.cart.update({
        where: {
          id: transactionData.cartId,
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
