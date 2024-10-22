import { Module } from '@nestjs/common';
import PrismaModule from '@/database/prisma/prisma.module';
import ModeratorController from './moderator.controller';
import ModeratorService from './moderator.service';
import JWTModule from '@/utils/lib/jwt/jwt.module';
import UserModule from '../../user.module';
import AdminModule from '../administrator/admin.module';

@Module({
  imports: [
    PrismaModule,
    JWTModule,
    AdminModule,
    UserModule
  ],
  controllers: [ModeratorController],
  providers: [ModeratorService],
})
class ModeratorModule { }
export default ModeratorModule;
