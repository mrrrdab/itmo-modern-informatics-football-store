import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, EmailVerification } from '@prisma/client';
import PrismaService from '@/database/prisma/prisma.service';
import EmailVerifCreateDTO from './validation/dto/email-verification.create.dto';
import EmailVerifUpdateDTO from './validation/dto/email-verification.update.dto';

@Injectable()
class EmailVerifService {
  constructor(private readonly prismaService: PrismaService) {}

  public async getMany(params: Prisma.EmailVerificationFindManyArgs) {
    const emailVerifications = await this.prismaService.emailVerification.findMany(params);
    return emailVerifications;
  }

  public async getByUniqueParams(
    uniqueParams: Prisma.EmailVerificationFindUniqueArgs
  ): Promise<EmailVerification> {
    const emailVerif = await this.prismaService.emailVerification.findUnique(uniqueParams);

    if (!emailVerif) {
      throw new NotFoundException("Запись о запрашиваемой верификации не найдена");
    }

    return emailVerif;
  }

  public async create(emailVerifCreateData: EmailVerifCreateDTO): Promise<EmailVerification> {
    const newEmailVerif = await this.prismaService.emailVerification.create({
      data: emailVerifCreateData
    });

    return newEmailVerif;
  }

  public async update(
    emailVerifId: string,
    emailVerifUpdateData: EmailVerifUpdateDTO
  ): Promise<EmailVerification> {
    const updatedEmailVerif = await this.prismaService.emailVerification.update({
      where: {
        id: emailVerifId
      },
      data: emailVerifUpdateData
    });

    if (!updatedEmailVerif) {
      throw new NotFoundException("Верификация с заданным id не найдена");
    }

    return updatedEmailVerif;
  }
}
export default EmailVerifService;
