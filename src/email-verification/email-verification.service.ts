import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/prisma.service';

import { CreateEmailVerificationDTO, UpdateEmailVerificationDTO } from './dto';

@Injectable()
export class EmailVerificationService {
  constructor(private readonly prismaService: PrismaService) {}

  findAll() {
    return;
  }

  findOne(id: number) {
    return;
  }

  create(createEmailVerificationDTO: CreateEmailVerificationDTO) {
    return;
  }

  update(id: number, updateEmailVerificationDTO: UpdateEmailVerificationDTO) {
    return;
  }

  remove(id: number) {
    return;
  }
}
