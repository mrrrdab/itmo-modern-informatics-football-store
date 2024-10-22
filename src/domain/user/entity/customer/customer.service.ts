import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, Customer } from '@prisma/client';
import PrismaService from '@/database/prisma/prisma.service';
import CustomerCreateDTO from './validation/dto/customer.create.dto';

@Injectable()
class CustomerService {
  constructor(private readonly prismaService: PrismaService) {}

  public async getMany(params: Prisma.CustomerFindManyArgs): Promise<Customer[]> {
    const customers = await this.prismaService.customer.findMany(params);
    return customers;
  }

  public async getByUniqueParams(uniqueParams: Prisma.CustomerFindUniqueArgs): Promise<Customer> {
    const customer = await this.prismaService.customer.findUnique(uniqueParams);

    if (!customer) {
      throw new NotFoundException("Покупатель по заданным параметрам не найден");
    }

    return customer;
  }

  public async create(customerCreateData: CustomerCreateDTO): Promise<Customer> {
    const newCustomer = await this.prismaService.customer.create({
      data: customerCreateData
    });

    return newCustomer;
  }
}
export default CustomerService;
