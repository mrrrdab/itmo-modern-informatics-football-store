import { Module } from '@nestjs/common';

import { PrismaModule } from '@/database/prisma';
import { CryptoModule, JWTModule } from '@/utils';

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserAggregate } from './user.aggregate';

@Module({
  imports: [PrismaModule, CryptoModule, JWTModule],
  controllers: [UserController],
  providers: [UserService, UserAggregate],
  exports: [UserService, UserAggregate],
})
export class UserModule {}
