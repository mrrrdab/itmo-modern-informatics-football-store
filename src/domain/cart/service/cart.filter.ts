import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '@/database/prisma';

import { ICartFilter } from '../types';

@Injectable()
export class CartFilter {
  constructor(private readonly prismaService: PrismaService) {}

  public async querySQLFilter(customerId: string): Promise<ICartFilter> {
    const result = (await this.prismaService.$queryRaw`
      SELECT
        c.id,
        c.total,
        c.quantity,
        json_agg(json_build_object(
          'id', oi.id,
	        'quantity', oi.quantity,
	        'size', oi.size,
	        'createdAt', oi."createdAt",
	        'updatedAt', oi."updatedAt",
	        'productId', oi."productId",
	        'orderId', oi."orderId",
	        'cartId', oi."cartId",
          'stockQuantity', COALESCE(cl."stockQuantity", f."stockQuantity", a."stockQuantity")
        )) AS "orderItems"
      FROM
        public."Cart" c
      INNER JOIN
        public."OrderItem" oi ON c.id = oi."cartId"
      INNER JOIN
        public."Product" p ON oi."productId" = p.id
      LEFT JOIN
        public."Clothing" cl ON p.id = cl."productId" AND oi.size::text = cl.size::text
      LEFT JOIN
        public."Footwear" f ON p.id = f."productId" AND oi.size::text = f.size::text
      LEFT JOIN
        public."Accessory" a ON p.id = a."productId"
      WHERE c."customerId" = ${Prisma.raw(customerId)}
      GROUP BY
        c.id, c.total, c.quantity
    `) as ICartFilter;

    return result;
  }
}