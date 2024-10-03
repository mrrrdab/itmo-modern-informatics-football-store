import { Module } from '@nestjs/common';

import { PrismaService } from '@/prisma.service';

import { ModeratorService } from './moderator.service';
import { ModeratorController } from './moderator.controller';

@Module({
  controllers: [ModeratorController],
  providers: [ModeratorService, PrismaService],
})
export class ModeratorModule {}
