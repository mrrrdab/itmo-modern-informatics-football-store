import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';

import { CustomerService } from './customer.service';
import { CreateCustomerDTO, UpdateCustomerDTO } from './dto';

@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  findAll() {
    return this.customerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customerService.findOne(+id);
  }

  @Post()
  create(@Body() createCustomerDTO: CreateCustomerDTO) {
    return this.customerService.create(createCustomerDTO);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCustomerDTO: UpdateCustomerDTO) {
    return this.customerService.update(+id, updateCustomerDTO);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customerService.remove(+id);
  }
}
