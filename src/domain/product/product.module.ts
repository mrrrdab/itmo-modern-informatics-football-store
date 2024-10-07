import { Module } from '@nestjs/common';
import PrismaModule from '@/database/prisma/prisma.module';
import ProductController from './product.controller';
import ProductService from './product.service';

@Module({
  imports: [ PrismaModule ],
  controllers: [ProductController],
  providers: [ProductService],
})
class ProductModule {}
export default ProductModule;
