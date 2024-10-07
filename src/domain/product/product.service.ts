import { Injectable } from '@nestjs/common';
import { CreateProductDTO, UpdateProductDTO } from './dto';
import PrismaService from '@/database/prisma/prisma.service';

@Injectable()
class ProductService {
  constructor(private readonly prismaService: PrismaService) {}

  findAll() {
    return;
  }

  findOne(id: number) {
    return;
  }

  create(createProductDTO: CreateProductDTO) {
    return;
  }

  update(id: number, updateProductDTO: UpdateProductDTO) {
    return;
  }

  remove(id: number) {
    return;
  }
}
export default ProductService;
