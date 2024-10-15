import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';

import { ProductService } from './product.service';
import { CreateProductDTO, GetProductDTO, UpdateProductDTO } from './dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiOperation({
    summary: 'Get all products',
  })
  @ApiOkResponse({
    description: 'Successful Response',
    type: [GetProductDTO],
  })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  @Get()
  async findAll() {
    return this.productService.findAll();
  }

  @ApiOperation({
    summary: 'Get product by id',
  })
  @ApiOkResponse({
    description: 'Successful Response',
    type: GetProductDTO,
  })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @ApiOperation({
    summary: 'Create product',
  })
  @ApiCreatedResponse({
    description: 'Successful Response',
    type: GetProductDTO,
  })
  @ApiBadRequestResponse({ description: 'Invalid Input' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  @Post()
  async create(@Body() createProductDTO: CreateProductDTO) {
    return this.productService.create(createProductDTO);
  }

  @ApiOperation({
    summary: 'Update Existing Product',
  })
  @ApiOkResponse({
    description: 'Successful Response',
    type: GetProductDTO,
  })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiBadRequestResponse({ description: 'Invalid Input' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateProductDTO: UpdateProductDTO) {
    return this.productService.update(+id, updateProductDTO);
  }

  @ApiOperation({
    summary: 'Delete product',
  })
  @ApiNoContentResponse({
    description: 'Successful Response',
  })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiBadRequestResponse({ description: 'Invalid Input' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.productService.delete(+id);
  }
}
