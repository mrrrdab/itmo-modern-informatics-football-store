import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, Moderator } from '@prisma/client';
import PrismaService from '@/database/prisma/prisma.service';
import ModeratorCreateDTO from './validation/dto/moderator.create.dto';

@Injectable()
class ModeratorService {
  constructor(private readonly prismaService: PrismaService) {}

  public async getMany(params: Prisma.ModeratorFindManyArgs): Promise<Moderator[]> {
    const moderators = await this.prismaService.moderator.findMany(params);
    return moderators;
  }

  public async getByUniqueParams(params: Prisma.ModeratorFindUniqueArgs): Promise<Moderator> {
    const moderator = await this.prismaService.moderator.findUnique(params);

    if (!moderator) {
      throw new NotFoundException("Модератор по заданным параметрам не найден");
    }

    return moderator;
  }

  public async create(moderatorCreateData: ModeratorCreateDTO): Promise<Moderator> {
    const newModerator = await this.prismaService.moderator.create({
      data: moderatorCreateData
    });

    return newModerator;
  }
}
export default ModeratorService;
