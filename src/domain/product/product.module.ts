import { Module } from '@nestjs/common';
import PrismaModule from '@/database/prisma/prisma.module';
import ProductController from './product.controller';
import ProductService from './product.service';
import JWTModule from '@/utils/lib/jwt/jwt.module';
import UserModule from '../user/user.module';

@Module({
  imports: [
    PrismaModule,
    JWTModule,
    UserModule
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
class ProductModule {}
export default ProductModule;
