import { Injectable } from '@nestjs/common';
import { Role } from '@prisma/client';
import PrismaService from '@/database/prisma/prisma.service';
import UserSignupDTO from '../auth/validation/dto/user.signup.dto';
import TokenVerifDTO from '../auth/validation/dto/token.verif.dto';

@Injectable()
class UserAggregate {
  constructor(
    private readonly prismaService: PrismaService
  ) {}

  public async applySignupTransaction(userSignupData: UserSignupDTO, verifData: TokenVerifDTO): Promise<void> {
    await this.prismaService.$transaction(async (prisma) => {
      const newUser = await prisma.user.create({
        data: {
          email: userSignupData.email,
          password: userSignupData.password,
          role: Role.CUSTOMER
        },
      });

      await prisma.emailVerification.create({
        data: {
          verifToken: verifData.token,
          userId: newUser.id
        }
      });

      await prisma.customer.create({
        data: {
          firstName: userSignupData.firstName,
          lastName: userSignupData.lastName,
          birthDate: userSignupData.birthDate,
          phoneNumber: userSignupData.phoneNumber,
          userId: newUser.id
        },
      });
    });
  }
}
export default UserAggregate;
