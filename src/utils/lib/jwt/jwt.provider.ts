import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CookieOptions } from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import JWTConfig from './jwt.config';
import IJWTExpiration from './types/interface/jwt.expiration.interface';
import IUserPayload from '@/domain/user/types/interface/user.payload.interface';
import JWT from './types/enum/jwt.enum';

@Injectable()
class JWTProvider {
  private readonly jwtSecret: Secret;
  private readonly jwtExpiration: IJWTExpiration = {
    access: 900000,
    refresh: 259200000
  };

  constructor(
    private readonly configService: ConfigService,
    private readonly jwtConfig: JWTConfig
  ) {
    this.jwtSecret = this.configService.get('JWT_SECRET') as Secret;
  }

  public generateJWT(userPayload: IUserPayload, jwtType: JWT): string {
    return jwt.sign(userPayload, this.jwtSecret, {
      expiresIn: `${this.jwtExpiration[jwtType]}ms`
    });
  }

  public async validateJWT(token: string): Promise<IUserPayload> {
    return new Promise((resolve, reject) => {
      jwt.verify(token, this.jwtSecret, (err, decoded) => {
        if (err) {
          reject(new UnauthorizedException("Вы не авторизированы в системе"));
        }

        resolve(decoded as IUserPayload);
      })
    });
  }

  public createJWTCookie(jwtType: JWT): CookieOptions {
    return {
      ...this.jwtConfig.getCookieSettings(),
      maxAge: this.jwtExpiration[jwtType],
    };
  }
}
export default JWTProvider;
