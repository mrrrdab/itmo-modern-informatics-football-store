import { Module } from '@nestjs/common';

import { PrismaService } from '@/prisma.service';

import { EmailVerificationService } from './email-verification.service';
import { EmailVerificationController } from './email-verification.controller';

@Module({
  controllers: [EmailVerificationController],
  providers: [EmailVerificationService, PrismaService],
})
export class EmailVerificationModule {}
