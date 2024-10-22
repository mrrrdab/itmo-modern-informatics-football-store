import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { User, Role } from '@prisma/client';
import cron from 'node-cron';
import JWTProvider from '@/utils/lib/jwt/jwt.provider';
import UserService from '../user/user.service';
import EmailVerifService from '../email-verification/email-verification.service';
import CustomerService from '../user/entity/customer/customer.service';
import IUserPayload from '../user/types/interface/user.payload.interface';
import AuthData from './types/auth.data.type';
import PasswordChar from './types/enum/password.char.enum';
import JWT from '@/utils/lib/jwt/types/enum/jwt.enum';

@Injectable()
class AuthService {
  private readonly passwordSpecialChars: string = '@$!%*#?&';

  constructor(
    private readonly jwtProvider: JWTProvider,
    private readonly userService: UserService,
    private readonly emailVerifService: EmailVerifService,
    private readonly customerService: CustomerService
  ) {
    this.scheduleCleanupNotVerifData();
  }

  public scheduleCleanupNotVerifData() {
    cron.schedule('0 0 * * *', async () => {
      await this.removeAllNonVerifData();
    });
  }

  public async removeAllNonVerifData(): Promise<void> {
    const nonActivatedAccounts = await this.emailVerifService.getMany({
      where: {
        user: {
          isVerified: false
        }
      }
    });

    nonActivatedAccounts.forEach(async (nonActivatedAccount) => {
      if (new Date(nonActivatedAccount.expiresAt) < new Date()) {
        await this.userService.remove(nonActivatedAccount.userId);
      }
    });
  }

  public async setJWTCookie(user: User, res: Response): Promise<AuthData> {
    const userPayload: IUserPayload = {
      id: user.id,
      email: user.email,
      role: user.role
    };

    if (userPayload.role === Role.CUSTOMER) {
      const customer = await this.customerService.getByUniqueParams({
        where: {
          userId: user.id
        }
      });

      userPayload.firstName = customer.firstName;
      userPayload.lastName = customer.lastName;
    }

    const accessToken = this.jwtProvider.generateJWT(userPayload, JWT.access);
    const refreshToken = this.jwtProvider.generateJWT(userPayload, JWT.refresh);

    res.cookie(JWT.access, accessToken, this.jwtProvider.createJWTCookie(JWT.access))
      .cookie(JWT.refresh, refreshToken, this.jwtProvider.createJWTCookie(JWT.refresh));

    return {
      userPayload: userPayload,
      access: accessToken,
      refresh: refreshToken
    };
  }

  public generateRandomCharToPassword(passwordChar: PasswordChar, length: number = 1): string[] {
    const resultPart: string[] = [];

    switch (passwordChar) {
      case PasswordChar.lower:
        resultPart.push(...Array.from(
          { length }, () => String.fromCharCode(Math.floor(Math.random() * 26) + 97)
        ));
        break;

      case PasswordChar.upper:
        resultPart.push(...Array.from(
          { length }, () => String.fromCharCode(Math.floor(Math.random() * 26) + 65)
        ));
        break;

      case PasswordChar.digit:
        resultPart.push(...Array.from({ length }, () => Math.floor(Math.random() * 10).toString()));
        break;

      case PasswordChar.special:
        resultPart.push(...Array.from(
          { length }, () => this.passwordSpecialChars[
            Math.floor(Math.random() * this.passwordSpecialChars.length)
          ]
        ));
        break;
    }

    return resultPart;
  }
}
export default AuthService;
