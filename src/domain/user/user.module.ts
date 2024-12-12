import { Module, forwardRef } from '@nestjs/common';

import { PrismaModule } from '@/database/prisma';
import { RedisModule } from '@/cache/redis';

import { AuthModule } from '../auth';

import { CryptoModule, MailerModule, JWTModule } from '@/utils';

import { UserController } from './user.controller';
import { UserService } from './service/user.service';
import { UserAggregate } from './service/user.aggregate';
import { UserEmailTemplate } from './service/user.email.template';

@Module({
  imports: [
    PrismaModule,
    RedisModule,
    forwardRef(() => AuthModule),
    CryptoModule,
    MailerModule,
    JWTModule
  ],
  controllers: [UserController],
  providers: [UserService, UserAggregate, UserEmailTemplate],
  exports: [UserService, UserAggregate],
})
export class UserModule {}
