import { Module } from '@nestjs/common';

import { PrismaService } from '@/prisma.service';

import { AdministratorService } from './administrator.service';
import { AdministratorController } from './administrator.controller';

@Module({
  controllers: [AdministratorController],
  providers: [AdministratorService, PrismaService],
})
export class AdministratorModule {}
