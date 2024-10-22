import { Module } from '@nestjs/common';
import PrismaModule from '@/database/prisma/prisma.module';
import AdminService from './admin.service';

@Module({
  imports: [PrismaModule],
  providers: [AdminService],
  exports: [AdminService]
})
class AdminModule { }
export default AdminModule;
