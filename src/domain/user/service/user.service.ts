import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';

import { PrismaService } from '@/database/prisma';
import { CryptoProvider } from '@/utils';

import { UserCreateDTO } from '../dto';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly crypto: CryptoProvider,
  ) {}

  private readonly userUpdateFilter: Partial<keyof User>[] = ['password'];

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

  public async update(userId: string, userUpdateData: Prisma.UserUpdateInput): Promise<User> {
    if (userUpdateData.password) {
      userUpdateData.password = await this.crypto.hashStringBySHA256(userUpdateData.password as string);
    }

    const updatedUser = await this.prismaService.user.update({
      where: {
        id: userId,
      },
      data: userUpdateData,
    });

    return updatedUser;
  }

  public async remove(userId: string): Promise<void> {
    await this.prismaService.user.delete({
      where: {
        id: userId,
      },
    });
  }

  public getUpdateFilter(): Partial<keyof User>[] {
    return this.userUpdateFilter;
  }
}