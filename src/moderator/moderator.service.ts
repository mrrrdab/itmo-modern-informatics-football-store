import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/prisma.service';

import { CreateModeratorDTO, UpdateModeratorDTO } from './dto';

@Injectable()
export class ModeratorService {
  constructor(private readonly prismaService: PrismaService) {}

  findAll() {
    return;
  }

  findOne(id: number) {
    return;
  }

  create(createModeratorDTO: CreateModeratorDTO) {
    return;
  }

  update(id: number, updateModeratorDTO: UpdateModeratorDTO) {
    return;
  }

  remove(id: number) {
    return;
  }
}
