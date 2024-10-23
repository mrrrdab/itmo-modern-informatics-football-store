import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Role } from '@prisma/client';

import { UseRole } from '@/utils';

import { AuthGuard, RoleGuard } from '../auth';

import { CartService } from './cart.service';
import { CreateCartDTO, UpdateCartDTO } from './dto';

@ApiTags('Carts')
@Controller('api/carts')
@UseGuards(AuthGuard, RoleGuard)
@UseRole(Role.CUSTOMER)
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  findAll() {
    return this.cartService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cartService.findOne(+id);
  }

  @Post()
  create(@Body() createCartDTO: CreateCartDTO) {
    return this.cartService.create(createCartDTO);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCartDTO: UpdateCartDTO) {
    return this.cartService.update(+id, updateCartDTO);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartService.remove(+id);
  }
}
