import { Module } from '@nestjs/common';
import PrismaModule from '@/database/prisma/prisma.module';
import AdministratorController from './administrator.controller';
import AdministratorService from './administrator.service';

@Module({
  imports: [ PrismaModule ],
  controllers: [AdministratorController],
  providers: [AdministratorService],
})
class AdministratorModule {}
export default AdministratorModule;
