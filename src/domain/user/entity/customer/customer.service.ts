import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, Customer } from '@prisma/client';

import { PrismaService } from '@/database/prisma';

import { CustomerCreateDTO } from './dto';

@Injectable()
export class CustomerService {
  constructor(private readonly prismaService: PrismaService) {}

  public async getMany(params: Prisma.CustomerFindManyArgs): Promise<Customer[]> {
    const customers = await this.prismaService.customer.findMany(params);
    return customers;
  }

  public async getByUniqueParams(uniqueParams: Prisma.CustomerFindUniqueArgs): Promise<Customer> {
    const customer = await this.prismaService.customer.findUnique(uniqueParams);

    if (!customer) {
      throw new NotFoundException('Customer Not Found');
    }

    return customer;
  }

  /*public async create(customerCreateData: CustomerCreateDTO): Promise<Customer> {
    const newCustomer = await this.prismaService.customer.create({
      data: customerCreateData,
    });

    return newCustomer;
  }*/

  public async update(
    customer: Prisma.CustomerWhereUniqueInput,
    customerUpdateData: Prisma.CustomerUpdateInput
  ): Promise<Customer> {
    const updatedCustomer = await this.prismaService.customer.update({
      where: customer,
      data: customerUpdateData
    });

    if (!updatedCustomer) {
      throw new NotFoundException('Customer not found');
    }

    return updatedCustomer;
  }
}
