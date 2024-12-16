import { Controller, Get, Post, Res, Req, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Role } from '@prisma/client';

import { UseRole } from '@/utils';

import { AuthGuard } from '../auth/guards/auth.guard';
import { RoleGuard } from '../auth/guards/role.guard';
import { IUserPayload } from '../user';
import { CustomerService } from '../user/entity/customer/customer.service';
import { CartRelations } from '../cart/types';
import { CartService } from '../cart';

import { OrderFilter } from './service/order.filter';
import { OrderAggregate } from './service/order.aggregate';

@ApiTags('Orders')
@Controller('api/orders')
@UseGuards(AuthGuard, RoleGuard)
@UseRole(Role.CUSTOMER)
export class OrderController {
  constructor(
    private readonly orderFilter: OrderFilter,
    private readonly orderAggregate: OrderAggregate,
    private readonly customerService: CustomerService,
    private readonly cartService: CartService,
  ) {}

  @ApiOperation({ summary: 'Get user orders' })
  @ApiResponse({ status: 200, description: 'User orders' })
  @ApiResponse({ status: 401, description: 'Not Authorized' })
  @ApiResponse({ status: 403, description: 'Not Authorized as Customer' })
  @ApiResponse({ status: 404, description: 'Orders Not Found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @Get('me')
  public async getAll(@Req() req: Request, @Res() res: Response): Promise<Response | void> {
    const user = req.user as IUserPayload;
    const customer = await this.customerService.getByUniqueParams({
      where: {
        userId: user.id,
      },
    });

    const orders = await this.orderFilter.querySQLFilter(customer.id);

    if (orders.length === 0) {
      return res.status(404).send('Orders were not found');
    }

    res.status(200).json(orders);
  }

  @ApiOperation({ summary: 'Create new user order' })
  @ApiResponse({ status: 200, description: 'Order Successfully Created' })
  @ApiResponse({ status: 401, description: 'Not Authorized' })
  @ApiResponse({ status: 403, description: 'Not Authorized as Customer' })
  @ApiResponse({ status: 404, description: 'Cart Items Not Found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @Post('me')
  public async create(@Req() req: Request, @Res() res: Response): Promise<Response | void> {
    const user = req.user as IUserPayload;
    const customer = await this.customerService.getByUniqueParams({
      where: {
        userId: user.id,
      },
    });

    const cart = (await this.cartService.getByUniqueParams({
      where: {
        customerId: customer.id,
      },
      include: this.orderFilter.getOrderInclude(),
    })) as CartRelations;

    if (!cart.orderItems || (cart.orderItems && cart.orderItems.length === 0)) {
      return res.status(404).send('Cart is empty');
    }

    await this.orderAggregate.applyCreateOrderTransaction(cart.id, {
      total: Number(cart.total),
      quantity: cart.quantity,
      customerId: customer.id,
    });

    res.status(200).send('New order successfully created');
  }
}
