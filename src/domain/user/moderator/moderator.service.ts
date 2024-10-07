import { Injectable } from '@nestjs/common';
import { CreateModeratorDTO, UpdateModeratorDTO } from './dto';
import PrismaService from '@/database/prisma/prisma.service';

@Injectable()
class ModeratorService {
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
export default ModeratorService;
