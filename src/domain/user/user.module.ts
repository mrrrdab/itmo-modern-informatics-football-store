import { Module } from '@nestjs/common';
import AdministratorModule from './administrator/administrator.module';
import ModeratorModule from './moderator/moderator.module';
import CustomerModule from './customer/customer.module';

@Module({
  imports: [
    AdministratorModule,
    ModeratorModule,
    CustomerModule
  ]
})
class UserModule {}
export default UserModule;
