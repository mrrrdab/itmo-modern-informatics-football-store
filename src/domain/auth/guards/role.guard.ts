import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Role } from '@prisma/client';
import IUserPayload from '@/domain/user/types/interface/user.payload.interface';

@Injectable()
class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const user = request.user as IUserPayload;

    const requiredRole = this.reflector.getAllAndOverride<Role>('role', [
      context.getClass(),
      context.getHandler()
    ]);

    if ((!user || !user.role) || (requiredRole && user.role !== requiredRole)) {
      throw new ForbiddenException(`Вы не авторизированы как ${requiredRole}`);
    }

    return true;
  }
}
export default RoleGuard;
