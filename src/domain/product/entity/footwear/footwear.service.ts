import { Injectable } from '@nestjs/common';
import { Prisma, Footwear } from '@prisma/client';

import { PrismaService } from '@/database/prisma';

import { FootwearCreateDTO } from './dto/footwear.create.dto';

@Injectable()
export class FootwearService {
  constructor(private readonly prismaService: PrismaService) {}

  public async create(footwearCreateData: FootwearCreateDTO): Promise<Footwear> {
    const newFootwear = await this.prismaService.footwear.create({
      data: footwearCreateData,
    });

    return newFootwear;
  }

  public async update(footwearUpdateData: Prisma.FootwearUpdateArgs): Promise<Footwear> {
    const updatedFootwear = await this.prismaService.footwear.update(footwearUpdateData);
    return updatedFootwear;
  }
}
