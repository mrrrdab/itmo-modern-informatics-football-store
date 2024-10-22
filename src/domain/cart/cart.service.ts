import { Injectable } from '@nestjs/common';
import { CreateCartDTO, UpdateCartDTO } from './dto';
import PrismaService from '@/database/prisma/prisma.service';

@Injectable()
class CartService {
  constructor(private readonly prismaService: PrismaService) {}

  findAll() {
    return;
  }

  findOne(id: number) {
    return;
  }

  create(createCartDTO: CreateCartDTO) {
    return;
  }

  update(id: number, updateCartDTO: UpdateCartDTO) {
    return;
  }

  remove(id: number) {
    return;
  }
}
export default CartService;
