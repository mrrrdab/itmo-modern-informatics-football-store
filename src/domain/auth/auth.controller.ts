import { Controller, Get, Post, Param, Body, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import AuthEmailTemplate from './auth.email.template';
import AuthService from './auth.service';
import UserAggregate from '../user/user.aggregate';
import UserService from '../user/user.service';
import EmailVerifService from '../email-verification/email-verification.service';
import MailerProvider from '@/utils/lib/mailer/mailer.provider';
import CryptoProvider from '@/utils/lib/crypto/crypto.provider';
import UserSignupDTO from './validation/dto/user.signup.dto';
import UserSigninDTO from './validation/dto/user.signin.dto';
import TokenVerifDTO from './validation/dto/token.verif.dto';
import IUserPayload from '../user/types/interface/user.payload.interface';
import EmailSubject from './types/enum/email.subject';
import PasswordChar from './types/enum/password.char.enum';
import JWT from '@/utils/lib/jwt/types/enum/jwt.enum';
import AuthGuard from './guards/auth.guard';

@ApiTags('auth')
@Controller('auth')
class AuthController {
  constructor(
    private readonly mailer: MailerProvider,
    private readonly crypto: CryptoProvider,
    private readonly authEmailTemplate: AuthEmailTemplate,
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly userAggregate: UserAggregate,
    private readonly emailVerifService: EmailVerifService
  ) { }

  @ApiOperation({ summary: "Получить полезную нагрузку пользователя" })
  @ApiResponse({ status: 200, description: 'Полезная нагрузка пользователя' })
  @ApiResponse({ status: 401, description: 'Пользователь не авторизирован в системе' })
  @ApiResponse({ status: 500, description: 'Внутренняя ошибка сервера' })
  @Get('userPayload')
  @UseGuards(AuthGuard)
  public getUserPayload(@Req() req: Request, @Res() res: Response): Response | void {
    if (!req.user) {
      return res.status(401).send("Вы не авторизированы в системе");
    }

    res.status(200).json({
      data: req.user,
      message: "Полезная нагрузка пользователя"
    });
  }

  @ApiOperation({ summary: "Восстановить пароль покупателя" })
  @ApiResponse({ status: 200, description: 'Пароль был успешно восстановлен' })
  @ApiResponse({ status: 404, description: 'Пользователь не найден' })
  @ApiResponse({ status: 500, description: 'Внутренняя ошибка сервера' })
  @ApiParam({
    name: 'email',
    type: 'string',
    format: 'email',
    required: true,
    description: "Почта пользователя"
  })
  @Get('recoverPassword/:email')
  public async recoverPassword(@Param('email') email: string, @Res() res: Response): Promise<Response | void> {
    const user = await this.userService.getByUniqueParams({
      where: {
        email: email
      }
    });

    const token = this.crypto.generateSecureVerifToken(6);
    const requiredChars = Object.values(PasswordChar).map(charType =>
      this.authService.generateRandomCharToPassword(charType)
    ).flat();

    let splittedToken = token.split('');
    requiredChars.forEach((char) => {
      const insertIndex = Math.floor(Math.random() * (splittedToken.length + 1));
      splittedToken.splice(insertIndex, 0, char);
    });

    const newPassword = splittedToken.join('');
    const hashNewPassword = await this.crypto.hashStringBySHA256(newPassword);

    await this.userService.update(user.id, {
      password: hashNewPassword
    });

    await this.mailer.getTransporter().sendMail({
      to: email,
      subject: this.authEmailTemplate.getEmailSubject(EmailSubject.recoverPassword),
      html: this.authEmailTemplate.createRecoverEmail(newPassword)
    });

    res.status(200).send(`Пароль был успешно изменен и отправлен на почту - ${email}`);
  }

  @ApiOperation({ summary: "Войти в систему" })
  @ApiBody({
    type: UserSigninDTO,
    examples: {
      "User - Customer || Administrator || Moderator": {
        value: {
          email: 'voyagerbvb@gmail.com',
          password: 'hjgkdLJFOP!04'
        }
      }
    }
  })
  @ApiResponse({ status: 200, description: 'Пользователь успешно вошел в систему' })
  @ApiResponse({ status: 400, description: 'В тело запроса были переданы некорректные данные' })
  @ApiResponse({ status: 401, description: 'Пользователь не авторизирован в системе' })
  @ApiResponse({ status: 404, description: 'Пользователь не найден' })
  @ApiResponse({ status: 500, description: 'Внутренняя ошибка сервера' })
  @Post('signin')
  public async signin(@Body() userSigninData: UserSigninDTO, @Res() res: Response): Promise<Response | void> {
    const hashUserPassword = await this.crypto.hashStringBySHA256(userSigninData.password);
    const user = await this.userService.getByUniqueParams({
      where: {
        email: userSigninData.email
      }
    });

    if (user.password !== hashUserPassword) {
      return res.status(401).send("Неправильная почта или пароль");
    }

    if (!user.isVerified) {
      return res.status(403).send("Этот аккаунт не активирован");
    }

    const { userPayload, refresh } = await this.authService.setJWTCookie(user, res);
    await this.userService.update(user.id, {
      refreshToken: refresh
    });

    res.status(200).json({
      data: userPayload,
      message: "Авторизация прошла успешно"
    });
  }

  @ApiOperation({ summary: "Создать аккаунт покупателя в системе" })
  @ApiBody({
    type: UserSignupDTO,
    examples: {
      "User - Customer": {
        value: {
          email: 'voyagerbvb@gmail.com',
          password: 'hjgkdLJFOP!04',
          confirmPassword: 'hjgkdLJFOP!04',
          firstName: 'Богдан',
          lastName: 'Богданов',
          birthDate: new Date('2002-12-29'),
          phoneNumber: "+7 (982) 408-31-75"
        }
      }
    }
  })
  @ApiResponse({ status: 200, description: 'Аккаунт был создан, но не был активирован' })
  @ApiResponse({ status: 400, description: 'В тело запроса были переданы некорректные данные' })
  @ApiResponse({ status: 500, description: 'Внутренняя ошибка сервера' })
  @Post('signup')
  public async signup(@Body() userSignupData: UserSignupDTO, @Res() res: Response): Promise<Response | void> {
    userSignupData.password = await this.crypto.hashStringBySHA256(userSignupData.password);
    const verifToken = this.crypto.generateSecureVerifToken(6);

    await this.userAggregate.applySignupTransaction(userSignupData, {
      token: verifToken
    });

    await this.mailer.getTransporter().sendMail({
      to: userSignupData.email,
      subject: this.authEmailTemplate.getEmailSubject(EmailSubject.activateAccount),
      html: this.authEmailTemplate.createActivationEmail({
        token: verifToken
      })
    });

    res.status(200).send(`Письмо верификации успешно отправлено на почту - ${userSignupData.email}`);
  }

  @ApiOperation({ summary: "Выйти из системы" })
  @ApiResponse({ status: 200, description: 'Пользователь успешно вышел из системы' })
  @ApiResponse({ status: 401, description: 'Пользователь не авторизирован в системе' })
  @ApiResponse({ status: 500, description: 'Внутренняя ошибка сервера' })
  @Get('logout')
  @UseGuards(AuthGuard)
  public async logout(@Req() req: Request, @Res() res: Response) {
    const userPayload = req.user as IUserPayload;

    await this.userService.update(userPayload.id, {
      refreshToken: null
    });

    if (req.cookies[JWT.refresh]) {
      res.clearCookie(JWT.refresh);
    }

    res.clearCookie(JWT.access);
    res.status(200).send("Вы успешно вышли из системы");
  }

  @ApiOperation({ summary: 'Отправить повторно письмо для верификации почты покупателя' })
  @ApiParam({
    name: 'email',
    required: true,
    description: "Почта пользователя"
  })
  @ApiResponse({ status: 200, description: 'Письмо верификации было успешно отправлено пользователю на почту' })
  @ApiResponse({ status: 404, description: 'Пользователь или верификация не найдена' })
  @ApiResponse({ status: 500, description: 'Внутренняя ошибка сервера' })
  @Get('/signup/resendEmail/:email')
  public async resendEmail(@Param('email') email: string, @Res() res: Response): Promise<Response | void> {
    const user = await this.userService.getByUniqueParams({
      where: {
        email: email
      }
    });

    let emailVerif = await this.emailVerifService.getByUniqueParams({
      where: {
        userId: user.id
      }
    });

    if (new Date(emailVerif.expiresAt) < new Date()) {
      emailVerif = await this.emailVerifService.update(emailVerif.id, {
        verifToken: this.crypto.generateSecureVerifToken(6)
      });
    }

    await this.mailer.getTransporter().sendMail({
      to: email,
      subject: this.authEmailTemplate.getEmailSubject(EmailSubject.activateAccount),
      html: this.authEmailTemplate.createActivationEmail({
        token: emailVerif.verifToken
      })
    });

    res.status(200).send(`Письмо успешно отправлено на почту - ${email}`);
  }

  @ApiOperation({ summary: 'Активировать созданный аккаунт покупателя' })
  @ApiBody({
    type: TokenVerifDTO,
    examples: {
      "User - Customer": {
        value: {
          token: '4747918d87de'
        }
      }
    }
  })
  @ApiResponse({ status: 200, description: 'Аккаунт пользователя успешно активирован' })
  @ApiResponse({ status: 401, description: 'Токен верификации истек' })
  @ApiResponse({ status: 404, description: 'Пользователь или верификация не найдена' })
  @ApiResponse({ status: 500, description: 'Внутренняя ошибка сервера' })
  @Post('/signup/verifyUserEmail')
  public async verifyUserEmail(
    @Body() verifData: TokenVerifDTO,
    @Res() res: Response
  ): Promise<Response | void> {
    const emailVerif = await this.emailVerifService.getByUniqueParams({
      where: {
        verifToken: verifData.token
      }
    });

    if (new Date(emailVerif.expiresAt) < new Date()) {
      return res.status(401).send("Токен верификации истек");
    }

    const user = await this.userService.getByUniqueParams({
      where: {
        id: emailVerif.userId
      }
    });

    await this.userService.update(user.id, {
      isVerified: true
    });

    const { userPayload, refresh } = await this.authService.setJWTCookie(user, res);
    await this.userService.update(user.id, {
      refreshToken: refresh
    });

    res.status(200).json({
      data: userPayload,
      message: "Авторизация прошла успешно"
    });
  }
}
export default AuthController;
