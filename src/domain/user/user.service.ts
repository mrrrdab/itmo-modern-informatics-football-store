import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';

import { PrismaService } from '@/database/prisma';
import { CryptoProvider } from '@/utils';

import { UserCreateDTO, UserSystemUpdateDTO, UserUpdateDTO } from './dto';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly crypto: CryptoProvider,
  ) {}

  public async getMany(params: Prisma.UserFindManyArgs) {
    const users = await this.prismaService.user.findMany(params);
    return users;
  }

  public async getByUniqueParams(uniqueParams: Prisma.UserFindUniqueArgs): Promise<User> {
    const user = await this.prismaService.user.findUnique(uniqueParams);

    if (!user) {
      throw new NotFoundException('User Not Found');
    }

    return user;
  }

  public async create(userCreateData: UserCreateDTO): Promise<User> {
    userCreateData.password = await this.crypto.hashStringBySHA256(userCreateData.password);
    const newUser = await this.prismaService.user.create({
      data: userCreateData,
    });

    return newUser;
  }

  public async update(userId: string, userUpdateData: UserSystemUpdateDTO | UserUpdateDTO): Promise<User> {
    const updatedUser = await this.prismaService.user.update({
      where: {
        id: userId,
      },
      data: userUpdateData,
    });

    if (!updatedUser) {
      throw new NotFoundException('User with the given id not found');
    }

    return updatedUser;
  }

  public async remove(userId: string): Promise<void> {
    await this.prismaService.user.delete({
      where: {
        id: userId,
      },
    });
  }
}
