import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/prisma.service';

import { CreateAdministratorDTO, UpdateAdministratorDTO } from './dto';

@Injectable()
export class AdministratorService {
  constructor(private readonly prismaService: PrismaService) {}

  findAll() {
    return;
  }

  findOne(id: number) {
    return;
  }

  create(createAdministratorDTO: CreateAdministratorDTO) {
    return;
  }

  update(id: number, updateAdministratorDTO: UpdateAdministratorDTO) {
    return;
  }

  remove(id: number) {
    return;
  }
}
