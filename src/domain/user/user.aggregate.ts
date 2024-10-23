import { Injectable } from '@nestjs/common';
import { Role } from '@prisma/client';

import { PrismaService } from '@/database/prisma';

import { UserSignUpDTO } from '../auth/dto/user.signup.dto';
import { TokenVerifDTO } from '../auth/dto/token.verif.dto';

@Injectable()
export class UserAggregate {
  constructor(private readonly prismaService: PrismaService) {}

  public async applySignupTransaction(userSignupData: UserSignUpDTO, verifData: TokenVerifDTO): Promise<void> {
    await this.prismaService.$transaction(async (prisma: any) => {
      const newUser = await prisma.user.create({
        data: {
          email: userSignupData.email,
          password: userSignupData.password,
          role: Role.CUSTOMER,
        },
      });

      await prisma.emailVerification.create({
        data: {
          verifToken: verifData.token,
          userId: newUser.id,
        },
      });

      await prisma.customer.create({
        data: {
          firstName: userSignupData.firstName,
          lastName: userSignupData.lastName,
          birthDate: userSignupData.birthDate,
          phoneNumber: userSignupData.phoneNumber,
          userId: newUser.id,
        },
      });
    });
  }
}
