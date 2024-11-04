import { Controller, Get, Post, Req, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Request } from 'express';
import { Role } from '@prisma/client';

import { UseRole } from '@/utils';

import { AuthGuard, RoleGuard } from '../auth';
import { IUserPayload, ModeratorService } from '../user';

import { CreateProductDTO, GetProductDTO, UpdateProductDTO } from './dto';
import { ProductService } from './product.service';

@ApiTags('Products')
@Controller('api/products')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly moderatorService: ModeratorService,
  ) {}

  @ApiOperation({
    summary: 'Get all Products',
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
    summary: 'Get Product by Id',
  })
  @ApiOkResponse({
    description: 'Successful Response',
    type: GetProductDTO,
  })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @UseRole(Role.MODERATOR)
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
  async create(@Req() req: Request, @Body() createProductDTO: CreateProductDTO) {
    const userPayload = req.user as IUserPayload;
    const moderator = await this.moderatorService.getByUniqueParams({
      where: {
        userId: userPayload.id,
      },
    });

    return this.productService.create(moderator, createProductDTO);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @UseRole(Role.MODERATOR)
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
    return this.productService.update(id, updateProductDTO);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @UseRole(Role.MODERATOR)
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
    await this.productService.delete(id);
  }
}
