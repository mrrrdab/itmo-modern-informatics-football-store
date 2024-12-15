import { OrderItem } from '@prisma/client';

export interface ICartFilter {
  id: string;
  total: number;
  quantity: number;
  orderItems: (OrderItem & {
    stockQuantity: number;
  })[];
}
