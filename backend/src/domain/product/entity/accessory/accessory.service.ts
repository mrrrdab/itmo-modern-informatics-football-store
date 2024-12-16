import { Injectable } from '@nestjs/common';
import { Prisma, Accessory } from '@prisma/client';

import { PrismaService } from '@/database/prisma';

import { AccessoryCreateDTO } from './dto/accessory.create.dto';

@Injectable()
export class AccessoryService {
  constructor(private readonly prismaService: PrismaService) {}

  public async create(accessoryCreateData: AccessoryCreateDTO): Promise<Accessory> {
    const newAccessory = await this.prismaService.accessory.create({
      data: accessoryCreateData,
    });

    return newAccessory;
  }

  public async update(accessoryUpdateData: Prisma.AccessoryUpdateArgs): Promise<Accessory> {
    const updatedAccessory = await this.prismaService.accessory.update(accessoryUpdateData);
    return updatedAccessory;
  }
}
