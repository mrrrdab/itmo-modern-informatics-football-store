import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import JWTConfig from './jwt.config';
import JWTProvider from './jwt.provider';
import NodeModule from '@/utils/node/node.module';

@Module({
  imports: [ ConfigModule, NodeModule ],
  providers: [ JWTConfig, JWTProvider ],
  exports: [ JWTProvider ]
})
class JWTModule {}
export default JWTModule;
