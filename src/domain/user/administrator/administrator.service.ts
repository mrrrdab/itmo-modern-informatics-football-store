import { Injectable } from '@nestjs/common';
import { CreateAdministratorDTO, UpdateAdministratorDTO } from './dto';
import PrismaService from '@/database/prisma/prisma.service';

@Injectable()
class AdministratorService {
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
export default AdministratorService;
