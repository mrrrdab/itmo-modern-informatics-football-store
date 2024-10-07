import { Module } from '@nestjs/common';
import PrismaModule from './prisma/prisma.module';

@Module({
  imports: [ PrismaModule ]
})
class DatabaseModule {}
export default DatabaseModule;
