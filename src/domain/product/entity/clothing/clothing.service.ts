import { Prisma, Clothing } from '@prisma/client';
import { PrismaService } from '@/database/prisma';

import { ClothingCreateDTO } from './dto/clothing.create.dto';

export class ClothingService {
  constructor(private readonly prismaService: PrismaService) { }

  public async create(clothingCreateData: ClothingCreateDTO): Promise<Clothing> {
    const newClothing = await this.prismaService.clothing.create({
      data: clothingCreateData
    });

    return newClothing;
  }

  public async update(clothingUpdateData: Prisma.ClothingUpdateArgs): Promise<Clothing> {
    const updatedClothing = await this.prismaService.clothing.update(clothingUpdateData);
    return updatedClothing;
  }
}
