import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class OrderFilter {
  private readonly orderPublicFields: Prisma.OrderSelect = {
    id: true,
    total: true,
    quantity: true,
    status: true,
    createdAt: true,
  };

  private readonly orderInclude: Prisma.OrderInclude = {
    orderItems: true,
  };

  public getOrderPublicFields(): Prisma.OrderSelect {
    return this.orderPublicFields;
  }

  public getOrderInclude(): Prisma.OrderInclude {
    return this.orderInclude;
  }
}
