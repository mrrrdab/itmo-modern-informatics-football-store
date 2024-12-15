import { Prisma, ProductCategory, ClothingSize, FootwearSize } from '@prisma/client';

export interface ICartControlData {
  size?: ClothingSize | FootwearSize;
  customerId?: string;
  productId?: string;
  orderItemId?: string;
}

export interface ICartControl {
  generateSQLControl(cartControlData: ICartControlData): Prisma.Sql;
}

export interface ICartAccessory {
  id: string;
  category: ProductCategory;
  accessoryId: string;
}

export interface ICartQuantity {
  orderItemId: string;
  orderItemQuantity: number;
  productPrice: number;
  cartId: string;
  cartQuantity: number;
  cartTotal: number;
  stockQuantity: number;
}

export interface ICartSize {
  clothingId: string;
  footwearId: string;
}
