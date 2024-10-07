import { Module } from '@nestjs/common';
import AuthModule from './auth/auth.module';
import UserModule from './user/user.module';
import CartModule from './cart/cart.module';
import OrderItemModule from './order-item/order-item.module';
import OrderModule from './order/order.module';
import ProductModule from './product/product.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    CartModule,
    OrderItemModule,
    OrderModule,
    ProductModule,
  ]
})
class DomainModule {}
export default DomainModule;
