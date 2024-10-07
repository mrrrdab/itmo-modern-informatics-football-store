import { Module } from '@nestjs/common';
import PrismaModule from '@/database/prisma/prisma.module';
import ModeratorController from './moderator.controller';
import ModeratorService from './moderator.service';

@Module({
  imports: [ PrismaModule ],
  controllers: [ModeratorController],
  providers: [ModeratorService],
})
class ModeratorModule {}
export default ModeratorModule;
