import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtModuleOptions } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import IUserPayload from '@/domain/user/types/interface/user.payload.interface';
import IJWTExpiration from './types/interface/jwt.expiration.interface';
import JWT from './types/enum/jwt.enum';

@Injectable()
class JWTProvider {
  private readonly jwtSecret: JwtModuleOptions["secret"];
  private readonly jwtExpiration: IJWTExpiration = {
    access: '15m',
    refresh: '3d'
  };

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {
    this.jwtSecret = this.configService.get('JWT_SECRET');
  }

  public generateJWT(userPayload: IUserPayload, jwtType: JWT): string {
    return this.jwtService.sign(userPayload, {
      expiresIn: this.jwtExpiration[jwtType],
      secret: this.jwtSecret
    })
  }

  public async validateJWT(jwt: string): Promise<IUserPayload> {
    try {
      return this.jwtService.verify(jwt);
    }
    catch(err) {
      throw new UnauthorizedException('Failed to authenticate token');
    }
  }
}
export default JWTProvider;
