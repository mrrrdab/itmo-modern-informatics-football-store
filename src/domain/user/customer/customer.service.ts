import { Injectable } from '@nestjs/common';
import PrismaService from '@/database/prisma/prisma.service';
import { CreateCustomerDTO, UpdateCustomerDTO } from './dto';

@Injectable()
class CustomerService {
  constructor(private readonly prismaService: PrismaService) {}

  findAll() {
    return;
  }

  findOne(id: number) {
    return;
  }

  create(createCustomerDTO: CreateCustomerDTO) {
    return;
  }

  update(id: number, updateCustomerDTO: UpdateCustomerDTO) {
    return;
  }

  remove(id: number) {
    return;
  }
}
export default CustomerService;
