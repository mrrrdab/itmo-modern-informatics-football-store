import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateProductDTO, UpdateProductDTO } from './dto';
import ProductService from './product.service';

@Controller('products')
class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Post()
  create(@Body() createProductDTO: CreateProductDTO) {
    return this.productService.create(createProductDTO);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDTO: UpdateProductDTO) {
    return this.productService.update(+id, updateProductDTO);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
export default ProductController;