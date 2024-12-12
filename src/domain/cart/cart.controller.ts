import { Controller, Get, Post, Patch, Delete, Param, Body, Req, Res, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiBody, ApiResponse } from '@nestjs/swagger';
import { Request, Response } from 'express';

import { Role, ClothingSize } from '@prisma/client';

import { UseRole } from '@/utils';

import { AuthGuard } from '../auth/guards/auth.guard';
import { RoleGuard } from '../auth/guards/role.guard';

import { IUserPayload } from '../user';
import { CustomerService } from '../user/entity/customer/customer.service';

import { CartService } from './service/cart.service';
import { CartFilter } from './service/cart.filter';
import { CartAggregate } from './service/cart.aggregate';

import { OrderItemService, OrderItemCreateDTO, OrderItemUpdateDTO } from '../order-item';

@ApiTags('Carts')
@Controller('api/carts')
@UseGuards(AuthGuard, RoleGuard)
@UseRole(Role.CUSTOMER)
export class CartController {
  constructor(
    private readonly cartService: CartService,
    private readonly cartFilter: CartFilter,
    private readonly cartAggregate: CartAggregate,
    private readonly customerService: CustomerService,
    private readonly orderItemService: OrderItemService
  ) { }

  @ApiOperation({ summary: 'Get current user cart' })
  @ApiResponse({ status: 200, description: 'User cart' })
  @ApiResponse({ status: 401, description: 'Not Authorized' })
  @ApiResponse({ status: 403, description: 'Not Authorized as Customer' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @Get('me')
  public async getUnique(@Req() req: Request, @Res() res: Response): Promise<Response | void> {
    const user = req.user as IUserPayload;
    const customer = await this.customerService.getByUniqueParams({
      where: {
        userId: user.id
      }
    });

    const cart = await this.cartFilter.querySQLFilter(customer.id);
    res.status(200).json(cart);
  }

  @ApiOperation({ summary: 'Add product to cart' })
  @ApiBody({
    type: OrderItemCreateDTO,
    examples: {
      'Moderator - Cart - OrderItem': {
        value: {
          productId: '8e6b1e5a-333f-480f-8012-29b3f39ae340',
          size: ClothingSize.SIZE_L
        }
      }
    }
  })
  @ApiResponse({ status: 200, description: 'Item Successfully Added' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Not Authorized' })
  @ApiResponse({ status: 403, description: 'Not Authorized as Customer' })
  @ApiResponse({ status: 404, description: 'Product Not Found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @Post('me/items')
  public async addItem(
    @Req() req: Request,
    @Body() orderItemCreateData: OrderItemCreateDTO,
    @Res() res: Response
  ): Promise<Response | void> {
    const user = req.user as IUserPayload;
    const customer = await this.customerService.getByUniqueParams({
      where: {
        userId: user.id
      }
    });

    const cart = await this.cartService.getByUniqueParams({
      where: {
        customerId: customer.id
      }
    });

    await this.cartAggregate.applyAddItemToCartTransaction(cart, orderItemCreateData);
    res.status(200).send("Item successfully added to cart");
  }

  @ApiOperation({ summary: 'Update cart product' })
  @ApiParam({
    name: 'orderItemId',
    type: 'string',
    format: 'uuid',
    description: 'Order item id',
    required: true
  })
  @ApiBody({
    type: OrderItemUpdateDTO,
    examples: {
      'Moderator - Cart - OrderItem': {
        value: {
          quantity: 3
        }
      }
    }
  })
  @ApiResponse({ status: 200, description: 'Item Successfully Updated' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Not Authorized' })
  @ApiResponse({ status: 403, description: 'Not Authorized as Customer' })
  @ApiResponse({ status: 404, description: 'Order Item Not Found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @Patch('me/items/:orderItemId')
  public async updateItem(
    @Req() req: Request,
    @Param('orderItemId') orderItemId: string,
    @Body() orderItemUpdateData: OrderItemUpdateDTO,
    @Res() res: Response
  ): Promise<Response | void> {
    const user = req.user as IUserPayload;
    const customer = await this.customerService.getByUniqueParams({
      where: {
        userId: user.id
      }
    });

    const cart = await this.cartService.getByUniqueParams({
      where: {
        customerId: customer.id
      }
    });

    const orderItem = await this.orderItemService.getByUniqueParams({
      where: {
        id: orderItemId,
        cartId: cart.id
      }
    });

    await this.cartAggregate.applyUpdateItemInCartTransaction(cart, orderItem, orderItemUpdateData);
    res.status(200).send("Item successfully updated");
  }

  @ApiOperation({ summary: 'Remove product from cart' })
  @ApiParam({
    name: 'orderItemId',
    type: 'string',
    format: 'uuid',
    description: 'Order item id',
    required: true
  })
  @ApiResponse({ status: 200, description: 'Item Successfully Removed' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Not Authorized' })
  @ApiResponse({ status: 403, description: 'Not Authorized as Customer' })
  @ApiResponse({ status: 404, description: 'Order Item Not Found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @Delete('me/items/:orderItemId')
  public async removeItem(
    @Req() req: Request,
    @Param('orderItemId') orderItemId: string,
    @Res() res: Response
  ): Promise<Response | void> {
    const user = req.user as IUserPayload;
    const customer = await this.customerService.getByUniqueParams({
      where: {
        userId: user.id
      }
    });

    const cart = await this.cartService.getByUniqueParams({
      where: {
        customerId: customer.id
      }
    });

    const orderItem = await this.orderItemService.getByUniqueParams({
      where: {
        id: orderItemId,
        cartId: cart.id
      }
    });

    await this.cartAggregate.applyRemoveItemFromCartTransaction(orderItem, cart);
    res.status(200).json("Item successfully deleted");
  }
}
