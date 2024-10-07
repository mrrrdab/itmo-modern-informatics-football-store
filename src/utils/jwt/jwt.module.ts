import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import JWTProvider from './jwt.provider';

@Module({
  imports: [ JwtModule, ConfigModule ],
  providers: [ JWTProvider ],
  exports: [ JWTProvider ]
})
class JWTModule {}
export default JWTModule;
