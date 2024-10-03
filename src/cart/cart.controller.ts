import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';

import { CartService } from './cart.service';
import { CreateCartDTO, UpdateCartDTO } from './dto';

@Controller('carts')
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
