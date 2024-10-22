import {
  Req,
  Res,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  NotFoundException
} from '@nestjs/common';
import { Request, Response } from 'express';
import JWTProvider from '@/utils/lib/jwt/jwt.provider';
import UserService from '@/domain/user/user.service';
import IUserPayload from '@/domain/user/types/interface/user.payload.interface';
import JWT from '@/utils/lib/jwt/types/enum/jwt.enum';

@Injectable()
class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtProvider: JWTProvider,
    private readonly userService: UserService
  ) { }

  private readonly unExceptionMessage: string = "Вы не авторизированы в системе";

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();

    let accessToken = request.cookies[JWT.access];

    if (!accessToken && request.cookies[JWT.refresh]) {
      accessToken = await this.refreshAccessToken(request, response);
    }
    else if (!accessToken && !request.cookies[JWT.refresh]) {
      throw new UnauthorizedException(this.unExceptionMessage);
    }

    const userPayload: IUserPayload = await this.jwtProvider.validateJWT(accessToken);
    request.user = this.filterUserPayload(userPayload);

    return true;
  }

  private async refreshAccessToken(@Req() req: Request, @Res() res: Response): Promise<string> {
    try {
      await this.userService.getByUniqueParams({
        where: {
          refreshToken: req.cookies[JWT.refresh]
        }
      });
    }
    catch(err) {
      if (err instanceof NotFoundException) {
        throw new UnauthorizedException(this.unExceptionMessage);
      }

      throw err;
    }

    const userPayload: IUserPayload = await this.jwtProvider.validateJWT(req.cookies[JWT.refresh]);
    const accessToken = this.jwtProvider.generateJWT(this.filterUserPayload(userPayload), JWT.access);
    res.cookie(JWT.access, accessToken, this.jwtProvider.createJWTCookie(JWT.access));

    return accessToken;
  }

  private filterUserPayload(userPayload: IUserPayload): IUserPayload {
    const refreshUserPayload: IUserPayload = {
      id: userPayload.id,
      email: userPayload.email,
      role: userPayload.role
    };

    if (userPayload.firstName) {
      refreshUserPayload.firstName = userPayload.firstName;
    }

    if (userPayload.lastName) {
      refreshUserPayload.lastName = userPayload.lastName;
    }

    return refreshUserPayload;
  }
}
export default AuthGuard;
